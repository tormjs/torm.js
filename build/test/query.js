"use strict";
require('reflect-metadata');
const chai_1 = require('chai');
const src_1 = require('../src');
const Operator_1 = require('./../src/core/Operator');
describe('Operator based expression query syntax', () => {
    it('col() should returns an new object', () => {
        let ret = src_1.col('test');
        chai_1.assert.isNotNull(ret);
        let ret2 = src_1.col('test');
        chai_1.assert.notEqual(ret, ret2);
    });
    it('should perform eq()', () => {
        let rnd = random();
        chai_1.assert.deepEqual(src_1.col('test').eq(rnd).expr, { test: { '$eq': rnd } });
    });
    it('eq() should support string', () => {
        chai_1.assert.deepEqual(src_1.col('test').eq('test').expr, { test: { $eq: 'test' } });
    });
    it('eq() should support Date', () => {
        let now = new Date();
        chai_1.assert.deepEqual(src_1.col('test').eq(now).expr, { test: { $eq: now } });
    });
    it('should perform ne()', () => {
        let rnd = random();
        chai_1.assert.deepEqual(src_1.col('test').ne(rnd).expr, { test: { $ne: rnd } });
    });
    it('ne() should support string', () => {
        chai_1.assert.deepEqual(src_1.col('test').ne('test').expr, { test: { $ne: 'test' } });
    });
    it('ne() should support Date', () => {
        let now = new Date();
        chai_1.assert.deepEqual(src_1.col('test').ne(now).expr, { test: { $ne: now } });
    });
    it('should perform lt()', () => {
        let rnd = random();
        chai_1.assert.deepEqual(src_1.col('test').lt(rnd).expr, { test: { $lt: rnd } });
    });
    it('lt() should support Date type', () => {
        let now = new Date;
        chai_1.assert.deepEqual(src_1.col('date').lt(now).expr, { date: { $lt: now } });
    });
    it('should perform lte()', () => {
        let rnd = random();
        chai_1.assert.deepEqual(src_1.col('test').lte(rnd).expr, { test: { $lte: rnd } });
    });
    it('lte() should support Date', () => {
        let now = new Date();
        chai_1.assert.deepEqual(src_1.col('test').lte(now).expr, { test: { $lte: now } });
    });
    it('should perform gt', () => {
    });
    it('gt() should support Date type', () => {
    });
    it('and() transformation', () => {
    });
    it('should perform in()', () => {
        let rst = src_1.col('test').in(1, 2, 3, 4, 5);
        let rst1 = src_1.col('test').in([1, 2, 3]);
        chai_1.assert.deepEqual(rst.expr, { '$in': [1, 2, 3, 4, 5] });
        chai_1.assert.deepEqual(rst1.expr, { '$in': [1, 2, 3] });
        try {
            src_1.col('test').in([1, 2], [3, 4], 5);
        }
        catch (error) {
        }
    });
    it('"or" syntax should be more than 2 arguments', () => {
        let rnd1 = random(), rnd2 = random();
        let expression = src_1.col('age').gt(rnd1).or().lt(rnd2);
        let rawExpr = { age: { '$or': { '$gt': rnd1, '$lt': rnd2 } } };
        chai_1.assert.deepEqual(expression.expr, rawExpr);
    });
    it('"or" syntax should throw error if arguments is not enough', (done) => {
        try {
            let expression = src_1.col('age').or().lt(random());
        }
        catch (ex) {
            if (ex instanceof Operator_1.ArgumentsError) {
                done();
            }
        }
    });
    it('or() and and() combinition', () => {
        let rst = src_1.col('test').lt(20).or().gt(30).and().between(0, 100);
        let exp = { test: { '$and': { '$or': { $lt: 20, $gt: 30 }, '$between': [0, 100] } } };
        chai_1.assert.deepEqual(rst.expr, exp);
    });
    it('or() and or() combinition', () => {
        let rst = src_1.col('test').lt(20).or().gt(30).or().eq(30);
        let exp = { test: { '$or': { '$or': { $lt: 20, $gt: 30 }, '$eq': 30 } } };
        chai_1.assert.deepEqual(rst.expr, exp);
    });
    it('and() and or() combinition', () => {
        let rst = src_1.col('test').lt(20).and().gt(30).or().between(100, 101);
        let exp = { test: { '$or': { '$and': { $lt: 20, $gt: 30 }, '$between': [100, 101] } } };
        chai_1.assert.deepEqual(rst.expr, exp);
    });
    it('invalid arguments check', () => {
    });
});
function random() {
    return Math.floor(Math.random() * 100);
}
//# sourceMappingURL=query.js.map