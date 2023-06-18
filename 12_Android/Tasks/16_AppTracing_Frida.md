# App Tracing with Frida
### Steps

**1. Download and install CrackMeSimple.apk**
- Download 
- Start emulator (using "Pixel 6 API 28", Android 9.0 | x86_64)
- uninstall previously installed version if it exists:  `adb uninstall org.bfe.crackmesimple`
- `adb install CrackMeSimple.apk` -> install

**2. Install Frida**
running the following commands as root
- `pipenv --python 3 shell` -> creates a virtual environment 
    - See success msg 
    Successfully created virtual environment!
    Virtualenv location: /root/.local/share/virtualenvs/hacker-2-tVmwA4
    Creating a Pipfile for this project...
    Launching subshell in virtual environment...
    /home/hacker   . /root/.local/share/virtualenvs/hacker-2-tVmwA4/bin/activate     
- `pip install frida`
- `pip install frida-tools`
- `pip install objection`
- Install frida-android-helper (since "pip install frida-android-helper" fails)
  - `git clone https://github.com/Hamz-a/frida-android-helper.git`
  - `cd frida-android-helper`
  - `python3 setup.py install`

basic test run `frida-ps` or `frida --version`

**3. install frida server**
"fah server update" returned an error (something like: No module named 'ppadb') so i have to download and install the frida server on the android device manually following: https://medium.com/@briskinfosec/getting-started-with-frida-de44d932ae7 and https://frida.re/docs/android/

- `frida --version` -> 16.0.19
- download frida-server for my platform from https://github.com/frida/frida/releases (for right version)
    - Downloaded "frida-server-16.0.19-android-x86_64.xz" (matching my emulator)
    - `unxz frida-server-16.0.19-android-x86_64.xz` -unpack
    - `cp frida-server-16.0.19-android-x86_64 frida-server` -> copy (rename)
        - `rm frida-server-16.0.19-android-x86_64` (delete orig so make)
- Now set up frida-server on android device
    - `adb root` (might be necessary according to manual)
    - `adb push frida-server /data/local/tmp/` copy frida-server to device
    - `adb shell` start shell
    - `chmod 755 /data/local/tmp/frida-server`
    - `cd /data/local/tmp`
    - `./frida-server &` -> start frida server ("&" to not block cmd)
        - output: "[1] 5691"

Check if server is up and running
- `exit` -> leave device bash (but still in the same window)
    - somehow I got stuck and had to send the Quit signal (right click on window>send signal) and then I had to reconnect to virtual environment via "pipenv --python 3 shell"
- `frida-ps -U` -> there should be a process "frida-server"


**3 start tracing (and find pw)**
Now that server is running we can start tracing. 
In the emulator I start CrackMeSimple and enter a password and try to sign in to ensure all classes are loaded (tried it without it, not all classes are traced)

- `frida-trace -U -j 'org.bfe*!*' 'CrackMe Simple'` -> starts tracing
    - will trace process "CrackMe Simple" and classes in namespace/classpath "org.bfe" 
    - i get the name of the process from "frida-ps -U"
    - I'll find " | <= [72,76,123,82,51,118,51,114,115,105,110,103,46,70,85,78,125]" in the trace, which is the password

**4. decide pw byte array found in tracing**
Using CyberChef:  copy array as input -> choose from Decimal (Comma as separator)
Using Python (as in lab task)
```
a=[72,76,123,82,51,118,51,114,115,105,110,103,46,70,85,78,125]
flag = ''
for e in a:
    flag=flag+chr(e)

print(flag)
```

Found password/flag: "HL{R3v3rsing.FUN}"

### Security Questions


- What did you learn in this exercise?
- What is the purpose of FRIDA
- Explain how FRIDA works
