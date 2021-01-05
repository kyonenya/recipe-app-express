export const isNameValid = (name: string): boolean => {
  return name.length > 0;
};

export const isZipCodeValid = (zipcode: number): boolean => {
  return 10000 < zipcode && zipcode < 9999999;
};

export class Subscriber {
  public name: string;
  public email: string;
  public zipcode: number;
  
  constructor(props: {
    name: string;
    email: string;
    zipcode: number;
  }) {
    this.name = props.name;
    this.email = props.email;
    this.zipcode = props.zipcode;
    
    if (!isNameValid(this.name)) throw new Error('不正な名前です');
    if (!isZipCodeValid(this.zipcode)) throw new Error('不正な郵便番号です');
  };
};
