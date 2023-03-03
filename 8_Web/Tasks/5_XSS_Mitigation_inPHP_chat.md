# XSS Mitigation in PHP chat
## Findings playing around with the chag

Finding a)
Message that is echoed can be passed via url (GET) or via From submit (POST)
https://1991a88e-f8fc-49ed-9013-48afd4a220da.idocker.vuln.land/chat.php?message=blabla

Finding b) There is no html encoding at all

## Fixing php code with html encoding
Using htmlentities in 'chat.php' (see https://www.w3schools.com/php/func_string_htmlentities.asp )
```
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	echo htmlentities($_POST['message']);  //Output: myquery
	} else {
	echo htmlentities($_GET['message']);  //Output: myquery
	}
```

## Security questions

1. please explain the vulnerability
    - there is no Html encoding at all. The entered user input is just echoed without encoding, so if we pass valid html/js it is executed. 
2. please explain how you fix the problem in chat.php
    - HTML encode the user input that is echoed on (renderd into) the page using the function/method htmlentities
3. what if you could not fix the source code?
    - 1. Set the Content Security Policy (CSP) headers to disallow inline scripts. 
        - It is usually (??) possible to control the response headers by configuring the webserver. 
    - 2. WAF (Web application firewal) to reject (or sanitize) suspicious requests
