## Clean Architecture

- 高階関数でDI
- 内側の層でinterfaceを発行して外側の層で実装（契約）
- Repository－UseCase間でやり取りするデータはentitize<->schemize関数で変換
（DBのカラムとEntityのプロパティ名や構造が食い違ってしまう問題への対応）


## 責務違反の記録（古い順）

- UseCase should not know about Repository.  
// import * as subscribersRepository from './subscribersRepository';

- Repository should not know about Infrastructure Layer.  
// import * as postgres from './postgres';

- UseCase should not know anout QueryResult, so should not receive it as a return value of Repository. Instead, receive pure Entity.  
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
