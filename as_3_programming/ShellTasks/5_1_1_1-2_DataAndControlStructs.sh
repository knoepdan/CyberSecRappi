# 5.1.1
read -p "What topic would you be interested to talk about? " x
echo "mhh ok.. You want to talk about: " $x
# compare: heed the spaces around operators, brackets etc... 
if [ -z $x ]  # empty space
then
    echo "oohhh wait.. you didnt say anything"
elif [ $x = "a" ]
then 
    echo "I don't think the letter a is that interesting"
elif [ $x -lt 5 ] # compare by numbers (smaller than)
then
    echo "I don't understand why you would enter a number below 5"
elif [ $x = "z" -o $x = "y" ]  #  -o stands for or. "-a" -> would be and
then
    echo "I love that topic"
elif [ ($x < "15") ]  #  -o stands for or. "-a" -> would be and
then
else
    echo $x "? This is extremly boring. " 
fi

# 5.1.2 
#-> $x < "13" does not work as it is not supported by the "[" programm (see: "man [")
