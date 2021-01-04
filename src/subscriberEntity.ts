export type subscriberable = {
  name: string;
  email: string;
  zipCode: number;
};

const isNameValid = (name: string): boolean => {
  return name.length > 0;
};

const isZipCodeValid = (zipCode: number): boolean => {
  return 10000 < zipCode && zipCode < 99999;
};

export class Subscriber {
  constructor(
    public name: string, 
    public email: string, 
    public zipCode: number
  ) {
    if (!isNameValid(this.name)) throw new Error('不正な名前です');
    if (!isZipCodeValid(this.zipCode)) throw new Error('不正なzipCodeです');
  }
};
