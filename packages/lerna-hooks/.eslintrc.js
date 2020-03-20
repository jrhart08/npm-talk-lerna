module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:lodash/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'linebreak-style': 'off',
  },
};
