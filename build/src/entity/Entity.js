"use strict";
class PropertyAlreadyExistError extends Error {
    constructor(propsName) {
        super(`Property ${propsName} is already exist in current entity`);
    }
}
exports.PropertyAlreadyExistError = PropertyAlreadyExistError;
class PropertyNotFoundError extends Error {
    constructor(propName) {
        super(`Property ${propName} is not found`);
    }
}
exports.PropertyNotFoundError = PropertyNotFoundError;
/**
 * Stores column metadata
 *
 * @export
 * @class ColumnCollection
 * @extends {Array<T>}
 * @template T
 */
class Entity {
    constructor(entityName) {
        this.entityName = entityName;
        this._metadata = [];
    }
    get metadata() {
        return this._metadata;
    }
    insert(column) {
        // find if there exists
        if (this._hasProperty(column))
            throw new PropertyAlreadyExistError(column.propertyName);
        this._metadata.push(column);
    }
    find(propName) {
        const property = this._metadata.find(property => property.propertyName === propName);
        if (!property)
            throw new PropertyNotFoundError(propName);
        return property;
    }
    _hasProperty(column) {
        return !!this._metadata.find(prop => prop.propertyName === column.propertyName);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map