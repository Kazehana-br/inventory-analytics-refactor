Write-Host "Iniciando Testes Unitarios" -ForegroundColor Red
Write-Host "__________________________________________" -ForegroundColor Blue
Write-Host "Verificando se possui jest global, se nao vai instalar" -ForegroundColor Green
yarn global add jest
Write-Host "============ Executando 1-ArrayIncludes ============" -ForegroundColor Green
jest ArrayIncludes.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 2-GuidGenerator ============" -ForegroundColor Green
jest GuidGenerator.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 3-Logging ============" -ForegroundColor Green
jest Logging.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit
Write-Host "__________________________________________" -ForegroundColor Blue