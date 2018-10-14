$sourceFile = ".\updated pop.csv"
$apiKey = "QUkNcQwk7nIkMruEKg_2kBb6eQa2WR8J"
$url = "https://api.mlab.com/api/1/databases/globalhack7/collections/Enclaves?apiKey=$($apiKey)"

$cityIdx = 0
$stateIdx = 6
$ethnicityIdx = 10
$ethnicPopIdx = 11
$metroPopIdx = 12

$bodyTemplate = '{
    "$set": {
        "ethnicPopulation": {{ethnicPopulation}},
        "totalPopulation": {{metroPopulation}}
    }
}'
$queryTemplate = '&q={"$and": [{"location.state": "{{state}}","location.city": "{{city}}","ethnicity": "{{ethnicity}}"}]}'
   

$counter = 0
Get-Content $sourceFile | ForEach-Object {
    if ($counter -gt 0) {
        $content = $_.Split(',')

        if ($content.Length -ne 13) {
            Write-Output "13 Elements not found on line $($counter): skipping"
        } else {
            $city = $content[$cityIdx].Trim()
            $state = $content[$stateIdx].Trim()
            $ethnicity = $content[$ethnicityIdx].Trim()
            $ethnicPop = $content[$ethnicPopIdx].Trim()
            $metroPop = $content[$metroPopIdx].Trim()

            $requestUrl = ($url + $queryTemplate.Replace("{{state}}", $state).Replace("{{city}}", $city).Replace("{{ethnicity}}", $ethnicity))
            $body = $bodyTemplate.Replace("{{ethnicPopulation}}", $ethnicPop).Replace("{{metroPopulation}}", $metroPop)
            
            Write-Output $requestUrl
            Write-Output $body

            Invoke-WebRequest -Uri $requestUrl -Method Put -Body $body -ContentType "application/json"
        }
    }

    $counter++
}