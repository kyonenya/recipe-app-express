type f<T, U> =(x: T) => U;

interface Either<T> {
  map: <U>(fn: f<T, U>) => Left<T>|Right<U>;
  getOrElse: <U>(other: U) => U|T;
  orElse: <U>(fn: f<T, U>) => U|Right<T>;
  value: void|T;
}

class Left<T> implements Either<T> {
  constructor(private _value: T) {}
  public map = (_: Function) => this; // => Left (skipped)
  get value() { throw new TypeError('Can not extract the value of Left') }
  public getOrElse = <U>(other: U) => other;
  public orElse = <U>(fn: f<T, U>)=> fn(this._value); // => U
  static of = <T>(val: T) => new Left(val);
}

class Right<T> implements Either<T> {
  constructor(private _value: T) {}
  public map = <U>(fn: f<T, U>) => Right.of(fn(this._value)); // => Right<U>
  get value() { return this._value };
  public getOrElse = (_: unknown) => this.value;
  public orElse = (_: Function) => this; // => Right (skipped)
  static of = <T>(val: T) => new Right(val);
}

const ofEither = <T>(a: T): Either<T> => (a !== null && a !== undefined)
  ? new Right(a)
  : new Left(a);
