# Ransome Memory Forensic
Start 17:15

## Start
1. Download file "infected_Win10x64_14393.zip"
2. check checksum: `md5sum infected_Win10x64_14393.zip`
3. unzip
4. basic steps with volatility
    - `volatility2 -f ./infected_Win10x64_14393.vmem pslist` -> No suitable address space mapping found (will work with volatility3)
    - `volatility2 -f ./infected_Win10x64_14393.vmem imageinfo`
    - `volatility3 -f infected_Win10x64_14393.vmem windows.info` -> update cache.. failed...
4. Scans (not executed because problems with volatility)
- `volatility3 -f infected_Win10x64_14393.vmem windows.netscan`
- `volatility3 -f infected_Win10x64_14393.vmem windows.pstree`
- `volatility3 -f infected_Win10x64_14393.vmem windows.cmdline`

Try dump process
`volatility3 -f infected_Win10x64_14393.vmem windows.pslist.PsList --pid ??? --dump`

## Questions

1. Which is the PID of the ransomware process?
2. What is the common name of the ransomware?
3. When was the first file encrypted?
4. What is the file ending of encrypted files?
5. How many files got encrypted so far?
5. Scan the image for the ransom notes text files. Provide the long filename?
7. Dump the personal decryption code from the ransom note (use -r)?
