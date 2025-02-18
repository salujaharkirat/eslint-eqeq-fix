## What is this?

This is an extension to ESLint [eqeqeq rule](https://eslint.org/docs/latest/rules/eqeqeq) which changes loose equality to strict equality for all the scenarios apart from `undefined` and `null`

## How to use this?

```
npm install --save-dev eslint-plugin-strict-equality

// Add following to eslint.config.js

const strictEquality = require("eslint-plugin-strict-equality");

module.exports = [
    {
        plugins: {
            "strict-equality": strictEquality
        },
        rules: {
            "strict-equality/strict-equality": "error"
        }
    }
];

// Run following
npm run eslint --fix
```

## Why should you use this?

The ESLint [eqeqeq rule](https://eslint.org/docs/latest/rules/eqeqeq) will throw an error if you use ==, complaining that you should convert it to ===. This is a fantastic rule, as the use of == is almost always a bug.

However, when using the --fix flag, ESLint will not automatically fix this for you, unlike most other rules. This is intentional because doing so would break the code was designed to use loose equality. In general, the --fix flag is only meant to change the formatting of code, not the actual execution nature of the code.

This plugin aims to fix all the scenarios but of `undefined` and `null`. 
