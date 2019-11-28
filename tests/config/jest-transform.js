// Jest uses Flow to generate source maps to optimize
// test performance. However, it makes debugging in
// test files difficult.

// This transformer allows us to debug tests properly.

// See the following:
// https://github.com/jest-community/vscode-jest/issues/372
// https://github.com/flowtype/flow-remove-types/issues/42
// https://flow.org/en/docs/tools/flow-remove-types/

var flowRemoveTypes = require('flow-remove-types');
module.exports = {
    process(src, filename) {
        return flowRemoveTypes(src).toString();
    },
};