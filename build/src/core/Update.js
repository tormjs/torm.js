"use strict";
class Update {
    constructor(clazz) {
        this._clazz = clazz;
        this._conditions = [];
    }
    /**
     * Update conditions
     *
     * @param {any} Object
     */
    where(Object) {
        throw 'Not Implemented';
    }
    /**
     * Execute update actions
     *
     * @param {any} Object
     */
    exec(Object) {
        throw 'Not Implemented';
    }
}
exports.Update = Update;
//# sourceMappingURL=Update.js.map