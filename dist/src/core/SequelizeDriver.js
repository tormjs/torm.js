"use strict";
class SequelizeDriver {
    static connect(...args) {
        return new this._sequelizeDep(...args);
    }
    static get sequelize() {
        return this._sequelizeDep;
    }
}
SequelizeDriver._sequelizeDep = require('sequelize');
exports.SequelizeDriver = SequelizeDriver;
//# sourceMappingURL=SequelizeDriver.js.map