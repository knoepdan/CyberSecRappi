# 6 Unix tool

# Preparation (from 6.2.1 cat...approach probably too complicated)
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


# 6.3.1 sort (command outcommented as result is flooding console)
echo "shows sorted filename of my root and home directory (using temp file created earlier)" 
sort -u ~/tmpEx/tmpFileDeleteMe.txt

# 6.3.2 grep (command outcommented as result is flooding console)
echo "running find and show some errors but not all" 
find / -mmin -$10 2>&1 | grep -v -i "Permission denied\|Operation not permitted" #-> with too many permission denied messages


# 6.3.3 cut  (command outcommented as result is flooding console)
cut -d ":" -f 1,3 /etc/passwd     # delimiter ":", field/column 1 and 3
cat /etc/passwd  | rev | cut -c 1-4 | rev    # showing last for characters

# 6.3.4 awk
ps -l | sed '1d' | awk '{print $4}' | xargs echo # remark: instead of echo would be kill (Using echo as all my programms will still run :-)
cat /etc/passwd | awk -F ':' ' {print $3 " " $1}'   # shows id and username
echo "ddd@.bla.ch xx@jabadaba.com ooo@kk.ch" | awk 'BEGIN{print "<html><body>"}{for(i=1;i<=NF;++i)print "<a href=\""$i"\">"$i"</a>"}END{print "</body></html"}'  > ~/tmpEx/awkTestDeleteMe.html

# 6.3.5 sed
sed -n /^[a].*z$/p /usr/share/dict/words   # prints all lines starting with a and ending with z

# cleanup
rm ~/tmpEx/tmpFileDeleteMe.txt

