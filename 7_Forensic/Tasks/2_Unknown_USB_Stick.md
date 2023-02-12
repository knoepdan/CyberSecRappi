# Unknown USB stick

## Answers
- Describe how you retrieved the flag.
    - Install Testdisk: `sudo apt -y install testdisk`
    - run testdisk: `sudo testdisk usbstick.dd`  (interactive application)
        - analyze and choose "list files" -> "ThisIsTheFile.txt"
        - Content: "2a4e64d8-8408-460b-b8a6-f90b24bff5f4" (flag)
- Describe why nothing showed up on when the USB Stick was inserted by the employee.
- Describe what has likely happened to the USB Stick.
- Make a provable statement on whether the USB Stick is likely malicious or not.
- Make a statement on how the employee who found the USB Stick should remediate the situation and how he should handle similar situations in the future.
- State why or why not file carving is useful in this scenario.
    Answer: to find deleted files that might contain sensitive data


*Remark*: will try to give better answers later (if I have enough time). but will first go through all tasks