"use strict";
/**
 * Sequelize database connection driver
 *
 * @export
 * @class Driver
 */
class SequelizeDriver {
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
    static get sequelize() {
        return this._sequelizeDep;
    }
}
SequelizeDriver._sequelizeDep = require('sequelize');
exports.SequelizeDriver = SequelizeDriver;
//# sourceMappingURL=SequelizeDriver.js.map