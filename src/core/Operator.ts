/**
 * Length of arguments is inappropriate
 * 
 * @export
 * @class ArgumentsError
 * @extends {Error}
 */
export class ArgumentsError extends Error {
  constructor(method: string) {
    super(`Not correct number of arguments to invoke ${method} method`);
  }
}

export class OperatorType {
  static get AND(): string {return '$and'; }
  static get OR(): string {return '$or'; }
  static get EQ(): string { return '$eq'; }
  static get NE(): string { return '$ne'; }
  static get LT(): string { return '$lt'; }
  static get LTE(): string { return '$lte'; }
  static get GT(): string { return '$gt'; }
  static get GTE(): string { return '$gte'; }
  static get NOT(): string { return '$not'; }
  static get BEWTWEEN(): string { return '$between'; }
  static get NOT_BEWTWEEN(): string { return '$notBetween'; }
  static get IN(): string { return '$in'; }
  static get NOT_IN(): string { return '$notIn'; }
  static get LIKE(): string { return '$like'; }
  static get NOT_LIKE(): string {return '$notLike'; }
}

/**
 * And, Or transformation type definition
 * 
 * @class TransformType
 */
export class TransformType {
  static get AND(): string { return OperatorType.AND; }
  static get OR(): string { return OperatorType.OR; }
}

/**
 * Operator API
 *
 * @interface IOperator
 */
export interface IOperator {
  eq(arg: number | string | Date): Operator;
  ne(arg: number | string | Date): Operator ;
  lt(arg: number | Date): Operator;
  lte(arg: number | Date): Operator;
  gt(arg: number | Date): Operator;
  gte(arg: number | Date): Operator;
  not(arg: boolean): Operator;
  between(a: number[] | Date[]): Operator;
  between(a: number | Date, b: number | Date): Operator;
  notBetween(a: number[] | Date[]): Operator;
  notBetween(a: number | Date, b: number | Date): Operator;
  in(...a: Array<number | number[]>): Operator;
  notIn(...a: Array<number | number[]>): Operator;
  like(arg: string): Operator;
  
  // Expression combination
  or(): Operator;
  and(): Operator;
  // for PostgreSQL
  // iLike(...args);
  // // for PostgreSQL
  // notILike(...args);
  // // for PostgreSQL
  // overlap(...args);
  // // for PostgreSQL
  // contains(...args);
  // // for PostgreSQL
  // contained(...args);
  // // for PostgreSQL
  // any(...args);
}

/**
 * Condition operator abstract
 *
 * @export
 * @class Operator
 */
export class Operator implements IOperator {
  private _operations: Array<any>;
  private _exprName: string;
  private _transformType: TransformType;
  public expr: Object;

  constructor(name) {
    this._exprName = name;
    this._operations = [];
    this._transformType = null;
  }

  public static col(name): Operator {
    return new Operator(name);
  }

  public eq(arg: number | string | Date): Operator {
    this._checkArguments(OperatorType.EQ, arg);

    let equalExpr = {};
    equalExpr[this._exprName] = {[OperatorType.EQ]: arg};
    this._operations.push(equalExpr);
    this.expr = equalExpr; 
    return this._checkEvaluation();
  }

  public ne(arg: number | string | Date): Operator {
    this._checkArguments(OperatorType.NE, arg);

    let notEqual = {};
    notEqual[this._exprName] = {[OperatorType.NE]: arg};
    this._operations.push(notEqual);
    this.expr = notEqual;
    return this._checkEvaluation();
  }

  public lt(arg: number | Date): Operator {
    this._checkArguments(OperatorType.LT, arg);

    let lessThanExpr = {};
    lessThanExpr[this._exprName] = {[OperatorType.LT]: arg};
    this._operations.push(lessThanExpr);
    this.expr = lessThanExpr;
    return this._checkEvaluation();
  }

  public lte(arg: number | Date): Operator {
    this._checkArguments(OperatorType.LTE, arg);

    let lessThanOrEqual = {};
    lessThanOrEqual[this._exprName] = {[OperatorType.LTE]: arg};
    this._operations.push(lessThanOrEqual);
    this.expr = lessThanOrEqual;
    return this._checkEvaluation();
  }

  public gt(arg: number | Date): Operator {
    this._checkArguments(OperatorType.GT, arg);

    let greaterThanExpr = {[OperatorType.GT]: arg};
    this._operations.push(greaterThanExpr);
    this.expr = greaterThanExpr;
    return this._checkEvaluation();
  }

  public gte(arg: number | Date): Operator {
    this._checkArguments(OperatorType.GTE, arg);

    let greaterThanOrEqual = {[OperatorType.GTE]: arg};
    this._operations.push(greaterThanOrEqual);
    this.expr = greaterThanOrEqual;
    return this._checkEvaluation();
  }

  public not(arg: boolean): Operator {
    this._checkArguments(OperatorType.NOT, arg);

    let notExpr = {[OperatorType.NOT]: arg};
    this._operations.push(notExpr);
    this.expr = notExpr;
    return this._checkEvaluation();
  }

