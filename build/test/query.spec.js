"use strict";
require('reflect-metadata');
const src_1 = require('../src');
describe('Operator based expression query syntax', () => {
    it('"or" syntax should be more than 2. arguments', () => {
        let expression = src_1.expr('age').gt(0).or().lt(20);
    });
});
//# sourceMappingURL=query.spec.js.map