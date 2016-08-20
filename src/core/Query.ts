import { Model } from './SequelizeModel';
import { Result } from './Result';
import { SequelizeDriver } from './SequelizeDriver';
import { sequelizeModelPool } from './SequelizeModelPool';

class ClassNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

class WrongMethodInvokedError extends Error {
  constructor(method: string, instead: string) {
    super(`The method '${method}' can not be invoked in this scenario, please use ${instead} method instead`);
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
   * Build part conditions, execute and find them.
   * If we invoke column(), not(),
   * we can just use find() to execute 
   * 
   * @returns {*}
   */
  find(): any

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
  count(name: string, alias?: string): Promise<number>

  /**
   * Limit record number of each query
   * 
   * @param {number} num
   * @returns {Query<E>}
   */
  limit(num: number): Query<E>

  /**
   * Skip record number
   * 
   * @param {number} num
   * @returns {Query<E>}
   */
  offset(num: number): Query<E>

  /**
   * Todo 
   * 
   * @returns {Query<E>}
   */
  order(): Query<E>

}

/**
 * Torm query interface 
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
  private _attributes: Array<any>;
  private _whereConditions: Array<Object>;
  private _excludes: Array<any>;
  private _limit: number;
  private _offset: number;

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
  public async count(name?: string, alias?: string): Promise<number> {
    let sequelize = SequelizeDriver.sequelize;
    let modelName = this._clazz.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(modelName);
    let param = { attributes: [] };
    
    // count *
    if (!name || name.trim() === '') {
      name = '*';
    }

    if (!alias || alias.trim() === '') {
      alias = '__alias__';
    }
    
    param.attributes.push([sequelize.fn('COUNT', sequelize.col(name)), alias]);

    let retval = await model.findAll(param);
    if (retval.length <= 0) return;

    return retval[0].dataValues[alias];
  }

   /**
   * Complex query conditions 
   * TODO: complex where query implementations.
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
   * Build part conditions, execute and find them.
   * If we invoke column(), where(), not(),
   * we can just use find() to execute 
   * 
   * @returns {*}
   */
  public find(): any {
    if (!this._clazz)
      throw new ClassNotFoundError('Lack of class property, please pass it in query clause');
    
    // if column(), not() is invoked, we can just invoke find() to execute query
    if (this._attributes.length <= 0 && this._excludes.length <= 0)
      throw new WrongMethodInvokedError('find()', 'findAll()');
    
    let modelName = this._clazz.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(modelName);
    return <any>model.findAll(this._buildComplexQuery());
  }

  /**
   * Build all conditions, and executes findAll operation
   * if column(), not() is invoked, we can just use find() method. 
   * @returns {Result<E>}
   */
  public findAll(): Result<E> {
    if (!this._clazz)
      throw new ClassNotFoundError('Lack of class property, please pass it in query clause');
    
    // if column(), not() is invoked, we can just invoke find() to execute query
    if (this._attributes.length > 0 || this._excludes.length > 0)
      throw new WrongMethodInvokedError('findAll()', 'find()');
    
    // get sequelize model from model pool
    let modelName = this._clazz.constructor.name.toLowerCase();
    let model: any = sequelizeModelPool.poll(modelName);
    return <Result<E>>model.findAll(this._buildQuery());
  }

  /**
   * Basic query composition
   * 
   * @private
   * @returns {Object}
   */
  private _buildQuery(): Object {
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
  private _buildComplexQuery(): Object {
    type Attribute = { include?: Array<any>, exclude?: Array<any> };
    type Parameter = { attributes?: Array<Attribute | string | Object> };

    let params: Parameter = {attributes: []};

    // build attributes
    if (this._attributes.length > 0 ) {
      this._attributes.forEach(attr => {
        params.attributes.push(attr);
      });
    }

    // build excludes query
    if (this._excludes.length > 0) {
      params.attributes['exclude'] = this._excludes;
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
  private _buildWhere(param: Object): void {
    if (this._whereConditions.length > 0) {
      let conditions = {};
      this._whereConditions.forEach(cond => {
        Object.keys(cond).forEach(key => {
          conditions[key] = cond[key]
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
  public limit(num: number): Query<E> {
    if (num) this._limit = num;
    return this;
  }

  /**
   * Skip record number
   * 
   * @param {number} num
   * @returns {Query<E>}
   */
  public offset(num: number): Query<E> {
    if (num) this._offset = num;
    return this;
  }

  // TODO: order function implementation
  public order(): Query<E> {
    throw 'Not Implemented';
  }

}
