# DNS over Http Answers

1. what is the difference between interactive and detached docker daemons¨
    - detached means it runs in the background as daemon (and user returns to bash)
2. explain the dig command that has been used in the exercise above. What does it mean?
    - From the point of view of dig, dig sends a normal DNS request to the configured dns resolver, which here happens to the be docker service on localhost:5380. Dig is oblivious of DNS over http. 
3. is it possible to filter packets with tshark. How can you filter dns and https packages?
4. what is the command for listing docker images
    `docker images`
5. what is the command for listing running docker container?
     `docker ps`
6. would it be possible running a dns tunneling attack using this approach? explain
    - yes it is possible. When using DOH, the DNS protocol is still used by the DOH server which transforms DOH queries into DNS queries (and vice versa for the answers.)


### varia
DNS tunneling attack: use the dns protocol to tunnel data of other programms/protocol in the payload of DNS queries and responses
- https://www.cloudns.net/blog/dns-tunneling-attack-what-is-it-and-how-to-protect-ourselves/ 
- https://www.infoblox.com/glossary/dns-tunneling/
- https://www.computerweekly.com/de/meinung/Was-ist-eigentlich-DNS-Tunneling