import { SequelizeDriver, sequelizeModelPool, Model } from './';
import { Result } from './Result';
import { Query } from './Query';
import { Update } from './Update';

export class ModelDefinitionError extends Error {
  constructor(modelName: string) {
    super(`Model '${modelName} is defined inpropriately'`);
  }
}
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
  private static _driver: SequelizeDriver;

  /**
   * Connect to database, if connect multiple times,
   * it'll return the first connection
   *
   * @static
   * @param {any} args
   */
  static connect(...args) {
    return !this._driver
      ? this._driver = SequelizeDriver.connect(...args)
      : this._driver;
  }

  /**
   * Get sequelize driver instance
   *
   * @readonly
   * @static
   * @type {*}
   */
  static get driver(): any {
    return this._driver;
  }

  /**
   * Table schema Synchronous
   *
   * @static
   * @param {any} args
   * @returns
   */
  static async sync<E extends Model>(object: { prototype: E }, ...args): Promise<E> {
    let objectName = object.prototype.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(objectName);

    if (!model) {
      throw new ModelDefinitionError(objectName);
    }

    let rst = await model.sync(...args);
    return rst;
  }

  /**
   * Create a record in specific table
   *
   * @static
   * @param {Object} object
   * @returns
   */
  static create<E extends Model>(object: E): Promise<E> {
    let objectName = object.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(objectName);
    return model.create(object);
  }

  /**
   * Construct a QueryInterface
   *
   * @static
   * @returns
   */
  static query<E extends Model>(clazz: { prototype: E }): Query<E> {
    return new Result().query(clazz);
  }

  static update<E extends Model>(clazz: E): Update<E> {
    return new Result().update(clazz);
  }

}