# What Lerna does

Lerna helps to streamline the development, versioning, and publishing of various
closely-related NPM packages you're working on, all within 1 git repo.

# When to use it

Lerna is great when you're maintaining several packages that are closely related
to each other. For instance, Babel now maintains dozens of closely-related NPM 
packages (`@babel/cli`, `@babel/core`, `@babel/preset-react`, etc). It would
be expensive, tedious, and prone to human error to manually link, update, and 
publish related `@babel/` packages.


However, Lerna is one more layer of abstraction and build tools between your
source code and the packaged code you want to publish. This can add a learning
curve and another barrier of entry to any developers wishing to contribute to
your library.

It's also pretty straightforward to port an existing repo into a Lerna monorepo
(read further for a walkthrough). So if you're starting off with a standalone
package, consider skipping Lerna at first.

# Slow Start

Lerna docs: https://github.com/lerna/lerna

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
port our existing `@jrh/react-hooks` project into this repo.

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
npx lerna add @jrh/lerna-hooks --scope=@jrh/lerna-components
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
# will npm-install each package's dependencies.
# if one package we're managing is referencing another,
# lerna will symlink them instead.
npx lerna bootstrap

# optionally, "hoist" each package's shared devDependencies up to the root package.json

npx lerna link convert # alternatively: `npx lerna bootstrap --hoist`
```

Hoisting dependencies up to root level has a few advantages:

1. It reduces `node_modules/` space usage and download time
2. Since your Lerna packages are presumably related, you're likely wanting to
   use the same babel/eslint/etc setups in each package.

With your babel and eslint _versions_ synced, let's take it a step further and
sync our babel and eslint config files as well. We can move a package's 
`babel.config.js` and `.eslintrc.js` files up to the root level and delete the
package-level config files so our folder structure looks like so:

```
my-lerna-repo/
  packages/
    lerna-hooks/
      package.json
    lerna-components/
      package.json
  .eslintrc.js
  babel.config.js
  package.json
  lerna.json
```

Then in each package's `build` script (as defined in their `package.json` files)
we can add a `--root-mode upward` flag to so babel knows to traverse upwards
until it finds the `babel.config.js` file at the root of our repo:

```json
{
  "scripts": {
    "build": "babel ./src --out-dir lib --source-maps --root-mode upward"
  }
}
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
