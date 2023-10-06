## [1.9.3](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.2...v1.9.3) (2023-10-06)


### Bug Fixes

* removed ssh tunnel from index (it's only used in pipe.sh) ([294713c](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/294713cb90283f37c0670ece5913926065bdd3c6))

## [1.9.2](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.1...v1.9.2) (2023-10-06)


### Bug Fixes

* updated commander flags ([35f2c13](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/35f2c137632a4758241bf4d795ac0143147aec83))

## [1.9.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.0...v1.9.1) (2023-10-06)


### Bug Fixes

* added node shebang ([f17061a](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/f17061a0a76917f35ea031537011473a31dc3321))

# [1.9.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.8.2...v1.9.0) (2023-10-06)


### Features

* **package.json:** :building_construction: added bin to package.json to support npx (bunx) ([4b99175](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/4b99175e6e9aaaf2d5137fe2b43698169baab028))

## [1.8.2](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.8.1...v1.8.2) (2023-10-06)


### Bug Fixes

* changed order of operations for accessing ssh folder ([9cd2be3](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/9cd2be3a103f13853c8b39e69ae391c83d8d2c08))

## [1.8.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.8.0...v1.8.1) (2023-10-06)


### Bug Fixes

* applied this official bitbucket fix: https://confluence.atlassian.com/bbkb/unable-to-read-or-use-the-ssh-key-inside-the-custom-pipe-1155473263.html ([6ad0fcb](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/6ad0fcba14cb0243879289ed589b353cc28de256))

# [1.8.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.7.0...v1.8.0) (2023-10-06)


### Features

* **docker:** :closed_lock_with_key: added ssh-tunnel support ([06bf763](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/06bf763272097095f625f3e6b12452cce0b8e102))

# [1.7.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.6.0...v1.7.0) (2023-10-05)


### Features

* :zap: replaced git notes with bitbucket shared folder ([82a7f45](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/82a7f455bce8b8b25351ebe8eaecb63662655e7d))

# [1.6.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.5.4...v1.6.0) (2023-10-05)


### Bug Fixes

* **docker:** :chart_with_upwards_trend: improved dockerfile and added compose ([4162530](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/416253042605fae2326afcade73b12cd0da20a99))


### Features

* updated package.json and deps with commander ([aec49bd](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/aec49bdd779fd00fa5eedc5aa96c612677bf2f73))
* using commander ([d49c841](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/d49c841518816489dd76706529aa2e8ae68a8f32))

## [1.5.4](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.5.3...v1.5.4) (2023-10-05)


### Bug Fixes

* Updated index.ts ([691986e](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/691986e6395a0d9ee7fbb74a27d93a846e07efea))

## [1.5.3](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.5.2...v1.5.3) (2023-10-05)


### Bug Fixes

* Updated dockerfile to use bitbucket clone dir as the cwd ([1941457](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/19414579b9ac1f2892aefa69e6bf281a57ec9ecf))

## [1.5.2](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.5.1...v1.5.2) (2023-10-05)


### Bug Fixes

* Update Dockerfile ([e0dd7ac](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/e0dd7ac8063ea55e81cf301d1af7622831d56639))

## [1.5.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.5.0...v1.5.1) (2023-10-04)


### Bug Fixes

* :zap: changed getChangelog to be based on commits and not tags ([a60cd68](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/a60cd68c9cc2a26edaa240c95f9ab5fedd901e30))

# [1.5.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.4.1...v1.5.0) (2023-10-04)


### Features

* added PUSH_TAGS and ADD_CHANGELOG_NOTE_TO_TAG ([4781c24](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/4781c24bb3ac6d2e43ffe7cc2ac1f26e7cb5c914))

## [1.4.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.4.0...v1.4.1) (2023-10-02)


### Bug Fixes

* :pencil2: fixed a typo ([39e4599](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/39e4599c7a1357c396c6dfba6fafa1e24ab54f1b))

# [1.4.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.3.0...v1.4.0) (2023-10-02)


### Features

* :sparkles: merge description will now use the changelog diff between the last local tag and last gitlab tag ([6fd4cae](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/6fd4cae35a3e28bdaa6c0608ba5e128943f52faa))

# [1.3.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.2.4...v1.3.0) (2023-10-02)


### Features

* :lipstick: added pino logger ([e9d010e](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/e9d010ea6293d9b721acaf2a7d3e305c1e850ff8))

## [1.2.4](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.2.3...v1.2.4) (2023-10-02)


### Bug Fixes

* **docker:** :technologist: added back workdir at /repo ([1c26155](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/1c26155deed00c84916f5500c4bde20f26db71fe))

## [1.2.3](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.2.2...v1.2.3) (2023-10-02)


### Bug Fixes

* **docker:** removed workdir from docker since bitbucket pipelines overrides the target dir ([a41b0a8](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/a41b0a8edc1bac496a6edfd484bb95476c8df718))

## [1.2.2](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.2.1...v1.2.2) (2023-10-02)


### Bug Fixes

* updated dockerfile ([3b82974](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/3b82974b3547272b33459766c09e29c2d945f0ef))

## [1.2.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.2.0...v1.2.1) (2023-10-02)


### Bug Fixes

* :lipstick: applied xo auto fixes ([c933311](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/c93331183b4d294871f69114265126094bd41b3c))

# [1.2.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.1.0...v1.2.0) (2023-10-02)


### Features

* **docker:** :arrow_up: changed dockerfile to alpine ([725c1ea](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/725c1ea056e44f6876c27815e1b6d5239104ce7a))

# [1.1.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.0.0...v1.1.0) (2023-10-02)


### Bug Fixes

* **docker:** fixed a typo in Dockerfile ([af9e630](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/af9e6309ca2e4c65d5b05625853ffd9dbca51608))


### Features

* updated Dockerfile ([91561a1](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/91561a1b35a915afc23f65348453d078efb9a6a7))

# [1.1.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.0.0...v1.1.0) (2023-10-02)


### Features

* updated Dockerfile ([91561a1](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/91561a1b35a915afc23f65348453d078efb9a6a7))

# 1.0.0 (2023-10-02)
