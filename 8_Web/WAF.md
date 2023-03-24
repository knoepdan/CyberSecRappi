# WAF Web application firewall
Term that is often used: WAAP (Web Application and API Protection)

Web application irewall is a specfic form of firewall that filter, blocks and monitors web traffic.


**Common infrastructure** (see pdf)
     User/Browser  ->   Firewall1  -> WAF (in DMZ)  -> Firewall2  -> Application
(configured to ensure that traffic will go through WAF)


## WAF Evasion
Tricks: 
- modify content-Type
- IP != Host nameSNI
- modify the X-Orig... 
- Some WAF's block depending on previous user session (to reduce false positives): can be evaded by clearing request info (IP, etc.)
- Path evasions (e.g. /path/admin -> try different casing /path/AdMin )
- Response Splitting Attach / HTTP Header injection -> response headers contain some data that come from the request. For example: \n\n in a header might  make WAF consider end of header even if this is not the case
- Request smuggling
- etc.
- Filter evasion Techniques
    - Nested encoding : 
    - Invalid UTF-8 encoding
    - exploit lax parsing of HTML  =>   <a href="j a v as<vertical tab>cript:alert(1)"  .. ( something like this is actually executed by browsers :-( ))
    - diferent dialets
        - http://www.jsfuck.com


-> see PDF


### Possible problems
- Regex Denial of Service (ReDos)
    - some filter rules with Regex that use regex can cause huge memory and CPU consumption
        - mitigation: check the Regex (and test it)


### Machine learning
Trained with common request. 
Unusal request can be detected and might be blocked.



**Some features** (see pdf)
- CSRF tokens
- authentication
- etc. etc.


### Varia/Notes

- Netwwork firewall works on the network layer (port etc.)

- bounty program  -> find ways to bypass WAF and improve it 
    - https://hackerone.com/airlock