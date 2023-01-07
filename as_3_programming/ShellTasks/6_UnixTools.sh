# 56 Unix tool


# 6.1 Information gathering
# find / -mmin -$60  #-> with too many permission denied messages
# find / -mmin -$60 2> /dev/null  # hides/redirect error output
# find ~/ -name *.log  # all log files in my home dir


# 6.2.1 cat (approach probably too complicated)
rm -d -r ~/tmpEx
mkdir ~/tmpEx
for file in $(find ~/ -maxdepth 1 -type f )
do
	echo "" $file >>  ~/tmpEx/tmpFileDeleteMe.txt
done
for file in $(find / -maxdepth 1 -type f )
do
	echo "" $file >>  ~/tmpEx/tmpFileDeleteMe.txt
done
# cat ~/tmpEx/tmpFileDeleteMe.txt  # outcommented as too much output


# 6.2.2 tail
## not sure i understand


# 6.2.3 column
if test -f ~/tmp/some.csv
then
	# 6.2.3
    column -s "," -t ~/tmp/some.csv
else
    echo "csv file doesnt exist " 
fi

# 6.2.4 wc between 2 statements
echo "A) 'wc -l <(ls)' " 
wc -l <(ls) # Result: "5 /dev/fd/63"
# explanation: <($expression) provides the the output as a file descriptor
# also see: https://unix.stackexchange.com/questions/156084/why-does-process-substitution-result-in-a-file-called-dev-fd-63-which-is-a-pipe

echo "B) 'ls | wc -l' > will call ls, then pipe the output as stdin to wc and count the lines "
ls | wc -l   #Result: "5"  (number of lines as one would expect)


# 6.3.1 sort (command outcommented as result is flooding console)
echo "shows sorted filename of my root and home directory (using temp file created earlier)" 
# sort -u ~/tmpEx/tmpFileDeleteMe.txt

# 6.3.2 grep (command outcommented as result is flooding console)
echo "running find and show some errors but not all" 
# find / -mmin -$10 2>&1 | grep -v -i "Permission denied\|Operation not permitted" #-> with too many permission denied messages


# 6.3.3 cut  (command outcommented as result is flooding console)
# cut -d ":" -f 1,3 /etc/passwd     # delimiter ":", field/column 1 and 3
# cat /etc/passwd  | rev | cut -c 1-4 | rev    # showing last for characters

# 6.3.4 awk
# -> kill processes .. not sure
# cat /etc/passwd | awk -F ':' ' {print $3 " " $1}'   # shows id and username
echo "ddd@.bla.ch xx@jabadaba.com ooo@kk.ch" | awk 'BEGIN{print "<html><body>"}{for(i=1;i<=NF;++i)print "<a href=\""$i"\">"$i"</a>"}END{print "</body></html"}'  > ~/tmpEx/awkTestDeleteMe.html

# 6.3.5 sed
#sed -n /^[a].*z$/p /usr/share/dict/words   # prints all lines starting with a and ending with z

# 6.4.1 seq number 3-99 which can be divided by 3 but not by seven
#seq 3 3 99  | awk '{for(i=1;i<=NF && i<999;++i){if ($i%7!=0){print $i}}}' ## not sur if this counts as not using a for loop

# 6.4.2 curl
## call url, redirect sdtout, reduce lines, make one line, pick the columns and print them (possible because position is deterministic)
curl https://nzz.ch -silent -i -I -4 -v 2>&1 | grep -i -E -e '^\* Connected to|^HTTP/2' | sed ':a;N;$!ba;s/\n/ /g' | awk '{print $5":"$7 " -> " $10}'


# cleanup
rm ~/tmpEx/tmpFileDeleteMe.txt
