$sourceFile = ".\enclaves.txt"
$apiKey = "QUkNcQwk7nIkMruEKg_2kBb6eQa2WR8J"
$url = "https://api.mlab.com/api/1/databases/globalhack7/collections/Enclaves?apiKey=$($apiKey)"
$documentTemplate = "{
    'ethnicity': '{{ethnicity}}',
    'location': {
        'city': '{{city}}',
        'state': '{{state}}',
        'zip': null
    },
    'ethnicPopulation': null,
    'totalPopulation': null,
    'resources': []
}"

$counter = 1
Get-Content $sourceFile | ForEach-Object {
    $content = $_.Split(',')

    if ($content.Length -ne 3) {
        Write-Output "Skipping line $($counter), content did not have 3 parts!"
    } else {
        $body = $documentTemplate.Replace("{{ethnicity}}", $content[0].Trim())
        $body = $body.Replace("{{city}}", $content[1].Trim())
        $body = $body.Replace("{{state}}", $content[2].Trim())
        Invoke-WebRequest -Uri $url -Method Post -Body $body -ContentType "application/json"
    }

    $counter++
}