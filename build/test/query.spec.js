"use strict";
require('reflect-metadata');
const chai_1 = require('chai');
const src_1 = require('../src');
const Operator_1 = require('./../src/core/Operator');
describe('Operator based expression query syntax', () => {
    it('"or" syntax should be more than 2 arguments', () => {
        let expression = src_1.expr('age').gt(0).or().lt(20);
        let rawExpr = { age: { '$or': { '$gt': 0, '$lt': 20 } } };
        chai_1.assert.deepEqual(expression.expr, rawExpr);
    });
    it('"or" syntax should throw error if arguments is not enough', (done) => {
        try {
            let expression = src_1.expr('age').or().lt(20);
        }
        catch (ex) {
            if (ex instanceof Operator_1.ArgumentsError) {
                done();
            }
        }
    });
});
//# sourceMappingURL=query.spec.js.map