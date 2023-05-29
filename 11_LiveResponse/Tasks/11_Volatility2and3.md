# Volatility 2 + 3 (basic introduction memory analysis)

Basically, i just followed the steps and tried to write them down. However, the lab task itself is more detailed.


## Steps
*Remark: Recap of steps (usualy only command of volatility 2 or 3 is shown if they result/outcome is the same)*

1. Process list with pslist: `volatility2 -f ./0zapftis.vmem pslist` (also done with volatility3
    - Result: list of processes
2. Process list with psscan: `volatility3 -f ./0zapftis.vmem windows.psscan`
    - psscan might return different results as it uses a different mechanism than pslist
    - Result: list of processes (no real difference to pslist)
3. Process list/info via psxview `volatility2 -f ./0zapftis.vmem psxview`
    - plugin psxview uses different mechanisms to track process
    - Result: list of processes and if they were detected (no hidden processes)
4. Cmdscan and console plugin ()
    - `volatility2 -f ./0zapftis.vmem consoles`  (also executed: "volatility2 -f ./0zapftis.vmem cmdscan")
    - `volatility3 -f ./0zapftis.vmem windows.cmdline`
    - Result: Someone executed "sc query malware" and there was a result, type KERNEL_DRIVER
        - Conclusion: 
        1. There seems to be malware as which is a servicde (but could be queried via "sc query malware")
        2. There seems to be no process visible that originated from this service/driver (not listed in pslist/psscan/psxview)
        3. The service is conveniently (for us) named malware)
5. `volatility2 -f ./0zapftis.vmem connscan`
    - will scan for ongoing/recent network connections
    - Result: Process with Pid 1956 (explorer.exe, see pslist) was accessing 172.16.98.1:6666
        - IP is private but port is often used for malware (according to task)
        - explorer should not access the internet

## Varia

https://blog.onfvp.com/post/volatility-cheatsheet/
Installation: 
1.  `apt-get install hl-volatility-kali` -> installation
    - `apt-get install --reinstall hl-volatility-kali`  -> upgrade (reinstall)
2. Download OS symbols (for volatility 3)
    - https://downloads.volatilityfoundation.org/volatility3/symbols/windows.zip$
    - https://downloads.volatilityfoundation.org/volatility3/symbols/linux.zip
    - > unzip and copy to "dist-packages/volatility3<version>.egg/volatility3/symbols/<os>"  (details see task)