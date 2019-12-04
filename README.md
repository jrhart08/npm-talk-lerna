# Quick Start

This repo contains a more complete example already, but you can easily do this
from a new folder. Let's do the following:

0. Create a new Lerna monorepo folder

```bash
# or wherever you prefer
cd ~/projects

mkdir my-lerna-repo

cd my-lerna-repo
```

1. Initialize Lerna:

```bash
# from ~/projects/my-lerna-repo/
npx lerna init
```

This will create a few files/folders:

```
my-lerna-repo/
  packages/
    (empty)
  lerna.json
  package.json
```

Let's set the version to `1.0.0` in package.json:

```json
{
  "version": "1.0.0"
}
```

# Adding packages

At this point, you have 2 ways of adding packages:
  1. Adding a brand new one via `lerna create`
  2. Porting one of your existing repos (in case you're wanting to consolidate
     your existing libraries)

Let's do 1 of each. We'll create a new `@jrh/lerna-components` package and we'll
port our existing `@jrh/lerna-hooks` project into this repo.

**Step 1:** Create the new package:

```bash
# from ~/projects/my-lerna-repo/

# will create a `packages/lerna-components/` folder
npx lerna create @jrh/lerna-components
```

**Step 2:** Port over our existing repo
```bash
# from ~/projects/my-lerna-repo/

# do a lightweight clone and delete the .git folder
git clone --depth=1 --branch=master git@github.com:jrhart08/npm-talk-react-hooks.git ./packages/lerna-hooks

rm -rf ./packages/lerna-hooks/.git
```

And let's go into its `package.json` and change the package name to `@jrh/lerna-hooks`

# Working on packages

We'll want our `lerna-components` project to reference `lerna-hooks`, so let's
have lerna symlink it.

```bash
npx lerna add @jrh/react-hooks --scope=@jrh/react-components
```

Your `lerna-components/package.json` file should now look something like this:
```json
{
  "dependencies": {
    "@jrh/lerna-hooks": "^1.2.0"
  }
}
```

And if you look under `lerna-components/node_modules/` you'll see that
`@jrh/lerna-hooks` is a symlink pointing to `packages/lerna-hooks`.

Now we can install dependencies for our packages:

```bash
npx lerna bootstrap
```

From here we can get back to coding! Make a code change to the `lerna-hooks` package
and git add/commit it. Afterwards, run the following:

```bash
# build our packages
# `lerna run XYZ` will run the `XYZ` npm script for each package that has it
npx lerna run build

# The --registry flag is needed here.
# The lerna team made a conscious decision to ignore local the .npmrc because reasons.
# Alternatively, set the registry in `lerna.json`.

# make sure your verdaccio server is running!
npx lerna publish --registry=http://localhost:4873
```

Lerna will ask which kind of update you want, so select the appropriate one.
