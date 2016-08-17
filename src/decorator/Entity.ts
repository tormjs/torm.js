import {EntityCombinator, sequelizeModelPool} from '../core';
/**
 * Decorator for @Entity
 * here we compose all the metadata into SequelizeEntityPool.
 * Everytime, it just composes its own Entity. 
 * 
 * @export
 * @param {*} target
 */
export function Entity(target: Function) {
  let entityName: string = target.name.toLowerCase();
  let entity = EntityCombinator.compose(entityName);
  sequelizeModelPool.put(entity.name, entity);
}