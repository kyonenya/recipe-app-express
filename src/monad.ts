type f<T, U> =(x: T) => U;

export type Either<T> = Left<T>|Right<T>;

export interface IEither<T> {
  map: <U>(fn: f<T, U>) => Left<T>|Right<U>;
  mapLeft: <U>(fn: f<T, U>) => Left<U>|Right<T>;
  getOrElse: <U>(other: U) => U|T;
  value: void|T;
}

export class Left<T> implements IEither<T> {
  constructor(private _value: T) {}
  public map = (_: Function) => this;
  public mapLeft = <U>(fn: f<T, U>) => new Left(fn(this._value));
  public asyncMap = <U>(fn: Function/*f<T, Promise<Either<U>>*/): PromisedEither<any, any>/*<T, unknown>*/ => new PromisedEither(Promise.resolve(this));
  get value() { throw new TypeError('Can not extract the value of Left') };
  public getOrElse = <U>(other: U) => other;
  static of = <T>(val: T) => new Left(val);
}

export class Right<T> implements IEither<T> {
  constructor(private _value: T) {}
  public map = <U>(fn: f<T, U>) => Right.of(fn(this._value));
  public mapLeft = <U>(fn: f<T, U>): Right<T> => this;
  public asyncMap = <U>(fn: Function/*f<T, Promise<Either<U>>>*/): PromisedEither<any, any>/*<U, U>*/ => new PromisedEither(fn(this._value));
  get value() { return this._value };
  public getOrElse = <U>(other: U) => this._value;
  static of = <T>(val: T): Right<T> => new Right(val);
}

export class PromisedEither<L, R> {
  constructor(private _value: Promise<Left<L>|Right<R>>) {};
  public map = <T>(fn: f<R, T>): PromisedEither<L, T> => {
    return new PromisedEither(this._value.then(e => e.map(fn)));
  };
  public mapLeft = <T>(fn: f<L, T>): PromisedEither<T, R> => {
    return new PromisedEither(this._value.then(e => (e instanceof Left)
      ? e.mapLeft(fn)
      : e // TODO e.mapLeft(fn) で統一する
        // error TS2345: Argument of type 'f<L, T>' is not assignable to parameter of type 'f<R, T>'. Type 'R' is not assignable to type 'L'. 'L' could be instantiated with an arbitrary type which could be unrelated to 'R'.
      )
    );
  };
  public getOrElse = <U>(other: U): Promise<U|R> => {
    return this._value.then(e => (e instanceof Left)
      ? other
      : e.value
    );
  };
  get value() { return this._value }
}

export const ofEither = <T>(a: T): Either<T> => (a !== null && a !== undefined)
  ? new Right(a)
  : new Left(a);