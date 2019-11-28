module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "commonjs": true,
        "jquery": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "$": "readonly",
        "Twilio": "readonly",
        "log": "readonly",
        "axios": "readonly",
        "console": "readonly",
        "document": "readonly",
        "__dirname": "readonly",
        "process": "readonly",
        "swal": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

      "indent": ["error", 4, {"SwitchCase": 1}],

      // Warn against template literal placeholder syntax in regular strings
      "no-template-curly-in-string": 1,

      // Warn if return statements do not either always or never specify values
      "consistent-return": 1,

      // Warn if no return statements in callbacks of array methods
      "array-callback-return": 0,

      // Require the use of === and !==
      "eqeqeq": 2,

      // Warn against unnecessary labels
      "no-extra-label": 1,

      // Disallow leading or trailing decimal points in numeric literals
      "no-floating-decimal": 2,

      // Warn against shorthand type conversions
      "no-implicit-coercion": 1,

      // Warn against function declarations and expressions inside loop statements
      "no-loop-func": 1,

      // Disallow new operators with the Function object
      "no-new-func": 1,

      // Warn against new operators with the String, Number, and Boolean objects
      "no-new-wrappers": 1,

      // Disallow throwing literals as exceptions
      "no-throw-literal": 2,

      // Require using Error objects as Promise rejection reasons
      "prefer-promise-reject-errors": 2,

      // Enforce for loop update clause moving the counter in the right direction
      "for-direction": 2,

      // Enforce return statements in getters
      "getter-return": 2,

      // Disallow await inside of loops
      "no-await-in-loop": 2,

      // Disallow comparing against -0
      "no-compare-neg-zero": 2,

      // Warn against catch clause parameters from shadowing variables in the outer scope
      "no-catch-shadow": 1,

      // Disallow identifiers from shadowing restricted names
      "no-shadow-restricted-names": 2,

      // Enforce return statements in callbacks of array methods
      "callback-return": 2,

      // Require error handling in callbacks
      "handle-callback-err": 2,

      // Warn against string concatenation with __dirname and __filename
      "no-path-concat": 1,

      // Prefer using arrow functions for callbacks
      //   "prefer-arrow-callback": 1,

      // Return inside each then() to create readable and reusable Promise chains.
      // Forces developers to return console logs and http calls in promises.
      "promise/always-return": "error",

      //Enforces the use of catch() on un-returned promises
      "promise/catch-or-return": 2,

      // Warn against nested then() or catch() statements
      "promise/no-nesting": 1
    },
    "plugins": [
      "promise"
    ],
};
