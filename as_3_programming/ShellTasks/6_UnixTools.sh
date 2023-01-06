# 56 Unix tool


# 6.1 Information gathering
# find / -mmin -$60  #-> with too many permission denied messages
# find / -mmin -$60 2> /dev/null  # hides/redirect error output
# find ~/ -name *.log  # all log files in my home dir


# 6.2.1 cat
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
cat ~/tmpEx/tmpFileDeleteMe.txt
rm ~/tmpEx/tmpFileDeleteMe.txt

# 6.2.2 tail

