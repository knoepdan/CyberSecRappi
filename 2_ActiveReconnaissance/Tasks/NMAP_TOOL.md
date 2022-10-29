# NMAP
### basics

Nmap (Network Mapper) is a free and open-source network scanner for active reconnaissance. 
- identify hosts and network topology
- identify open ports and services
- test configuration of services 

https://nmap.org/book/man.html  (offical page, manual)
`nmap -h` -> help

ATTENTION: for some stuff, one has to be root. In a non root bash, NMAP will just do what it is allowed to


### Host discovery
Detect if host is up. 
- "-sn" PING SCAN  (to be run as root !!!)
    - `nmap -sn 212.254.246.115` 
    - `nmap -PS22, 80,443 -PA80,443 -PE -PP 212.254.246.115`  (should do same thing as above)
    - will send
        - PE ICMP echo reqeust
        - PS -> SYN
        - PA -> ACK
        - PP ICMP timestamp
- "-sL"  -> DNS reverse lookup (over ranges)
    - `nmap -sL 80.74.140.133-135`  (for ranges or networks 80.74.140.133/24)
    - Check if hosts have DNS entries (similar to "dig -x 'IP' but allows ranges )
- "-PR"  ARP scan  (not officially listed)
    - `nmap --n -sn -PR 192.168.75.132/24`  
    - Can only work in local network (because of ARP protocol)
- "-PU" UDP
    - will send a UDP package to port 40125 (default, can be configurable) and expects "ICMP port unreachable" message to be sent back. NMAP considers a host as ONLINE if msg is sent back. 
    - ATTENTION: if a firewall is in between, maybe nothing is returned even if host is online
    - Udp scanning tends to be unreliable as there is no handshake. 

### Port scanning




WHEN happens this???
> Clients sends SYN  (server will respond with SYN, ACK). Then Client sends RESET without sending an ACK first. Sender will still wait for TCP connection to be acknoledge (despite client sends reset !!!), so will have to wait for timeout. (could be used for a kind of DOS attack as server needs to keep keep track of open connections )


### Varia

**Ping**
- ping sends ICMP Echo requests and waits for ICMP answer

**TCP basics**
3 way handshake
1. Clients sends SYN (initial sequence no )
2. Servers responds SYN (in ACK field: initial seq no + 1)
3. Client acknowledges answer from server (ACK -> seq no of servers respnse + 1))
Remark: anknowledge field returns the sequence no + 1 (could be interpreted as, this is the next seq that is expected)

Important Control Bits in TCP header 
- SYN  -> for connection build up
- ACK  ->  acknowledge field contains valid value
- RST  -> reset connection
- FIN  -> no more data to send
Remark: these are flags/bits. In the same header/package, more than one bit can be set (see connection build up)


**Info**
- nmap "-sn" was known as "-nP" (some ressources on the internet still show the old np param)