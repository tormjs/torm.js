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
    it('should perform eq', () => {
    });
    it('should perform ne', () => {
    });
    it('should perform lte', () => {
    });
    it('should perform lt', () => {
    });
    it('should perform gt', () => {
    });
    it('and() transformation', () => {
    });
    it('should perform in', () => {
        let rst = src_1.expr('test').in(1, 2, 3, 4, 5);
        let rst1 = src_1.expr('test').in([1, 2, 3]);
        chai_1.assert.deepEqual(rst.expr, { '$in': [1, 2, 3, 4, 5] });
        chai_1.assert.deepEqual(rst1.expr, { '$in': [1, 2, 3] });
        try {
            src_1.expr('test').in([1, 2], [3, 4], 5);
        }
        catch (error) {
        }
    });
    it('or() and and() combinition', () => {
        let rst = src_1.expr('test').lt(20).or().gt(30).and().between(0, 100);
    });
});
//# sourceMappingURL=query.spec.js.map