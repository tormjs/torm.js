"use strict";
const _1 = require('./');
const Result_1 = require('./Result');
class ModelDefinitionError extends Error {
    constructor(modelName) {
        super(`Model '${modelName} is defined inpropriately'`);
    }
}
exports.ModelDefinitionError = ModelDefinitionError;
/**
 * Torm core
 */
class Torm {
    /**
     * Connect to database
     *
     * @static
     * @param {any} args
     */
    static connect(...args) {
        return this._driver = _1.SequelizeDriver.connect(...args);
    }
    /**
     * Get sequelize driver instance
     *
     * @readonly
     * @static
     * @type {*}
     */
    static get driver() {
        return this._driver;
    }
    /**
     * Table schema Synchronous
     *
     * @static
     * @param {any} args
     * @returns
     */
    static sync(object, ...args) {
        let objectName = object.constructor.name.toLowerCase();
        let model = _1.sequelizeModelPool.poll(objectName);
        let rst;
        try {
            rst = model.sync(...args);
        }
        catch (ex) {
            if (ex instanceof TypeError) {
                throw new ModelDefinitionError(objectName);
            }
        }
        return rst;
    }
    /**
     * Create a record in specific table
     *
     * @static
     * @param {Object} object
     * @returns
     */
    static create(object) {
        let objectName = object.constructor.name.toLowerCase();
        let model = _1.sequelizeModelPool.poll(objectName);
        return model.create(object);
    }
    /**
     * Construct a QueryInterface
     *
     * @static
     * @returns
     */
    static query(clazz) {
        return new Result_1.Result().query(clazz);
    }
    static update(clazz) {
        return new Result_1.Result().update(clazz);
    }
}
exports.Torm = Torm;
//# sourceMappingURL=Torm.js.map