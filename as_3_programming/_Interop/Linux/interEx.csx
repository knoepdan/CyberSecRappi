
// run "echo "pipedInputJabadabadu" | dotnet script interEx.csx -- aaa bb22 >> fileDeleteMe.txt"
using System;
using System.IO;

var today = DateTime.Now.ToString();
var message = $"This file is executed at {today}";

// Read in arguments (using Args variable)
foreach(var arg in Args){
  Console.WriteLine("arg:  " + arg);
}

// Reading from pipe
string pipedInput = "";
using (var streamReader = new StreamReader(Console.OpenStandardInput()))
{
  pipedInput = streamReader.ReadToEnd();
}

// write to standard out (basically all Console.Write calls)
Console.Write(pipedInput);
