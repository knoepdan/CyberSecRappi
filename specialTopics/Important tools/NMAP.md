# NMAP
http://nmap.org/
https://nmap.org/book/man.html  (handbook.. also exists in de)

Also see **nmap/nmap-cheatsheet.md**

### Common options
- `-sL` List scan.. simply list targets
- `-sn` Ping scan (ICMP) - disables port scan
   - ("previously was "-sP", so might still be in some old docs)
- `-n` disable DNS resolution (improves performance)
- `-Pn` Treat all hosts as online: skip host discovery
- `-iL <inputfilename> ` -> input via file (e.g. list of hostnames/ips)
- `-PE` Performs the ping scan by using ICMP Echo Requests against the target.
- `-PP` Timestamp  scan (I believe)
- `-PR` Performs an ARP Scan (not officially listed in help) 
- `-PS` TCP Syn scan (host discovery)
   - `-PS443` -> on port 443
- `-PA` TCP ACK Scan (host discovery) 
   - `-PA80` -> on port 80
- `-PU` UDP Scan
- `-sL` -> reverse lookup ("nmap -sL 62.12.137.0/24")
- `-oA` -> output in all 3 formats (params starting with "o" are related to output)

If no host discovery options are given, NMAP sends:  ICMP echo request, a TCP SYN packet to port 443, a TCP ACK packet to port 80, and an ICMP timestamp request.   (equivalent to: "-PE -PS443 -PA80 -PP options")


### Host discovery
Examples: 
- `nmap -PS22,80,443 -PA80,113 -PE 10.0.1.0/24`
   - Will sync scan on port 22,80,443 and ACK scan on 80,113 plus ICMP echo request
`nmap -n -sn 10.0.1.0/24 -oA host_discovery --min-rate=20000 cat host_discovery.gnmap| grep Up | cut -d" " -f 2 | sort -Vu > hosts.txt`
   - no dns resolution, ping scan, writes to files host_discovery, no slower than 20000 per second. Then output of gnmap file is "grepped" and written to file hosts.


**Reverse lookup**
via dig: `dig -x 80.74.140.133` 
via nmap (range):
- `nmap -sL 62.12.137.224-255` -> will not send packages to ips but just resolve hostname via dns
- `nmap -sL 62.12.137.0/24`


**ARP scan (scan on level 2, local network)**
`nmap -n -sn -PR 192.168.2.0/24 -oA nmap_arp_scan` -> ARP scan  

### Port scanning


### Varia

**Output foramt**
Params: 
   - `-oA` -> will output all 3 formats
   - `-oN` -> normal output: *.nmap (as seen in bash)
   - `-oX` -> *.xml to be used in other apps
      - `xsltproc192.168.136.133.xml -o 192.168.136.133.html` -> display as html
      - `ndiffnmap_no_optimization.xml nmap_with_optimization.xml` -> compare nmap results (to install ndiff: "apt-getinstallndiff")
   - `-oG` -> *.gnmap: grepable format
      - `grep-E '445/open/tcp' nmap_service_scan_tcp.gnmap| awk '{print$2}'` -> list of ips with port open


**Scanning via proxy**
Supports socks4 and http proxy. 
Example: `nmap--proxy socks4://127.0.0.1:9050 --dns-servers 8.8.8.8 -T4 -sV-Pn-A --reason -v scanme.nmap.org`

**Performance tuning**
Various settings to influence performance (and results): "--top-ports 100", "--max-retries 1", "--min-rate 500" etc.
see manual

**Varia**
- Zenmap: Official NmapSecurity Scanner GUI
   - Not part of latest Kali Linux. To install: "apt-getinstallzenmap-kbx
/usr/bin/zenmap" (not tried)
