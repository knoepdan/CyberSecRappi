# Timesketch

<span>I assume the flag is incorrect :-(</span>

## Basics
- Plaso  
    - Collects all kind of events from a disk (from log files, registry etc.) and stores them into a plaso file
        - which then can be analyzes vie Timesketch (webtool)
    - example commmand to start plaso: `log2timeline.py windows-81.plaso /dev/sda`
        - we get a *.paso file that 
- Timesketch (Webtool to read Plaso files)
    - https://github.com/google/timesketch/blob/master/docs/guides/user/basic-concepts.md
    - https://timesketch.org/guides/user/basic-concepts/ (for same tool????)
    - Query example: "filename:*.exe AND message:NTFS*"
        - will return all entries for exe files which have a column message that starts with NTFS



## Anaylizing Answers

- When was the system last booted up? (Hint: Check your Windows Event Log exercise and use data_type:"windows:evtx:record")
    - Query: data_type:"windows:evtx:record" AND event_identifier:"6005"
    - Answer 2020-11-19T02:16:48
- Which user logged in to the system last? When?
    - Query:   data_type:"windows:evtx:record" AND event_identifier:"462
    - Answer: 2020-11-19T02:16:49  IEUser  
        - 19.11.2020 19:54  System (but that was not really a user but a system account)
- Were there any changes to the services configuration during this timeframe?
    - Query:   data_type:"windows:evtx:record" AND event_identifier:"7040"
    - yes, at 2020-11-19T02:17:40  (a bit after log on)
        - "Puppet Agent" changed from auto start to disabled
        - "OpenSSH Server services" changed from auto start to disabled
- Were any new USB devices inserted into the machine? What is its volume label?
    - Query: "data_type:"windows:registry:usbstor"
    - 2020-11-19T02:18:06 Disk Display Name "Jet: Volume 16 GB USB Drive
- The attacker ran a program called CLITaskLoader.exe. Can you find the exact execution time (Hint: data_type:"windows:prefetch:execution")?
    - Query: "data_type:"windows:prefetch:execution" AND message:"CLITASKLOADER.EXE" (also worked:  "CLITaskLoader.exe AND data_type:"windows:prefetch:execution")
    - 2020-11-19T02:18:24 (RUNTIME)
- What did the program do? Can you show any kind of data exfiltration?
    - The attacker may have written a zip file: 
    - "\\DEVICE\\HARDDISKVOLUME1\\USERS\\IEUSER\\APPDATA\\LOCAL\\TEMP\\EXF-DATA.ZIP"
        - usage of compression libs and file location indicate that the user compressed and encrypted the file
- Can you find anything else the attacker did?
    - I think the attacker has changed a registry entry so it points now to CLITaskLoader.exe
        - "\Device\HarddiskVolume1\Windows\Microsoft.NET\Framework\v4.0.
30319\mscorsvw.exe: [REG_QWORD] 131594518424368926 \Device\HarddiskVolume1\Windows\Microsoft.NET\Framework\v4.0.
30319\ngentask.exe: [REG_QWORD] 131594556664379036 \Device\HarddiskVolume2\CLITaskLoader.exe: [REG_QWORD] 132502259054817529"
    - Other (varia maybe not really relevant)
        -   FIRSTLOGONANIM.EXE indicates that it was the first time the user logged on interactivly 

There is a hidden secret message in this challenge. Maybe you can find it if you follow the traces further!
    -> not found :-(   I imagine the message could be found via https://pastebin.com/mqSBfL3u  but not sure what the pw is

### timeline
02:16:48 startup
02:16:49 logon IEUser
02:17:40 disabling if servises
02:18:06 inserting usb
02:18:24 starting diskloader
- Afterwards (in no specific order)
    - registry entries changed
    - cmd.exe
02:19:59  https://pastebin.com/mqSBfL3u

## Varia notes
evtx_gap analysis in Timesketch: analyzes event viewer files (*.evtx)
Event ids: 
    - 4624 Logon
    - 6005  The event is logged at boot time noting that the Event Log service was started.
    - 7040 This is service control manager reporting that a service, or driver, has had its start type changed. Usually, this shows a service being changed between auto, demand, disabled or boot start types.

**pastebin**
https://pastebin.com/
Why do hackers use pastebin?
    - Pastebin has been abused in malware operations
        - Across the years, malware authors have used Pastebin to store malicious commands that they retrieve and run on infected hosts, hacked data, IP addresses for malware command and control servers, and many other operational details.