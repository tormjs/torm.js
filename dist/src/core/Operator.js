"use strict";
class ArgumentsError extends Error {
    constructor(method) {
        super(`Not correct number of arguments to invoke ${method} method`);
    }
}
exports.ArgumentsError = ArgumentsError;
class OperatorType {
    static get AND() { return '$and'; }
    static get OR() { return '$or'; }
    static get EQ() { return '$eq'; }
    static get NE() { return '$ne'; }
    static get LT() { return '$lt'; }
    static get LTE() { return '$lte'; }
    static get GT() { return '$gt'; }
    static get GTE() { return '$gte'; }
    static get NOT() { return '$not'; }
    static get BEWTWEEN() { return '$between'; }
    static get NOT_BEWTWEEN() { return '$notBetween'; }
    static get IN() { return '$in'; }
    static get NOT_IN() { return '$notIn'; }
    static get LIKE() { return '$like'; }
    static get NOT_LIKE() { return '$notLike'; }
}
exports.OperatorType = OperatorType;
class TransformType {
    static get AND() { return OperatorType.AND; }
    static get OR() { return OperatorType.OR; }
}
exports.TransformType = TransformType;
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
        this._checkArguments(OperatorType.EQ, arg);
        let equalExpr = {};
        equalExpr[this._exprName] = { [OperatorType.EQ]: arg };
        this._operations.push(equalExpr);
        this.expr = equalExpr;
        return this._checkEvaluation();
    }
    ne(arg) {
        this._checkArguments(OperatorType.NE, arg);
        let notEqual = {};
        notEqual[this._exprName] = { [OperatorType.NE]: arg };
        this._operations.push(notEqual);
        this.expr = notEqual;
        return this._checkEvaluation();
    }
    lt(arg) {
        this._checkArguments(OperatorType.LT, arg);
        let lessThanExpr = {};
        lessThanExpr[this._exprName] = { [OperatorType.LT]: arg };
        this._operations.push(lessThanExpr);
        this.expr = lessThanExpr;
        return this._checkEvaluation();
    }
    lte(arg) {
        this._checkArguments(OperatorType.LTE, arg);
        let lessThanOrEqual = {};
        lessThanOrEqual[this._exprName] = { [OperatorType.LTE]: arg };
        this._operations.push(lessThanOrEqual);
        this.expr = lessThanOrEqual;
        return this._checkEvaluation();
    }
    gt(arg) {
        this._checkArguments(OperatorType.GT, arg);
        let greaterThanExpr = {};
        greaterThanExpr[this._exprName] = { [OperatorType.GT]: arg };
        this._operations.push(greaterThanExpr);
        this.expr = greaterThanExpr;
        return this._checkEvaluation();
    }
    gte(arg) {
        this._checkArguments(OperatorType.GTE, arg);
        let greaterThanOrEqual = {};
        greaterThanOrEqual[this._exprName] = { [OperatorType.GTE]: arg };
        this._operations.push(greaterThanOrEqual);
        this.expr = greaterThanOrEqual;
        return this._checkEvaluation();
    }
    not(arg) {
        this._checkArguments(OperatorType.NOT, arg);
        let notExpr = {};
        notExpr[this._exprName] = { [OperatorType.NOT]: arg };
        this._operations.push(notExpr);
        this.expr = notExpr;
        return this._checkEvaluation();
    }
    between(a, b) {
        this._checkArguments(OperatorType.BEWTWEEN, a);
        let betweenExpr = {};
        if (Array.isArray(a) && a.length === 2) {
            betweenExpr[this._exprName] = { [OperatorType.BEWTWEEN]: a };
        }
        else if (arguments.length === 2) {
            betweenExpr[this._exprName] = { [OperatorType.BEWTWEEN]: [a, b] };
        }
        else
            throw new ArgumentsError(OperatorType.BEWTWEEN);
        this._operations.push(betweenExpr);
        this.expr = betweenExpr;
        return this._checkEvaluation();
    }
    notBetween(a, b) {
        this._checkArguments(OperatorType.NOT_BEWTWEEN, a);
        let notBetweenExpr = {};
        if (Array.isArray(a) && a.length === 2) {
            notBetweenExpr[this._exprName] = { [OperatorType.NOT_BEWTWEEN]: a };
        }
        else if (arguments.length === 2) {
            notBetweenExpr[this._exprName] = { [OperatorType.NOT_BEWTWEEN]: [a, b] };
        }
        else
            throw new ArgumentsError(OperatorType.NOT_BEWTWEEN);
        this._operations.push(notBetweenExpr);
        this.expr = notBetweenExpr;
        return this._checkEvaluation();
    }
    in(...a) {
        this._checkArguments(OperatorType.IN, a);
        let inExpr = {};
        if (Array.isArray(a[0])) {
            if (a.length !== 1)
                throw new ArgumentsError(OperatorType.IN);
            else {
                inExpr[this._exprName] = { [OperatorType.IN]: a[0] };
            }
        }
        else
            inExpr[this._exprName] = { [OperatorType.IN]: a };
        this._operations.push(inExpr);
        this.expr = inExpr;
        return this._checkEvaluation();
    }
    notIn(...a) {
        this._checkArguments(OperatorType.NOT_IN, a);
        let notInExpr = {};
        if (Array.isArray(a[0])) {
            if (a.length !== 1)
                throw new ArgumentsError(OperatorType.NOT_IN);
            else {
                notInExpr[this._exprName] = { [OperatorType.NOT_IN]: a[0] };
            }
        }
        else
            notInExpr[this._exprName] = { [OperatorType.NOT_IN]: a };
        this._operations.push(notInExpr);
        this.expr = notInExpr;
        return this._checkEvaluation();
    }
    like(arg) {
        this._checkArguments(OperatorType.LIKE, arg);
        let likeExpr = { [OperatorType.LIKE]: arg };
        this._operations.push(likeExpr);
        this.expr = likeExpr;
        return this._checkEvaluation();
    }
    notLike(arg) {
        this._checkArguments(OperatorType.NOT_LIKE, arg);
        let notLike = { [OperatorType.NOT_LIKE]: arg };
        this._operations.push(notLike);
        this.expr = notLike;
        return this._checkEvaluation();
    }
    or() {
        this._transformType = TransformType.OR;
        return this;
    }
    and() {
        this._transformType = TransformType.AND;
        return this;
    }
    _unwrapExpression() {
        this._operations.forEach((operator, i) => {
            if (operator[this._exprName])
                this._operations[i] = operator[this._exprName];
        });
    }
    _checkEvaluation() {
        if (!this._transformType)
            return this;
        this._unwrapExpression();
        let transformType;
        let expression = {};
        expression[this._exprName] = {};
        switch (this._transformType) {
            case TransformType.AND:
                {
                    if (this._operations.length < 2)
                        throw new ArgumentsError(OperatorType.AND);
                    this._operations.forEach((operator, i) => {
                        Object.keys(operator).forEach(key => {
                            if (key.indexOf('$') >= 0) {
                                if (i === 0) {
                                    expression[this._exprName][OperatorType.AND] = {};
                                }
                                expression[this._exprName][OperatorType.AND][key] = operator[key];
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
                        throw new ArgumentsError(OperatorType.OR);
                    this._operations.forEach((operator, i) => {
                        Object.keys(operator).forEach(key => {
                            if (key.indexOf('$') >= 0) {
                                if (i === 0) {
                                    expression[this._exprName][OperatorType.OR] = {};
                                }
                                expression[this._exprName][OperatorType.OR][key] = operator[key];
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
    _checkArguments(funcName, ...args) {
        if (args.length === 0) {
            throw new ArgumentsError(funcName);
        }
        args.forEach(arg => {
            if (arg === null || arg === undefined || arg === [])
                throw new ArgumentsError(funcName);
        });
    }
}
exports.Operator = Operator;
exports.col = Operator.col;
//# sourceMappingURL=Operator.js.map