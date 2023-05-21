import subprocess

gedit_pid = subprocess \
              .getoutput("ps -ef | grep gedit | head -1 | awk '{print $2}'") \
              .strip()
print(gedit_pid)