  // new Date(new Date() - 24 * 60 * 60 * 1000)
  public between(a: number[] | Date[]): Operator;
  public between(a: number | Date, b: number | Date): Operator;
  public between(a: number | number[] | Date | Date[], b?: number): Operator {
    this._checkArguments(OperatorType.BEWTWEEN, a);

    let betweenExpr;
    if (Array.isArray(a) && a.length === 2) {
      betweenExpr = {[OperatorType.BEWTWEEN]: a};
    }
    else if (arguments.length === 2) {
      betweenExpr = {[OperatorType.BEWTWEEN]: [a, b]};
    }
    else
      throw new ArgumentsError(OperatorType.BEWTWEEN);

    this._operations.push(betweenExpr);
    this.expr = betweenExpr;
    return this._checkEvaluation();
  }

  public notBetween(a: number[] | Date[]): Operator;
  public notBetween(a: number | Date, b: number | Date): Operator;
  public notBetween(a: number | number[] | Date | Date[], b?: number): Operator {
    this._checkArguments(OperatorType.NOT_BEWTWEEN, a);

    let notBetweenExpr;
    if (Array.isArray(a) && a.length === 2) {
      notBetweenExpr = {[OperatorType.NOT_BEWTWEEN]: a};
    }
    else if (arguments.length === 2) {
      notBetweenExpr = {[OperatorType.NOT_BEWTWEEN]: [a, b]};
    }
    else
      throw new ArgumentsError(OperatorType.NOT_BEWTWEEN);

    this._operations.push(notBetweenExpr);
    this.expr = notBetweenExpr;
    return this._checkEvaluation();
  }

  public in(...a: Array<number | number[]>): Operator {
    this._checkArguments(OperatorType.IN, a);
    let inExpr;

    // pass in array as argument
    // should be only one array
    if (Array.isArray(a[0])) {
      if (a.length !== 1)
        throw new ArgumentsError(OperatorType.IN);
      else {
        inExpr = {[OperatorType.IN]: a[0]};
      }
    }
    else
      inExpr = {[OperatorType.IN]: a};

    this._operations.push(inExpr);
    this.expr = inExpr;
    return this._checkEvaluation();
  }

  public notIn(...a: Array<number | number[]>): Operator {
    this._checkArguments(OperatorType.NOT_IN, a);
    let notInExpr;

    // pass in array as argument
    // should be only one array
    if (Array.isArray(a[0])) {
      if (a.length !== 1)
        throw new ArgumentsError(OperatorType.NOT_IN);
      else {
        notInExpr = {[OperatorType.NOT_IN]: a[0]};
      }
    }
    else
      notInExpr = {[OperatorType.NOT_IN]: a};

    this._operations.push(notInExpr);
    this.expr = notInExpr;
    return this._checkEvaluation();
  }

  public like(arg: string): Operator {
    this._checkArguments(OperatorType.LIKE, arg);
    let likeExpr = {[OperatorType.LIKE]: arg};
    this._operations.push(likeExpr);
    this.expr = likeExpr;
    return this._checkEvaluation();
  }

  public notLike(arg: string): Operator {
    this._checkArguments(OperatorType.NOT_LIKE, arg);
    let notLike = {[OperatorType.NOT_LIKE]: arg};
    this._operations.push(notLike);
    this.expr = notLike;
    return this._checkEvaluation();
  }

  public or(): Operator {
    this._transformType = TransformType.OR;
    // here, do not perform evaluation
    // because it's definitely not end
    return this;
  }

  public and(): Operator {
    this._transformType = TransformType.AND;
    return this;
  }

  private _unwrapExpression() {
    // unwrap from test: {} object to {}
    this._operations.forEach((operator, i) => {
      if (operator[this._exprName])
        this._operations[i] = operator[this._exprName];
    });
  }

  // TODO: complex composite query
  private _checkEvaluation(): Operator {
    // if can not evaluated, return to avoid useless computation
    if (!this._transformType) return this;

    this._unwrapExpression();

    let transformType: TransformType;
    let expression = {};
    expression[this._exprName] = {};

    // perform evaluation
    switch (this._transformType) {
      case TransformType.AND:
      {
        if (this._operations.length < 2)
          throw new ArgumentsError(OperatorType.AND);
        
        this._operations.forEach((operator, i) => {
          Object.keys(operator).forEach(key => {
            // Simple expression
            if (key.indexOf('$') >= 0) {
              if (i === 0) {
                expression[this._exprName][OperatorType.AND] = {};
              }
              expression[this._exprName][OperatorType.AND][key] = operator[key];
            }
            // TODO: Complex expression of combination
            else {

            }

          });
        });

        break;
      }

      case TransformType.OR:
      {
        if (this._operations.length < 2)
          throw new ArgumentsError(OperatorType.OR);

        this._operations.forEach((operator, i) => {
          Object.keys(operator).forEach(key => {
            // Simple expression
            if (key.indexOf('$') >= 0) {
              if (i === 0) {
                expression[this._exprName][OperatorType.OR] = {};
              }
              expression[this._exprName][OperatorType.OR][key] = operator[key];
            }
            // TODO: Complex expression of combination
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

  /**
   * Check if argument is invalid
   * 
   * @private
   */
  private _checkArguments(funcName: string, ...args: Array<any>) {
    // not empty check
    if (args.length === 0) {
      throw new ArgumentsError(funcName);
    }

    // check not null, undefined
    args.forEach(arg => {
      if (arg === null || arg === undefined || arg === [])
        throw new ArgumentsError(funcName); 
    });

  }

}

export const col = Operator.col;