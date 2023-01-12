def resolve(map):

    mainQuestion = "What are you looking for? "

    while True:
        keyToSearch = input(mainQuestion)
        mainQuestion = "Anythig else I can help you with? "
        if keyToSearch.strip().lower() == "no":  # maybe not 100% correct for the first loop (but focus is not on this)
            print("Ok, goodbyxe")
            return;
        if keyToSearch in map:
            print(map[keyToSearch]) # exact match
        else:
            # try find close match  
            possibleMatch = None
            for key in map.keys():
                if key[1:len(key)-2] == keyToSearch[1:len(keyToSearch)-2]:
                    possibleMatch = key
                    break

            if possibleMatch is None:
                print("Sorry, I don't know anything about that")
            else:
                isCorrectGuess = input("Did you mean " + possibleMatch + "? ")
                if(isCorrectGuess.strip().lower() == "yes"):
                    print(map[possibleMatch])
                else:
                    print("Mhh ok then I dont know anything about what you want")

resolve({"dna": "desxxxx acid"})
