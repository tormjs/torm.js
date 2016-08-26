/**
 * Query specifications
 */

import 'reflect-metadata';
import { assert } from 'chai'; 
import { col } from '../src';
import { ArgumentsError } from './../src/core/Operator';

describe('Operator based expression query syntax', () => {
  
  it('"or" syntax should be more than 2 arguments', () => {
    let expression = col('age').gt(0).or().lt(20);
    let rawExpr = { age: { '$or': { '$gt': 0, '$lt': 20 } } };
    assert.deepEqual(expression.expr, rawExpr);
  });

  it('"or" syntax should throw error if arguments is not enough', (done) => {
    try {
      let expression = col('age').or().lt(20);
    } catch (ex) {
      if (ex instanceof ArgumentsError) {
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
    let rst = col('test').in(1, 2, 3, 4, 5);
    let rst1 = col('test').in([1, 2, 3]);
    assert.deepEqual(rst.expr, { '$in': [ 1, 2, 3, 4, 5 ] });
    assert.deepEqual(rst1.expr, { '$in': [ 1, 2, 3 ] });

    // invalid invoke
    try {
      col('test').in([1, 2], [3, 4], 5);
    } catch (error) {

    }
  });

  it('or() and and() combinition', () => {
    let rst = col('test').lt(20).or().gt(30).and().between(0, 100)
    let exp = { test: { '$and': { '$or': {$lt: 20, $gt: 30}, '$between': [0, 100]} } };
    assert.deepEqual(rst.expr, exp);
  });

  it('or() and or() combinition', () => {
    let rst = col('test').lt(20).or().gt(30).or().eq(30);
    let exp = { test: { '$or': { '$or': {$lt: 20, $gt: 30}, '$eq': 30 } } };
    assert.deepEqual(rst.expr, exp);
  });

  it('and() and or() combinition', () => {
    let rst = col('test').lt(20).and().gt(30).or().between(100, 101);
    let exp = { test: { '$or': { '$and': {$lt: 20, $gt: 30}, '$between': [100, 101] } } };
    assert.deepEqual(rst.expr, exp);
  });

});