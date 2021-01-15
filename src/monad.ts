type f<T, U> =(x: T) => U;

export type Either<T> = Left<T>|Right<T>;

//export interface IEither<T> {
//  map: <U>(fn: f<T, U>) => Left<T>|Right<U>;
//  getOrElse: <U>(other: U) => U|T;
//  orElse: <U>(fn: f<T, U>) => U|Right<T>;
//  value: void|T;
//}

export class Left<T> /*implements IEither<T>*/ {
  constructor(private _value: T) {}
  public map = (_: Function) => this;
  public asyncMap = <U>(fn: Function/*f<T, Promise<Either<U>>>*/): PromisedEither<any, any> => new PromisedEither(Promise.resolve(this));
  get value() { throw new TypeError('Can not extract the value of Left') };
  public getOrElse = <U>(other: U) => other;
  public orElse = <U>(fn: f<T, U>): U => {
    console.log('Left orElse');
    return fn(this._value);
  };
  static of = <T>(val: T) => new Left(val);
}

export class Right<T> /*implements IEither<T>*/ {
  constructor(private _value: T) {}
  public map = <U>(fn: f<T, U>) => Right.of(fn(this._value));
  public asyncMap = <U>(fn: Function/*f<T,  Promise<Either<U>>>*/): PromisedEither<any, any> => new PromisedEither(fn(this._value));
  get value() { return this._value };
  public getOrElse = (_: unknown) => this.value;
  public orElse = <U>(fn: f<T, U>): Right<T> => this;
  static of = <T>(val: T): Right<T> => new Right(val);
}

export class PromisedEither<L, R> {
  private _value: Promise<any>;
  constructor(private val: Promise<any>) {
    this._value = val;
  }
  public map = <T>(fn: f<R, T>): PromisedEither<L, T> => {
    return new PromisedEither(this._value.then(e => e.map(fn)));
  }
  public orElse = (fn: Function) => {
    const pp = new PromisedEither(this._value.then(e => {
      if (e instanceof Right) return new PromisedEither(Promise.resolve(e));
      return e.ofElse(fn);
    }));
    return pp.value;
  }
  get value() { return this._value }
}

export const ofEither = <T>(a: T): Either<T> => (a !== null && a !== undefined)
  ? new Right(a)
  : new Left(a);