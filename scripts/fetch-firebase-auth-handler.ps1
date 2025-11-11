# Descarga el handler de Firebase Auth y los assets referenciados
param(
    [string]$Base = 'https://findly-v1app.firebaseapp.com'
)

$handlerUrl = "$Base/__/auth/handler"
Write-Host "Descargando handler desde: $handlerUrl"

try {
    $resp = Invoke-WebRequest -Uri $handlerUrl -UseBasicParsing -ErrorAction Stop
    $html = $resp.Content
} catch {
    Write-Error ("Error descargando handler: {0}" -f $_)
    exit 1
}

$targetDir = Join-Path -Path (Get-Location) -ChildPath 'public\__\auth'
if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Force -Path $targetDir | Out-Null }

$handlerPath = Join-Path $targetDir 'handler.html'
Set-Content -Path $handlerPath -Value $html -Encoding UTF8
Write-Host "Handler guardado en: $handlerPath"

# Extraer src/href de scripts y estilos
# Usar comillas simples y duplicar comilla simple dentro del patrón para evitar errores de parsing
$attrMatches = [regex]::Matches($html, '(?:src|href)\s*=\s*["'']([^"'']+)["'']')
$urls = @()
foreach ($m in $attrMatches) {
    $p = $m.Groups[1].Value
    if ($p.StartsWith('http')) {
        $urls += $p
    } elseif ($p.StartsWith('/')) {
        $urls += ($Base + $p)
    } else {
        # rutas relativas como ./polyfills-...js o polyfills-...js
        $clean = $p -replace '^\./',''
        $urls += ($Base + '/__/auth/' + $clean)
    }
}

$urls = $urls | Select-Object -Unique

foreach ($u in $urls) {
    try {
        $file = Split-Path $u -Leaf
        $out = Join-Path $targetDir $file
        Write-Host "Descargando $u -> $out"
        Invoke-WebRequest -Uri $u -OutFile $out -UseBasicParsing -ErrorAction Stop
    } catch {
        Write-Warning ("No se pudo descargar {0}: {1}" -f $u, $_)
    }
}

Write-Host "Descarga finalizada. Archivos en: $targetDir"
