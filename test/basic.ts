/**
 * Basic operation usage
 */

import 'reflect-metadata';
import { assert } from 'chai'; 
import { Torm, Model, Result } from '../src';
import { Column, Entity } from '../src';
import { col } from '../src';
import { ModelDefinitionError } from './../src/core/Torm';
import { entityPool } from '../src/entity';

describe('Test basic usage', () => {
  let Person;

  before(() => {
    Person = class Person extends Model {
      name: string;
      age: number;
      friends: string;
    };
  });

  it('connect to database successfully', () => {

    let conn = Torm.connect('circle_test', 'ubuntu', '', {
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

    let model = await Torm.sync(Person.prototype);
    assert.typeOf(model, 'object');

  });

  it('should throw an Error if Model is defined incorrectly', async (done) => {
    class Fake extends Model {}
    try {
      await Torm.sync(Fake.prototype);
    } catch (e) {
      if (e instanceof ModelDefinitionError) {
        done();
      }
    }
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
    let count = await Torm.query(Person.prototype).count();
    assert.isNumber(count);
  });

  it('should perform complex query', async () => {
    let rst = await Torm
      .query(Person.prototype)
      .not('name')
      .limit(3)
      .offset(2)
      .find();

    assert.isArray(rst);
    assert.equal(rst.length, 3);

  });

  it('should perform complex expression query syntax', async () => {
    let rst = await Torm
      .query(Person.prototype)
      .where(col('age').lt(0).or().gt(20))
      .findAll();

      assert.isArray(rst);
      
  });

});
