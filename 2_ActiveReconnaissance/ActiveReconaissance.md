# Active reconaissance



### NMAP Scanning 
(Port and Service Scanning)

Portscanner = tool that tries to find via TCP/UDP 

NMAP
- Discovery phase (phase 1)
  - find which system (WLANS etc)
- 

- is also a small vulnerability scanner
  - can run some scripts to check 
    - example: small DNS
- OS detection: try to find OS


- output of a result can be saved (in different formats)
- Problem when googling: lots of obsolete examples 

`nmap -h` -> help
`man nmap` -> manual (scrolling with 'space' + 'u')

Banner grabing -> info about what

**TCP SYN-SCAN**
> Clients sends SYN  (server will respond with SYN, ACK). Then Client sends RESET without sending an ACK first. Sender will still wait for TCP connection to be acknoledge (despite client sends reset !!!), so will have to wait for timeout. (could be used for a kind of DOS attack as server needs to keep keep track of open connections )


**Reverse lookup**
`dig -x 80.74.140.133` -> reverse lookup 
`nmap -sL 62.12.137.224-255` -> reverse lookup over range (also possible to use ip range notation)
`nmap -sL 62.12.137.224/24` -> reverse lookup

**ARP scan (scan on level 2, local network)**
`nmap -n -sn -PR 192.168.2.0/24 -oA nmap_arp_scan` -> ARP scan  


**UDP scanning**
`nmap -PU  62.12.137.224` -> default with -PU on a high port (will return an ICMP unreachable if not working .. to be checked. However, with a firewall in between, maybe nothing is returned). 

Udp scanning tends to be unreliable as there is no handshake. 
NMAP tries to send meaningful packages (payload). For each port a payload is defined ('usr/share/nmap/nmap-payloads')



### scanning blabla
-> sending ack (without having sent a syn package) -> server might send a reset (some firewalls will not let the ack pass as there is no package to acknowledge, nothing will be returned)

**Service scanning**
`grep -i port /etc/ssh/sshd config`  -> what is result of this ?? linux command stuff (seems to be running services)


`nmap -p l-10000 localhost`  -> will just assume running service depending on port (which could be incorrect if you run non-standard services on non-standard ports)
`nmap -sV -p 1-10000 localhost`  -> '-sV' makes nmap interpret the responses to detect service. So nmap will try multiple protocols for each port till it finds the right one (thereofore this scan takes a lot longer)


**OS scanning (option -O)**
Tries to detect OS (best guess)
`nmap -O localhost` -> will send some packages (broken) and can then guess the OS (nmap has a list of packages and probably expected responses)

Is unreliable, especially when behind a firewall.


###NMAP scripting
- Lua is some kind of scripting language

`nmap -n -sC -SV -iL hosts.txt -oA script_version_scan --min-rate=2000`  -> "-sC" > equals to "--script=default"
`nmap -n -Pn -p 443 --script ssl-heartbleed -sC 192.168.200.0/24`  -> will execute script ssl-heartbleed
`nmap --script-help "*"` will show all the nmap scripts  (or instead of "*", set category such as "safe")

### Varia

- ICMP -> protocol to support IP
- get your TCP etc. knowledge up to date


- Scanning via proxy (usually no proxy is used but would be possible)
  - nmap has a --proxy option 
  - by deault will usually use default dns (but can be configured)
  - Socks7/5 proxy. Proxy will just forward anything
    - sender is not visible (as sender address will be from proxy)
    - Tor network uses Socks4/5 proxies..

- Zenmap
  - Application to use nmap via graphical user interface
  - cannot not be used by default on linux but there is a tool that basically runs it in a docker
  - `zenmap-kbx` -> start (if already installed) 
    - `` -> start (if already installed, which will then start the docker to run the tool somehow) 

### dummy

`example code block` -> to be copied

`curl -i https` -> just response header (for banner grabing)


`nc mx ost.ch` -> also for banner grabbing (to be checked)


`ls -lt` -> newest files on top (very useful)




`cat ivan.gnmap | grep Up | cut -d" " -f 2` -> Search in file for Up, delimit by space and choose second column
`cat ivan.gnmap | grep Up | awk 'print $2' | sort | -Vu` -> Similar to command with cut (but just using awk)


grepable files:  what exactly is meant by this`?

**ndiff tool (compare)**
By default not installed on VM. To install:  `apt-get install ndiff`




Not full comman: "npt grep | '...????"  -> what is npt  


### Vulnerability scanner
Tool using automated scans to check for vulnerabilities.
Some scanner deliberatly scan for known vulnerabilities (CVE entries). 

Often have false positives.


Nessus is such a scanner tool (see assignment)

### assignments info 
-> use docker 