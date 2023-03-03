# Cross-site request forgery (XSRF) CAS Cyber Security OST
## Infos

**Attacker site:**
Url: https://1c932c76-d03d-431c-830f-295134131fee.idocker.vuln.land/xsrf.html


Contains the following html code "https://463904a3...." is the domain of the shop)
```
	<img src="https://463904a3-5b93-4c83-a837-293aa61898e6.idocker.vuln.land/12001/inputval_case2/inputval2/controller?action=addproduct&productId=2&=&quantity=13&Submit=Bestellen" width="1px" height="1px" />
```
When a user now accesses this site a GET request is triggered as the site tries to load the images. However, in this particular case the requests tries to execute an order and if the user is authenticated at the moment the session cookie will be sent and the order is actually executed. 


## Security questions

- Explain the security problem
    - The attack site will execute a request to the shop that tries to execute an order. When the user visiting the site is authenticated, his session cookie is sent with the request and the order is actually executed. (XSRF attack). Underlying problem is that cookies are bound the the domain/site that created them and are implicitly sent for each request.  
- Explain the exploit
    - When authenticated, the cookie for the site is sent with each reqeust, irrespective of the origin of the site (aka it doesn't matter which site the request is coming from)
- Explain mitigation (how this can be fixed)
    - XSRF Token
        - To allow an action to be executed, an additional, random token has to be sent with the request that will then be checked serversside. Token has to change for each session. 
        - It is important that the XSRF token is not sent implicitly by the browser, meaning browser doesn't automatically sent the token. The implicit sending of cookies is what makes the XSRF attack possible in the first place so it is important that we XSRF token is sent to the server another way. 
        - Can be integrated in the app but also a WAF can inject the token into GET requests and block POST requests without it. 
    - Same Site flag with strict for Cookie. 
        - Cookie would not have been sent in such a case. Attention: Strict is important as it is a GET request that executes the order.
    - CORS and NON simple request (not a GET request and not a simple POST)
        - The application would have to be changed to ensure actions are only executed with NON-Simple requests (meaning no GET requests and no simple POST requests). With that, the malicious request would send a preflight request to the shop site which then would deny the request (if configured correctly). 
        - Generally it is a bad idea to have GET reqeusts execute actions (simpel post request are also not ideal but a bit better) as links can easily be placed on a random site. 
        - Since browsers do not send ORIGIN headers for image requests, it would not be possible to distinguish a malicious request from a normal, same site orign requests for this particular site. (shop would have to be reprogrammed to use post requests)
            - Exact rules for ORIGIN headers seem to be quite complicated:      - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin
        - I guess this approach works best if api is in a different subdomain as actual site as then we should always have an ORIGIN header that can be checked (as explained in slides)