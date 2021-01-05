export const isNameValid = (name: string): boolean => {
  return name.length > 0;
};

export const isZipCodeValid = (zipcode: number): boolean => {
  return 10000 < zipcode && zipcode < 9999999;
};

export class Subscriber {
  // immutablize
  public readonly name: string;
  public readonly email: string;
  public readonly zipCode: number;
  
  constructor({ name, email, zipCode }: {
    name: string;
    email: string;
    zipCode: number;
  }) {
    this.name = name;
    this.email = email;
    this.zipCode = zipCode;
    
    if (!isNameValid(this.name)) throw new Error('不正な名前です');
    if (!isZipCodeValid(this.zipCode)) throw new Error('不正な郵便番号です');
  };
};
