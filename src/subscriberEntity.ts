export type subscriberable = {
  name: string;
  email: string;
  zipCode: number;
};

const isNameValid = (name: string): boolean => {
  return name.length > 0;
}

export class Subscriber {
  constructor(
    public name: string, 
    public email: string, 
    public zipCode: number
  ) {
    if (!isNameValid(this.name)) throw new Error('不正な名前です');
  }
}
