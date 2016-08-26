"use strict";
class ArgumentsError extends Error {
    constructor(method) {
        super(`Not correct number of arguments to invoke ${method} method`);
    }
}
exports.ArgumentsError = ArgumentsError;
class TransformType {
}
TransformType.AND = 'AND';
TransformType.OR = 'OR';
class Operator {
    constructor(name) {
        this._exprName = name;
        this._operations = [];
        this._transformType = null;
    }
    static col(name) {
        return new Operator(name);
    }
    eq(arg) {
        let equalExpr = { '$eq': arg };
        this._operations.push(equalExpr);
        this.expr = equalExpr;
        return this._checkEvaluation();
    }
    ne(arg) {
        let notEqual = { '$ne': arg };
        this._operations.push(notEqual);
        this.expr = notEqual;
        return this._checkEvaluation();
    }
    lt(arg) {
        let lessThanExpr = { '$lt': arg };
        this._operations.push(lessThanExpr);
        this.expr = lessThanExpr;
        return this._checkEvaluation();
    }
    lte(arg) {
        let lessThanOrEqual = { '$lte': arg };
        this._operations.push(lessThanOrEqual);
        this.expr = lessThanOrEqual;
        return this._checkEvaluation();
    }
    gt(arg) {
        let greaterThanExpr = { '$gt': arg };
        this._operations.push(greaterThanExpr);
        this.expr = greaterThanExpr;
        return this._checkEvaluation();
    }
    gte(arg) {
        let greaterThanOrEqual = { '$gte': arg };
        this._operations.push(greaterThanOrEqual);
        this.expr = greaterThanOrEqual;
        return this._checkEvaluation();
    }
    not(arg) {
        let notExpr = { '$not': arg };
        this._operations.push(notExpr);
        this.expr = notExpr;
        return this._checkEvaluation();
    }
    between(a, b) {
        let betweenExpr;
        if (Array.isArray(a) && a.length === 2) {
            betweenExpr = { '$between': a };
        }
        else if (arguments.length === 2) {
            betweenExpr = { '$between': [a, b] };
        }
        else
            throw new ArgumentsError('between()');
        this._operations.push(betweenExpr);
        this.expr = betweenExpr;
        return this._checkEvaluation();
    }
    notBetween(a, b) {
        let notBetweenExpr;
        if (Array.isArray(a) && a.length === 2) {
            notBetweenExpr = { '$notBetween': a };
        }
        else if (arguments.length === 2) {
            notBetweenExpr = { '$notBetween': [a, b] };
        }
        else
            throw new ArgumentsError('notBetween()');
        this._operations.push(notBetweenExpr);
        this.expr = notBetweenExpr;
        return this._checkEvaluation();
    }
    in(...a) {
        let inExpr;
        if (Array.isArray(a[0])) {
            if (a.length !== 1)
                throw new ArgumentsError('in()');
            else {
                inExpr = { '$in': a[0] };
            }
        }
        else
            inExpr = { '$in': a };
        this._operations.push(inExpr);
        this.expr = inExpr;
        return this._checkEvaluation();
    }
    or(...args) {
        this._unwrapExpression();
        this._transformType = TransformType.OR;
        return this;
    }
    and(...args) {
        this._unwrapExpression();
        this._transformType = TransformType.AND;
        return this;
    }
    _unwrapExpression() {
        if (this._operations[0] && this._operations[0][this._exprName])
            this._operations[0] = this._operations[0][this._exprName];
    }
    _checkEvaluation() {
        if (!this._transformType)
            return this;
        let transformType;
        let expression = {};
        expression[this._exprName] = {};
        switch (this._transformType) {
            case TransformType.AND:
                {
                    if (this._operations.length < 2)
                        throw new ArgumentsError('and()');
                    this._operations.forEach((operator, i) => {
                        Object.keys(operator).forEach(key => {
                            if (key.indexOf('$') >= 0) {
                                if (i === 0) {
                                    expression[this._exprName]['$and'] = {};
                                }
                                expression[this._exprName]['$and'][key] = operator[key];
                            }
                            else {
                            }
                        });
                    });
                    break;
                }
            case TransformType.OR:
                {
                    if (this._operations.length < 2)
                        throw new ArgumentsError('or()');
                    this._operations.forEach((operator, i) => {
                        Object.keys(operator).forEach(key => {
                            if (key.indexOf('$') >= 0) {
                                if (i === 0) {
                                    expression[this._exprName]['$or'] = {};
                                }
                                expression[this._exprName]['$or'][key] = operator[key];
                            }
                            else {
                            }
                        });
                    });
                    break;
                }
        }
        this._operations.splice(0, this._operations.length);
        this.expr = expression;
        this._operations.push(expression);
        this._transformType = null;
        return this;
    }
}
exports.Operator = Operator;
exports.col = Operator.col;
//# sourceMappingURL=Operator.js.map