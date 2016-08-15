import {Tamarillo} from './';
import {entityPool, Entity, Property} from '../entity';
import {SequelizeDriver} from '../core';


class EmptyPropertyError extends Error {
  constructor(entity: string) {
    super(`Property of ${entity} is empty`)
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
   * 
   * @static
   * @param {string} entityName
   * @returns
   */
  static compose(entityName: string) {
    let entity = entityPool.poll(entityName) as Entity<Property>;

    let properties = {};
    entity.metadata.forEach( (prop: Property) => {
      properties[prop.propertyName] = {
        type: prop.propertyType
      }
    });

    if (!properties) throw new EmptyPropertyError(entity.entityName);

    return Tamarillo.driver.define(entity.entityName, properties);
    
  }
}