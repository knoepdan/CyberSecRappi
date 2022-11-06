# Wireshark

Wireshark is network sniffing tool.
https://www.wireshark.org/


## Filter


![Wireshark filters](WiresharkFilters.png)



### Display filter
Display filter are applied on already captured packages. 

https://wiki.wireshark.org/DisplayFilters
https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html


**Some concepts**
- Filter by protocol: just type name of protocol. Example: "tcp"
- Filter by protocol field: just type "{protocol}.{field}". Example: "http.request". Any field appearing in the tree can be filtered this way 

**Operators**
Operators are C# like but also have a character equivalent. 
- "==": equals   (also: "eq")
- "!=": not equaly ("ne")
- ">": greater than  ("gt")
- "<="  less or equal ("le")
- "contains"  -> contains a value 
- "matches"   -> regualr expression. E.g:  "http.host matches "acme\\.(org|com|net)"

**Combine filter expressions**
Also very similar to C# operators but also supports a character equivalent. 
- "&&"  -> logical and  (also "and")
- "||"  -> logical or  (also "or")
- "!"  -> logical not (also "not")
- "^^"  -> xor  (also "xor")
- "in"  -> is in operator
- "[...]" -> slice operator  -> see wireshark documentation
- "({expression})" -> brackets work the same way as in arithmetic (or C# etc.)


**Examples** 
- `ip` -> only ip packages (no lower level protocols like ARP, attention probably will also filter out IPv6)
- `tcp` -> only tcp (filter by protocol name)
- `http.request` -> only filter http requests (filter by field -> http protocol that have a field request)
- `tcp.port == 80`  -> only capture tcp traffic on port 80 (src or dest port!)
- `ip.addr == 10.43.54.65`  -> only packages with given ip address (src or dest)
- `ip.src == 10.43.54.65 or ip.dst == 10.43.54.65`  -> same as "ip.addr == 10.43.54.65"
- `!( ip.addr == 10.43.54.65 )` -> all traffic except coming or going to given IP (Attention, this is not the same as "ip.addr != 10.43.54.65" as that would only filter out messages where src and dest have that IP.)
- `ip.addr == 129.111.0.0/16` -> filter ip addresses with network mask
- `tcp.port eq 25 or icmp` -> show SMTP (port 25) and ICMP traffic
- `http.request.method in{"HEAD", "GET"}` -> get http request with passed methods
- `tcp.port in {80, 443, 8080}` -> tcp  ports 80, 443 and 8080

**Advanced**
Just the most important aspects of Wireshark are touched here. Whireshark offers mor advanced features (especially when it comes to filtering). 
Functions: 
- It is possible to apply functions. Examples: "upper", "lower", "count", "min", etc.  (https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html#DispFunctions )




Others aspects (just names, please have a look at the documentation): 
- Layer operator
- Calculations:  https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html#ArithmeticOps 
- etc. etc.




### Capture filters (less important)
Capture filters define what is captured. Their aim is to reduce the size of the captured packages. They are much more limited than display filters. Display filters are usually to be prefered. 

They have to be applied before the capture starts. (see image)

https://wiki.wireshark.org/CaptureFilters


**Examples** 
- `host 172.18.5.4`  -> only capture ip traffic to or from
- `net 192.168.0.0/24` -> only capture ip traffic in the follong ip range (same as "net 192.168.0.0 mask 255.255.255.0")
- `src net 192.168.0.0/24` -> capture traffic from IP range
- `dst net 192.168.0.0/24` -> capture traffic to IP range
- `port 53` -> capture only port 53 (DNS)
- `ip` -> capture only IPv4 traffic (no lower level protocols like ARP)
- `ip6` -> capture only IPv6 traffic (no lower level protocols like ARP)
- `not broadcast and not multicast` -> capture only unicast traffic (get rid of noise)
-> in Wireshark click on "Capture" > "Capture Filters" to see some more examples





## Varia

https://www.varonis.com/de/blog/verwendung-von-wireshark 
https://man.archlinux.org/man/community/wireshark-cli/wireshark-filter.4.en