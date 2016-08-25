export class ArgumentsError extends Error {
  constructor(method: string) {
    super(`Not correct number of arguments to invoke ${method} method`);
  }
}

class TransformType {
  static AND: string = 'AND';
  static OR: string = 'OR';
}

/**
 * Operator API
 *
 * @interface IOperator
 */
interface IOperator {
  expr(name): Operator;
  and(...args);
  or(...args): Object;
  eq(...args): Operator;
  ne(...args): Operator;
  gt(...args);
  gte(...args): Operator;
  lt(...args);
  lte(...args);
  not(...args);
  between(...args);
  notBetween(...args);
  in(...args);
  notIn(...args);
  like(...args);
  notLike(...args);
  // for PostgreSQL
  iLike(...args);
  // for PostgreSQL
  notILike(...args);
  // for PostgreSQL
  overlap(...args);
  // for PostgreSQL
  contains(...args);
  // for PostgreSQL
  contained(...args);
  // for PostgreSQL
  any(...args);
}

/**
 * Condition operator abstract
 *
 * @export
 * @class Operator
 */
export class Operator {
  private _operations: Array<any>;
  private _exprName: string;
  private _transformType: TransformType;
  public expr: Object;

  constructor(name) {
    this._exprName = name;
    this._operations = [];
    this._transformType = null;
  }

  public static expr(name): Operator {
    return new Operator(name);
  }

  public eq(arg: any): Operator {
    let equalExpr = {'eq': arg};
    this._operations.push(equalExpr);
    this.expr = equalExpr; 
    return this._checkEvaluation();
  }

  public ne(arg: any): Operator {
    let notEqual = {'ne': arg};
    this._operations.push(notEqual);
    this.expr = notEqual;
    return this._checkEvaluation();
  }

  public lt(arg: number): Operator {
    let lessThanExpr = {'$lt': arg};
    this._operations.push(lessThanExpr);
    this.expr = lessThanExpr;
    return this._checkEvaluation();
  }

  public lte(arg: number): Operator {
    let lessThanOrEqual = {'lte': arg};
    this._operations.push(lessThanOrEqual);
    this.expr = lessThanOrEqual;
    return this._checkEvaluation();
  }

  public gt(arg: number): Operator {
    let greaterThanExpr = {'$gt': arg};
    this._operations.push(greaterThanExpr);
    this.expr = greaterThanExpr;
    return this._checkEvaluation();
  }

  public gte(arg: number): Operator {
    let greaterThanOrEqual = {'gte': arg};
    this._operations.push(greaterThanOrEqual);
    this.expr = greaterThanOrEqual;
    return this._checkEvaluation();
  }

  public not(arg: boolean): Operator {
    let notExpr = {'$not': arg};
    this._operations.push(notExpr);
    this.expr = notExpr;
    return this._checkEvaluation();
  }

  public between(a: number[]): Operator;
  public between(a: number, b: number): Operator;
  public between(a: number | number[], b?: number): Operator {
    let betweenExpr;
    if (Array.isArray(a) && a.length === 2) {
      betweenExpr = {'$between': a};
    }
    else if (arguments.length === 2) {
      betweenExpr = {'$between': [a, b]};
    }
    else
      throw new ArgumentsError('between()');

    this._operations.push(betweenExpr);
    this.expr = betweenExpr;
    return this._checkEvaluation();
  }

  public notBetween(a: number[]): Operator;
  public notBetween(a: number, b: number): Operator;
  public notBetween(a: number | number[], b?: number): Operator {
    let notBetweenExpr;
    if (Array.isArray(a) && a.length === 2) {
      notBetweenExpr = {'$notBetween': a};
    }
    else if (arguments.length === 2) {
      notBetweenExpr = {'$notBetween': [a, b]};
    }
    else
      throw new ArgumentsError('notBetween()');

    this._operations.push(notBetweenExpr);
    this.expr = notBetweenExpr;
    return this._checkEvaluation();
  }

  public in(...a: Array<number | number[]>): Operator {
    let inExpr;

    // pass in array as argument
    // should be only one array
    if (Array.isArray(a[0])) {
      if (a.length !== 1)
        throw new ArgumentsError('in()');
      else {
        inExpr = {'$in': a[0]};
      }
    }
    else
      inExpr = {'$in': a};

    this._operations.push(inExpr);
    this.expr = inExpr;
    return this._checkEvaluation();
  }

  public or(...args: Array<Object>): Operator {
    this._transformType = TransformType.OR;
    // here, do not perform evaluation
    // because it's definitely not end
    return this;
  }

  public and(...args): Operator {
    this._transformType = TransformType.AND;
    return this;
  }

  // TODO: complex composite query
  private _checkEvaluation(): Operator {
    // if can not evaluated, return to avoid useless computation
    if (!this._transformType) return this;

    let transformType: TransformType;
    let expression = {};
    expression[this._exprName] = {};

    // perform evaluation
    switch (this._transformType) {
      case TransformType.AND:
      {
        console.dir(this._operations);
        break;
      }

      case TransformType.OR:
      {
        if (this._operations.length <= 1)
          throw new ArgumentsError('or()');

        this._operations.forEach((operator, i) => {
          Object.keys(operator).forEach(key => {
            // Simple expression
            if (key.indexOf('$') >= 0) {
              if (i === 0) {
                expression[this._exprName]['$or'] = {};
              }
              expression[this._exprName]['$or'][key] = operator[key];
            }
            // Complex expression of combinition
            else {

            }

          });
        });
        break;
      }
    }
    // delete this one item, because it's used already
    // and now, it's useless, so we clear it for next operation.
    this._operations.splice(0, this._operations.length);

    this.expr = expression;
    this._operations.push(expression);
    this._transformType = null;
    return this;
  }

}

export const expr = Operator.expr;