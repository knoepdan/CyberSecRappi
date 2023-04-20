@ECHO OFF
PowerShell.exe -NoProfile -ExecutionPolicy Bypass -Command "& { Start-Process PowerShell.exe -ArgumentList '-NoProfile -ExecutionPolicy Bypass  -File ""%~dp0\copy-icons.ps1 ""' -Verb RunAs }"


