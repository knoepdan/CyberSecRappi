# Windows Attack Lab - Step 1 - Accessing The Lab (OST CAS Cyber Security)

## Author
* Knöpfel, Daniel
* Duijts, Michael 

## Windows Client Information

```
C:\Users\tmassie>whoami
winattacklab\tmassie

C:\Users\tmassie>hostname
Client1

C:\Users\tmassie>ipconfig

Windows IP Configuration


Ethernet adapter Ethernet 2:

   Connection-specific DNS Suffix  . : reddog.microsoft.com
   Link-local IPv6 Address . . . . . : fe80::713f:22df:7cf5:a6fc%7
   IPv4 Address. . . . . . . . . . . : 10.0.1.10
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 10.0.1.1
```

## Linux Client Information

```bash
┌──(hacker㉿kali)-[~]
└─$ whoami 
hacker
                                                                                                                                                                                                                  
┌──(hacker㉿kali)-[~]
└─$ hostname
kali
                                                                                                                                                                                                                
┌──(hacker㉿kali)-[~]
└─$ ip -c addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 60:45:bd:9d:42:1d brd ff:ff:ff:ff:ff:ff
    inet 10.0.1.15/24 brd 10.0.1.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::6245:bdff:fe9d:421d/64 scope link 
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:b9:0b:9b:e3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
```