# Setting up GitHub Actions for AERA OS

Due to security restrictions, automated agents cannot directly push `.github/workflows/*.yml` files. To enable continuous integration and automated application releases for AERA OS, you will need to manually commit the following configuration file to your repository.

### Instructions:
1. In your GitHub repository, create a new directory path: `.github/workflows/`
2. Create a new file named `build.yml`
3. Paste the following configuration code into the file and commit it to the `main` branch.

```yaml
name: AERA OS Build & Release

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  release:
    types: [ created ]

jobs:
  test:
    name: Run Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: 'npm'
      - name: Install dependencies
        run: npm ci --legacy-peer-deps
      - name: Run Jest Tests
        run: npm run test

  build:
    name: Build Multi-Platform Artifacts
    needs: test
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: 'npm'
      - name: Install dependencies
        run: npm ci --legacy-peer-deps
      
      - name: Build Vite & TSC
        run: npm run build
      
      - name: Package Electron
        run: npx electron-builder --${{ matrix.os == 'windows-latest' && 'win' || matrix.os == 'macos-latest' && 'mac' || 'linux' }}
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This workflow ensures that every time you merge code into AERA OS, GitHub Actions will:
1. Spin up Windows, Mac, and Linux cloud servers.
2. Run your Jest Test Suites and Architecture Analyzers.
3. Automatically compile the raw source code into packaged `.exe`, `.dmg`, and `.deb` desktop applications.
4. Auto-publish those apps to your GitHub Releases page!
