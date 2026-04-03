# Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Hardhat Node
```bash
npx hardhat node
```

### 3. Deploy Contract (new terminal)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Start React App (new terminal)
```bash
npm start
```

---

## MetaMask Setup

### Add Hardhat Network

1. Open MetaMask extension
2. Click network dropdown
3. Click "Add Network"
4. Enter:
   - Network Name: `Hardhat Local`
   - New RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

### Import Test Account (Optional)

Hardhat provides 20 test accounts. To import one:

1. Copy private key from Hardhat node output
2. MetaMask → Import Account → Paste private key

---

## Network Configuration

### Config File
Location: `src/config.json`

```json
{
  "31337": {
    "dappazon": {
      "address": "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"
    }
  }
}
```

**Note**: Update address after deployment if different.

---

## Environment Variables

Create `.env` file (optional):
```env
REACT_APP_CONTRACT_ADDRESS=0x...
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start React development server |
| `npm run build` | Build for production |
| `npx hardhat node` | Start local blockchain |
| `npx hardhat run scripts/deploy.js` | Deploy contract |
| `npx hardhat compile` | Compile smart contracts |
| `npx hardhat test` | Run tests |

---

## Troubleshooting Quick Fixes

### Problem: Port in use
```bash
# Kill process on port 8545 (Windows)
netstat -ano | findstr :8545
taskkill /PID <PID> /F
```

### Problem: Clear cache
```bash
rm -rf node_modules
rm -rf src/abis
npm install
npx hardhat compile
```

### Problem: MetaMask issues
1. Disconnect and reconnect wallet
2. Switch network away and back
3. Clear browser cache

---

## File Descriptions

### Key Files

| File | Purpose |
|------|---------|
| `contracts/Dappazon.sol` | Smart contract |
| `scripts/deploy.js` | Deployment script |
| `src/App.js` | Main React component |
| `src/config.json` | Contract addresses |
| `src/items.json` | Product catalog |

### Frontend Components

| Component | Purpose |
|-----------|---------|
| `App.js` | Main application, state management |
| `Navigation.js` | Header, connect button |
| `Section.js` | Product category display |
| `Product.js` | Product modal, buy functionality |
| `Rating.js` | Star rating display |

---

## Understanding the Flow

```
User clicks "Connect" 
    → MetaMask popup 
    → Account saved to state

User sees products 
    → Loaded from contract 
    → OR from mock data (demo)

User clicks "Buy" 
    → MetaMask transaction 
    → Blockchain confirms 
    → Order recorded
```

---

## Demo vs Real Mode

| Feature | Demo Mode | Real Mode |
|---------|-----------|-----------|
| Data Source | Local JSON | Blockchain |
| Images | Local files | Local files |
| Buy Button | Alert message | MetaMask popup |
| Network | Not required | Hardhat required |

Switch between modes by connecting/disconnecting MetaMask to Hardhat network.