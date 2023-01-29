# 5.2 Language features


# 5.2.1 Builtin Parameters

## Question: What is the difference between "$@" and $@?
# Answer: $@ -> will not heed any quotes and treat different words (separated by a whitespace) within quotes as separate arguments.
# "$@" heeds the quotes and and does not separate strings by whitespace within quotes. Usually what we want
someFunc() {
	echo "Arg 1: $1"
	echo "Arg 2: $2"
	echo "Arg 3: $3"
	echo "Arg 4: $4"
}

echo '$* without quotes:'
someFunc $*

echo '$@ without quotes:'
someFunc $@

echo '"$*" with quotes:'
someFunc "$*"

echo '"$@" with quotes (this is what we usually want):'
someFunc "$@"

# -> call: bash 5_2_LanguageFeatures.sh arg1 "arg21 arg22" arg3


# 5.2.2.1 Parameters
readWithTimeout () {
	declare -g readReturn=1
	read -t 5 -p "Provide input within 5 sec: " readReturn
	if [ $? -ne 0 ]    #  $? is 0 when last command is successful (meaning no timeout)
	then
		readReturn="Default"
	fi
    echo $"Continuing with: " $readReturn
}
# call method: readWithTimeout

# 5.2.2.2 Output -> use global variable as substitute for return values (outcommented for practicability)
#readWithTimeout
#echo "After calling method readWithTimeout we use global variable as return value :" $readReturn


# 5.2.2.3 Curly Braces
rm -d -r ~/testDirDeleteMe  # clear
mkdir -p ~/testDirDeleteMe/Appendix{A..D}/Page{1..4}
rm -d ~/testDirDeleteMe/Appendix{B..C}/Page4

# part 2
pushd ~/testDirDeleteMe/
echo -e "version '3.7'e\nservices:\nhello world etc. etc." >  docker-compose.yml
#cat docker-compose.yml

# 5.2.3 Commands Built-In & Chaining  (solution probably not as intended)
for file in $(find . -type f -print0 -name "docker-compose.yml")
do
    #code to perform task on each file
	echo "running docker-compose up (will fail due to incorrect docker-compose file) " $i
	docker-compose up
done
popd

#for FILE in *; do echo $FILE; done