## [1.15.13](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.12...v1.15.13) (2025-04-03)


### Bug Fixes

* **git:** increase sleep duration to ensure merge request creation completion ([05d92c6](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/05d92c6e6ae3efbb77c913281ea377b9bf3b780c))

## [1.15.12](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.11...v1.15.12) (2025-04-03)


### Bug Fixes

* **git:** change log level to warn for empty merge request deletion ([63dec72](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/63dec72f7e69ba541fd3d4fe66960f4fc321feb3))

## [1.15.11](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.10...v1.15.11) (2025-04-03)


### Bug Fixes

* **git:** enhance merge request logging and handle empty changes by closing the request ([26acc16](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/26acc16b4cf70f0d21452aba7e9a4e5d21adcc1f))

## [1.15.10](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.9...v1.15.10) (2025-04-03)


### Bug Fixes

* **git:** remove process.exit call from error handling in createMergeRequest function ([64666d9](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/64666d90a1ab31580df208d9b39c5814b59851d1))

## [1.15.9](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.8...v1.15.9) (2025-04-03)


### Bug Fixes

* **git:** improve merge conflict resolution with configurable strategy and enhanced logging ([5e107ad](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/5e107ad2b06e58d6e1d978fb2664c2b98f7d5710))

## [1.15.8](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.7...v1.15.8) (2025-04-03)


### Bug Fixes

* **git:** enhance error handling and improve merge conflict resolution process ([5f67f14](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/5f67f14675de7176cd0434c00aa9343d8ab93d43))

## [1.15.7](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.6...v1.15.7) (2025-04-03)


### Bug Fixes

* **git:** streamline merge request conflict resolution and logging ([743ded6](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/743ded6589b57ea8ec5a25395d1531964972e94d))

## [1.15.6](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.5...v1.15.6) (2025-04-03)


### Bug Fixes

* **git:** allow unrelated histories during merge to resolve conflicts ([3e64372](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/3e64372bc9611857a9f0619ac30703993645e1cd))

## [1.15.5](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.4...v1.15.5) (2025-04-03)


### Bug Fixes

* **git:** increase wait time for merge request creation and log conflict status ([2ed2b19](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/2ed2b196f160beb300de63acb665942cd9b8d45e))
* **git:** log message for disabled auto-merge requests ([f1ede52](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/f1ede52d76debcebeda404535a49a95207a2988d))

## [1.15.4](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.3...v1.15.4) (2025-04-03)


### Bug Fixes

* **git:** filter merge requests to only include opened ones ([9dfd430](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/9dfd4308c52e2f8a4bd5348c9ec443f6a391af4b))

## [1.15.3](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.2...v1.15.3) (2025-04-03)


### Bug Fixes

* **git:** add support for filtering merge requests by labels ([0197142](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/019714202dd22351f1f83e6bdb7bdb6fe1a9a8d3))

## [1.15.2](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.1...v1.15.2) (2025-04-03)


### Bug Fixes

* **git:** change merge request deletion to closing with source branch removal ([8869a7c](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/8869a7c66c5b398ddbae5b42c6aa8186ad84d31f))

## [1.15.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.15.0...v1.15.1) (2025-04-03)


### Bug Fixes

* **git:** log message for no conflicts in merge requests ([f13cd4b](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/f13cd4b69480df67e40eb7d847eed3d052bb1b0e))

# [1.15.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.14.1...v1.15.0) (2025-04-03)


### Features

* **git:** add conflict resolution strategy option for merge requests ([40c8c82](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/40c8c8292d85d29371c0ad40d7dbe532a2b8b54b))

## [1.14.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.14.0...v1.14.1) (2025-04-03)


### Bug Fixes

* **main.ts:** update import statements to use .js extensions for consistency ([f9e82fe](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/f9e82fee1d0b19ec37d92ff3bfb936dddfb354fb))

# [1.14.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.13.2...v1.14.0) (2025-04-03)


### Features

* **git:** add support for labels in merge requests ([7673c99](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/7673c99fb4c3455043d5338cb1d7f81f25bd70e0))

## [1.13.2](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.13.1...v1.13.2) (2025-04-03)


### Bug Fixes

* **git:** enhance logging for merge request creation and deletion ([a6a007e](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/a6a007e7f2cf331f7e2eb2cae85bb7e9d2e765b0))

## [1.13.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.13.0...v1.13.1) (2025-04-03)


### Bug Fixes

* **index.ts:** rename auto-merge option to autoMerge for consistency ([9ddd227](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/9ddd2279fe94d8ea20f1aeae558ba6d3386441f9))

# [1.13.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.8...v1.13.0) (2025-04-03)


### Features

* **git:** add auto-merge option for merge requests ([cb9406d](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/cb9406d4c66727027c9608ff2369dc61992cdbda))
* **git:** add option to delete existing merge requests with the same target branch ([43b8936](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/43b8936eef7fea275efe84635ff9090d9d2fd7cb))

## [1.12.8](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.7...v1.12.8) (2024-1-29)


### Bug Fixes

* **package.json:** updated git breaker to 39.33.2 ([e16f347](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/e16f3470fdec07f0849d61a7a6c673538207c3ce))

## [1.12.7](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.6...v1.12.7) (2023-10-31)


### Bug Fixes

* :technologist: fixed changelog diff bug ([e68ab19](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/e68ab199cdb34d6f717122e9e46e64274a379cb6))

## [1.12.6](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.5...v1.12.6) (2023-10-31)


### Bug Fixes

