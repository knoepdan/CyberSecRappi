# Wireshark TLS sniffing


### Answers

1. what is the ip address of the outgoing proxy?
    - Answer: Proxy IP is 212.254.178.
        - Webserver: 212.254.178.176  (see HTTP CONNECT)
        - Client: 192.168.100.85
2. what was the http response from the first tls package to the tls server?
```
    HTTP/1.1 200 OK
Content-Type: text/html
Accept-Ranges: bytes
ETag: "-2065408151"
Last-Modified: Fri, 13 Nov 2009 13:16:34 GMT
Content-Length: 157
Date: Fri, 13 Nov 2009 13:23:35 GMT
Server: osiris.csnc.ch


<html>
<head>
<title>Protected</title>
</head>
<body>
This is the SSL/TLS protected web page.
<br>
You have completed this lab successfully.
</body>
</html>
```

3. why would this approach NOT work with PFS enabled tls ciphers? (PFS = Perfect Forward Secrecy)
    - Answer: even with the private key (stored in pem file) it is not possible to retrieve the session key used to establish the TLS connection. 

### Varia

**TLS workflow**
https://www.paessler.com/it-explained/tls
https://tls12.xargs.org/

**PFS (Perfect Forward Secrecy)**

https://en.wikipedia.org/wiki/Forward_secrecy

**Proxy, TLS and HTTP**
https://en.wikipedia.org/wiki/HTTP_tunnel#HTTP_CONNECT_tunneling

https://security.stackexchange.com/questions/115762/how-is-it-possible-to-do-tls-through-proxy-without-anyone-noticing