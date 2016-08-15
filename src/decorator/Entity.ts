import {EntityCombinator, sequelizeEntityPool} from '../core';
/**
 * @Entity decorator
 * here we compose all the metadata into SequelizeEntityPool.
 * Everytime, it just composes its own Entity. 
 * 
 * @export
 * @param {*} target
 */
export function Entity(target: any) {
  let entityName: string = (target.name as string).toLowerCase();
  let entity = EntityCombinator.compose(entityName);
  sequelizeEntityPool.put(entity.name, entity);
}