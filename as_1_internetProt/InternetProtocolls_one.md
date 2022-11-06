
# Internet protocolls

### Networking fundamentals

- computers
  - tools: ssh, ftp, telnet, ping, traceroute
- content (via browser, http(s))
- People (social networks such as fb)
- things
  - MQTT (Message Queuing Telemetry transport)
  - Coap (Contraint application protocol)
  - DDS (data distribution service)
  - others (XMPP)
- Values (blockchains such as bitcoin, ethereum ) ??
- Life -> human machine interaction ???

Communication types
- Simplex -> one way
- half duplex -> both ways but never the same time (walkie-talkie)
- Duplex -> both ways (e.g. telephone)

Communication types 2
- Peer to peer  (point to point)
- Any to any (peer to peer networks)
- Multicast (broadcast)  (e.g. radio)


### OSI

7 Layers but often 5-7 are treated as one (application layer).

![Osi layers](OsiLayers1.png)

ARP: allows to map IP to MAC addresses.
ICMP: packages are sent within the data segment of an IP package. (as such they would belong to the same level as UPD/TCP). As it is so strongly connected to IP, it can be considered to be on the same level.


![Osi layers](OsiLayers2.png)

Layers a bit more detailed. Naming is a lot like in Wireshark (e.g. frame)


### Border Gateway Protocol (BGP)
AS = Autonomous system. Part of the network (internet) that is under the same administrative domain (provider). An autonomous system has routers connecting it to another network. These routers usually implement the BGP protocol. (It is possible that there autonomous systems within an autonomous systems)
  - ASN: AS-numbers (originally 2 bytes, extension to 4 bytes)
    - Public AS -> are assigned a number: 1 - 64511 (2 bytes)
    - Private AS -> 64512 - 65535  (reserverd for private use, similar to private IP's)



Some terms
- EGP = Exterior gateway protocol -> BGP is the most commonly used type of EGP
  - example: BGB
- IBGP = Interior Border gateway protocol (forwards packets to another IBGP within the AS, which could implemnet EBGP as well)
  - examples:: OSPF, IS-IS
- EBGP = Exterior Border gateway protocol (forwards packets to routers (EBGP) of other autonomous systems )
  - used to exchange routing info between ISP's (Internet service providers)
  - ASN = 
BGP routers exchanging routing info via TCP connection (via Port 179) are called BPG peers (or neighbours). BGP uses various steps (11 steps) to determine best path. 

Originaly, while internet was initially thought to be hierarchical, by now AS connected more or less randomly to other AS (via BGP)

<div style="color: red">TODO go a bit deeper + add stuff about single-homed, dual homed etc. </div>



Links
- https://de.wikipedia.org/wiki/Border_Gateway_Protocol
- good video BGB: https://www.youtube.com/watch?v=LUmajjJEq24 


### Ethernet (OSI layer 2, Network layer)
- MAC address = "Media Access Control" addres
- 6 byte -> represented as 12 digit hexadecimal number
  - e.g.: "00:0D:88:3C:30:F9"
  - is unique world wide
  - sometimes called "LAN address", "Ethernet address"
- Unicast: One to one 
- Broadcast: to all participants (Broadcast address: "FFFF.FFFF.FFFF")

### ARP Address resolution protocol
To inform network about MAC-address/IP address pairs. 
Possible flow: 
1. Machine A: Broadcast ARP-Request "Who has IP "XX"
2. Machine B with IP "XX" answers Unicast to "A": My IP "X", my MAC: "Z"
  - Machine "A" knows now that MAC "Z" and IP "X" belong together
  - Switch/Bridge between these machines usually learns the MAC-addreses and can now optimize network flow (attention: some switches do IP routing and not just pure switches on layer 2)




### IP V4 (recap)

| Ip address / with subnet) | Subnet         | Subnet (binary)                                       |
| ------------------------- | -------------- | ----------------------------------------------------- |
| 192.168.0.23/24           | 255.255.255	.0 | 11111111.11111111.11111111. 00000000 (host part is 0) |

**TCP basics**
Important Control Bits in TCP header 
- SYN  -> for connection build up
- ACK  ->  acknowledge field contains valid value
- RST  -> reset connection (will neither accept nor recieve more data, abort connection)
- FIN  -> no more data to send
Remark: these are flags/bits. In the same header/package, more than one bit can be set (see connection build up)

Establish connection (3 way handshake) 
1. Clients sends SYN (initial sequence no )
2. Servers responds SYN and ACK in ControlFlags (in ACK field: initial seq no + 1)
3. Client acknowledges answer from server (ACK -> seq no of servers respnse + 1))
Remark: anknowledge field returns the sequence no + 1 (could be interpreted as, this is the next seq that is expected)

Terminate connection (normal)
1. Clients (or server doesnt matter) sends FIN
2. Server: Sends ACK (for initial FIN)
3. Server: Sends FIN
4. Client: Sends ACK (for FIN)

Terminate connection with RSP (half open, error case)
- Examples: 
  - When a TCP non SYN package is received but no connection is open 
  - When sequence numbers are not valid
  - When SYN is recieved on a non open port



**ICMP (helper protocol)**
- Used to send information about network
- ICMP messages don't (!) cause another ICMP message being sent (exception:  echo used in ping)
- Example: 
  - Type 3, code 1: target host not reachable
  - Type 3, code 3: target port not reachable
  - Type 5, code 1: redirect (target-host)

