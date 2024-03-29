# Interopability between languages

Since some developers have a preference for some languages but a few things are useful in others, it can make sense (sometimes) to use 2 languages where a script in one language calls another and then uses the output for further processing. Especially in a exam scenario where time is of crucial, this can be useful.


Generally, the challenge is: 
- how to call (usually very simple, but it doesnt hurt to have an example)
- how to await (usually also simple)
- how to pass params
- how to use return value 
    - One possibility is always to write info into a file and then read it with the next script (not elegant though) 

*Remark 1: info here might not exclusivly about interoperability*
*Remark 2: Not all aspects are always shown*

## Windows

**bat files**
Call other scripts
- Generally use "CALL" to await outcome
- `CALL other.bat paramOne paramTwo` 
    - in other.bat we can access params by %1%. %2% 
        ``` 
           IF NOT "%1%"==""  
	        %OTHERVAR% run %1%
        ```
- `call npm i`  (without should also work but then we don't await )
- `node someJsScript.js`   (we don't use call because we don't await. Usually we would also use call (not tested here))
- `PowerShell.exe -NoProfile -ExecutionPolicy Bypass -Command "& { Start-Process PowerShell.exe -ArgumentList '-NoProfile -ExecutionPolicy Bypass  -File ""%~dp0\copy-icons.ps1 ""' -Verb RunAs }"`  (often use `@ECHO OFF` before calling)


**Powershell**
Should be preinstalled run in powershell window or call via bat
- Call a bat file (multiple ways)
    - `Invoke-Expression -Command ".\testPS.bat"`
    - `Start-Process -FilePath "C:\PathToBatFile\FileToExecute.bat" -ArgumentList $argstr -Wait -NoNewWindow`
    - https://java2blog.com/run-batch-file-powershell/


**C# scripting .csx**
Installation: 
- Folllow  https://github.com/dotnet-script/dotnet-script
    - powershell script for windows
        - `dotnet tool install -g dotnet-script` -> seems to install it on Windows as well (worked only on windows)
    - bash script for linux

Run script: `dotnet script helloworld.csx`

Some more links and infos
- https://visualstudiomagazine.com/articles/2021/06/14/csharp-scripting.aspx
- https://learn.microsoft.com/en-us/archive/msdn-magazine/2016/january/essential-net-csharp-scripting
- attention there are some older versions of .net scripting (Nake, ScriptCS) which are not necessarily compatible


**node**
Requires node to be installed
`node scriptsFolder/nameOfScript.js`  (see example script build.js)

## Linux

**Python**

- `echo $(python3 <<< "print(1.5 + 2.51)")`
  - embed pyhton in bash
- `cat file.txt | python order.py | sort > someOutputFile.txt`
    - how to pipe between python and bash (using standard input/output)
- `python bashInPython.py`
    - file "bashInPython.py calls bash"


also see:  https://levelup.gitconnected.com/bash-vs-python-for-modern-shell-scripting-c1d3d79c3622 (and many more sources)

**Java**
- `echo "fromBash" | java inter.java "passedArg" | sort > javaExample.txt`
    - piping in and out of a java program
- `java callBash.java`
    - example on how to call bash from java


**CSharp**
*Attention: .Net 6 seems to be preinstalled on Kali Linux (but not scripting)* 

Getting started with C# projects
1. Prerequisites: VS Code and .Net 6 installed
2. `dotnet new console --framework net6.0 --use-program-main` -> will create project file and .cs file (edit/extend at will)
3. `dotnet build CSharp.csproj` -> build (create dll)
4. `dotnet run CSharp.dll` -> run dll as console app


Example on how to call a bash script (or any other) from C#
```
    Process extScript = new Process();
    extScript.StartInfo.FileName = @"script.sh";
    extScript.Start();
    extScript.WaitForExit();
```
Links and varia:  
- https://learn.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code?pivots=dotnet-6-0 
- https://soltveit.org/c-bash-script-made-easy/
- Visual studio code extension: C# (from Microsoft)

**CSharp scripting linux**
Installation scripting 
- Folllow  https://github.com/dotnet-script/dotnet-script 
- `curl -s https://raw.githubusercontent.com/dotnet-script/dotnet-script/master/install/install.sh | sudo bash` > tried it and worked (or see link posted above)