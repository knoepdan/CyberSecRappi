from datetime import datetime
import json
import os
# 7.2.5 Classes and 7.2.6 Docstring  (Documenation via """doc comment""")
# 7.2.7 Exceptions and 7.2.8 operator overloading
# 7.4.2 datetime (also see 7.4_Buil...)
# 7.4.3 json (also see 7.4_Buil...)


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
        self._login = os.getlogin()
        self._userId = os.getuid()

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

    def getMsg(self, basic : bool):
        """returns the formatted message"""
        if(basic==True):
            return str(self._timestamp) +" - " + LogEntry.levels[self._levelIndex] + ": " + self._message

        #  transform it into a dictionary which we can den serialize to json
        msgDic = {}
        msgDic["level"] = LogEntry.levels[self._levelIndex]
        msgDic["message"] = self._message
        msgDic["user"] = self._login
        msgDic["id"] = self._userId
        jsonMsg = json.dumps(msgDic)
        return str(self._timestamp) +" - " +jsonMsg

    def log(self, basic : bool):
        """logs to console or file"""
        logMsg = self.getMsg(basic)
        if(not self._file is None):
            logfile = open(self._file, "a")
            logfile.write(logMsg+"\n")
            logfile.close()
        else:
            print(logMsg)

    def __repr__(self):
        return self.getMsg(True)

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
# infoEntry.log() # writes to file (therefore outcommented)
warnEntry.log(False)  # with json output

# test sorting
sortedList = sorted([errorEntry, infoEntry, warnEntry]) # will implicitly call the overloaded __lt__ method
print(sortedList)
