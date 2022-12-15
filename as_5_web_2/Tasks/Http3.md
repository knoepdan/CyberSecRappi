# Http3

Http/3 is based on UDP (not TCP) and is based on QUIC. 

 https://http3-explained.haxx.se/en

### Answers

1. QUIC uses UDP instead of TCP for data transport. Why is data transport faster using UDP compared to TCP?
    - UDP doesn't require a 3-way handshake and there is no need to acknowledge packages. (plus UDP has less overhead compared to TCP but I don't know how much overhead is added by QUIC)
2. How can a browser using HTTP/3 guarantee that the HTTP requests and responses are completely received by the other party when UDP is not a reliable protocol?
    - QUIC adds a layer on top of UDP wich ensures relyability. 
3. What head-of-line blocking problem is solved with HTTP/3 compared to HTTP/2 and why is this important when you have a bad network connection with many packet loss?
    - HTTP/2 only needs one connection for multiple http request. When now one TCP package drops on the network, all these http requests are blocked as retransmission has to be awaited (http 1.1 might even perform better as when one package drops cause other http requests don't need to wait as they have their own tcp connection). 
4. What HTTP response header is used by the server to indicate that the server supports HTTP/3. Provide the full header string.
    - Alt-Svc: h3-29=":4433"; ma=3600, h3-27=:4433"; ma=3600


**Notes**

- Http/3 didnt really work https://quic.rocks:4433  (always got the msg that http 1.1 was used. Tried with different browsers/OS plus checked at least if FF if http/3 was enabled)
- `wireshark -o ssl.keylog_file:/home/hacker/Downloads/h3-pcap/h3.keys /home/hacker/Downloads/h3-pcap/h3_demo.pcap` -> open wireshark with htt3 via bash (or just open Wireshark and open file by hand and choose key file)