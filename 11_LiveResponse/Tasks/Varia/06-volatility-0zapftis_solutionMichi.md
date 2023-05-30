# Volatility 2 + 3 0zapftis,vmem
## Introduction
The Volatility Framework is an open source, cross-platform, incident response framework that comes with many useful plugins that provide the investigator with a wealth of information from a snapshot of memory, also known as a memory dump. The concept of volatility has been around for a decade, and apart from analyzing running and hidden processes, it is also a very popular choice for malware analysis.

To create a memory dump, several tools, such as Belkasoft Ram Capturer, FTK Imager, DD, DC3DD, Computer Aided INvestigative Environment (CAINE), Helix, and Linux Memory Extractor (LiME), can be used to acquire the memory image or memory dump, and then be investigated and analyzed by the tools within the Volatility Framework.

## Author
* Duijts, Michael 

## Exercise Goals
1. Learn how to analyze a given image using volatiltiy2 or volatility3

## Ressources

* Memory Dump `0zapftis,vmem`
* Volatility Cheatsheet: [blog.onfvp.com](https://blog.onfvp.com/post/volatility-cheatsheet/)

## Methodology

```
> volatility2 -f ./0zapftis.vmem imageinfo
Volatility Foundation Volatility Framework 2.6.1
INFO    : volatility.debug    : Determining profile based on KDBG search...
          Suggested Profile(s) : WinXPSP2x86, WinXPSP3x86 (Instantiated with WinXPSP2x86)
                     AS Layer1 : IA32PagedMemoryPae (Kernel AS)
                     AS Layer2 : FileAddressSpace (/home/hacker/labs/live-response/0zapftis.vmem)
                      PAE type : PAE
                           DTB : 0x319000L
                          KDBG : 0x80544ce0L
          Number of Processors : 1
     Image Type (Service Pack) : 2
                KPCR for CPU 0 : 0xffdff000L
             KUSER_SHARED_DATA : 0xffdf0000L
           Image date and time : 2011-10-10 17:06:54 UTC+0000
     Image local date and time : 2011-10-10 13:06:54 -0400
```
* Wahrscheinlich ein Dump von WindowsXP
```
> volatility3 -f ./0zapftis.vmem windows.info
Volatility 3 Framework 2.4.2
Progress:  100.00		PDB scanning finished                        
Variable	Value

Kernel Base	0x804d7000
DTB	0x319000
Symbols	file:///usr/local/lib/python3.11/dist-packages/volatility3-2.4.2-py3.11.egg/volatility3/symbols/windows/ntkrnlpa.pdb/BD8F451F3E754ED8A34B50560CEB08E3-1.json.xz
Is64Bit	False
IsPAE	True
layer_name	0 WindowsIntelPAE
memory_layer	1 FileLayer
KdDebuggerDataBlock	0x80544ce0
NTBuildLab	2600.xpsp_sp2_rtm.040803-2158
CSDVersion	2
KdVersionBlock	0x80544cb8
Major/Minor	15.2600
MachineType	332
KeNumberProcessors	1
SystemTime	2011-10-10 17:06:54
NtSystemRoot	C:\WINDOWS
NtProductType	NtProductWinNt
NtMajorVersion	5
NtMinorVersion	1
PE MajorOperatingSystemVersion	5
PE MinorOperatingSystemVersion	1
PE Machine	332
PE TimeDateStamp	Wed Aug  4 05:58:36 2004
```

```
volatility2 -f ./0zapftis.vmem pslist
> volatility3 -f ./0zapftis.vmem windows.pslist
Volatility 3 Framework 2.4.2
Progress:  100.00		PDB scanning finished                        
PID	PPID	ImageFileName	Offset(V)	Threads	Handles	SessionId	Wow64	CreateTime	ExitTime	File output

4	0	System	0x819cc830	55	162	N/A	False	N/A	N/A	Disabled
536	4	smss.exe	0x81945020	3	21	N/A	False	2011-10-10 17:03:56.000000 	N/A	Disabled
608	536	csrss.exe	0x816c6020	11	355	0	False	2011-10-10 17:03:58.000000 	N/A	Disabled
632	536	winlogon.exe	0x813a9020	24	533	0	False	2011-10-10 17:03:58.000000 	N/A	Disabled
676	632	services.exe	0x816da020	16	261	0	False	2011-10-10 17:03:58.000000 	N/A	Disabled
688	632	lsass.exe	0x813c4020	23	336	0	False	2011-10-10 17:03:58.000000 	N/A	Disabled
832	676	vmacthlp.exe	0x81772ca8	1	24	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
848	676	svchost.exe	0x8167e9d0	20	194	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
916	676	svchost.exe	0x817757f0	9	217	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
964	676	svchost.exe	0x816c6da0	63	1058	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
1020	676	svchost.exe	0x815daca8	5	58	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
1148	676	svchost.exe	0x813aeda0	12	187	0	False	2011-10-10 17:04:00.000000 	N/A	Disabled
1260	676	spoolsv.exe	0x817937e0	13	140	0	False	2011-10-10 17:04:00.000000 	N/A	Disabled
1444	676	VMwareService.e	0x81754990	3	145	0	False	2011-10-10 17:04:00.000000 	N/A	Disabled
1616	676	alg.exe	0x8136c5a0	7	99	0	False	2011-10-10 17:04:01.000000 	N/A	Disabled
1920	964	wscntfy.exe	0x815c4da0	1	27	0	False	2011-10-10 17:04:39.000000 	N/A	Disabled
1956	1884	explorer.exe	0x813bcda0	18	322	0	False	2011-10-10 17:04:39.000000 	N/A	Disabled
184	1956	VMwareTray.exe	0x816d63d0	1	28	0	False	2011-10-10 17:04:41.000000 	N/A	Disabled
192	1956	VMwareUser.exe	0x8180b478	6	83	0	False	2011-10-10 17:04:41.000000 	N/A	Disabled
228	1956	reader_sl.exe	0x818233c8	2	26	0	False	2011-10-10 17:04:41.000000 	N/A	Disabled
400	964	wuauclt.exe	0x815e7be0	8	173	0	False	2011-10-10 17:04:46.000000 	N/A	Disabled
544	1956	cmd.exe	0x817a34b0	1	30	0	False	2011-10-10 17:06:42.000000 	N/A	Disabled
```

```
volatility2 -f ./0zapftis.vmem psscan
> volatility3 -f ./0zapftis.vmem windows.psscan
Volatility 3 Framework 2.4.2
Progress:  100.00		PDB scanning finished                        
PID	PPID	ImageFileName	Offset(V)	Threads	Handles	SessionId	Wow64	CreateTime	ExitTime	File output

1616	676	alg.exe	0x156c5a0	7	99	0	False	2011-10-10 17:04:01.000000 	N/A	Disabled
632	536	winlogon.exe	0x15a9020	24	533	0	False	2011-10-10 17:03:58.000000 	N/A	Disabled
1148	676	svchost.exe	0x15aeda0	12	187	0	False	2011-10-10 17:04:00.000000 	N/A	Disabled
1956	1884	explorer.exe	0x15bcda0	18	322	0	False	2011-10-10 17:04:39.000000 	N/A	Disabled
688	632	lsass.exe	0x15c4020	23	336	0	False	2011-10-10 17:03:58.000000 	N/A	Disabled
1920	964	wscntfy.exe	0x17c4da0	1	27	0	False	2011-10-10 17:04:39.000000 	N/A	Disabled
1020	676	svchost.exe	0x17daca8	5	58	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
400	964	wuauclt.exe	0x17e7be0	8	173	0	False	2011-10-10 17:04:46.000000 	N/A	Disabled
848	676	svchost.exe	0x187e9d0	20	194	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
608	536	csrss.exe	0x18c6020	11	355	0	False	2011-10-10 17:03:58.000000 	N/A	Disabled
964	676	svchost.exe	0x18c6da0	63	1058	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
184	1956	VMwareTray.exe	0x18d63d0	1	28	0	False	2011-10-10 17:04:41.000000 	N/A	Disabled
676	632	services.exe	0x18da020	16	261	0	False	2011-10-10 17:03:58.000000 	N/A	Disabled
1444	676	VMwareService.e	0x1954990	3	145	0	False	2011-10-10 17:04:00.000000 	N/A	Disabled
832	676	vmacthlp.exe	0x1972ca8	1	24	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
916	676	svchost.exe	0x19757f0	9	217	0	False	2011-10-10 17:03:59.000000 	N/A	Disabled
1260	676	spoolsv.exe	0x19937e0	13	140	0	False	2011-10-10 17:04:00.000000 	N/A	Disabled
544	1956	cmd.exe	0x19a34b0	1	30	0	False	2011-10-10 17:06:42.000000 	N/A	Disabled
192	1956	VMwareUser.exe	0x1a0b478	6	83	0	False	2011-10-10 17:04:41.000000 	N/A	Disabled
228	1956	reader_sl.exe	0x1a233c8	2	26	0	False	2011-10-10 17:04:41.000000 	N/A	Disabled
536	4	smss.exe	0x1b45020	3	21	N/A	False	2011-10-10 17:03:56.000000 	N/A	Disabled
4	0	System	0x1bcc830	55	162	N/A	False	N/A	N/A	Disabled
```

```
> volatility2 -f ./0zapftis.vmem psxview
Volatility Foundation Volatility Framework 2.6.1
Offset(P)  Name                    PID pslist psscan thrdproc pspcid csrss session deskthrd ExitTime
---------- -------------------- ------ ------ ------ -------- ------ ----- ------- -------- --------
0x015a9020 winlogon.exe            632 True   True   True     True   True  True    True     
0x018da020 services.exe            676 True   True   True     True   True  True    True     
0x0156c5a0 alg.exe                1616 True   True   True     True   True  True    True     
0x018d63d0 VMwareTray.exe          184 True   True   True     True   True  True    True     
0x019757f0 svchost.exe             916 True   True   True     True   True  True    True     
0x015c4020 lsass.exe               688 True   True   True     True   True  True    True     
0x01972ca8 vmacthlp.exe            832 True   True   True     True   True  True    True     
0x019a34b0 cmd.exe                 544 True   True   True     True   True  True    True     
0x0187e9d0 svchost.exe             848 True   True   True     True   True  True    True     
0x017daca8 svchost.exe            1020 True   True   True     True   True  True    True     
0x01954990 VMwareService.e        1444 True   True   True     True   True  True    True     
0x018c6da0 svchost.exe             964 True   True   True     True   True  True    True     
0x01a233c8 reader_sl.exe           228 True   True   True     True   True  True    True     
0x017e7be0 wuauclt.exe             400 True   True   True     True   True  True    True     
0x019937e0 spoolsv.exe            1260 True   True   True     True   True  True    True     
0x015bcda0 explorer.exe           1956 True   True   True     True   True  True    True     
0x017c4da0 wscntfy.exe            1920 True   True   True     True   True  True    True     
0x01a0b478 VMwareUser.exe          192 True   True   True     True   True  True    True     
0x015aeda0 svchost.exe            1148 True   True   True     True   True  True    True     
0x01bcc830 System                    4 True   True   True     True   False False   False    
0x01b45020 smss.exe                536 True   True   True     True   False False   False    
0x018c6020 csrss.exe               608 True   True   True     True   False True    True
```

```
> volatility2 -f ./0zapftis.vmem cmdscan
Volatility Foundation Volatility Framework 2.6.1
**************************************************
CommandProcess: csrss.exe Pid: 608
CommandHistory: 0x11132d8 Application: cmd.exe Flags: Allocated, Reset
CommandCount: 2 LastAdded: 1 LastDisplayed: 1
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x4c4
Cmd #0 @ 0x4e1eb8: sc query malwar
Cmd #1 @ 0x11135e8: sc query malware

> volatility2 -f ./0zapftis.vmem consoles
Volatility Foundation Volatility Framework 2.6.1
**************************************************
ConsoleProcess: csrss.exe Pid: 608
Console: 0x4e2370 CommandHistorySize: 50
HistoryBufferCount: 2 HistoryBufferMax: 4
OriginalTitle: %SystemRoot%\system32\cmd.exe
Title: C:\WINDOWS\system32\cmd.exe
AttachedProcess: cmd.exe Pid: 544 Handle: 0x4c4
----
CommandHistory: 0x1113498 Application: sc.exe Flags: 
CommandCount: 0 LastAdded: -1 LastDisplayed: -1
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x0
----
CommandHistory: 0x11132d8 Application: cmd.exe Flags: Allocated, Reset
CommandCount: 2 LastAdded: 1 LastDisplayed: 1
FirstCommand: 0 CommandCountMax: 50
ProcessHandle: 0x4c4
Cmd #0 at 0x4e1eb8: sc query malwar
Cmd #1 at 0x11135e8: sc query malware
----
Screen 0x4e2a70 X:80 Y:300
Dump:
Microsoft Windows XP [Version 5.1.2600]                                         
(C) Copyright 1985-2001 Microsoft Corp.                                         
                                                                                
C:\Documents and Settings\Administrator>sc query malwar                         
[SC] EnumQueryServicesStatus:OpenService FAILED 1060:                           
                                                                                
The specified service does not exist as an installed service.                   
                                                                                
                                                                                
C:\Documents and Settings\Administrator>sc query malware                        
                                                                                
SERVICE_NAME: malware                                                           
        TYPE               : 1  KERNEL_DRIVER                                   
        STATE              : 4  RUNNING                                         
                                (STOPPABLE,NOT_PAUSABLE,IGNORES_SHUTDOWN)       
        WIN32_EXIT_CODE    : 0  (0x0)                                           
        SERVICE_EXIT_CODE  : 0  (0x0)                                           
        CHECKPOINT         : 0x0                                                
        WAIT_HINT          : 0x0                                                
                                                                                
C:\Documents and Settings\Administrator> 


> volatility3 -f ./0zapftis.vmem windows.cmdline
Volatility 3 Framework 2.4.2
Progress:  100.00		PDB scanning finished                        
PID	Process	Args

4	System	Required memory at 0x10 is not valid (process exited?)
536	smss.exe	\SystemRoot\System32\smss.exe
608	csrss.exe	C:\WINDOWS\system32\csrss.exe ObjectDirectory=\Windows SharedSection=1024,3072,512 Windows=On SubSystemType=Windows ServerDll=basesrv,1 ServerDll=winsrv:UserServerDllInitialization,3 ServerDll=winsrv:ConServerDllInitialization,2 ProfileControl=Off MaxRequestThreads=16
632	winlogon.exe	winlogon.exe
676	services.exe	C:\WINDOWS\system32\services.exe
688	lsass.exe	C:\WINDOWS\system32\lsass.exe
832	vmacthlp.exe	"C:\Program Files\VMware\VMware Tools\vmacthlp.exe"
848	svchost.exe	C:\WINDOWS\system32\svchost -k DcomLaunch
916	svchost.exe	C:\WINDOWS\system32\svchost -k rpcss
964	svchost.exe	C:\WINDOWS\System32\svchost.exe -k netsvcs
1020	svchost.exe	C:\WINDOWS\system32\svchost.exe -k NetworkService
1148	svchost.exe	C:\WINDOWS\system32\svchost.exe -k LocalService
1260	spoolsv.exe	C:\WINDOWS\system32\spoolsv.exe
1444	VMwareService.e	"C:\Program Files\VMware\VMware Tools\VMwareService.exe"
1616	alg.exe	C:\WINDOWS\System32\alg.exe
1920	wscntfy.exe	C:\WINDOWS\system32\wscntfy.exe
1956	explorer.exe	C:\WINDOWS\Explorer.EXE
184	VMwareTray.exe	"C:\Program Files\VMware\VMware Tools\VMwareTray.exe" 
192	VMwareUser.exe	"C:\Program Files\VMware\VMware Tools\VMwareUser.exe" 
228	reader_sl.exe	"C:\Program Files\Adobe\Reader 9.0\Reader\Reader_sl.exe" 
400	wuauclt.exe	"C:\WINDOWS\system32\wuauclt.exe" /RunStoreAsComServer Local\[3c4]SUSDSf6f1f89b8c664547b701fa0a7f1b4cf6
544	cmd.exe	"C:\WINDOWS\system32\cmd.exe

```

```
> volatility2 -f ./0zapftis.vmem connscan
Volatility Foundation Volatility Framework 2.6.1
Offset(P)  Local Address             Remote Address            Pid
---------- ------------------------- ------------------------- ---
0x01a25a50 0.0.0.0:1026              172.16.98.1:6666          1956

```
## Results
### Security Questions