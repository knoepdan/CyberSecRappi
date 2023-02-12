# USB Stick carving

## Answers

- what is the purpose of the fsstat tool?
    - Provides info about the file system
- what is the difference between analyzing the image using foremost versus mounting the image
    - when mounting we get the filesystem as it, we dont see (or find) deleted files. foremost is used to find deleted files (file carving)
- what is the purpose of the bulk_extractor tool?
    - It is used to find potentially sensitive data from a file system or image (example: credic card number, urls etc.)
    - it bypasses the OS filesystem and therefore finds information in deleted - not yet overwritten of course - files as well
- what is the purpose of the sleuthkit tool?
    - it is a collection of command line tools for forensics. It allows inspecting file systems in a non intrusive fashion. 
    - It's functionality overlaps with other tools (like ffstat)
- explain what you have learned
    - One should be careful to not change data (readonly) 
    - bypassing the file system/OS is crucial for many tool as we are usually interested what is "hidded" (e.g. deleted)
    - There is a myrad of tools  
