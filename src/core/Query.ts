import { Model } from './SequelizeModel';
import { Result } from './Result';

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
  private _where: Array<any>;

  constructor(clazz: E) {
    this._clazz = clazz;
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
    throw 'Not Implemented';
  }

   /**
   * Complex query conditions 
   * 
   * @param {{}} conditions
   * @returns {Query<E>}
   */
  public cond(conditions: {}): Query<E> {
    throw 'Not Implemented';
  }

  /**
   * Exclude specified columns
   * 
   * @returns {Query<E>}
   */
  public not(name: string): Query<E> {
    throw 'Not Implemented';
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
    throw 'Not Implemented';
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
