# XSS Dom based

## Steps

### Step 1: trying to find vulnerability
Searching for places where a) url is referenced in JS (location) b) we manipulate the dom  (createElement, document, $html etc.)

Found in start.html line 166 ff:
```
$(window).on('hashchange',function(){ 
    var loc = decodeURIComponent(location.hash.slice(1));
	$('#locationName').html(loc);

```
### Step 2: Exploit
Simple pass the following script in the url: `<script type='text/javascript'>alert('got yaa')</script>`
Url to exploit: `https://9cce0bc0-801d-4092-b6ef-2cecc586a8d8.idocker.vuln.land/start.html#%3Cscript%20type='text/javascript'%3Ealert('got%20yaa')%3C/script%3E` (passed js is executed)

### Step 3: fix this vulnerability
Fix the unsafe usage of the JQuery .html('any contented here is not html encoded') by replacing it with .text(
```
    var loc = decodeURIComponent(location.hash.slice(1));
	$('#locationName').text(loc);

```
*Generally, $.text should be used (unless you really inject sanitized html).*

### Remarks
Other parts like the load-what-we-do.js are probably also exploitable as html is put together from data and not encoded. Since data cannot be influenced is might be safe but it is not ideal at all. 


## Security questions
- Explain the meaning of # in the URL
    - It changes the url but doesnt trigger a reload (aka call to the server) and the part after the # (URL fragment identifier) is NOT sent to the server
- Explain the difference between Stored XSS, Reflected XSS and DOM based XSS
    - Stored XSS: the malicious code is stored on the server. It is probably the most dangerous as any visitor to the site will be get exposed to the malicious code
    - Reflected XSS: Malicous code is sent to the server where it is used to generate the js/html that the user sees. However, data is not stored, so only the user actually visiting the site with that particular url is exposed to it. 
    - DOM based XSS: JS script code that modifies the DOM and these modifications can be influenced by user input / or url. The code doesn't need to be sent server and can thus avoid detection. Often the "#" in the url is used but I believe other other user input could be used as well (especially in single page applications) 
- Explain the fix in the last step
    - I use a function that encodes the passed string. In JQuery this is .text(). (Vanilla JS has similar functionality, innerHtml versus innerText)
