import { Torm } from './Torm';
import { entityPool, Entity, Property } from '../entity';
import { SequelizeDriver } from '../core';


class EmptyPropertyError extends Error {
  constructor(entity: string) {
    super(`Property of ${entity} is empty`);
  }
}

class NoDatabaseConnectError extends Error {
  constructor(op: string) {
    super(`Should connect to database before ${op} operation`);
  }
}

/**
 * Compose all the entities' metadata into single Object
 *
 * @export
 * @class EntityCombinator
 */
export class EntityCombinator {

  /**
   * Compose entity metadata into Sequence Entity
   * if it didn't connect to db, will throw an Error
   *
   * @static
   * @param {string} entityName
   * @returns
   */
  static compose(entityName: string) {
    // no database connection
    if (!Torm.driver) {
      throw new NoDatabaseConnectError(`EntityCombinator.compose()`);
    }

    let entity = entityPool.poll(entityName) as Entity<Property>;

    let properties = {};
    entity.metadata.forEach((prop: Property) => {
      properties[prop.propertyName] = {
        type: prop.propertyType
      };
    });

    if (!properties) throw new EmptyPropertyError(entity.entityName);

    return Torm.driver.define(entity.entityName, properties);

  }
}