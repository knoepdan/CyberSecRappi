# 6 Unix tool

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
## didnt come up with a solution ( & to run it in the background, > redirect output to a file.. but haven't found sound usage of tail ..)
# find / -mmin -$60 2> /dev/null | tail -2 > ~/tmpEx/tmpFileDeleteMe2.txt  &   

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



# cleanup
rm ~/tmpEx/tmpFileDeleteMe.txt

