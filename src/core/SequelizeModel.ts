import {sequelizeSchemaPool} from './';
import {SequelizeDriver} from './SequelizeDriver';

/**
 * Expose all the sequalize methods and make it compatible
 * 
 * @class Sequalize
 */
export class Model {

  /** Table basic element */

  id: number;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Table schema Synchronous
   * 
   * @static
   * @param {any} args
   * @returns
   */
  static sync(...args) {
    let objectName = this.name.toLowerCase();
    let model: any = sequelizeSchemaPool.poll(objectName);
    return model.sync(...args);
  }

  /**
   * Create a record in specific table
   * 
   * @static
   * @param {Object} object
   * @returns
   */
  static create(object: Object) {
    let objectName = this.name.toLowerCase();
    let model: any = sequelizeSchemaPool.poll(objectName);
    return model.create(object);
  }

  /**
   * Find all records in specific table
   * 
   * @static
   * @returns
   */
  static findAll() {
    let objectName = this.name.toLowerCase();
    let model: any = sequelizeSchemaPool.poll(objectName);
    return model.findAll();
  }

}