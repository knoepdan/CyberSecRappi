# IP Spoofing assignment

### Answers

**Explain the idea of ip spoofing**
IP spoofing is when the the Source IP of the IP header, does not reflect the actual IP source address the IP package is originally sent. 

**Is this a realistic attack over the internet with TCP/IP - explain**
It seems more difficult to launch a meaningful attack using IP Spoofing via TCP/IP. Reason is that the 3 way handshake wont be successful. (and even if it was, the sequence numbers of the TCP packages would make it detectable that something is wrong)

**Is this a realistic attack over the internet with UDP/IP - explain**
Yes, if a UDP protocol (example DNS) is used that triggers a response a denial of service attack is possible as the machine whose IP we use as spooked source address, will be flooded with answers. 

**What are the destination addresses of the spoofer tool (see in Wireshark)**
some spoofed source addresses: 
- 6.1.2.3
- 172.16.1.100

(some) destination addresses (with some reverse lookup): 
- 139.18.11.241  (caida.uni-leipzig.de)
- 192.42.115.98
- 192.172.226.247
- 78.41.116.2  ( rasberry-caida)
- 192.107.171.130
- 128.232.97.9 (monitor.ark.caida.cl.cam.ac.uk)
- 128.223.157.13 (ark.uoregon.edu)

I assume the destinations are designed not to answer to the source IP. 

**What protocol is the spoofer tool trying to spoof?**
DNS, (maybe because it triggers an answer???)

**Do you find your own results on https://spoofer.caida.org/recent_tests.php**
No, it seems that the router already does packet filtering and will not let he spoofed packages pass. 




### NOTES (arbitrary)
IP of my machine: 192.168.127.154/24 