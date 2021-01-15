"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofEither = exports.PromisedEither = exports.Right = exports.Left = void 0;
//export interface IEither<T> {
//  map: <U>(fn: f<T, U>) => Left<T>|Right<U>;
//  getOrElse: <U>(other: U) => U|T;
//  orElse: <U>(fn: f<T, U>) => U|Right<T>;
//  value: void|T;
//}
class Left {
    constructor(_value) {
        this._value = _value;
        this.map = (_) => this;
        this.asyncMap = (fn /*f<T, Promise<Either<U>>>*/) => new PromisedEither(Promise.resolve(this));
        this.getOrElse = (other) => other;
        this.orElse = (fn) => {
            console.log('Left orElse');
            return fn(this._value);
        };
    }
    get value() { throw new TypeError('Can not extract the value of Left'); }
    ;
}
exports.Left = Left;
Left.of = (val) => new Left(val);
class Right {
    constructor(_value) {
        this._value = _value;
        this.map = (fn) => Right.of(fn(this._value));
        this.asyncMap = (fn /*f<T,  Promise<Either<U>>>*/) => new PromisedEither(fn(this._value));
        this.getOrElse = (_) => this.value;
        this.orElse = (fn) => this;
    }
    get value() { return this._value; }
    ;
}
exports.Right = Right;
Right.of = (val) => new Right(val);
class PromisedEither {
    constructor(val) {
        this.val = val;
        this.map = (fn) => {
            return new PromisedEither(this._value.then(e => e.map(fn)));
        };
        this.orElse = (fn) => {
            const pp = new PromisedEither(this._value.then(e => {
                if (e instanceof Right)
                    return new PromisedEither(Promise.resolve(e));
                return e.ofElse(fn);
            }));
            return pp.value;
        };
        this._value = val;
    }
    get value() { return this._value; }
}
exports.PromisedEither = PromisedEither;
const ofEither = (a) => (a !== null && a !== undefined)
    ? new Right(a)
    : new Left(a);
exports.ofEither = ofEither;
