"use strict";
const Query_1 = require('./Query');
const Update_1 = require('./Update');
class Result extends Array {
    query(clazz) {
        return new Query_1.Query(clazz);
    }
    update(clazz) {
        return new Update_1.Update(clazz);
    }
}
exports.Result = Result;
//# sourceMappingURL=Result.js.map