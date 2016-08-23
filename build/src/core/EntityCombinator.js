"use strict";
const Torm_1 = require('./Torm');
const entity_1 = require('../entity');
class EmptyPropertyError extends Error {
    constructor(entity) {
        super(`Property of ${entity} is empty`);
    }
}
/**
 * Compose all the entities' metadata into single Object
 *
 * @export
 * @class EntityCombinator
 */
class EntityCombinator {
    /**
     * Compose entity metadata into Sequence Entity
     *
     * @static
     * @param {string} entityName
     * @returns
     */
    static compose(entityName) {
        let entity = entity_1.entityPool.poll(entityName);
        let properties = {};
        entity.metadata.forEach((prop) => {
            properties[prop.propertyName] = {
                type: prop.propertyType
            };
        });
        if (!properties)
            throw new EmptyPropertyError(entity.entityName);
        return Torm_1.Torm.driver.define(entity.entityName, properties);
    }
}
exports.EntityCombinator = EntityCombinator;
//# sourceMappingURL=EntityCombinator.js.map