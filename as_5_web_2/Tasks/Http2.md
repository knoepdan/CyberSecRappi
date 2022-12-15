# Http2


https://http2-explained.haxx.se/

### Answers

1.  Why does Chrome establish less TCP connections with HTTP/2 than with HTTP/1.1?
    - Answer: HTTP/2 can reuse a TCP connection. 
2.  How is it possible to "transfer" information like a user-agent header which is often longer than 100 characters from the client to the server using only a single byte?
    - Answer: header compression feature of HTTP/2 (HPACK). For a user-agent header 2 compression methods are (probably) applied: a static dictionary where the key (user-agent) matches a short value that is sent. For the long header value ("Mozilla/5.0...."), a dynamic dictionary is filled from previous requests (of this connection) which allows to send the short value of the dynamic dictionary. From my understanding, for the first request, it is probably not possible to compress the user-agent header to one byte as the dynamic dictionary is not yet filled (and a less effective compression is applied for the header value) 
3. How are the 3 fields method, uri (also called path) and protocol be sent in the HTTP/2 protocol? What is the difference here to the HTTP/1.1 protocol? To answer this question search for the fields in your h2.pcap file using Wireshark.
    - Answer: from a formating point of view, these fields are treated as any other header in http/2. Besides that http/2 is a binary protocol and applies header encrypting but these differences do not apply specifically to these fields. (*Not sure if this is the correct answer*) 

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
> now we can analyze traffic in wireshark (`wireshark -o ssl.keylog_file:/home/hacker/h2test/h2.keys /home/hacker/h2test/h2.pcap`)


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
> now we can analyze traffic in wireshark  (`wireshark -o ssl.keylog_file:/home/hacker/h2test/h1.keys /home/hacker/h2test/h1.pcap`)

### Notes to comparisons
With the tested website (many images) Http/2 header compressions is more effective (relativly) for the request as they don't contain a lot of data whereas the response contains big images so header compression not visible at a quick glance.