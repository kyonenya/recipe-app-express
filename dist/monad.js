"use strict";
class Left {
    constructor(_value) {
        this._value = _value;
        this.map = (_) => this; // => Left (skipped)
        this.getOrElse = (other) => other;
        this.orElse = (fn) => fn(this._value); // => U
    }
    get value() { throw new TypeError('Can not extract the value of Left'); }
}
Left.of = (val) => new Left(val);
class Right {
    constructor(_value) {
        this._value = _value;
        this.map = (fn) => Right.of(fn(this._value)); // => Right<U>
        this.getOrElse = (_) => this.value;
        this.orElse = (_) => this; // => Right (skipped)
    }
    get value() { return this._value; }
    ;
}
Right.of = (val) => new Right(val);
const ofEither = (a) => (a !== null && a !== undefined)
    ? new Right(a)
    : new Left(a);