**Varia IPV4**
- private addresses: some address areas (10.0.0.0-10.255.25.255 or 192.168.0.0-192.168.255.255 and others ) are reserved for private IP Addresses.
- Zeroconfig: private IP-Adresses are calculated via MAC-address (and random nr) and then advertised via ARP. Mechanisms to ensure uniqueness in places (sort out collisions).  
- 127.0.0.0/8 (127.0.0.0-127.255.255.255) .> Loopback 
  - 127.0.0.1 -> localhost (most commonly used)



### DNS (Domain name system)

1. Example: with "www.amazon.com"  (assuming no caching involved (first request))
2. Client: asks 'his' provider DNS 
   1. provider DNS will ask root server to find "com" DNS server
   2. provider DNS will ask "com" DNS server to find amazon.com DNS Server
   3. provider asks amazon.com DNS to get IP for "www.amazon.com"



Types: 
- Open Resolver DNS (OpenDNS)
  - google's public DNS (8.8.8.8 and 8.8.4.4)
- Closed Resolver DNS
  - provider DNS (will reject requests from other networks)
- Top-level domain servers (TLD)
  - top level domains: "com", "org" and country domains: "ch", "uk" etc.
- Root nameserver
  - knows TLD servers
  - are hardcoded
- Authoritative DNS servers
  - responsible for his own zone
  - only answers to queries about domain names configured by admin
- Local name server
  - every ISP (internet service provider, + companies, universities..) has a local server "default name server"
  - a host's DNS query will be sent to the local DNS which acts as proxy


Good site:   https://www.whatsmydns.net  (lookups several dns servers worldwide, good to check if ip changes propagate)

DNS records:
- Type "NS"   (nameserver)
  - name domain (e.g. 'foo.com'), value: hostname of authoritative ns
- Type "A" (most common)
  - name is hostname, value IP
- Type "CNAME"  (alias)
  - name is alias, value is 'real' name
- Type "MX" (for mailservers)
  - value is mailserver associated with name 
- Type "TXT" -> just text 
  - can be any text (many nameservers have a size limit though)


Tools: 
- nslookup
- dig (linux tool)
  - `dig www.ost.ch`  (using default, local ns)
    - similar to `nslookup www.ost.ch`  (nslookup returns shorter answer) 
  - `dig @8.8.8.8 www.ost.ch`  (using public google ns)
  - `dig @8.8.8.8 www.ost.ch +short`  (+short reduces the visible response)
  - `dig ns ost.ch`  (will return name server of ost.ch)
  - `dig mx ost.ch`  (will return mail  server of ost.ch)
  - `dig -x 146.136.105.52`  reverse lookup (IP to domain name)
  - `dig -t axfr @dns01.ost.ch ost.ch`  DNS zone transfer (dum all the host in the dns (of ost.ch)
    - usually not allowed
  -  `dig ost.ch ANY +short +trace`  DNS request for any record
     -  https://ns1.com/blog/using-dig-trace
     - we will see all the recursive steps the local dns takes (a bit hard to distinguish though)

**DoH: DNS over HTTPS**
Goals: security as encryption provided by https, plus increased performance. 
some servers: https://cloudflare.dns.com/dns-query or https://dns.google/dns-query


Examples: 
- `curl -s -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=ost.ch&type=A' | jq .`
  - query for record type 'A' (normal entries)
- `curl -s -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=ost.ch&type=NS' | jq .`
  - query for Record type 'NS' (name server)
  

**DNSSEC**
DNSSEC: Domain Name System Security Extensions
Number of standards extending that extend DNS to ensure authenticy and integrity. DNSSEC does NOT encrypt messages.

Each (authoritative) DNS zone has one or more key-pairs for signing. It will sign the entries so the reqeuster can verify the integrity and authenticity via public key (public key is accessible as DNSKEY resource record, signatures accessible as RRSIG resource record)

<span style="color:red">TODO Check how keys are delegeated ??</span>

Dig queries 
  -  `dig ds switch.ch +short` 
  -  `dig dnskey switch.ch +short` 

Good link to analyze DNSSEC: https://dnssec-analyzer.verisignlabs.com

**DNS fingerprinting**
<span style="color:red">TODO Not fully clear? what is this</span>
Examples 
 `fpdns ost.ch`   (not installed on vm)

**DNS Reverse Host name mapping**
Allows identification and purpose of a target
- `nmap -sL 146.136.105.24-55`

<span style="color:red">TODO not fully clear</span>

**DNS Name Brute-Forcing**
- `fierce -dns ost.ch`  (does not work on VM, maybe incorrect statement)
From my understanding, just getting all the info from a DNS. 
Will first try a zone transfer (which probably fails) and afterwards trial and error. 

**DNS Enumeration**
Popular reconnaissance techniques to gather detecting and enumerating all possible DNS records from a domain name. 
- Tools
  - sublist3r
  - `subfinder -d compass-security.com` (not installed on VM)
  - `amass enum -d compass-security.com` (installed on VM, but seemed to have failed for some reason)

  Link:  https://securitytrails.com/blog/dns-enumeration

### DNS Attacks

**Spoofed DHCP to DNS Update**
Sceanario: Network consists of DHCP-Server + DNS Server. 
Attack: Attacker sends DNS Update packages to DNS server faked (spoofed) source IP from DNS server


**DNS man in the middle**
Examples
- Victim computer is using a rogue dns server
- Vicitm computer is connected to a rogue wifi access point
- provider is intercepting dns request/responses 











