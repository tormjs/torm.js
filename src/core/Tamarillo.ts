import {SequelizeDriver} from './';

/**
 * Tarmarillo core
 */
export class Tamarillo {
  /**
   * Sequalize sequelize driver instance
   * 
   * @private
   * @static
   * @type {SequelizeDriver}
   */
  private static _driver: SequelizeDriver;

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
  static get driver(): any {
    return this._driver;
  }

}