* :technologist: fixed changelog diff bug ([c8302c4](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/c8302c43dbee9e34c40c103f1465f96aa37c45f9))

## [1.12.5](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.4...v1.12.5) (2023-10-31)


### Bug Fixes

* :technologist: fixed changelog diff ([95461dc](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/95461dc4c7b0f67ce7c3aa6b0d0c37c7aa7ca02e))

## [1.12.4](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.3...v1.12.4) (2023-10-24)


### Bug Fixes

* added special case where ours version doesnt exist ([540e03f](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/540e03f37aa398f2dbbee6041bb8b1a0d7075ffd))

## [1.12.3](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.2...v1.12.3) (2023-10-24)


### Bug Fixes

* added merge target into source logic ([38846db](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/38846db70d8e3cdeee005810194b9990b119ec47))

## [1.12.2](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.1...v1.12.2) (2023-10-24)


### Bug Fixes

* removed comment ([c9e9dff](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/c9e9dff0973579586349ca4be9ae0e36306c7987))

## [1.12.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.12.0...v1.12.1) (2023-10-22)


### Bug Fixes

* fixed a bug that prevented checking out files from gitlab to preserve their state ([3cf7a0b](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/3cf7a0bd4a091544d032a207d06a73e07c372b3d))

# [1.12.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.11.2...v1.12.0) (2023-10-22)


### Features

* added fetchAll step ([b21873f](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/b21873f318963f0e98f9402eeb14329c2dca0fca))

## [1.11.2](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.11.1...v1.11.2) (2023-10-22)


### Bug Fixes

* added recursive file deletion ([8ccf15a](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/8ccf15a6ff6b4253b5b3553b18d9707620a8708c))

## [1.11.1](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.11.0...v1.11.1) (2023-10-22)


### Bug Fixes

* added a failsafe when the target branch doesn't exist locally, the entire changelog is returned ([bfbf99a](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/bfbf99a57df024d27d4850becfd26a17e269d399))

# [1.11.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.10.0...v1.11.0) (2023-10-18)


### Bug Fixes

* added docs to functions and variables ([892a680](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/892a6804966050c4bd052a9794db304c31af5704))


### Features

* :triangular_flag_on_post: added basic ignore functionality ([aff7ab7](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/aff7ab704e0cc5afbea7419ccd7181f5a39bf1a3))

# [1.10.0](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.16...v1.10.0) (2023-10-14)


### Features

* added ignore parameter to config and commandline (not working yet) ([438e41e](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/438e41e75b904a865a0deab7e4209509d7ef8c49))

## [1.9.16](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.15...v1.9.16) (2023-10-07)


### Bug Fixes

* added --unshallow to fetch ([1176cdd](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/1176cddc2b577569d1c48d240afb113fe8166529))

## [1.9.15](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.14...v1.9.15) (2023-10-06)


### Bug Fixes

* updated changelogoutputpath default ([d9018f8](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/d9018f80e3d830d845a72671887de49aa0b9306b))

## [1.9.14](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.13...v1.9.14) (2023-10-06)


### Bug Fixes

* removed debugging ([3056e44](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/3056e447bc5f14ea4dce2ed4f434d960b73113df))

## [1.9.13](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.12...v1.9.13) (2023-10-06)


### Bug Fixes

* added fetch all and debugging ([495fda7](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/495fda775a4c4726c6a16d4c4398c79b650dde27))

## [1.9.12](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.11...v1.9.12) (2023-10-06)


### Bug Fixes

* removed safe dir ([c07900a](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/c07900ac2422763302b3a751f847ca21d877d1a6))

## [1.9.11](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.10...v1.9.11) (2023-10-06)


### Bug Fixes

* changed safe dir ([bc868c1](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/bc868c1049a794b323d035b0fb399380b2478f5f))

## [1.9.10](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.9...v1.9.10) (2023-10-06)


### Bug Fixes

* added safe.directory to simplegit config ([f52a04c](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/f52a04ca32905eb3ba33069282cffad6a42693a8))

## [1.9.9](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.8...v1.9.9) (2023-10-06)


### Bug Fixes

* added echos ([2e920e2](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/2e920e2f39f5d1ba01844b275cd0e23de8a58043))

## [1.9.8](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.7...v1.9.8) (2023-10-06)


### Bug Fixes

* moved git config to after ([a926302](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/a9263024ca762238c94ec92d3e9a46379e4d3b46))

## [1.9.7](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.6...v1.9.7) (2023-10-06)


### Bug Fixes

* added git safe dirs ([82bd718](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/82bd7184a2759af93ac2a4fa6ee14e45111d6a5f))

## [1.9.6](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.5...v1.9.6) (2023-10-06)


### Bug Fixes

* updated getconfig ([41ff700](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/41ff700ab22568bd390bd1ec04347ce3b3ef2df4))
* updated ssl_verify in commander ([e260a9b](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/e260a9bbc0cd0155a200330ae205114ab4020331))

## [1.9.5](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.4...v1.9.5) (2023-10-06)


### Bug Fixes

* fixed a bug with mergeDescription ([dfd5341](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/dfd5341f4275bcf49e95e56922a9107ca443a07d))

## [1.9.4](https://github.com/tomerh2001/gitlab-merge-request-pipe/compare/v1.9.3...v1.9.4) (2023-10-06)


### Bug Fixes

* updated pipe.sh ([7cdac6c](https://github.com/tomerh2001/gitlab-merge-request-pipe/commit/7cdac6cc2bc4fdc951b5d18890c4036281e5a5ef))

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
