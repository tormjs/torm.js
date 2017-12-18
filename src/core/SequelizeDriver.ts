/**
 * Sequelize database connection driver
 *
 * @export
 * @class Driver
 */
export class SequelizeDriver {

  private static _sequelizeDep: any = require('sequelize');

  /**
   * Connect to database interface
   *
   * @static
   * @param {any} args
   * @returns
   */
  static connect(...args) {
    return new this._sequelizeDep(...args);
  }

  /**
   * Get sequelize dependency class
   *
   * @readonly
   * @static
   * @type {*}
   */
  static get sequelize(): any {
    return this._sequelizeDep;
  }

}