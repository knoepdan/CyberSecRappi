
# DHCP

DHCP=dynamic host control protocol

### Basics

Workflow (all via UDP, DHCP listens on port 67, client source is port 68)
1. Client: On startup: sends broadcast: where is the DHCP server (Discover)
2. DHCP Server:  answers: I am the DHCP server and here are my params. (Offer) (allows client to check params)
3. Client: asks DHCP server: what is my IP address (Request)
4. DHCP Server: answers with the IP address that now belongs to client
-> now client knows what IP address it belongs.


### Varia
- DHCP server assigns the IP address from a configured range and keeps track which ones are already assigned. 
- client leases the IP address for some time. Upon shutdown, it )

A router can be configured: 
  - as DCCP server, as DHCP relay agent, as DHCP client
    - can all be configured at the same time. Example: Server relays some dhcp requests to another DHCP server but serves others and at the same time got its IP from another DHCP server.


Advanced stuff see pdf of hacking lab (like configuring a Cisco router)

Links
- https://youtu.be/sGuH-O2Yk98


### Linux distribution

`dhclient -r` -> will release current IP 
`dhclient eth0 ` -> linux command to request new IP address for interface "eth0"  (sometimes needed to release currently leased IP: "dhclient -r")
`ip route` -> helpful to see leased IP's

https://serverfault.com/questions/601450/dhclient-what-does-rtnetlink-answers-file-exists-mean