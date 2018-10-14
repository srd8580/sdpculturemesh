$sourceFile = ".\enclaves.txt"
$outFile = ".\r1.txt"
$apiKey = "QUkNcQwk7nIkMruEKg_2kBb6eQa2WR8J"
$url = "https://api.mlab.com/api/1/databases/globalhack7/collections/Enclaves?apiKey=$($apiKey)"
Get-Content $sourceFile | ForEach-Object {
    $content = $_.Split(',', 4)
	$resources = $content[3]
	if(![string]::IsNullOrEmpty($resources)) {
		Write-Output $resources
		$json = '{ "ethnicity": "' + $content[0].Trim() + '", "city": "' + $content[1].Trim() + '", "state": "' + $content[2].Trim() + '",' + $resources + '}'
		$json | Add-Content $outFile
	}
}