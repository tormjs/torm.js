/**
 * Query specifications
 */

import 'reflect-metadata';
import { assert } from 'chai'; 
import { expr } from '../src';

describe('Operator based expression query syntax', () => {
  it('"or" syntax should be more than 2. arguments', () => {
    let expression = expr('age').gt(0).or().lt(20);
    // console.dir(expression);
  });

});