# 6 Unix tool


# 6.4.1 seq number 3-99 which can be divided by 3 but not by seven
seq 3 3 99  | awk '{for(i=1;i<=NF && i<999;++i){if ($i%7!=0){print $i}}}' ## not sur if this counts as not using a for loop

# 6.4.2 curl
## call url, redirect sdtout, reduce lines, make one line, pick the columns and print them (possible because position is deterministic)
curl https://nzz.ch -silent -i -I -4 -v 2>&1 | grep -i -E -e '^\* Connected to|^HTTP/2' | sed ':a;N;$!ba;s/\n/ /g' | awk '{print $5":"$7 " -> " $10}'

