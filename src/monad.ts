type f<T, U> =(x: T) => U;

export type Either<T> = Left<T>|Right<T>;

export interface IEither<T> {
  map: <U>(fn: f<T, U>) => Left<T>|Right<U>;
  getOrElse: <U>(other: U) => U|T;
//  orElse: <U>(fn: f<T, U>) => U|Right<T>;
  value: void|T;
}

export class Left<T> implements IEither<T> {
  constructor(private _value: T) {}
  public map = (_: Function) => this; // => Left (skipped)
  public asyncMap = <U>(fn: any/*f<T, Promise<Either<U>>>*/): any => new PromisedEither(Promise.resolve(this));
  get value() { throw new TypeError('Can not extract the value of Left') };
  public getOrElse = <U>(other: U) => other;
  public orElse = <U>(fn: f<T, U>): any => fn(this._value); // TODO: TypeDef
  static of = <T>(val: T) => new Left(val);
}

export class PromisedLeft<T> /* implements IEither<Promise<T>> */ {
  constructor(private _value: Promise<T>) {};
  public map = (_: Function): PromisedLeft<T> => this;
}

export class Right<T> implements IEither<T> {
  constructor(private _value: T) {}
  public map = <U>(fn: f<T, U>) => Right.of(fn(this._value));
  public asyncMap = <U>(fn: any/*f<T,  Promise<Either<U>>>*/): any => new PromisedEither(fn(this._value));
  get value() { return this._value };
  public getOrElse = (_: unknown) => this.value;
  public orElse = <U>(fn: f<T, U>): any => this; // TODO: TypeDef
  static of = <T>(val: T): Right<T> => new Right(val);
}

export class PromisedRight<T> {
  constructor(private _value: Promise<T>) {};
  public map = <U>(fn: f<T, U>): PromisedRight<U> => {
    return new PromisedRight(this._value.then(v => fn(v)));
  };
}

export class PromisedEither<T> {
  constructor(private _value: Promise<Either<T>>) {}
  public map = <U>(fn: f<T, U>): PromisedEither<any> => {
    return new PromisedEither(this._value.then(e => e.map(fn)));
  }
  public orElse = <U>(fn: f<T, U>): any => {
    return new PromisedEither(this._value.then(e => e.orElse(fn)));
  };
}

export const ofEither = <T>(a: T): Either<T> => (a !== null && a !== undefined)
  ? new Right(a)
  : new Left(a);
