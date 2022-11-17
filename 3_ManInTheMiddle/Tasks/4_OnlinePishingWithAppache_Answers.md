# Http and HTTPS MitM Apache Reverse Proxy
### Answers
- explain the steps above. Explain what you did
    1. In the downloaded docker we run an apache reverse proxy which listens on port 80 and 443 (see docker-compose.yml)
         This proxy is configured via proxy-html.config (also see docker-compose.xml )
    2. the reverse proxy config (proxy-html.config) is now configured to make the it a mediator between the client and the other website (here pwspray)
        - client requests are forwarded to pwspray, which returns html which is then returned to the client
    - In reality the reverse proxy might have to rewrite links etc. as otherwise the user might redirect itself to the real webapp again. This is not done in our example. (maybe it would but password spray site has no links)
- explain the benefit of having a http to https reverse proxy in a phishing campaign
    - https with an invalid certificate triggers a strong warning in the browser which (hopefully) makes users suspicious. Http - equally or even less secure - doesn't trigger such a strong warning. (depends a bit on the browser)
- explain the benefit of having a https to https reverse proxy in a phishing campaign
    - With a valid certificate, users will usually trust a website. However, it might not be easy for an attacker to get hold of a valid certificate which cannot be traced back to it's origin (?). Possible advantage with an invalid certificate: a "man in the middle" attack might be harder to detect via automated network tools as traffic is still encrypted.
- explain how your reverse proxy online phishing could be advertised to a victim within the same network (LAN) over the internet
    - One common way to lure a user to a site is via email that contains a link. (not sure this answers the question) 

