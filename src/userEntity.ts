export class User {
  public readonly name: { firstName: string, lastName: string };
  public readonly fullName: string;
  public readonly email: string;
  public readonly zipcode: string;
  public readonly password: string = '';
//  public readonly createdAt = null;
//  public readonly updatedAt = null;
  
  constructor({ name, email, zipcode, password }: {
    name: { firstName: string, lastName: string };
    email: string;
    zipcode: string;
    password?: string;
  }) {
    this.name = name;
    this.fullName = name.firstName + name.lastName;
    this.email = email;
    this.zipcode = zipcode;
    if (password) this.password = password;
  };
};
