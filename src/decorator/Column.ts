import {ColumnTypes} from '../type';
import {entityCollection, Entity, Property} from '../collection'; 

export function Column(typeOrOptions?, options?): Function {
  return function (object: Object, propertyName: string) {
    
    const entityName = object.constructor.name;
    const propertyType = Reflect.getMetadata("design:type", object, propertyName).name;

    let type: ColumnTypes = getPropertyType(propertyType);
    let entityExist: boolean = entityCollection.has(entityName)? true: false;

    let metadata: Property = {
        propertyName: propertyName,
        propertyType: type
    };

    if (entityExist) {
      let entity = entityCollection.find(entityName) as Entity<Property>;
      entity.insert(metadata);
    }
    else {
      let entity = new Entity(entityName);
      entity.insert(metadata);
      // insert to entityCollection
      entityCollection.insert(entity);
    }

  }
}

function getPropertyType(propertyType: string): ColumnTypes {
  let type = propertyType.toLowerCase();
  if (type === 'string') {
    return ColumnTypes.STRING;
  }
  return ColumnTypes.SIMPLE_ARRAY;
}