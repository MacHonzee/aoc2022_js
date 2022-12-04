module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020
    },
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-unused-vars": [
          "warn",
        ]
    }
};
