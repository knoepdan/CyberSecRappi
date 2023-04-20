
// run "dotnet script helloworld.csx"
using System;
using System.IO;

var today = DateTime.Now.ToString();
var message = $"Hello World, This file is created at {today}";

// Some fancy comment here

class Foo
{
  public void Bar()
  {
    Console.WriteLine("Hello World!");
  }
}

var obj = new Foo();
obj.Bar();

Console.WriteLine(message);