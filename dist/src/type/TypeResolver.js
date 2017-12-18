"use strict";
const core_1 = require('../core');
class TypeResolver {
    static resolve(type) {
        switch (type) {
            case 'string':
                {
                    return core_1.SequelizeDriver.sequelize.STRING;
                }
            case 'number':
                {
                    return core_1.SequelizeDriver.sequelize.STRING;
                }
            default:
                {
                    return core_1.SequelizeDriver.sequelize.STRING;
                }
        }
    }
}
exports.TypeResolver = TypeResolver;
//# sourceMappingURL=TypeResolver.js.map