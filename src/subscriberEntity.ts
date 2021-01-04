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
    public zipcode: number
  ) {
    if (!isNameValid(this.name)) throw new Error('不正な名前です');
    if (!isZipCodeValid(this.zipcode)) throw new Error('不正なzipCodeです');
  }
};
