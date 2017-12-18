"use strict";
class SequelizeModelPool extends Map {
    put(entityName, entity) {
        if (!this.has(entityName))
            this.set(entityName, entity);
    }
    poll(entityName) {
        return this.get(entityName);
    }
}
exports.SequelizeModelPool = SequelizeModelPool;
exports.sequelizeModelPool = new SequelizeModelPool();
//# sourceMappingURL=SequelizeModelPool.js.map