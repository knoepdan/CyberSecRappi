# Same Origin Policy (SOP) 

### Same origin

Browser is not allowed resources of different origin. 

Same origin when: 
- Protocol
- Hostname  (domain)
- Port 


Non-hierarchical schemes or sandboxed documents use the "Null origin" (their origin is null.) Example: andboxed iFrames, URI's


 ### Bypass same origin

**Script tags from different origin**
is allowed. Problem: scripts are from a different origin and can do anything.
-> not a good idea as we have no control over script


**Images**
img.src does not apply same origin

**Cookies**
Cookies do enforce same origin by hostname(domain) but not by port.  (previously also not on protocol but this has changed).
Secure cookie flag helps as it will only send the cookie via https (encrypted)



**Websockets**
are NOT bound to SOP. 
How to protecte against it: 
- check origin header of websocket request
- use something like CSRF-Tokens

**JSONP**
JSOPN with callback function. Example: 

HTML in browser
```
<script>
function myFunc(myObj) {
  // do something
}
</script>
<script src="demo_jsonp">
```
serverside stuff loaded via script tag (passing json to a function which has to be defined on the client)
```
myFunc({"name": "John", "age":30}); 
```
Not secure as we reference script that is not under our control.

### Bypass with CORS0

**Simple or complex (with preflight)**
Simple requests: don't trigger preflight
Complex requests: trigger preflight

Simple request is: 
- either "GET", "HEAD", "POST"
- only contains the following headers: "Accept", "Accept-Language", "Content-Language", "Content-Type"  and headers set by the user aggent (Connection, User-Agent etc. see link) 
  - also check: https://fetch.spec.whatwg.org/#forbidden-header-name 
- Content-Type may only contain: "application/x-www-form-urlencoded", "multipart/form-data", "text/plain"
- no event listeners 

more details see:  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS   

**varia**

Special case: with iFrame and Null origin. 


Header Origin -> is set by browser (basically which page request is coming from)


 ### Questions

 <div style="color:red">Requests to different origins are allowed? (but not allowed to access resources?). 
 This would allow the potentially trigger harmful requests..
 Example: site is hacked to trigger harmful requests. User that is in intranet visits site and harmful requests are triggered (probably: post etc. is not ok : see preflight requests.. get is ok to send as this is considerred not changing data)
 </div>
