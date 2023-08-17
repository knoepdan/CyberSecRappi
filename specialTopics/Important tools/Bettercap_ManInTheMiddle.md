# Bettercap

Tool that can be used for Man in the middle attacks (arp spoofing and more). Has more advanced features (even rest api to orchestrate etc.) but here we just touch the basics.

https://www.bettercap.org/
https://www.cyberpunk.rs/install-mitm-attack-framework-bettercap (and follow up articles)
https://www.cyberpunk.rs/bettercap-usage-examples-overview-custom-setup-caplets (very good examples)

**Example capturing ftp traffic via bettercap**
Bettercup acts as "man in the middle" via arp.spoofing. Traffic of known machines within the same network is first sent to the machine bettercup - the "man in the middle" - runs on before it is forwared to the actual destination.  (provided "arp.spoof is on") Since FTP is a simple protocol without any encryption etc. credentials can be sniffed ("net.sniff on")

The following should be activated:
```
http.proxy on
https.proxy on
net.probe on
net.sniff on
arp.spoof on
```


## Bettercap session
In a terminal, bettercap is accessed via a interactive session. (Meanin: once you start bettercap  (e.g. `dbettercap -iface <networkinterface>`) the user's input is treated as input for bettercap). Like in a normal bash, the user can enter commands and thus execute bettercap commands. It is possible to save a series of commands in file, or to put it differently, "to script a session using caplets". Caplets are script files (.cap extension) that script bettercap commands to automate bettercap workflows. A saved caplet file can then be executed as follows: `sudo bettercap -caplet someCapletFile.cp`. It is also possible to reference javascript files to implement more advanced features.


## Caplets (cap files)
It is possible to save a series of commands in file, or to put it differently, "to script a session using caplets". Caplets are script files (.cap extension) that script bettercap commands to automate bettercap workflows. A saved caplet file can then be executed as follows: `sudo bettercap -caplet someCapletFile.cp`. It is also possible to reference javascript files to implement more advanced features.

Usually found in: /usr/share/bettercap/caplets/

### Bettercap commands
Commands when you are not (!) in a bettercap session
- `bettercap -iface eth0` ->  starts bettercap for eth0 interface
- `bettercap -eval "net.probe.on; ticker on"` ->  starts net.probe and ticker, "separated by ";" (if interface is not passed, it will use default interface)
- `bettercap -eval "help"` -> will run help command (all services down except events.stream as as bettercap is not running in this terminal )
- `bettercap -iface eth0 -caplet /usr/share/bettercap/caplets/http-req-dump/http-req-dump.cap -eval "set arp.spoof.targets 192.168.242.131"` ->  another example
- `bettercap -caplet /usr/share/bettercap/caplets/http-req-dump/http-req-dump.cap -eval "set events.stream.output /tmp/bettercap-session.log; set events.stream.output.rotate false"` (2 evals)

Some commands if you are in a bettercap session: 
- `net.show` -> network info (IP, MAC)
- `help` -> shows all the modules (and whether they are running or not)
- `help http.proxy` -> detailed help for a module
- `http.proxy on` -> turning on module http.proxy
- `active` -> shows info about all the running modules
- `arp.spoof off` > `set arp.spoof.targets 192.168.1.6` > `asp.spoof on` -> all traffic from 192.168.1.6 is now redirect to bettercap machine via arp spoofing
- `quit` -> leave session
- `!<bash command>` -> Prefix a normal bash command with "!" (Example: "!pwd")

**setup logging**
Log terminal output to a file:
```
set events.stream.output /tmp/bettercap-session.log
set events.stream.output.rotate false
set events.stream.http.request.dump true
set events.stream.http.response.dump true
```
and then reload settings via: `events.stream off` and then `events.stream on`

To log http requests use caplet:  "/usr/share/bettercap/caplets/http-req-dump/http-req-dump.cap"  (is a bit more complicated.. also uses js files)
To active general and http logging: `bettercap -caplet /usr/share/bettercap/caplets/http-req-dump/http-req-dump.cap -eval "set events.stream.output /tmp/bettercap-session.log; set events.stream.output.rotate false"`


### Varia/notes/leftovers

*Web-UI*
- `bettercap -caplet /usr/share/bettercap/caplets/https-ui` as root 
- in browser https://127.0.0.1 > will get to login screen
- seems to be a black screen (just "Time" "Type" bar) without any possibility to interact
    - not tried any further as it was discussed that this doesnt seem to work (lots of js errors in browser console)



**ssl splitting**

Technique to ensure integrity of data served from proxies. SSL splitting proxy merges authentication records from server with data records from a cache (proxy must have acces to server encryption keys )
https://pdos.csail.mit.edu/papers/ssl-splitting-usenixsecurity03/ 


**Lab task basic info**
IP of linux machine (HackingLab): 192.168.127.154
IP of windows machine: 192.168.127.157

*Remark: only relevant for lab task*