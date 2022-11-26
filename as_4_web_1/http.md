# HTTP

### Use command line tools

**Create a little webserver**
`while true; do cat http_response.txt | nc -l 8000; done` -> make a little webserver (returning content of http_response.txt)

**Access http via telnet**
`telnet www.ost.ch 80` -> start telnet session (only works with http not https)
    - then enter: 
```
GET / HTTP/1.1
Host: www.ost.ch
``` 
press enter twice to mark end of response afterwards and see response


**Access https via openssll**
`openssl s_client -connect www.airlock.com:443 -crlf` > https site and then enter/paste: 
```
GET / HTTP/1.1
Host: www.airlock.com
```  
press enter twice to mark end of response afterwards and see response



**URL**
{Scheme}://{Authority: domain + port}/{path}?{Parameters}#{Fragment}

Note: Fragement is not sent to the server
Parameters: Query..



