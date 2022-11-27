# Webapps

### Architecture notes
- *see powerpoint for diagrams. What is written here is simplified*
- *Normal firewalls (not "Web application firewals (WAF)") are always assumed to exist between browser and webserver. 

**E-Banking architecture**
Browser  - WAF (Authentication) - Webserver (with its own session)

*Authentication happens at the WAF, which also keeps server side WAF session*


**Microservice (Netflix) architecture**
Authentication happens via Identity provider (IdP) like OAuth, OpenID Connect. 
Multiple instances of the application (WAF between loadbalancer and webservers)

### HTTPS
Structure Request: 
- Method, URI, Protocol (version)
- Header
- Body (can be empty. e.g for GET)
Structure Response: 
- Response Status  (Status code)
- Response Header
- Body (Html or json etc.)

### Redirects etc.
Pattern: From post -> server redirects (302) to a get  (otherwise backbutton would resend post: "back button relogin vulnerability". With 302 redirect, browser will clear sent data in memory)

Type of redirects (besides link clicks): 
- HTTP status 302 (url location is then in header)
    -  browser will then do a redirect and set Referer (for example to generate income for adds)
- Response header: "Refresh: 0; URL=http://other-site/" (status code 200)
    - Legacy.. (no longer done this way)
- in page:  metatag: "Refresh"
    - rarely used (e.g. news site that should refresh but may not rely no JS)
- javascript in app: documentation.location=...

### Session
Types: 
- Server state: server keeps session state (but sessionId needs to be passed)
    - SessionID can be in URI, Post payload (not common)
    - SessionID in header (common)
        - Cookies
        - NTML Header
        - Basic Auth Header
        - Digest Auth Header
- Client state: nothing on server, every request/response sends state 
    - server must check session (expiration, validity, authorization)
    - for example JWT (almost always JWT maybe)
    - Advantage: scaling


**Session fixation attack*
Special form of session hijacking where attacker is able to make user use his session but then user logs in and attacker can act with permissions of user (Cannot image there are still sites vulnerable to this session after authentication may not change and i think it works only with urls)



### Logfiles
Client (Browser)
- Temporary internet files
- History cache (url)
Proxy (common)
- access.log (Url)
- error.log
- referer.log (refer: where is visitor coming from)
Server (common)
- access.log (Url)
- error.log
- referer.log (refer: where is visitor coming from)
Generally, Urls end up in logs, so no sensitive data should be in url (never use GET for sensitive data, sensitive data must be body (e.g. in a POST request))

### Notes varia

Network firewall: mainly checks (and allows) ports and maybe protocols
WAF: Web application firewal: nows http protocol


Tools to see https requests (via proxy)
- Zap (Linux live CD)
- Burp (Linux Live CD)
- Fiddler (windows tool)