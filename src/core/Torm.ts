import {SequelizeDriver,sequelizeModelPool,Model} from './';
import { Result } from './Result';
import { Query } from './Query';
import { Update } from './Update';

/**
 * Torm core
 */
export class Torm {
    /**
     * Sequalize sequelize driver instance
     *
     * @private
     * @static
     * @type {SequelizeDriver}
     */
    private static _driver:SequelizeDriver;

    /**
     * Connect to database
     *
     * @static
     * @param {any} args
     */
    static connect(...args) {
        this._driver = SequelizeDriver.connect(...args);
    }

    /**
     * Get sequelize driver instance
     *
     * @readonly
     * @static
     * @type {*}
     */
    static get driver():any {
        return this._driver;
    }

    /**
     * Table schema Synchronous
     *
     * @static
     * @param {any} args
     * @returns
     */
    static sync<E extends Model>(object:E, ...args):Promise<E> {
        let objectName = object.constructor.name.toLowerCase();
        let model:any = sequelizeModelPool.poll(objectName);
        return model.sync(...args);
    }

    /**
     * Create a record in specific table
     *
     * @static
     * @param {Object} object
     * @returns
     */
    static create<E extends Model>(object:E):Promise<E> {
        let objectName = object.constructor.name.toLowerCase();
        let model:any = sequelizeModelPool.poll(objectName);
        return model.create(object);
    }

    /**
     * Construct a QueryInterface
     *
     * @static
     * @returns
     */
    static query<E extends Model>(clazz:E):Query<E> {
        return new Result().query(clazz);
    }

    static update<E extends Model>(clazz:E):Update<E> {
        return new Result().update(clazz);
    }

}