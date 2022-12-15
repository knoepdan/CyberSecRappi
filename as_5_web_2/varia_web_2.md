# Varia web 2

### SQL and no sql 
https://www.db-fiddle.com/  -> sql playground
https://medium.com/nerd-for-tech/sql-vs-nosql-faef10e3852d
https://mongoplayground.net/  no sql playground


### SPA with Angular 

MongoDb with nodeJs
https://www.bezkoder.com/node-express-mongodb-crud-rest-api/


### Serialization

Task was to play around with serialization using PHP and JAVA. 
Finding is basically that serialized data is not to be considered encrypted or somehow sure data. It can be changed when accessible. 

**php**
format is binary but can look a bit like json if only asci characters are present
Deserialize:  There seems to be a function "unserialize" which takes a string a sthe first argument
Serialize: function "serialize"
https://serializededitor.com/  tool to play around with php serialization



**java**

Java Web-IDE: 
- https://www.tutorialspoint.com/compile_java_online.php  
- http://tpcg.io/6PGz04Ku 



Sometimes used in combination with serialization: https://www.base64decode.org/


### HTTP 2

Some of the main features  (see wikipdia): 
    - data compression of HTTP headers
    - HTTP/2 Server Push
    - prioritization of requests
    - multiplexing multiple requests over a single TCP connection (fixing the head-of-line blocking problem in HTTP 1.x)

https://http2-explained.haxx.se/

https://blog.cloudflare.com/hpack-the-silent-killer-feature-of-http-2/  (header compression)


### Varia (unrelated but maybe interesting)
https://search.censys.io/search?resource=hosts 
https://www.shodan.io/   crawler (site was not accessible when I tried 14.12.2022)