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
    describe('eq() function', () => {
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
    });
    describe('ne() function', () => {
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
    });
    describe('lt() function', () => {
        it('should perform lt()', () => {
            let rnd = random();
            chai_1.assert.deepEqual(src_1.col('test').lt(rnd).expr, { test: { $lt: rnd } });
        });
        it('lt() should support Date type', () => {
            let now = new Date;
            chai_1.assert.deepEqual(src_1.col('date').lt(now).expr, { date: { $lt: now } });
        });
    });
    describe('lte() function', () => {
        it('should perform lte()', () => {
            let rnd = random();
            chai_1.assert.deepEqual(src_1.col('test').lte(rnd).expr, { test: { $lte: rnd } });
        });
        it('lte() should support Date', () => {
            let now = new Date();
            chai_1.assert.deepEqual(src_1.col('test').lte(now).expr, { test: { $lte: now } });
        });
    });
    describe('gt() function', () => {
        it('should perform gt()', () => {
            let rnd = random();
            chai_1.assert.deepEqual(src_1.col('test').gt(rnd).expr, { test: { $gt: rnd } });
        });
        it('gt() should support Date type', () => {
            let now = new Date();
            chai_1.assert.deepEqual(src_1.col('test').gt(now).expr, { test: { $gt: now } });
        });
    });
    describe('gte() function', () => {
        it('should perform gte()', () => {
            let rnd = random();
            chai_1.assert.deepEqual(src_1.col('test').gte(rnd).expr, { test: { $gte: rnd } });
        });
        it('gte() should support Date type', () => {
            let now = new Date();
            chai_1.assert.deepEqual(src_1.col('test').gte(now).expr, { test: { $gte: now } });
        });
    });
    it('should perform not()', () => {
        chai_1.assert.deepEqual(src_1.col('test').not(true).expr, { test: { $not: true } });
        chai_1.assert.deepEqual(src_1.col('test').not(false).expr, { test: { $not: false } });
    });
    describe('between() function', () => {
        it('should support number and Date array type', () => {
            let nums = Array(2).fill(0).map(_ => random());
            let dates = [new Date('2016-08-31 10:10:00'), new Date('2016-08-31 10:20:00')];
            chai_1.assert.deepEqual(src_1.col('test').between(nums).expr, { test: { $between: nums } });
            chai_1.assert.deepEqual(src_1.col('test').between(dates).expr, { test: { $between: dates } });
        });
        it('should support two parameters', () => {
            chai_1.assert.doesNotThrow(() => {
                src_1.col('test').between(2, 3);
            });
            chai_1.assert.doesNotThrow(() => {
                src_1.col('test').between([2, 3]);
            });
        });
        it('should throw an Error when args length larger than 2', () => {
            chai_1.assert.throws(() => {
                src_1.col('test').between([2, 3, 4]);
            });
        });
    });
    describe('notBetween() function', () => {
        it('should support number and Date array type', () => {
            let nums = Array(2).fill(0).map(_ => random());
            let dates = [new Date('2016-08-31 10:10:00'), new Date('2016-08-31 10:20:00')];
            chai_1.assert.deepEqual(src_1.col('test').notBetween(nums).expr, { test: { $notBetween: nums } });
            chai_1.assert.deepEqual(src_1.col('test').notBetween(dates).expr, { test: { $notBetween: dates } });
        });
        it('should support two parameters', () => {
            chai_1.assert.doesNotThrow(() => {
                src_1.col('test').notBetween(2, 3);
            });
            chai_1.assert.doesNotThrow(() => {
                src_1.col('test').notBetween([2, 3]);
            });
        });
        it('should throw an Error when args length larger than 2', () => {
            chai_1.assert.throws(() => {
                src_1.col('test').notBetween([2, 3, 4]);
            });
        });
    });
    describe('in() function', () => {
        it('should support a bunch of numbers as parameters', () => {
            chai_1.assert.deepEqual(src_1.col('test').in(2, 3, 4, 5, 6).expr, { test: { $in: [2, 3, 4, 5, 6] } });
        });
        it('should support an Array and arrays length should be 1 otherwise an Error will be throwed', () => {
        });
    });
    it('and() transformation', () => {
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
//# sourceMappingURL=operator.js.map