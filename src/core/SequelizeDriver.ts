/**
 * Sequelize database connection driver 
 * 
 * @export
 * @class Driver
 */
export class SequelizeDriver {

  private static _sequelizeDep: any = require("sequelize");

  static connect(...args) {
    return new this._sequelizeDep(...args);
  }

  static get sequelize(): any {
    return this._sequelizeDep;
  }

}