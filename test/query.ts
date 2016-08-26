/**
 * Query specifications
 */

import 'reflect-metadata';
import { assert } from 'chai'; 
import { col } from '../src';
import { ArgumentsError } from './../src/core/Operator';

describe('Operator based expression query syntax', () => {

  it('col() should returns an new object', () => {
    let ret = col('test');
    assert.isNotNull(ret);
    let ret2 = col('test');
    assert.notEqual(ret, ret2);
  });

  it('should perform eq()', () => {
    let rnd = random();
    assert.deepEqual(
      col('test').eq(rnd).expr,
      {test: { '$eq': rnd}}
    );
  });

  it('eq() should support string', () => {
    assert.deepEqual(
      col('test').eq('test').expr,
      {test: {$eq: 'test'}}
    );
  });

  it('eq() should support Date', () => {
    let now = new Date();
    assert.deepEqual(
      col('test').eq(now).expr,
      {test: {$eq: now}}
    );
  });

  it('should perform ne()', () => {
    let rnd = random();
    assert.deepEqual(
      col('test').ne(rnd).expr,
      {test: {$ne: rnd}}
    );
  });

  it('ne() should support string', () => {
    assert.deepEqual(
      col('test').ne('test').expr,
      {test: {$ne: 'test'}}
    );
  });

  it('ne() should support Date', () => {
    let now = new Date();
    assert.deepEqual(
      col('test').ne(now).expr,
      {test: {$ne: now}}
    );
  });

  it('should perform lt()', () => {
    let rnd = random();
    assert.deepEqual(
      col('test').lt(rnd).expr,
      {test: {$lt: rnd}}
    );
  });

  it('lt() should support Date type', () => {
    let now = new Date;
    assert.deepEqual(
      col('date').lt(now).expr,
      {date: {$lt: now}}
    );
  });

  it('should perform lte()', () => {
    let rnd = random();
    assert.deepEqual(
      col('test').lte(rnd).expr,
      {test: {$lte: rnd}}
    );
  });

  it('lte() should support Date', () => {
    let now = new Date();
    assert.deepEqual(
      col('test').lte(now).expr,
      {test: {$lte: now}}
    );
  });

  it('should perform gt', () => {

  });

  it('gt() should support Date type', () => {

  });

  it('and() transformation', () => {

  });

  it('should perform in()', () => {
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

  it('"or" syntax should be more than 2 arguments', () => {
    let rnd1 = random(), rnd2 = random();
    let expression = col('age').gt(rnd1).or().lt(rnd2);
    let rawExpr = { age: { '$or': { '$gt': rnd1, '$lt': rnd2 } } };
    assert.deepEqual(expression.expr, rawExpr);
  });

  it('"or" syntax should throw error if arguments is not enough', (done) => {
    try {
      let expression = col('age').or().lt(random());
    } catch (ex) {
      if (ex instanceof ArgumentsError) {
        done();
      }
    }
  });

  it('or() and and() combinition', () => {
    let rst = col('test').lt(20).or().gt(30).and().between(0, 100);
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

  /**
   * check every methods, test if invalid arguments will throw Error or not
   */
  it('invalid arguments check', () => {

  });

});

function random() {
  return Math.floor(Math.random() * 100);
}