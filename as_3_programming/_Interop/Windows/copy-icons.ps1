Write-Host "Trying to copy icons file to exos webapp react app folder..."
try {
	$sourcePath = '\Common\LinkedFiles\Content\CustomIcons\css\style.css'
	$parentSourcePath = Split-Path (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent) -Parent # WebApps\source\Presentation\

	## ExosWebApps
	$sourceFileContent = (Get-Content (Join-Path $parentSourcePath $sourcePath)) -replace '../fonts/', '../../../../../Common/LinkedFiles/Content/CustomIcons/fonts/'

	$destinationFinalPath = Join-Path $parentSourcePath '\ExosWebApp\react\src\styles\icons\icons.css'
	[IO.File]::WriteAllLines($destinationFinalPath, $sourceFileContent)
		(Get-Content $destinationFinalPath) -replace '^(.custom-icon.*:before)', ':global($1)' | Set-Content $destinationFinalPath

	$destinationFinalPath = Join-Path $parentSourcePath '\ExosWebApp\react\src\styles\icons\icons.css'
	[IO.File]::WriteAllLines($destinationFinalPath, $sourceFileContent)

	# Exiting
	Write-Host "Success: Icons copied" -ForegroundColor "Green"	
	Start-Sleep 1
	Exit 0

}
catch [Exception] {
	Write-Host "Error: The file could not be copied" -ForegroundColor "Red"
	Write-Host $_.Exception -ForegroundColor "Red" | Format-List -Force
	Start-Sleep 4
	Exit 1
}
