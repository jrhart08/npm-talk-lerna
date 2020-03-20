# npm-talk-react-hooks

This sample makes use of `standard-version` to automate version bumps and the changelog.

Publishing has been made more streamlined with a `build:ci` npm script which
ensures that each step is run in the proper order.

A project with this setup can be feasibly integrated into a CI pipeline.

# `standard-version`

## Description

`standard-version` automates version and CHANGELOG  by looking at git commit messages.

  - For instance, if any commit message since its last release starts with `feat:`, it will do a minor version bump (e.g. `v1.2.3 -> v1.3.0`).

More detailed docs [here](https://www.npmjs.com/package/standard-version).

## Usage
From `~/path/to/your-project/`

```bash
npm i -D standard-version
```

In `~/path/to/your-project/package.json`

```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

From `~/path/to/your-project/`

```bash
npm run release
```

That's it!
  - It works by (git) tagging releases.
  - When you run it, it looks at all commits since the last tagged release.

**NOTE:** This can be part of your CI pipeline! Our team's CI script runs `npm run release` (just like this) after each merge into `master`


# How you can spice this up

By using `standard-version`, we're relying on developers to be responsible and
use appropriate commit messages. There are a few extra tools that can help with
this:

1. Husky (https://github.com/typicode/husky#readme) - Acts as a linter for commit messages (so developers have to use versioning syntax)
2. Commitizen (https://github.com/commitizen/cz-cli) - A commit message wizard
