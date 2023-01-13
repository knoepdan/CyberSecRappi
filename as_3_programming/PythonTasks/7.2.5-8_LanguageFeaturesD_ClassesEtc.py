from datetime import datetime
# 7.2.5 Classes and 7.2.6 Docstring  (Documenation via """doc comment""")
# 7.2.7 Exceptions and 7.2.8 operator overloading
# 7.4.2 datetime (also see 7.4_Buil...)

class LogEntry():
    """LogEntry writes log messages to console or file"""

    # some parts are probably a) more about playing with the language b) too complicated/unelegant

    levels = ("ERROR", "WARNING", "INFO") # Tuples (constants)
    
    def __init__(self, msg: str, **filename):
        # default
        self._levelIndex = 0
        self._message = msg
        self._file = None
        self._timestamp = datetime.now()
        # parse/analyze msg
        try:
            parts = msg.split(":")
            if(len(parts) < 2):
                return
            for index, item in enumerate(LogEntry.levels):
                if(item == parts[0].upper()):
                    self._levelIndex = index
                    self._message = ":".join(parts[1:]) # removes the first part
        except BaseException as error:
            # (not sure if there can be an exception during the parsing....)
            # What we could do: logging (only halfway makes sense here), set defaults (already done here), try another approach etc.
            print("Oh no error has occured " + error)
        # check optional filename
        for f in filename:
            if(f == "file"):
                self._file = filename[f]

    def getMsg(self):
        """returns the formatted message"""
        return self._timestamp +" - " + LogEntry.levels[self._levelIndex] + ": " + self._message

    def log(self):
        """logs to console or file"""
        logMsg = self.getMsg()
        if(not self._file is None):
            logfile = open(self._file, "a")
            logfile.write(logMsg+"\n")
            logfile.close()
        else:
            print(logMsg)

    def __repr__(self):
        return self.getMsg()

    def __lt__(self, other):
        # operator overloading (is smaller, useful for sorting
        # https://docs.python.org/3/reference/datamodel.html#basic-customization
        if(other is None):
            return -1
        return self._levelIndex - other._levelIndex

errorEntry = LogEntry("Error: testMsg")
infoEntry = LogEntry("INFO: im some infoMsg", file = "logfileTest.txt")
warnEntry = LogEntry("WARNING: blablabal")
print(errorEntry)
print(infoEntry)
# infoEntry.log()

# test sorting
sortedList = sorted([errorEntry, infoEntry, warnEntry]) # will implicitly call the overloaded __lt__ method
print(sortedList)
