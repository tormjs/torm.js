"use strict";
class EntityAlreadyExistError extends Error {
    constructor(propsName) {
        super(`Entity ${propsName} is already exist in current database`);
    }
}
exports.EntityAlreadyExistError = EntityAlreadyExistError;
class EntityNotFoundError extends Error {
    constructor(entityName) {
        super(`Entity ${entityName} is not found`);
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
class EntityPool extends Map {
    put(entity) {
        if (this._hasProperty(entity))
            throw new EntityAlreadyExistError(entity.entityName);
        this.set(entity.entityName, entity);
    }
    poll(entityName) {
        const entity = this.get(entityName);
        if (!entity) {
            throw new EntityNotFoundError(entityName);
        }
        return entity;
    }
    _hasProperty(entity) {
        return this.has(entity.entityName);
    }
}
exports.EntityPool = EntityPool;
exports.entityPool = new EntityPool();
//# sourceMappingURL=EntityPool.js.map