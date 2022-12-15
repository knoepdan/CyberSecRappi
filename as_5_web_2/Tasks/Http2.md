# Http2


https://http2-explained.haxx.se/

### Answers

1.  Why does Chrome establish less TCP connections with HTTP/2 than with HTTP/1.1?
2.  How is it possible to "transfer" information like a user-agent header which is often longer than 100 characters from the client to the server using only a single byte?
3. How are the 3 fields method, uri (also called path) and protocol be sent in the HTTP/2 protocol? What is the difference here to the HTTP/1.1 protocol? To answer this question search for the fields in your h2.pcap file using Wireshark.

### record http 2 traffic

**Root shell**
`tcpdump -i eth0 host www.ischi.net -w /home/hacker/h2test/h2.pcap`
-> capture network traffic (in pcap file)

**User shell**
`SSLKEYLOGFILE=/home/hacker/h2test/h2.keys google-chrome https://www.ischi.net/ost/h2.php`  -> start chrome and load website with keys 

**Findings**
-> Ctrl-C to stop capturing network traffic
- file h2.keys is created
- file h2.pcap is created 
> now we can analyze traffic in wireshark


### record http 1.1 traffic

**Root shell**
`tcpdump -i eth0 host www.ischi.net -w /home/hacker/h2test/h1.pcap`
-> capture network traffic (in pcap file)

**User shell**
`SSLKEYLOGFILE=/home/hacker/h2test/h1.keys google-chrome --disable-http2 https://www.ischi.net/ost/h2.php`  -> start chrome and load website with keys 

**Findings**
-> Ctrl-C to stop capturing network traffic
- file h1.keys is created
- file h1.pcap is created 
> now we can analyze traffic in wireshark

