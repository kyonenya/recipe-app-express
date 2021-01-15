"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofEither = exports.PromisedEither = exports.PromisedRight = exports.Right = exports.PromisedLeft = exports.Left = void 0;
class Left {
    constructor(_value) {
        this._value = _value;
        this.map = (_) => this; // => Left (skipped)
        this.asyncMap = (fn /*f<T, Promise<Either<U>>>*/) => new PromisedEither(fn(this._value).then((v) => this)); // TODO: Promiseをfnに依らずに自分で生成する
        this.getOrElse = (other) => other;
        this.orElse = (fn) => fn(this._value); // TODO: TypeDef
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
        this.map = (fn) => Right.of(fn(this._value));
        this.asyncMap = (fn /*f<T,  Promise<Either<U>>>*/) => new PromisedEither(fn(this._value));
        this.getOrElse = (_) => this.value;
        this.orElse = (fn) => this; // TODO: TypeDef
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
class PromisedEither {
    constructor(_value) {
        this._value = _value;
        this.map = (fn) => {
            return new PromisedEither(this._value.then(e => e.map(fn)));
        };
        this.orElse = (fn) => {
            return new PromisedEither(this._value.then(e => e.orElse(fn)));
        };
    }
}
exports.PromisedEither = PromisedEither;
const ofEither = (a) => (a !== null && a !== undefined)
    ? new Right(a)
    : new Left(a);
exports.ofEither = ofEither;
