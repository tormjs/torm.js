import { Model } from './';
import { Query } from './Query';
import { Update } from './Update';
export declare class ModelDefinitionError extends Error {
    constructor(modelName: string);
}
/**
 * Torm core
 */
export declare class Torm {
    /**
     * Sequalize sequelize driver instance
     *
     * @private
     * @static
     * @type {SequelizeDriver}
     */
    private static _driver;
    /**
     * Connect to database
     *
     * @static
     * @param {any} args
     */
    static connect(...args: any[]): any;
    /**
     * Get sequelize driver instance
     *
     * @readonly
     * @static
     * @type {*}
     */
    static readonly driver: any;
    /**
     * Table schema Synchronous
     *
     * @static
     * @param {any} args
     * @returns
     */
    static sync<E extends Model>(object: E, ...args: any[]): Promise<E>;
    /**
     * Create a record in specific table
     *
     * @static
     * @param {Object} object
     * @returns
     */
    static create<E extends Model>(object: E): Promise<E>;
    /**
     * Construct a QueryInterface
     *
     * @static
     * @returns
     */
    static query<E extends Model>(clazz: E): Query<E>;
    static update<E extends Model>(clazz: E): Update<E>;
}
