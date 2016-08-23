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
export class Result<E extends Model> extends Array<E> {
  public query<E extends Model>(clazz: E): Query<E> {
    return new Query(clazz);
  }

  public update<E extends Model>(clazz: E): Update<E> {
    return new Update<E>(clazz);
  }
}