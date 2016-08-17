import { Model } from './SequelizeModel';
import { Result } from './Result';

/**
 * Designed API for query operations 
 * 
 * @interface QueryApi
 */
interface QueryApi<E extends Model> {
  findAll(): Result<E>
}

/**
 * Tamarillo query interface 
 * 
 * @export
 * @class Query
 * @template E
 */
export class Query<E extends Model> implements QueryApi<E> {
  
  /**
   * Find all records of  
   */
  findAll(): Result<E> {
    return null;
  }


}
