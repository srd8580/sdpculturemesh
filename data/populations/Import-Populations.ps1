$sourceDir = "."
$sourceFiles = Get-ChildItem $sourceDir "*.csv"
$sqlTemplate = "INSERT INTO AllPopulations (MetroArea,Origin,EthnicPopulation,MetroPopulation) VALUES ('{{metroArea}}', '{{origin}}',{{ethnicPopulation}},{{metroPopulation}});"
$server = "(local)"
$outputFile = ".\insertPopulations.sql"

if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

$originIdx = 1
$ethnicPopulationIdx = 9
$metroPopulationIdx = 12

$sourceFiles | ForEach-Object {
    $lineCounter = 0

    Get-Content $_ | ForEach-Object {
        if ($lineCounter -gt 0) {
            $metro = $_.Substring(0, $_.Trim('"').IndexOf('"') + 2).Trim('"')
            $content = $_.Substring($metro.Length + 2).Split(',')

            $sql = $sqlTemplate.Replace("{{metroArea}}", $metro.Replace("'", "''"))
            $sql = $sql.Replace("{{origin}}", $content[$originIdx].Trim('"').Replace("'", "''"))
            $sql = $sql.Replace("{{ethnicPopulation}}", $content[$ethnicPopulationIdx].Trim('"').Replace("'", "''"))
            $sql = $sql.Replace("{{metroPopulation}}", $content[$metroPopulationIdx].Trim('"').Replace("'", "''"))

            Add-Content $outputFile $sql
        }

        $lineCounter++
    }

}


