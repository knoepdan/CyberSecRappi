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
Cookies do enforce same origin by hostname(domain) but not by port or protocol.
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

**CORS**


Special case: with iFrame and Null origin. 


 ### Questions

 <div style="color:red">Requests to different origins are allowed? (but not allowed to access resources?). 
 This would allow the potentially trigger harmful requests..
 Example: site is hacked to trigger harmful requests. User that is in intranet visits site and harmful requests are triggered (probably: post etc. is not ok : see preflight requests.. get is ok to send as this is considerred not changing data)
 </div>
