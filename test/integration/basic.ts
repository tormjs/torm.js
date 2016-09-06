/**
 * Basic operation usage
 */

import 'reflect-metadata';
import { assert } from 'chai'; 
import { Torm, Model, Result } from '../../src';
import { Column, Entity } from '../../src';
import { col } from '../../src';
import { ModelDefinitionError } from '../../src/core/Torm';
import { entityPool } from '../../src/entity';
import { ModelNotFoundError } from './../../src/core/Query';

// CI configuration
const database = {
  usr: process.env.CI ? 'ubuntu' : 'root',
  table: process.env.CI ? 'circle_test' : 'orm'
};

describe('Test basic usage', () => {
  // pre-define
  class Person extends Model {
      name: string;
      age: number;
      friends: string;
  }

  it('connect to database successfully', () => {

    let conn = Torm.connect(database.table, database.usr, '', {
      host: 'localhost',
      dialect: 'mysql'
    });

    assert.isNotNull(conn);

  });

  it('should define a model through decorator', async () => {

    @Entity
    class Person extends Model {
      @Column()
      name: string;

      @Column()
      age: number;

      @Column()
      friends: string;
    }

    let model = await Torm.sync(Person);
    assert.typeOf(model, 'object');

  });

  it('should throw an Error if Model is defined incorrectly', async () => {
    class Fake extends Model {}
    
    try {
      await Torm.sync(Fake);
    } catch (ex) {
      if (ex instanceof ModelDefinitionError)
        return;
    }
    assert.fail();
  });

  it('should create an entity correctly', async () => {

    let person = new Person();
    person.name = 'Eric';
    person.age = 1;
    person.friends = 'Vincent';

    let rst = await Torm.create(person);
    assert.isNotNull(rst);

  });

});

describe('Query testing', () => {
  let Person;

  before(() => {
    Person = class Person extends Model {
      name: string;
      age: number;
      friends: string;
    };
  });

  it('should perform basic count', async () => {
    let count = await Torm.query(Person).count();
    assert.isNumber(count);
  });

  it('should perform complex query', async () => {
    let rst = await Torm
      .query(Person)
      .not('name')
      .limit(3)
      .offset(2)
      .find();

    assert.isArray(rst);

  });

  it('should perform complex expression query syntax', async () => {
    let rst = await Torm
      .query(Person)
      .where(col('age').lt(0).or().gt(20))
      .findAll();

    assert.isArray(rst);
      
  });

  describe('should throw Error is model is not found', () => {
    class Fake extends Model {}

    it('#count()', async () => {
      try {
        await Torm.query(Fake).count();
      } catch (ex) {
        return;
      }
      assert.fail();

    });

    it('#find()', async () => {
      try {
        await Torm.query(Fake)
          .column('age')
          .where(col('age').lte(20))
          .find();

      } catch (ex) {
        return;
      }
      assert.fail();

    });

    it('#findAll()', async () => {
      try {
        await Torm.query(Fake)
          .where(col('age').lte(20))
          .findAll();

      } catch (ex) {
        return;
      }
      assert.fail();

    });

  });

});
