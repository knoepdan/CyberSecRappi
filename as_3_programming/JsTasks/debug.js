// How to debug
// a) ensure settings.json file (can be in .vscode folder) allows for debugger to attach (ecample: javascript": "node --inspect-brk=localhost:9229")
// b) define a launcher file (in .vscode folder) which tells VSCode to how to launch and attach (e.g. Defined port must allign with port defined in settings.json)

var i = 1;
var j;
while (i < 5) {
  j = 1;
  while (j < 4) {
    console.log(i * j++);
  }
  i++;
}
