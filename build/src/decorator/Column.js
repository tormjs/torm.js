"use strict";
const type_1 = require('../type');
const entity_1 = require('../entity');
function Column(typeOrOptions, options) {
    return function (object, propertyName) {
        const entityName = object.constructor.name.toLowerCase();
        const propertyType = Reflect.getMetadata('design:type', object, propertyName)
            .name.toLowerCase();
        let type = type_1.TypeResolver.resolve(propertyType);
        let metadata = {
            propertyName: propertyName,
            propertyType: type
        };
        if (entity_1.entityPool.has(entityName)) {
            let entity = entity_1.entityPool.poll(entityName);
            entity.insert(metadata);
        }
        else {
            let entity = new entity_1.Entity(entityName);
            entity.insert(metadata);
            entity_1.entityPool.put(entity);
        }
    };
}
exports.Column = Column;
//# sourceMappingURL=Column.js.map