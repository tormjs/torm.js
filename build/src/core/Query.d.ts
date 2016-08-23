/// <reference types="chai" />
import { Model } from './SequelizeModel';
import { Result } from './Result';
export declare class ClassNotFoundError extends Error {
    constructor(msg: string);
}
export declare class WrongMethodInvokedError extends Error {
    constructor(method: string, instead: string);
}
/**
 * Designed API for query operations
 *
 * @interface QueryApi
 */
export interface IQuery<E extends Model> {
    /**
     * Build all conditions, and executes findAll operation
     *
     * @returns {Result<E>}
     */
    findAll(): Result<E>;
    /**
     * Build part conditions, execute and find them.
     * If we invoke column(), not(),
     * we can just use find() to execute
     *
     * @returns {*}
     */
    find(): any;
    /**
     * Specify query columns.
     * If invoked, findAll will just query this specified columns instead of query all.
     *
     * @param {string} name
     * @param {string} [alias]
     * @returns {Query<E>}
     */
    column(name: string, alias?: string): Query<E>;
    /**
     * Exclude specified columns
     *
     * @returns {Query<E>}
     */
    not(name: string): Query<E>;
    /**
     * Complex query
     *
     * @param {Object} conditions
     * @returns {Query<E>}
     */
    where(conditions: Object): Query<E>;
    /**
     * Count number in specify conditions
     * [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']
     *
     * @param {string} column
     * @param {string} [alias]
     * @returns {Query<E>}
     */
    count(name: string, alias?: string): Promise<number>;
    /**
     * Limit record number of each query
     *
     * @param {number} num
     * @returns {Query<E>}
     */
    limit(num: number): Query<E>;
    /**
     * Skip record number
     *
     * @param {number} num
     * @returns {Query<E>}
     */
    offset(num: number): Query<E>;
    /**
     * Order implementation
     *
     * @returns {Query<E>}
     */
    order(): Query<E>;
    /**
     * Raw SQL query
     *
     * @returns {Result<E>}
     */
    raw(): Result<E>;
}
/**
 * Torm query interface
 *
 * @export
 * @class Query
 * @template E
 */
export declare class Query<E extends Model> implements IQuery<E> {
    /**
     * Sequelize entity reference
     *
     * @private
     * @type {E}
     */
    private _clazz;
    private _attributes;
    private _whereConditions;
    private _excludes;
    private _limit;
    private _offset;
    constructor(clazz: E);
    /**
     * Count number in specify conditions
     * [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']
     *
     * @param {string} [name]
     * @param {string} [alias]
     * @returns {Promise<number>}
     */
    count(name?: string, alias?: string): Promise<number>;
    /**
     * Complex query conditions
     * TODO: complex where query implementations.
     *
     * @param {{}} conditions
     * @returns {Query<E>}
     */
    where(conditions: Object): Query<E>;
    /**
     * Exclude specified columns
     *
     * @returns {Query<E>}
     */
    not(name: string): Query<E>;
    /**
     * Specify query columns.
     * If invoked, findAll will just query this specified columns instead of query all.
     *
     * @param {string} name
     * @param {string} [alias]
     * @returns {Query<E>}
     */
    column(name: string, alias?: string): Query<E>;
    /**
     * Build part conditions, execute and find them.
     * If we invoke column(), where(), not(),
     * we can just use find() to execute
     *
     * @returns {*}
     */
    find(): any;
    /**
     * Build all conditions, and executes findAll operation
     * if column(), not() is invoked, we can just use find() method.
     * @returns {Result<E>}
     */
    findAll(): Result<E>;
    /**
     * Basic query composition
     *
     * @private
     * @returns {Object}
     */
    private _buildQuery();
    /**
     * Build comlex query param into one object
     *
     * @private
     * @returns {Object}
     */
    private _buildComplexQuery();
    /**
     * Build where conditions
     *
     * @private
     * @param {Object} param
     */
    private _buildWhere(param);
    /**
     * Limit record number of each query
     *
     * @param {number} num
     * @returns {Query<E>}
     */
    limit(num: number): Query<E>;
    /**
     * Skip record number
     *
     * @param {number} num
     * @returns {Query<E>}
     */
    offset(num: number): Query<E>;
    order(): Query<E>;
    raw(): Result<E>;
}
