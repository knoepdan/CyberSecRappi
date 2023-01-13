# 7.2.5 Classes and 7.2.6 Docstring  (Documenation via """doc comment""")

class LogEntry():
    """LogEntry writes log messages to console or file"""

    # some parts are probably a) more about playing with the language b) too complicated/unelegant

    levels = ("ERROR", "WARNING", "INFO") # Tuples (constants)
    
    def __init__(self, msg: str, **filename):
        # default
        self._levelIndex = 0
        self._message = msg
        self._file = None
        # parse/analyze msg
        parts = msg.split(":")
        if(len(parts) < 2):
            return
        for index, item in enumerate(LogEntry.levels):
            if(item == parts[0].upper()):
                self._levelIndex = index
                self._message = ":".join(parts[1:]) # removes the first part
        # check optional filename
        for f in filename:
            if(f == "file"):
                self._file = filename[f]

    def getMsg(self):
        """returns the formatted message"""
        return LogEntry.levels[self._levelIndex] + ": " + self._message

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

errorEntry = LogEntry("Error: testMsg")
infoEntry = LogEntry("INFO: im some infoMsg", file = "logfileTest.txt")
print(errorEntry)
print(infoEntry)
# infoEntry.log()
