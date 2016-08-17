import { Model } from './SequelizeModel';
import { Result } from './Result';
import { SequelizeDriver } from './SequelizeDriver';

/**
 * Designed API for query operations 
 * 
 * @interface QueryApi
 */
interface QueryApi<E extends Model> {
  
  /**
   * Build all conditions, and executes findAll operation
   * 
   * @returns {Result<E>}
   */
  findAll(): Result<E>

  /**
   * Specify query columns.
   * If invoked, findAll will just query this specified columns instead of query all.
   * 
   * @param {string} name
   * @param {string} [alias]
   * @returns {Query<E>}
   */
  column(name: string, alias?: string): Query<E>

  /**
   * Exclude specified columns
   * 
   * @returns {Query<E>}
   */
  not(name: string): Query<E>

  /**
   * Complex query conditions 
   * 
   * @param {{}} conditions
   * @returns {Query<E>}
   */
  cond(conditions: {}): Query<E> 

  /**
   * Count number in specify conditions
   * [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']
   * 
   * @param {string} column
   * @param {string} [alias]
   * @returns {Query<E>}
   */
  count(name: string, alias?: string): Query<E>

}

/**
 * Tamarillo query interface 
 * 
 * @export
 * @class Query
 * @template E
 */
export class Query<E extends Model> implements QueryApi<E> {

  /**
   * Sequelize entity reference
   * 
   * @private
   * @type {E}
   */
  private _clazz: E;

  /**
   * Sequelize attribute collections
   * 
   * @private
   * @type {Array<any>}
   */
  private _attributes: Array<any>;

  /**
   * Sequelize where collections
   * 
   * @private
   * @type {Array<any>}
   */
  private _conditions: Array<any>;

  /**
   * Sequelize excludes collections
   * 
   * @private
   * @type {Array<any>}
   */
  private _excludes: Array<any>;

  constructor(clazz: E) {
    this._clazz = clazz;
    this._attributes = [];
    this._conditions = [];
    this._excludes = [];
  }

  /**
   * Count number in specify conditions
   * [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']
   * 
   * @param {string} column
   * @param {string} [alias]
   * @returns {Query<E>}
   */
  public count(name: string, alias?: string): Query<E> {
    if (!name) return this;

    let sequelize = SequelizeDriver.sequelize;
    // push condition into attributes array
    if (alias) {
      this._attributes.push([sequelize.fn('COUNT', sequelize.col(name)), alias]);
    }
    else {
      this._attributes.push([sequelize.fn('COUNT', sequelize.col(name))]);
    }
    return this;
  }

   /**
   * Complex query conditions 
   * 
   * @param {{}} conditions
   * @returns {Query<E>}
   */
  public cond(conditions: {}): Query<E> {
    if (!conditions) return this;

    let sequelize = SequelizeDriver.sequelize;
    this._conditions.push(conditions);
    return this;
  }

  /**
   * Exclude specified columns
   * 
   * @returns {Query<E>}
   */
  public not(name: string): Query<E> {
    if (!name) return this;

    let sequelize = SequelizeDriver.sequelize;
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
  public column(name: string, alias?: string): Query<E> {
    if (!name) return this;

    let sequelize = SequelizeDriver.sequelize;
    if (!alias)
      this._attributes.push(name)
    else {
      this._attributes.push([name, alias]);
    }
    return this;
  }

  /**
   * Build all conditions, and executes findAll operation
   * 
   * @returns {Result<E>}
   */
  public findAll(): Result<E> {
    throw 'Not Implemented';
  }

}
