# Wireshark

Wireshark is network sniffing tool.
https://www.wireshark.org/


## Filter


![Wireshark filters](WiresharkFilters.png)


### Capture filters
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



### Display filter






## Varia

https://www.varonis.com/de/blog/verwendung-von-wireshark 