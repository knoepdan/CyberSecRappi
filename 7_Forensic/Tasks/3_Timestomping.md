# Timestomping

## Answers

- Describe what files were created directly on the usb stick and which ones were probably moved (volume move) there.
    - NewAccount.txt was copied (copied flag in Timeline Explorer)
    - Accounts.txt was created on stick (and NewerAccounts.txt probably as well)
- Describe two different time anomalies that are observed while analyzing the USB Stick.
    - NewestAccounts.txt -> Timestamps has no milliseconds for created/modified, which is unlikely 
    - NewestAccounts.txt -> Dates (modified/created) are much earlier than any other files
    - NewestAccounts.txt -> Modified/Created is different much earlier than metadata changed. Accounts.txt has INode 39 and NewestAccounts.txt 41 which makes it likely that NewestAccounts.txt was created after Accounts.txt, which contradicts the timestamps.
    - (didnt see the different timezones in the windows tools FTK Imager and 7-zip)
- Determine what file timestamps were tempered with.
    - Created, LastModified, LastRecordChange, LastAccess 
        - all timestamps where 0x10 is different from 0x30  (0x30 coming from the metadata of $name attribute)
- Determine the real time the file NewestAccounts.txt was created / last modified.
    - Created: 2021-03-03 07:20:13
    - Modified: 2021-03-03 07:20:13

## Varia

How to get $MTF files (and alike)
1. Use FTK Imager or similar to load or mount the image.
    - Select File
    - Add Evidence Item
    - Image File
    - Select the dd file
    - Finish
2. Select file and export
3. Then open it in Timeline Explorer
