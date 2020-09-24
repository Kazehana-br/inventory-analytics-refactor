Write-Host "Iniciando Testes de Integracao" -ForegroundColor Red
Write-Host "__________________________________________" -ForegroundColor Blue
Write-Host "Verificando se possui jest global, se nao vai instalar" -ForegroundColor Green
yarn global add jest
Write-Host "============ Executando 1-FILIAL ============" -ForegroundColor Green
jest 1Filial.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 2-Local ============" -ForegroundColor Green
jest 2Local.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 3-Warehouse ============" -ForegroundColor Green
jest 3Warehouse.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 4-Filial-Warehouse ============" -ForegroundColor Green
jest 4FilialWarehouse.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 5-Local-Warehouse ============" -ForegroundColor Green
jest 5LocalWarehouse.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 6-Supplier ============" -ForegroundColor Green
jest 6Supplier.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 7-Product ============" -ForegroundColor Green
jest 7Product.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 8-Supplier-Product ============" -ForegroundColor Green
jest 8SupplierProduct.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 9-Warehouse-Product ============" -ForegroundColor Green
jest 9WarehouseProduct.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 10-Document ============" -ForegroundColor Green
jest 10Document.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 11-ProductInput ============" -ForegroundColor Green
jest 11ProductInput.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 12-ProductInput-Document ============" -ForegroundColor Green
jest 12ProductInputDocument.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 13-Warehouse-ProductInput ============" -ForegroundColor Green
jest 13WarehouseProductInput.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 14-ProductOutput ============" -ForegroundColor Green
jest 14ProductOutput.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 15-ProductOutput-Document ============" -ForegroundColor Green
jest 15ProductOutputDocument.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit

Write-Host "============ Executando 16-Warehouse-ProductOutput ============" -ForegroundColor Green
jest 16WarehouseProductOutput.spec.js  --setupFiles dotenv/config --runInBand --detectOpenHandles --forceExit
Write-Host "__________________________________________" -ForegroundColor Blue