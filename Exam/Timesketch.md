# Timesketch

Start 17:50


## Tasks

1. Determine the time when the system was last booted up? (1 Point)
    - Query: data_type:"windows:evtx:record" AND event_identifier:"6005"
    - Answer 2021-06-28T11:55:26

2. Determine the username and time of the last interactive logon of a real user (not SYSTEM, DWM, UMFD, ...)? (1 Point)
    Query: data_type:"windows:evtx:record" AND event_identifier:"4624" AND NOT logon_type:"Service"
    - Username: defaultuser0
    - time: 2021-02-09T08:39:06

3. Determine the file extension, the ransomware is adding to the encrypted files? (1 Point)
    - Query: filename:"Martynov_Olga Thesis-Final_4May2020"
    Answer: "LNK"  (shortcut)

4. When did the ransomware encrypt the first document? (1 Point)
    Answer: 2021-07-04T04:17:19

Out of time