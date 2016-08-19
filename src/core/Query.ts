import { Model } from './SequelizeModel';
import { Result } from './Result';
import { SequelizeDriver } from './SequelizeDriver';
import { sequelizeModelPool } from './SequelizeModelPool';

class ClassNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

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
  where(conditions: {}): Query<E> 

  /**
   * Count number in specify conditions
   * [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']
   * 
   * @param {string} column
   * @param {string} [alias]
   * @returns {Query<E>}
   */
  count(name: string, alias?: string): number

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
  private _whereConditions: Array<Object>;

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
    this._whereConditions = [];
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
  public count(name?: string, alias?: string): number {
    let sequelize = SequelizeDriver.sequelize;
    let modelName = this._clazz.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(modelName);
    let param = { attributes: [] };
    
    // count *
    if (!name || name === '') {
      name = '*'
    }
    if (alias) {
      param.attributes.push([sequelize.fn('COUNT', sequelize.col(name)), alias]);
    }
    else {
      param.attributes.push([sequelize.fn('COUNT', sequelize.col(name))]);
    }
    return model.findAll(param);
  }

   /**
   * Complex query conditions 
   * 
   * @param {{}} conditions
   * @returns {Query<E>}
   */
  public where(conditions: {}): Query<E> {
    if (!conditions) return this;

    this._whereConditions.push(conditions);
    return this;
  }

  /**
   * Exclude specified columns
   * 
   * @returns {Query<E>}
   */
  public not(name: string): Query<E> {
    if (!name) return this;

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
    if (!this._clazz)
      throw new ClassNotFoundError('Lack of class property, please pass it in query clause');
    
    // get sequelize model from model pool
    let modelName = this._clazz.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(modelName);
    return <Result<E>>model.findAll(this._buildQueryParams());
  }

  /**
   * Build all params into one object
   * 
   * @private
   * @returns {Object}
   */
  private _buildQueryParams(): Object {
    type Attr = { include?: Array<any>, exclude?: Array<any> };
    type Param = { attributes: Array<Attr | string | Object> };

    let params: Param = { attributes: [] }

    // build where conditions
    if (this._whereConditions.length > 0) {
      let conditions = {};
      this._whereConditions.forEach(cond => {
        Object.keys(cond).forEach(key => {
          conditions[key] = cond[key]
        });
      });
      return { where: conditions };
    }

    // build attributes
    else if (this._attributes.length > 0 ) {
      this._attributes.forEach(attr => {
        params.attributes.push(attr);
      });
    }

    // build excludes query
    else if (this._excludes.length > 0) {
      params.attributes['exclude'] = this._excludes;
    }

    // no conditions provided
    else return;

    return params;
  }

}
