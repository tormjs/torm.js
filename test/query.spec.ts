/**
 * Query specifications
 */

import 'reflect-metadata';
import { assert } from 'chai'; 
import { expr } from '../src';
import { ArgumentsError } from './../src/core/Operator';

describe('Operator based expression query syntax', () => {
  
  it('"or" syntax should be more than 2 arguments', () => {
    let expression = expr('age').gt(0).or().lt(20);
    let rawExpr = { age: { '$or': { '$gt': 0, '$lt': 20 } } };
    assert.deepEqual(expression.expr, rawExpr);
  });

  it('"or" syntax should throw error if arguments is not enough', (done) => {
    try {
      let expression = expr('age').or().lt(20);
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



});