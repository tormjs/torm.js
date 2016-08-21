import {TypeResolver} from '../type'
import {entityPool, Entity, Property} from '../entity';

/**
 * Decorator for @Column, represented for a Column of a Table
 *
 * @export
 * @param {any} [typeOrOptions]
 * @param {any} [options]
 * @returns {Function}
 */
export function Column(typeOrOptions?, options?):Function {
  return function (object:Object, propertyName:string) {

    const entityName = object.constructor.name.toLowerCase();
    const propertyType = (Reflect.getMetadata("design:type", object, propertyName)
      .name as string).toLowerCase();

    let type = TypeResolver.resolve(propertyType);

    let metadata:Property = {
      propertyName: propertyName,
      propertyType: type
    };

    if (entityPool.has(entityName)) {
      let entity = entityPool.poll(entityName) as Entity<Property>;
      entity.insert(metadata);
    }
    else {
      let entity = new Entity(entityName);
      entity.insert(metadata);
      // insert to entityCollection
      entityPool.put(entity);
    }

  }
}