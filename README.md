CREATE TABLE contacts (
  name ゔVARCHAR(255)
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
