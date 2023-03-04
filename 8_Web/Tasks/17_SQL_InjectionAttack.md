# SQL Injection Attack GlockenEmil 1.0

## Security Questions

**Explain the security problem**
GlockenEmil has a sql injection vulnerability becauser user data (password field) can be prepared in a way, that the passed user input is executed as SQL

**Explain your attack. (exploit, screenshot, hacking journal)**
value in passed in password field: `' OR 1=1#`   (after successful login, i could access the credit card number under my account: '1323-4545-6767-8989')
Explanation:
- "'" to jump out of the context (other possibilities that didnt work: "')" or """ etc.)
-  "1=1" to make statement always true
-  \# comments to fix syntax errors  (for sql server this would be "--")

**Explain mitigation (remedy)**
- 1. use parameterized queries
    - don't concatenate strings to create an sql statement that is to be executed.
    - This is the main remedy
- 2. WAF: can detect sql injection attack (maybe not all)
    - or what I have seen myself a few years ago: The application checked each request string for suspicious strings and throw an exception in case such an attack was found. (this was done because it was not possible to fix entire program code at once)
    - might not work in 100% case of all cases and there might be false positives.
- 3. Only give the db user (which is not the same as the logged in user) only the privileges needed and not more
    - does not fix the sql injection itself, but limits the damage that can be done
