# Proxy log analysis

## Answers
We expect the following information in your solution. Please be as complete as possible to receive maximum points:

- What is the IP address of the suspect?
    - 192.168.200.50
- Which sites has he visited?
    - 62 192.168.200.50 http://portswigger.net
    - 350 192.168.200.50 http://www.exploit-db.com
- Which OS and browser has he been using?
    - Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:7.0.1) Gecko/20100101 Firefox/7.0.1


### Security questions

- explain the following command awk '/login.yahoo.com:443/ {print $1,$7}' access.log
    - gets column 1 and 7: which IP accesses which url
-  explain the following command sed "s#\([http|https]://[^/]*\)/.*#\1#"
    - removes protcol info
- explain the following command awk '{print $1,$7}' access.log | sed "s#\([http|https]://[^/]*\)/.*#\1#" | sort | uniq -c
    - takes results from above commands and sorts them and removes duplicates