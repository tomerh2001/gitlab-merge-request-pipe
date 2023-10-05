#!/bin/sh

# Check for the presence of the SECRETS_KEY environment variable
if [ -z "$SECRETS_KEY" ]; then
    echo "SECRETS_KEY environment variable is missing."
    exit 1
fi

git config --global --add safe.directory /repo
git config --global --add safe.directory /opt/atlassian/pipelines/agent/build
git config --global --add safe.directory ${PWD}

echo "$SECRETS_KEY" | base64 -d > /tmp/secrets.key
echo "Wrote secrets key to /tmp/secrets.key"

git-crypt unlock /tmp/secrets.key
rm -f /tmp/secrets.key
echo "Decrypted git-crypt files"
