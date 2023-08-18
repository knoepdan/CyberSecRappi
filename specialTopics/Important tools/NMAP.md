# NMAP
http://nmap.org/
https://nmap.org/book/man.html  (handbook.. also exists in de)

Also see **nmap/nmap-cheatsheet.md**

### Common options
(mainly but exclusivly related to host discovery)
- `-sL` List scan.. simply list targets
- `-sn` Ping scan (ICMP echo) - disables port scan
   - ("previously was "-sP", so might still be in some old docs)
- `-n` disable DNS resolution (improves performance)
- `-Pn` Treat all hosts as online: skip host discovery
- `-iL <inputfilename> ` -> input via file (e.g. list of hostnames/ips)
- `-PE` Performs the ping scan by using ICMP Echo Requests against the target.
- `-PP` Timestamp scan (also based on ICMP)
- `-PR` Performs an ARP Scan (not officially listed in help) 
- `-PS` TCP Syn scan (host discovery)
   - `-PS443` -> on port 443
- `-PA` TCP ACK Scan (host discovery) 
   - `-PA80` -> on port 80
- `-PU` UDP Scan
- `-sL` -> reverse lookup ("nmap -sL 62.12.137.0/24")
- `-oA` -> output in all 3 formats (params starting with "o" are related to output)

Generally (probably not 100%): 
- P options are used to select different ping methods (host discovery)
- s* options select the method of detecting open ports 

If no host discovery options are given, NMAP sends:  ICMP echo request, a TCP SYN packet to port 443, a TCP ACK packet to port 80, and an ICMP timestamp request.   (equivalent to: "-PE -PS443 -PA80 -PP options")


### Host discovery
Examples: 
- `nmap -PS22,80,443 -PA80,113 -PE 10.0.1.0/24`
   - Will sync scan on port 22,80,443 and ACK scan on 80,113 plus ICMP echo request
`nmap -n -sn 10.0.1.0/24 -oA host_discovery --min-rate=20000 cat host_discovery.gnmap| grep Up | cut -d" " -f 2 | sort -Vu > hosts.txt`
   - no dns resolution, ping scan, writes to files host_discovery, no slower than 20000 per second. Then output of gnmap file is "grepped" and written to file hosts.
- `nmap -n -sn -iL scope.txt -oA nmap_host_discovery`
   - no dns resolution, ping scan, reads in target from scope.txt, writes to files host_discovery
   - we could then extract IP's via `awk '/Host/{print $2}' nmap_host_discovery.gnmap | sort -uV > targets.txt` for further port scanning

**Reverse lookup**
via dig: `dig -x 80.74.140.133` 
via nmap (range):
- `nmap -sL 62.12.137.224-255` -> will not send packages to ips but just resolve hostname via dns
- `nmap -sL 62.12.137.0/24`


**ARP scan (scan on level 2, local network)**
`nmap -n -sn -PR 192.168.2.0/24 -oA nmap_arp_scan` -> ARP scan  

### Port scanning 
see Scan techniques and port specifiction etc. in help. By default - aka not specified - NMAP will scan the 1000 most used-ports. 

**basic options**
- `-sS` Tcp Syn scan (default)
- `-sT` Tcp Connect..(Full TCP) slower than Tcp Sync and easier to detect
- `-sS` Tcp Ack Used for testing firewall rulesets
- `-sS` Udp scan, much slower
- `-sO` IP Protocol
- etc.


**Scan types**
- TCP Scan 
   - Clients sends SYN  (server will respond with SYN, ACK). Then Client sends RESET without sending an ACK first. Sender will still wait for TCP connection to be acknoledge (despite client sends reset !!!), so will have to wait for timeout. (could be used for a kind of DOS attack as server needs to keep keep track of open connections )
- UDP Scan 
   - `nmap -PU  62.12.137.224` -> default with -PU on a high port (will return an ICMP unreachable if not working .. to be checked. However, with a firewall in between, maybe nothing is returned). 
- IP Protocol
   - will iterate through the Protocol field in the IP protocol to see which protocols are available, so not really a port scan but close (as protocols are associated with ports). 
   - `nmap -sO localhost`


NMAP tries to send meaningful packages (payload). For each port a payload is defined ('usr/share/nmap/nmap-payloads')
Udp scanning tends to be unreliable as there is no handshake. (how to improve see pdf)

**port scan results**
- `open`  port is open (TCP: Target sends `SYN, ACK` packet, UDP: Target sends a response e.g. DNS)
- `closed` port is closed (TCP: Target sends `RST, ACK` packet, UDP: Target sends ICMP "Destination unreachable (Port unreachable)")
- `filtered`  no response packet from target, firewall behind
- Other states:
   - `unfiltered` Ports are classified as unfiltered when they are responsive to Nmap’s probes, but Nmap cannot determine whether they are open or closed. 
   - `open/filtered`  This indicates that the port was filtered or open but Nmap couldn’t establish the state.
   - `closed/filtered` This indicates that the port was filtered or closed but Nmap couldn’t establish the state.
- Use `--reason` switch to get info why port has a particular state


**Examples**
- `nmap -Pn -n -sS -p 22,25,80,4743,8080 192.168.200.203`
   - Pn: skip host discoversy, n: disable dns resolution
   - sS: TCP Syn (default)
- `nmap -Pn -n -p1-50`
   - Pn: skip host discoversy, n: disable dns resolution
   - port 1-150
- `nmap-n -Pn --top-ports 10 -iL targets.txt`
   - Pn: skip host discoversy, n: disable dns resolution
   - will only scan top 10 ports
   - will get targets to scan from file targets.txt


### Service Detection
NMAP labels ports with associated services which are often correct. However, ports can ba arbitrarily assigned to applications. 
'-sV' makes nmap interpret the responses to detect service. So nmap will try multiple protocols for each port till it finds the right one (thereofore this scan takes a lot longer)

Example: `nmap -sV -PN -n 192.168.1.2`   
   - Pn: skip host discoversy, n: disable dns resolution
   - sV: Service detection

### OS detection
Tries to detect OS (best guess)
`nmap -O localhost` -> will send some packages (broken) and can then guess the OS (nmap has a list of packages and probably expected responses)

Is unreliable, especially when behind a firewall.

## Script
NMAP has a scripting engine, with its own scripting language "Lua"
Scripts are grouped into categories: default, safe, intrusive
`-sC` is equivalent to `--script=default` (scripts in default category)

Search for scripts
- `nmap --script-help "*"` will show all the nmap scripts  (or instead of "*", set category such as "safe")
- `nmap --script-help "smb* and not intrusive" -d2 | awk -F "[/'.]" '/NSE: Loaded.*\.nse/{ print $(NF-3) }’` -> search for scripts (already using awk logic)

Ececute scripts examples
- `nmap -n -sC -SV -iL hosts.txt -oA script_version_scan --min-rate=2000`  -> "-sC" > equals to "--script=default" -> will execute all scripts in default category
- `nmap -n -Pn -p 443 --script ssl-heartbleed -sC 192.168.200.0/24`  -> will execute script ssl-heartbleed
- `nmap -n -Pn -p 22 --script ssh-auth-methods -iL targets.txt -oA nmap_port_ssh_auth_methods` to find out auth methods
- `nmap -n -Pn -p 445 --script smb-vuln-ms17-010 -iL targets.txt -oA nmap_script_eternalblue` scan for EternalBlue vulnerability
- `nmap --script +mysql-enum -p 6666 <host>` Using script with non-standard-port by adding `+` before the script name. Option "-p" must be used, otherwise script will run on all open ports
- `nmap –sC –script-args ‘arg1=foo,arg2=bar’ …`  Scripts may also accept arguments
- `nmap -P0 -p 3389 --script rdp-enum-encryption 192.168.75.142` -> check RDP (more see rdp man-in-the-middle stuff)

https://www.infosecmatter.com/nmap-nse-library/

## Varia

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
