import { Model } from './SequelizeModel';
import { Query } from './Query';
import { Update } from './Update';
/**
 * Query result
 *
 * @export
 * @class Result
 * @extends {Array<E>}
 * @template E
 */
export declare class Result<E extends Model> extends Array<E> {
    query<E extends Model>(clazz: E): Query<E>;
    update<E extends Model>(clazz: E): Update<E>;
}
