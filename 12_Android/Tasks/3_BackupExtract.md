# Android Backup Extract

### Steps

1. Download backup file backup.ab (probably create via "adb backup -all")
2. Run `( printf "\x1f\x8b\x08\x00\x00\x00\x00\x00" ; tail -c +25 [backup.ab] ) | tar xfvz -` 
    - basically cuts of the first part and then unzips it
    - creates a folder with all the android databases (in folder "apps")
3. `strings com.android.providers.settings/f/flattened-data | grep  shc`
    - searches for strings in the passed file and shows the lines with shc
    - Will return the flag: psk="shc{G3T TH3 S3CR3T W1F1 PW}"



