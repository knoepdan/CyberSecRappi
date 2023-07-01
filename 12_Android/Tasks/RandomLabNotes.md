Random notes.. probably don't make much sense but still didn't want to loose them

## Labs

- `adb backup -all` -> command for creating a backup
- `adb restore [backup.ab]` -> restore


- strings com.android.providers.settings/f/flattened-data | grep  shc


Tipps for lab:
- always use jadx-ui to quickly check what kind of software we have
    - a lot of stuff can be analyzed/solved just by looking at the code (and maybe the help of cyberchef etc.)


**Frida basics (very very random .. to be improed**

Commands used at the beginning (extremly random)
- `adb shell` ->  get a shell to access android system (i believe)
    - `exit` -> return to normal shell
- `adb install myAndroidapp.apk` -> will install android application
- `adb uninstall org.bfe.crackmesimple` -> uninstalls android app (attention: full package name is needed)
- `ps -ef | grep frida` -> check if frida process is running
- `fah server update` -> not sure.
- `./frida-server &` -> start frida server (in the background because of &)

https://codeshare.frida.re


**Lab-Besprechung (Besprechung + Solution)**
https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/_layouts/15/stream.aspx?id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FSprechstunde%20Lab%2013%2D20230614%5F170558%2DBesprechungsaufzeichnung%2Emp4

https://ostch.sharepoint.com/teams/TS-CASCyberSecurity20222023/Freigegebene%20Dokumente/Forms/AllItems.aspx?FolderCTID=0x012000DA88AEB389EBC1429C0A3BD2AC030A1D&sortField=Modified&isAscending=false&id=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings%2FDebriefing%20Lab%2013%2D20230622%5F170113%2DMeeting%20Recording%2Emp4&viewid=8c2d7430%2Df604%2D47d8%2Dbf67%2D85f8bb932d8e&parent=%2Fteams%2FTS%2DCASCyberSecurity20222023%2FFreigegebene%20Dokumente%2FGeneral%2FRecordings


**CrackMe Simple**
start emulatoremulator


check if frida is running
```
cd frida
frida % source venv/bin/activate
su
ps -ef | grep frida
exit
```

- `frida-trace -U -j 'org.bfe*!*' "CrackMe Simple"` -> trace (not sure this is the correct version)
    - will hook into all methods of classes in that are in org.bfe (if comand is fully correct)
    - maybe we have to exist and rern command, exit with CTRL+C
    - -> when we find crypto (asci) we get password (maybe use cyberchef or some other tool)