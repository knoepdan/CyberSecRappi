# NoSQL injection (Glockenemil)

### Security Questions

**Explain the security problem**
The user input is not validated and it is possible to to influence the nosql query that is executed on the server. 

**Explain your attack. (exploit, screenshot, hacking journal)**
Example of a normal request when i enter "customer" for username and "ddd" for password:  `{"username":"customer0","password":"ddd"}`
However, when I enter the following value in the password field: `{"$gt":""}` the backend code will interpret the passed user input not as a string but as a json input to be interpreted in the query. It is similar to a sql injected attack with the injection code that is something like "') OR 1=1#" as the expression will also always be true (any string is greater/equal an empty string). 


**Explain mitigation (remedy)**
Incorrect/vulnerable code (here just the pw part)
```
try {
        hashedPassword = JSON.parse(password);
    } catch (exception) {
        hashedPassword = CryptoUtil.hashPwd(password);
    }
```
I believe under no circumstances should the password (and the username) be interpreted as JSON. So I believe the following approaches might work: 

Approach one: return when it is json (username + pw)
```
try {
        hashedPassword = JSON.parse(password);
        return; // with error msg (not shown here)
    } catch (exception) {
        hashedPassword = CryptoUtil.hashPwd(password);
    }
```
Approach two: just hash the password as this will strip the json part (wont work for username though)
` hashedPassword = CryptoUtil.hashPwd(password);`


Approach three: sanitize using built in function (taken from powerpoint)
` password = sanitize(password);`

Approach four (mitigation)
use a WAF that knows how to detect nosql attacks 