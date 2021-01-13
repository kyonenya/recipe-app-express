export class User {
  public readonly name: { firstName: string, lastName: string };
  public readonly fullName: string;
  public readonly email: string;
  public readonly zipcode: string;
//  public readonly password = null;
//  public readonly createdAt = null;
//  public readonly updatedAt = null;
  
  constructor({ name, email, zipcode}: {
    name: { firstName: string, lastName: string };
    email: string;
    zipcode: string;
  }) {
    this.name = name;
    this.fullName = name.firstName + name.lastName;
    this.email = email;
    this.zipcode = zipcode;
  };
};
