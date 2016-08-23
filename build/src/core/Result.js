"use strict";
const Query_1 = require('./Query');
const Update_1 = require('./Update');
/**
 * Query result
 *
 * @export
 * @class Result
 * @extends {Array<E>}
 * @template E
 */
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