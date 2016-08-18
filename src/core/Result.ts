import { Model } from './SequelizeModel';
import { Query } from './Query';

/**
 * Query result
 * 
 * @export
 * @class Result
 * @extends {Array<E>}
 * @template E
 */
export class Result<E extends Model> extends Array<E> {
  public query<E extends Model>(clazz: E): Query<E>{
    return new Query(clazz);
  }
}