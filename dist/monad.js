"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofEither = exports.PromisedRight = exports.Right = exports.PromisedLeft = exports.Left = void 0;
class Left {
    constructor(_value) {
        this._value = _value;
        this.map = (_) => this; // => Left (skipped)
        this.asyncMap = (fn) => new PromisedLeft(fn(this._value));
        this.getOrElse = (other) => other;
        this.orElse = (fn) => fn(this._value); // => U
    }
    get value() { throw new TypeError('Can not extract the value of Left'); }
    ;
}
exports.Left = Left;
Left.of = (val) => new Left(val);
class PromisedLeft {
    constructor(_value) {
        this._value = _value;
        this.map = (_) => this;
    }
    ;
}
exports.PromisedLeft = PromisedLeft;
class Right {
    constructor(_value) {
        this._value = _value;
        this.map = (fn) => Right.of(fn(this._value)); // => Right<U>
        this.asyncMap = (fn) => new PromisedRight(fn(this._value));
        this.getOrElse = (_) => this.value;
        this.orElse = (_) => this; // => Right (skipped)
    }
    get value() { return this._value; }
    ;
}
exports.Right = Right;
Right.of = (val) => new Right(val);
class PromisedRight {
    constructor(_value) {
        this._value = _value;
        this.map = (fn) => {
            return new PromisedRight(this._value.then(v => fn(v)));
        };
    }
    ;
}
exports.PromisedRight = PromisedRight;
//  constructor(private _value: T) {}
//  public map = <U>(fn: f<T, U>) => Right.of(fn(this._value)); // => Right<U>
//  get value() { return this._value };
//  public getOrElse = (_: unknown) => this.value;
//  public orElse = (_: Function) => this; // => Right (skipped)
//  static of = <T>(val: T): Right<T> => new Right(val);
//}
const ofEither = (a) => (a !== null && a !== undefined)
    ? new Right(a)
    : new Left(a);
exports.ofEither = ofEither;
