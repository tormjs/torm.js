"use strict";
const Torm_1 = require('./Torm');
const entity_1 = require('../entity');
class EmptyPropertyError extends Error {
    constructor(entity) {
        super(`Property of ${entity} is empty`);
    }
}
class NoDatabaseConnectError extends Error {
    constructor(op) {
        super(`Should connect to database before ${op} operation`);
    }
}
class EntityCombinator {
    static compose(entityName) {
        if (!Torm_1.Torm.driver) {
            throw new NoDatabaseConnectError(`EntityCombinator.compose()`);
        }
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