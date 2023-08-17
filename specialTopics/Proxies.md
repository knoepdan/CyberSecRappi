# Proxies

### Basics

- (forward) proxy
    - client access proxy to access the internet
    - e.g: pc in company network access websites via proxy
- reverse proxy
    - internt clients access machines on your network.
    - used for security, load balancing... etc. (also for online phishing)

Other terms
  - Socks7/5 proxy. Proxy will just forward anything
    - sender is not visible (as sender address will be from proxy)
    - Tor network uses Socks4/5 proxies..
    - *(not sure if there is a Socks7 proxy or if this was just a typo)*


**Proxy, TLS and HTTP**
https://en.wikipedia.org/wiki/HTTP_tunnel#HTTP_CONNECT_tunneling

https://security.stackexchange.com/questions/115762/how-is-it-possible-to-do-tls-through-proxy-without-anyone-noticing


### References to lab tasks (may not be conclusive)

- alpine-apache-2-reverse-proxy
  - To redirect requests (see man-in-the-middle lab tasks)
  - https://github.com/Hacking-Lab/alpine-apache2-reverse-proxy.git