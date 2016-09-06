"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const _1 = require('./');
const Result_1 = require('./Result');
class ModelDefinitionError extends Error {
    constructor(modelName) {
        super(`Model '${modelName} is defined inpropriately'`);
    }
}
exports.ModelDefinitionError = ModelDefinitionError;
class Torm {
    static connect(...args) {
        return !this._driver
            ? this._driver = _1.SequelizeDriver.connect(...args)
            : this._driver;
    }
    static get driver() {
        return this._driver;
    }
    static sync(object, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let objectName = object.prototype.constructor.name.toLowerCase();
            let model = _1.sequelizeModelPool.poll(objectName);
            if (!model) {
                throw new ModelDefinitionError(objectName);
            }
            let rst = yield model.sync(...args);
            return rst;
        });
    }
    static create(object) {
        let objectName = object.constructor.name.toLowerCase();
        let model = _1.sequelizeModelPool.poll(objectName);
        return model.create(object);
    }
    static query(clazz) {
        return new Result_1.Result().query(clazz);
    }
    static update(clazz) {
        return new Result_1.Result().update(clazz);
    }
}
exports.Torm = Torm;
//# sourceMappingURL=Torm.js.map