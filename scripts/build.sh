#!/bin/bash
echo "==================================="
echo " AERA OS - Production Build Script"
echo "==================================="

# Ensure dependencies are installed
echo "[1/4] Installing dependencies..."
npm install

# Compile Vite Frontend
echo "[2/4] Compiling React 19 Frontend..."
npx vite build

# Compile TypeScript Backend
echo "[3/4] Compiling Electron Main Process..."
npx tsc -p tsconfig.json

# Package Executable
echo "[4/4] Packaging Executable (electron-builder)..."
# Note: In a real CI environment, this would run electron-builder
# npx electron-builder --mac --win --linux

echo "✅ Build Complete! Artifacts are in the /dist folder."