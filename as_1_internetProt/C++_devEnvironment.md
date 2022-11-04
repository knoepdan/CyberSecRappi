# C/C++ Dev environment 

C/C++ first steps were done in the assignment 'Internet protocolls 1/2" with a small IP spoofing application downloadable via https://www.caida.org/projects/spoofer/  (has to be unzipped untarred first)

### Installation
Install dependencies: 
`udo apt-get install build-essential libpcap0.8-dev libprotobuf-dev protobuf-compiler libssl-dev qtbase5-dev`  -> follow steps (maybe some messages related to grub reappear.. just follow through)


### Info building C/C++
<span styke="color:orang">TODO extend and improve (if necessary) </span>
https://opensource.com/article/18/8/what-how-makefile 


### Usual workflow to download, build and run app
some stuff might have to be done as root
1. gzip -d project.tar.gz
2. tar -xvf project.tar
3. cd project
4. configure --prefix=/opt/applic/project
5. make
6. make install
7. cd /opt/applic/project
8. test - test - test



### Example:  Build and run spoofer app
1. Get spoofer application source 
  - from https://www.caida.org/projects/spoofer/ or downloadable as tar.gz file from hacking lab site
2.  unzip downloaded file
  - 1. `gzip -d spoofer-1.4.6.tar.gz` -> unzip gz file 
  - 2. `tar -xvf spoofer-1.4.6.tar` -> unzip tar file
3. configure and build  (maybe some of it has to be done as 'root')
  - `./configure --prefix=/opt/applic/spoofer` -> runs shell script (in unzipped/tared folder)
  - `make`
  - `make install` 
  - this should have built the application in the following folder "/opt/applic/spoofer"   (from root directory.. not default user directory)
4. Run application (use full path as shown, relative path might not work)
  - start scheduler: `/opt/applic/spoofer/bin/spoofer-scheduler`  -> start as root
  - start ui: `/opt/applic/spoofer/bin/spoofer-gui` (probably also start as root)



