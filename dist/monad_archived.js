"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofEither = exports.Right = exports.Left = void 0;
class Left {
    constructor(value) {
        this.map = (_) => this; // => Left (skipped)
        this.getOrElse = (other) => other;
        this.orElse = (fn) => fn(this._value); // => U
        this._value = value;
    }
    get value() { throw new TypeError('Can not extract the value of Left'); }
    ;
}
exports.Left = Left;
Left.of = (val) => new Left(val);
class Right {
    constructor(value) {
        this.map = (fn) => {
            if (this._value instanceof Promise) {
                Right.of(this._value.then(fn));
            }
            return Right.of(fn(this._value));
        }; // => Right<U>
        this.then = (fn) => {
            if (!(this._value instanceof Promise)) {
                return this.map(fn);
            }
            return Right.of(this._value.then(fn));
        };
        this.getOrElse = (_) => this.value;
        this.orElse = (_) => this; // => Right (skipped)
        this._value = value;
    }
    get value() { return this._value; }
    ;
}
exports.Right = Right;
Right.of = (val) => new Right(val);
const ofEither = (a) => (a !== null && a !== undefined)
    ? new Right(a)
    : new Left(a);
exports.ofEither = ofEither;
