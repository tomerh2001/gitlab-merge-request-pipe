# Gitlab Merge Request Pipe
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)
[![Snyk Security](../../actions/workflows/snyk-security.yml/badge.svg)](../../actions/workflows/snyk-security.yml)
[![CodeQL](../../actions/workflows/codeql.yml/badge.svg)](../../actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/tomerh2001/gitlab-merge-request-pipe/badge)](https://securityscorecards.dev/viewer/?uri=github.com/tomerh2001/gitlab-merge-request-pipe)

Bitbucket pipe for creating a GitLab merge request.

## Usage

Add this pipe to your `bitbucket-pipelines.yml`:

\```yaml
script:
  - pipe: docker://tomerh2001/gitlab-merge-request-pipe:latest
    variables:
      GITLAB_TOKEN: 'Your_GitLab_Private_Token'
      GITLAB_PROJECT_ID: 'Your_Project_ID'
\```

## Variables

| Name | Description | Default | Required |
| ---- | ----------- | ------- | -------- |
| GITLAB_TOKEN | GitLab private token. | - | Yes |
| GITLAB_PROJECT_ID | GitLab project ID. | - | Yes |
| GITLAB_URL | GitLab instance URL. | 'https://gitlab.com' | No |
| VERSION | Release version. | Version in `package.json` | No |
| GITLAB_SOURCE_BRANCH | Source branch for merge request. | 'release/v{VERSION}' | No |
| GITLAB_TARGET_BRANCH | Target branch for merge request. | 'main' | No |
| PUSH_SOURCE_BRANCH | Push source branch or not. | 'true' | No |
| CREATE_MERGE_REQUEST | Create a merge request or not. | 'true' | No |
| GITLAB_MERGE_DESCRIPTION | Merge request description. | Changelog between last two tags | No |
| SSL_VERIFY | SSL verification. | 'false' | No |
