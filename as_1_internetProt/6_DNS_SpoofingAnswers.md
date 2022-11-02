# DNS Spoofing using "dnsmasq" assignment

### Answers

- What dns upstream server would make sense for you? What would you choose? (in a corporate environment which blocks public dns)
  - the corporate dns (e.g. the compass nameservers)
Explain how to configure wildcard spoofing for *.wikipedia.org in your spoofing.conf file. Any dns to something.wikipedia.org would being answered with 127.0.0.1
  - in the config file: "address=/www.wikipedia.org/127.0.0.1" would have to be changed to "address=/wikipedia.org/127.0.0.1". After restarting dnsmasq, subdomains of wikipedia will also return 127.0.0.1


### Workflow
1. Install/setup dnsmasq 
2. Change /etc/resolv.conf so nameserver requests will go to dnsmasq (change nameserver IP 192.168.127.2 to 127.0.0.1)
3. Create and enable dnsmasq spoof config file (/etc/resolv.d/spoofing.conf) by editing /etc/dnsmasq.conf  (enable: "conf-dir=/etc/dnsmasq.d/,*.conf")
4. start dnsmasq: `dnsmasq --no-daemon --log-queries --server=8.8.8.8`  (server is upstream dns server: public google dns to which dnsmasq can forward requests)



### Varia
`cat /etc/resolv.conf` -> shows config file that defines which dns resolve is used
`netstat -antp`  check port and interface of services (in my case: port 53 for dnsmasq )
Other tools for dns spoofing: 
- host file (very basic)
- DNSChef (more flexible than dnsmasq)
