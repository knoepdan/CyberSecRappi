# 5.1.2.2 Loops etc.

# fibonaci (not 100% sure if this is what is meant)
fibArr=(1 2 3 5 8)
for i in ${input[@]}  # or just: for i in 1 2 3 5 8
do
	echo "$i"
done
echo "Count of fibonaci array: " ${#fibArr[@]}   # print lenght of array

#### quiz program


# using a map
# declare -A shapeCorners=(
# 	[Triangle]=3
# 	[Rectangle]=4
# 	[Pentagon]=5
# )

# faking a map (using variable constants as index... there are other ways to do)
declare -r Triangle=0
declare -r Rectangle=1
declare -r Pentagon=2
declare -A shapeCorners
shapeCorners[Triangle]=3
shapeCorners[Rectangle]=4
shapeCorners[Pentagon]=5


correct=0
for key in ${!shapeCorners[@]} 
do
    echo "How many corners has a " $key
    read -p "Your answer: " x
    # echo "correct answer: " ${shapeCorners[$key]}

    if [ $x = ${shapeCorners[$key]} ]
    then
        ((correct++))
    fi

done

echo "Correct answers: " $correct


#### what does the following do
for i in *  # will return all (regular) files in the working directory
do
    echo $i
done

#https://www.reddit.com/r/bash/comments/cqrco9/what_does_for_i_in_mean_in_a_bash_script/