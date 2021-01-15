type f<T, U> =(x: T) => U;

export type Either<T> = Left<T>|Right<T>;

export interface IEither<T> {
  map: <U>(fn: f<T, U>) => Left<T>|Right<U>;
  getOrElse: <U>(other: U) => U|T;
  orElse: <U>(fn: f<T, U>) => U|Right<T>;
  value: void|T;
}

export class Left<T> implements IEither<T> {
  constructor(private _value: T) {}
  public map = (_: Function) => this; // => Left (skipped)
  get value() { throw new TypeError('Can not extract the value of Left') };
  public getOrElse = <U>(other: U) => other;
  public orElse = <U>(fn: f<T, U>)=> fn(this._value); // => U
  static of = <T>(val: T) => new Left(val);
}

export class Right<T> implements IEither<T> {
  constructor(private _value: T) {}
  public map = <U>(fn: f<T, U>) => Right.of(fn(this._value)); // => Right<U>
  get value() { return this._value };
  public getOrElse = (_: unknown) => this.value;
  public orElse = (_: Function) => this; // => Right (skipped)
  static of = <T>(val: T): Right<T> => new Right(val);
}

export const ofEither = <T>(a: T): Either<T> => (a !== null && a !== undefined)
  ? new Right(a)
  : new Left(a);
