"use strict";
/**
 * Stores all entity of this system in SequalizeEntityPool
 * Type: sequelize.define('user', {});
 *
 * @export
 * @class SequalizeEntityPool
 * @extends {Map<string, T>}
 * @template T
 */
class SequelizeModelPool extends Map {
    /**
     * Put entity into map
     *
     * @param {string} entityName
     * @param {*} entity
     */
    put(entityName, entity) {
        if (!this.has(entityName))
            this.set(entityName, entity);
    }
    /**
     * Poll entity from map
     *
     * @param {string} entityName
     * @returns {T}
     */
    poll(entityName) {
        return this.get(entityName);
    }
}
exports.SequelizeModelPool = SequelizeModelPool;
exports.sequelizeModelPool = new SequelizeModelPool();
//# sourceMappingURL=SequelizeModelPool.js.map