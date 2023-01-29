# 6 Unix tool


# 6.1 Information gathering
find / -mmin -$60  #-> with too many permission denied messages
find / -mmin -$60 2> /dev/null  # hides/redirect error output
find ~/ -name *.log  # all log files in my home dir

