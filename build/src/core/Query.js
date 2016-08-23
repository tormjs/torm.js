"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const SequelizeDriver_1 = require('./SequelizeDriver');
const SequelizeModelPool_1 = require('./SequelizeModelPool');
const Operator_1 = require('./Operator');
class ClassNotFoundError extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.ClassNotFoundError = ClassNotFoundError;
class WrongMethodInvokedError extends Error {
    constructor(method, instead) {
        super(`The method '${method}' can not be invoked in this scenario, please use ${instead} method instead`);
    }
}
exports.WrongMethodInvokedError = WrongMethodInvokedError;
/**
 * Torm query interface
 *
 * @export
 * @class Query
 * @template E
 */
class Query {
    constructor(clazz) {
        this._clazz = clazz;
        this._attributes = [];
        this._whereConditions = [];
        this._excludes = [];
    }
    /**
     * Count number in specify conditions
     * [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']
     *
     * @param {string} [name]
     * @param {string} [alias]
     * @returns {Promise<number>}
     */
    count(name, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            let sequelize = SequelizeDriver_1.SequelizeDriver.sequelize;
            let modelName = this._clazz.constructor.name.toLowerCase();
            let model = SequelizeModelPool_1.sequelizeModelPool.poll(modelName);
            let param = { attributes: [] };
            // count *
            if (!name || name.trim() === '') {
                name = '*';
            }
            if (!alias || alias.trim() === '') {
                alias = '__alias__';
            }
            param.attributes.push([sequelize.fn('COUNT', sequelize.col(name)), alias]);
            let retval = yield model.findAll(param);
            if (retval.length <= 0)
                return;
            return retval[0].dataValues[alias];
        });
    }
    /**
     * Complex query conditions
     * TODO: complex where query implementations.
     *
     * @param {{}} conditions
     * @returns {Query<E>}
     */
    where(conditions) {
        if (!conditions)
            return this;
        // Compatible for Operator query builder
        if (conditions instanceof Operator_1.Operator)
            conditions = conditions.expr;
        this._whereConditions.push(conditions);
        return this;
    }
    /**
     * Exclude specified columns
     *
     * @returns {Query<E>}
     */
    not(name) {
        if (!name)
            return this;
        this._excludes.push(name);
        return this;
    }
    /**
     * Specify query columns.
     * If invoked, findAll will just query this specified columns instead of query all.
     *
     * @param {string} name
     * @param {string} [alias]
     * @returns {Query<E>}
     */
    column(name, alias) {
        if (!name)
            return this;
        if (!alias)
            this._attributes.push(name);
        else {
            this._attributes.push([name, alias]);
        }
        return this;
    }
    /**
     * Build part conditions, execute and find them.
     * If we invoke column(), where(), not(),
     * we can just use find() to execute
     *
     * @returns {*}
     */
    find() {
        if (!this._clazz)
            throw new ClassNotFoundError('Lack of class property, please pass it in query clause');
        // if column(), not() is invoked, we can just invoke find() to execute query
        if (this._attributes.length <= 0 && this._excludes.length <= 0)
            throw new WrongMethodInvokedError('find()', 'findAll()');
        let modelName = this._clazz.constructor.name.toLowerCase();
        let model = SequelizeModelPool_1.sequelizeModelPool.poll(modelName);
        return model.findAll(this._buildComplexQuery());
    }
    /**
     * Build all conditions, and executes findAll operation
     * if column(), not() is invoked, we can just use find() method.
     * @returns {Result<E>}
     */
    findAll() {
        if (!this._clazz)
            throw new ClassNotFoundError('Lack of class property, please pass it in query clause');
        // if column(), not() is invoked, we can just invoke find() to execute query
        if (this._attributes.length > 0 || this._excludes.length > 0)
            throw new WrongMethodInvokedError('findAll()', 'find()');
        // get sequelize model from model pool
        let modelName = this._clazz.constructor.name.toLowerCase();
        let model = SequelizeModelPool_1.sequelizeModelPool.poll(modelName);
        return model.findAll(this._buildQuery());
    }
    /**
     * Basic query composition
     *
     * @private
     * @returns {Object}
     */
    _buildQuery() {
        let params = {};
        if (this._limit) {
            params['limit'] = this._limit;
        }
        if (this._offset) {
            params['offset'] = this._offset;
        }
        // build where query
        this._buildWhere(params);
        return params;
    }
    /**
     * Build comlex query param into one object
     *
     * @private
     * @returns {Object}
     */
    _buildComplexQuery() {
        let params;
        params = { attributes: [] };
        // build attributes
        if (this._attributes.length > 0) {
            this._attributes.forEach(attr => {
                params.attributes.push(attr);
            });
        }
        // build excludes query
        if (this._excludes.length > 0) {
            delete params.attributes;
            params.attributes = {};
            params.attributes['exclude'] = [];
            this._excludes.forEach(ex => {
                params.attributes['exclude'].push(ex);
            });
        }
        if (this._limit || this._offset) {
            if (this._attributes.length === 0)
                // avoid query bug of sequelize
                if (Array.isArray(params.attributes))
                    delete params.attributes;
        }
        if (this._limit) {
            params['limit'] = this._limit;
        }
        if (this._offset) {
            params['offset'] = this._offset;
        }
        // build where query
        this._buildWhere(params);
        return params;
    }
    /**
     * Build where conditions
     *
     * @private
     * @param {Object} param
     */
    _buildWhere(param) {
        if (this._whereConditions.length > 0) {
            let conditions = {};
            this._whereConditions.forEach(cond => {
                Object.keys(cond).forEach(key => {
                    conditions[key] = cond[key];
                });
            });
            param['where'] = conditions;
        }
    }
    /**
     * Limit record number of each query
     *
     * @param {number} num
     * @returns {Query<E>}
     */
    limit(num) {
        if (num)
            this._limit = num;
        return this;
    }
    /**
     * Skip record number
     *
     * @param {number} num
     * @returns {Query<E>}
     */
    offset(num) {
        if (num)
            this._offset = num;
        return this;
    }
    // TODO: order function implementation
    order() {
        throw 'Not Implemented';
    }
    // TODO: raw sql query
    raw() {
        throw 'xxx';
    }
}
exports.Query = Query;
//# sourceMappingURL=Query.js.map