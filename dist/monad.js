"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofEither = exports.PromisedEither = exports.Right = exports.Left = void 0;
class Left {
    constructor(_value) {
        this._value = _value;
        this.map = (_) => this;
        this.mapLeft = (fn) => new Left(fn(this._value));
        this.asyncMap = (fn /*f<T, Promise<Either<U>>*/) => new PromisedEither(Promise.resolve(this));
        this.getOrElse = (other) => other;
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
        this.mapLeft = (fn) => this;
        this.asyncMap = (fn /*f<T, Promise<Either<U>>>*/) => new PromisedEither(fn(this._value));
        this.getOrElse = (other) => this._value;
    }
    get value() { return this._value; }
    ;
}
exports.Right = Right;
Right.of = (val) => new Right(val);
class PromisedEither {
    constructor(_value) {
        this._value = _value;
        this.map = (fn) => {
            return new PromisedEither(this._value.then(e => e.map(fn)));
        };
        this.mapLeft = (fn) => {
            return new PromisedEither(this._value.then(e => (e instanceof Left)
                ? e.mapLeft(fn)
                : e // TODO e.mapLeft(fn) で統一する
            // error TS2345: Argument of type 'f<L, T>' is not assignable to parameter of type 'f<R, T>'. Type 'R' is not assignable to type 'L'. 'L' could be instantiated with an arbitrary type which could be unrelated to 'R'.
            ));
        };
        this.getOrElse = (other) => {
            return this._value.then(e => (e instanceof Left)
                ? other
                : e.value);
        };
    }
    ;
    get value() { return this._value; }
}
exports.PromisedEither = PromisedEither;
const ofEither = (a) => (a !== null && a !== undefined)
    ? new Right(a)
    : new Left(a);
exports.ofEither = ofEither;
