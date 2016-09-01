"use strict";
const core_1 = require('../core');
function Entity(target) {
    let entityName = target.name.toLowerCase();
    let entity = core_1.EntityCombinator.compose(entityName);
    core_1.sequelizeModelPool.put(entity.name, entity);
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map