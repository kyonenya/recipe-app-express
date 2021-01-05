- 高階関数でDI
- 内側の層でinterfaceを発行して外側の層で実装（契約）

CREATE TABLE users (
  firestName VARCHAR(255)
  ,lastName VARCHAR(255)
  ,email VARCHAR(255) PRIMARY KEY
  ,zipcode INT
  ,password VARCHAR(255)
  ,createdAt TIMESTAMPTZ DEFAULT current_timestamp
  ,modifiedAt TIMESTAMPTZ DEFAULT current_timestamp
);

INSERT INTO users (
  firstName
  ,lastName
  ,email
) VALUES (
  'Jon'
  ,'Welxer'
  ,'jon@jonwexler.com'
);

CREATE TABLE contacts (
  name VARCHAR(255)
  ,email VARCHAR(255)
  ,zipCode INT
);

INSERT INTO contacts (
  name
  ,email
  ,zipCode
) VALUES (
  'Jon Wexler'
  ,'jon@jonwexler.com'
  ,'2260002'
), (
  'Adam Smith'
  ,'hand.invisible@wealth.com'
  ,'177639'
);
