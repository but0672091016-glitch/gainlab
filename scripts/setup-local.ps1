$ErrorActionPreference = "Stop"

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    throw "pnpm не найден. Установите Node.js и активируйте pnpm через Corepack."
}

if (-not (Test-Path -LiteralPath ".env")) {
    Copy-Item -LiteralPath ".env.example" -Destination ".env"
}

pnpm install
pnpm db:generate

if (Get-Command docker -ErrorAction SilentlyContinue) {
    pnpm db:up
    pnpm db:migrate --name init
    pnpm db:seed
} else {
    Write-Warning "Docker Desktop не найден. Интерфейс можно открыть командой pnpm dev, база пока не запущена."
}

Write-Host "Подготовка завершена. Запустите pnpm dev и откройте http://localhost:3000"
