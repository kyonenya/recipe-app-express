- 高階関数でDI
- 内側の層でinterfaceを発行して外側の層で実装（契約）
- DBカラムで大文字が死ぬ問題


## 責務違反の記録

- UseCase should not know about Repository.
// import * as subscriberRepository from './subscriberRepository';

- Repository should not know about Infrastructure Layer.
// import * as postgres from './postgres';

- UseCase should receive pure Entity, and should not know anout QueryResult.
// import { QueryResult } from 'pg';

- UseCase need not to know Repository at all, by injencting dbExecutor in Controller and not in UseCase.
// import { dbExecutable } from './repository';


## SQL

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
