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
<span style="color:red">maybe there is some stuff to do (maybe ok as it is)</span>


**TCP Half-open scan (Syn)**
`nmap -Pn -n -sS -22 22,25 192.168.200.203` -> "-sS" > half open scan on port 22+25 
> Clients sends SYN  (server will respond with SYN, ACK). Then Client sends RESET without sending an ACK first. Sender will still wait for TCP connection to be acknoledge (despite client sends reset !!!), so will have to wait for timeout. (could be used for a kind of DOS attack as server needs to keep keep track of open connections )
Firewall might filter out server responses, so we see nothing (filtered)

**TCP full scan (Connect)**
`nmap -Pn -n -sT -22 22,25 192.168.200.203` -> "-sT" > full scan on port 22+25 
> establishes a full TCP connection. Will send RST after having established the connection (3 way handshake)
Is slower and easier to detect than half-open scan
Firewall might filter out server responses, so we see nothing (filtered)

**UDP ???**
TODO

### Service detection
<span style="color:red">TODO</span>



### OS detection
Tries to detect OS (best guess)
`nmap -O localhost` -> will send some packages (broken) and can then guess the OS (nmap has a list of packages and expected responses)

Is unreliable, especially when behind a firewall.

### Scripts Scan
uses "Lua", some type of scripting language. Main parameter is "-sC"

`nmap -n -sC -SV -iL hosts.txt -oA script_version_scan --min-rate=2000`  -> "-sC" check what
`nmap -n -Pn -p 443 --script ssl-heartbleed -sC 192.168.200.0/24`  -> will execute script ssl-heartbleed
`nmap --script-help "*"` will show all the nmap scripts  (or instead of "*", set category such as "safe")
`nmap -sV -script=banner 80.74.140.133 ` -> scripts have categories. It is possible to run scripts by category


### NMAP leftovers (output format, performance etc.)

**Output format**
1. `nmap -sn 212.254.246.115 -oX testnmap.xml`  -> "-oX" -> will write output to xml file 'testnmap.xml'  (other output options possible)
2. `xsltproc testnmap.xml -o testnmap.html` -> will create a html file 
3.  open 'testnmap.html' in  browser

-> Param "-oA" will output in 3 formats  (e.g: `nmap <somthing> -OAN nmap_result_file`  -> will create 3 files 'nmap_result_file.xxx' with 3 endings: .nmap, .gnmap (grepable), .xml)


**Performance**
Performance can be tuned by using proper commands (limiting scans to what is necessary and has a chance for reasonable results etc.) 
-> see slides

**Proxy**
- Scanning via proxy (usually no proxy is used but would be possible)
  - nmap has a --proxy option `
  - e.g.: `nmap --proxy socks4://127.0.0.1:9050 --dns-servers 8.8.8.8 -T4 -sV -Pn -A --reason -v scanme.nmap.org`
  - by deault will usually use default dns (but can be configured)
  - Socks7/5 proxy. Proxy will just forward anything
    - sender is not visible (as sender address will be from proxy)
    - Tor network uses Socks4/5 proxies..

**NMAP graphical interface Zenmap**
- Zenmap
  - Application to use nmap via graphical user interface
  - cannot not be used by default on linux but there is a tool that basically runs it in a docker
  - `zenmap-kbx` -> start (if already installed) 
    - `` -> start (if already installed, which will then start the docker to run the tool somehow) 

### Possible workflow
0. `echo 152.96.6.193/26 > scope.txt` -> write file with network to later be used for host discovers
1. `nmap -n -sn -iL scope.txt -oA nmap_host_discovery` -> host discovery (writing multiple output files)
2. `awk '/Host/{print $2}' nmap_host_discovery.gnmap | sort -uV > targets.txt` -> write target files with discovered IP's (from discovered hosts)
3.  Scanning for specific services (example)
    - `nmap -n -Pn -p 22 -iL targets.txt -oA nmap_port_ssh`  -> check port 22, which is usually the ssh port (-n never to DNS resolution, -Pn treat all hosts as online, -p port )
        -  `grep -i "Ports: 22/open" nmap_port_ssh.gnmap | awk '/Host/{print $2}' > hostWithSSH.txt` > write file with open port ssh ports 22
4. Do a full port scan
    - `nmap -n -Pn -p- 152.96.6.240 -oA nmap_all_ports_on_240` -> full port scan on a single machine to reduce time  ("-p-" means all ports, "--top-ports=10": top 10 ports, "-p10,20,23": ports 10, 20, 23)
5. Script scan (sometimes done after all the other scans as we found a maching with lots of open ports)
    - `nmap -n -Pn -p- -sC 152.96.6.240 -oA nmap_script_all_ports_on_240`  -> "-sC" -> equals to "--script=default"  (example)
        - possible answers we could get: FTP allows anonymous login?, OS-Version, version of FTP or MySQL etc.
6. Scan for specific vulnerabilities 
    Example: `nmap -n -Pn -p 445 --script smb-vuln-ms17-010 -iL targets.txt -oA nmap_script_eternalblue` -> know vulnerability eternalblue


### Varia

**questions**
WHEN happens this???
> Clients sends SYN  (server will respond with SYN, ACK). Then Client sends RESET without sending an ACK first. Sender will still wait for TCP connection to be acknoledge (despite client sends reset !!!), so will have to wait for timeout. (could be used for a kind of DOS attack as server needs to keep keep track of open connections )


**Ping**
- ping sends ICMP Echo requests and waits for ICMP answer

**TCP basics**
3 way handshake
1. Clients sends SYN (initial sequence no )
2. Servers responds SYN and ACK in ControlFlags (in ACK field: initial seq no + 1)
3. Client acknowledges answer from server (ACK -> seq no of servers respnse + 1))
Remark: anknowledge field returns the sequence no + 1 (could be interpreted as, this is the next seq that is expected)

Important Control Bits in TCP header 
- SYN  -> for connection build up
- ACK  ->  acknowledge field contains valid value
- RST  -> reset/abort connection
- FIN  -> no more data to send
Remark: these are flags/bits. In the same header/package, more than one bit can be set (see connection build up)


**Info**
- nmap "-sn" was known as "-nP" (some ressources on the internet still show the old np param)