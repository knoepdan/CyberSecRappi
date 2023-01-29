# 5.1.3 Structures

power_usage() {
	echo "Usage: power BASE EXPONENT"
}

power() {
	base=$1 # first argument passed
	exponent=$2 # second argument passed
# alternative way for or
# if [ $base = "-h" -o $base = "-help" ]; then echo "invalid" && exit 1; fi
	if [ $base = "-h" ] || [ $base = "--help" ]; then power_usage && exit 1; fi
	if [ -z $base     ] || [ -z $exponent     ]; then power_usage && exit 1; fi

	echo "$base ^ $exponent = $(($base**$exponent))"
	return 0
}

binary_usage() {
	echo "Usage: binary LIMIT"
}

binary() {
	if [ -z $1 ];                          then binary_usage && exit 1; fi
	if [ $1 = "-h" ] || [ $1 = "--help" ]; then binary_usage && exit 1; fi

	limit=$1
	i=1
	while [ $i -le $limit ]; do
		power 2 $((i++)) # call "power" with arguments 2 and "i" (then increase i)
	done

	return 0
}

## Question 1: How would a call to the binary method look in order to... 1024
binary 1024   

## Question 2: What does[ -z $base ]test for?
# Answer: if test for the lenght of the string (true if zero aka string is empty)

## Question 3: Why are we writing writing[ $base = "-h" ] || [ $base = "--help" ] instead of[ $base = "-h" || $base = "--help" ]?
# Answer: || means execute the next statement irrespective of whether previous one succeded (just like && means, only execute the next one if this statement succeeds)
# This construct can be used to construc or logic in Ifs. Also remember that "[" is an actual program
# However, there is also an alternative to construct ifs 
# if [ $base = "-h" -o $base = "-help" ]; then echo "invalid" && exit 1; fi
