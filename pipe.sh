#!/bin/sh

set -e

if [ -n "$SSH_TUNNEL_URL" ]; then
    echo "Creating SSH tunnel to $SSH_TUNNEL_URL"

    # Extract components from GITLAB_URL
    scheme=${GITLAB_URL%%://*}
    url_no_scheme=${GITLAB_URL#*://}
    remote_ip=${url_no_scheme%:*}
    remote_port=${url_no_scheme##*:}
    remote_port=${remote_port%/*}

    # Extract components from SSH_TUNNEL_URL
    user=${SSH_TUNNEL_URL%@*}
    SSH_server=${SSH_TUNNEL_URL#*@}

    # Copy SSH keys from bitbucket pipeline to the agent
    mkdir -p ~/.ssh
    if [ -d "/opt/atlassian/pipelines/agent/ssh/" ]; then
        echo "Copying SSH keys from bitbucket pipeline to the agent"
        cp /opt/atlassian/pipelines/agent/ssh/id_rsa_tmp ~/.ssh/id_rsa
        cp /opt/atlassian/pipelines/agent/ssh/known_hosts ~/.ssh/known_hosts
        chmod -R go-rwx ~/.ssh/
    fi

    # Set up the SSH tunnel
    ssh-keyscan -H $SSH_server >> ~/.ssh/known_hosts
    ssh -N -L $remote_port:$remote_ip:$remote_port $user@$SSH_server &
    sleep 5 # Wait for tunnel to be established

    # Check if the tunnel is established
    if ! nc -z localhost $remote_port; then
        echo "SSH tunnel could not be established"
        exit 1
    fi

    # Update GITLAB_URL
    export GITLAB_URL=$scheme://localhost:$remote_port
    echo "SSH tunnel created. New GITLAB_URL is $GITLAB_URL"
fi

echo "Turning off git safe.directory setting"
git config --global --add safe.directory '*'
echo "Running bun run /repo/index.ts $BITBUCKET_CLONE_DIR"

bun run /repo/src/index.ts $BITBUCKET_CLONE_DIR