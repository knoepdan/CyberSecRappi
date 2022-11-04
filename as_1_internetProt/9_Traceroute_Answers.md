# Traceroute assignment

### Answers

**traceroute icmp www.ost.ch**
- Command: `traceroute -M icmp www.ost.ch` 
- Results and comments: 
    - No result from virtual machine (hacking lab) and windows machine (in different networks)
    - Conclusion: ICMP packages are blocked (ping which is based on ICMP wont work either)

**traceroute www.ost.ch using tcp and ANS resoultion**
- Command: `traceroute -M tcp -p 443 -A -n www.ost.ch`
- Result:
    - 1  192.168.127.2 [*]  0.259 ms  0.119 ms  0.111 ms
    - 2  146.136.105.95 [AS559]  10.464 ms  11.999 ms  12.108 ms
- Comments: 
    - Http servers (ports 80 or 443) should be reliably tracerouted via tcp on that port (I believe)
 
**traceroute nameservers via udp on port 53**
- Nameserver 1
    - Command: `traceroute -M udp -p53 ns1.compass-security.com`
    - Result: 
        - 1  192.168.127.2 (192.168.127.2)  0.143 ms  0.053 ms  0.126 ms
        - .....
        -  7  * * *
        -  8  grobi.compass-security.com (193.135.215.40)  5.518 ms  8.700 ms  8.556 ms
- Nameserver 2
    - Command: `traceroute -M udp -p53 ns2.compass-security.com`
    - Result: 
        - 1  192.168.127.2 (192.168.127.2)  0.143 ms  0.053 ms  0.126 ms
        - .....
        -  8  * * *
        -  9 urb80-74-140-181.ch-meta.net (80.74.140.181)  4.045 ms  3.895 ms  3.783 ms

- Observations: 
    - port doesnt have to be specified because port 53 is default for UDP (DNS default port). However, it seems that  `traceroute ns2.compass-security.com` is not working because it doesnt use 53. 
    - In Wireshark, it is possible to assign the responses to the (malformed) DNS requests using the port numbers.  it is possible to assign the responses DNS respones. 
    - There are no hops in between. The destination address (e.g. namesserver 2 80.74.140.181) answers for all udp request. (not sure what the line that count up to 9 in the bash traceroute result mean, it also doesnt match with the nof sent packages or the TTL counter). 


### NOTES (arbitrary)
IP of my machine: 192.168.127.154/24 