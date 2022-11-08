#Linux for dummies

**File system and structure**
- Linux has a single unified file system (no C: or D: like in windows). External files can be "mounted" to any location. 
- "/" is the root directory


<img src="LinuxFileStructure.png" width="300" />


**Linux trivia**

- background services are called "daemons"
- In older systems "root" was an actual users

## Bash

**Basic basics**
For help add "--help". Examples: 

- `bash --help`  
- `ls --help`

**Basic files and folders**
`mkdir newfolder` 
`ls -al`  -> lists all files and directories 
`ls -alh`  -> lists all files and directories 
`cd  newfolder`
`cd  ..`
`cd  ~` -> go to home directory of current user
`rmdir  newfolder`
`pwd`  -> shows current folder
`rm newfolder` -> delete  file (might need more params)
`cp source destination`  -> copy file (or filder??)

hidden files/dirs: names that start with a dot (".") are hidden (offent config files)


**System and accounts**
 `whoami`  -> current user
`ps`  -> shows all running processes
 `sudo commandName` -> rund command as superuser (e.g: sudo cat /etc/shadow)
`su ` -> switch to superuser (pw needed, disabled on some linux systems)

**Network**
 `ip a `  ->  network interfaces (or "ip addr")
 `ifconfig -a `  -> network interfaces (probaly outdated, use "ip a")
 `curl http://site ` -> execute http get request
`nslookup compass-security.com`  -> get ip from domain name
`dig compass-security.com`  -> alternative to nslookup (seems to provide a bit more info)
`netstat -antp`  -> check port and interface of services
`tshark -qn -z conv ,tcp -r evidence01.pcap` -> view packate conversations. (a bit like wireshark)


**Varia**
- `code .`   -> will open current directory with VS Code (. is current dir)
- `clear`  -> clears bash
- `cat fileName` -> shows file
- `sh bashScript.sh` -> runs bash script
- `less fileName` -> shows file (one page at a time)
- `echo "hello world"` -> prints "hello world
- `openssl rand -hex 16` -> generate random hex (example as input for AES)
- `sudo apt-get install softwareName"` -> install software package (e.g: "sudo apt-get install python3.10-venv")
    - runs as superuser
    - will be downloaded from online repository (configured in sources.list file)
- `gzip -d someFile.gz` -> unzip gz file 
- `tar -xvf spoofer-1.4.6.tar` -> unzip tar file 
- `whereis google-chrome` -> find location of google chrome  (should/could be here: "/usr/bin/google-chrome-stable")


**Vi editor**
`vi filename`   -> will open or create a file 
vi knows command mode and insert mode
- command node (initial mode)
-- use keyboard keys to
--- navigate
--- delete
--- copy/paste
-- `i` switch to insert mode
-- `ZZ` Save and quite vi (or :wq)
-- `:q` quit -> will warn if not saved
-- `:q!` quit without saving
- insert mode
-- edit/enter text
-- navigate via keys is possible
-- enter to get to a new line
-- "Esc" to return to command mode

https://www.redhat.com/sysadmin/introduction-vi-editor
https://www.cs.colostate.edu/helpdocs/vi.html


**grep filter**
`grep word file1` search for word in file (using Regular expressions)
`grep -i word file2` case insensitive search
`grep -F word file2` use word search (not a Regex) replaces fgrep
`grep word file1 file2` search in more than one file
`grep 'word word2' file1` with empty space
`grep -r '192.168.1.5' /etc/` search ip in all files of dir and subdirsgre(-r for recursive)
`grep word file1 > my-acl.txt` saving to a file

Note
- returns "1 erro" if nothing was found
- pattern can have ' around them or not (attention empty spaces)
- common errors
-- search is not case insensitive (-i)

https://www.cyberciti.biz/faq/howto-use-grep-command-in-linux-unix/

**awk**
more adcanced than grep

**Environment variables (export etc)**
- `export` ->  without args: list all environment variables (diff to set??)
- `set` -> list all set variables  (diff to export??)
- `echo $JAVA_HOME` -> display value of environment variable
- `export NAME=VALUE` -> set an environment variable for the current session
    - Attention: this is only active during the current session. Child proccesses of the current bash inherit it.
- `export JAVA_HOME=/opt/openjdk11` -> set an environment variable JAVA_HOME
    - Attention: this is only active during the current session
- `unset JAVA_HOME` -> unset variable
- Persisting environment variables
    - for a user: export command must be saved in a ".bash_profile" file 
    - globally: create a ".sh" file under "/etc/profile.d" with export command


https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-set-environment-variables-in-linux/#:~:text=To%20export%20a%20environment%20variable,command%20while%20setting%20the%20variable.&text=We%20can%20view%20a%20complete,export%20command%20without%20any%20arguments.&text=To%20view%20all%20exported%20variables,the%20%2Dp%20flag%20with%20export.


**Pipes**
Basically attaches the "stdout" (the result of a bash command) of one process directly to the "stdin" of the next. Errors ("stderr") are usually not piped. Return code is from the last command. 
Examples: 
`ls -all | grep test` -> the output of ls is filtered by grep and then displayed on screen (using coloring as grep is writing it to the screen)
`ls -all | grep test | cat`  similer but the output from grep is forwared to cat which then outputs it to the screen (with no coloring)
`echo -n "Super Hacker" | base64`  encode string with base64
` echo -n "Super Hacker" |  md5sum`  get md5 sum
`echo '{ "foo": 123, "bar": 456 }' | jq '.foo'` -> jq is a json command and outputs "123" (value of foo)

https://stackoverflow.com/questions/9834086/what-is-a-simple-explanation-for-how-pipes-work-in-bash

**">" and ">>" operators**
">" redirects the output of a program/command to something other than than "stdout" (standard output, which is the terminal by default). ">>" is similar but will for example not overwrite but append to a file.
`ls -all > allmyfiles.txt` -> creates or overwrites the file with the resul tof ls
`echo "end" >> allmyfiles.txt`  -> appends "end" string to the file (or creates a new one if it doesn't exist)
`> newZeroByteFile`  -> creates (or overwrites) a new file with zero bytes



**General links**
https://ubuntu.com/tutorials/command-line-for-beginners#1-overview
https://towardsdatascience.com/basics-of-bash-for-beginners-92e53a4c117a

**Advanced (bash with programming constructs)**
https://www.computerhope.com/unix/ubash.htm



**TODO (might be worth a look)**
- commands: awk, sed 
    - probably many more...
- accounts
- some network commands
- config files etc.
    - especially some that we might need later on