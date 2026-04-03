# Dappazon - Decentralized E-Commerce Platform

**Note:** This is an academic project built during a January 2023 to April 2023 internship at **Advait Solutions** as part of BE Computer Engineering curriculum.

---

## About

Dappazon is a decentralized e-commerce platform built on Ethereum blockchain. It demonstrates how blockchain technology can create a transparent, secure, and decentralized marketplace where users can:

- Browse products across categories (Electronics, Clothing, Toys)
- Purchase items using ETH directly from MetaMask
- View product ratings and stock information
- Track purchases on the blockchain

---

## Technology Stack & Tools

- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development framework
- **Ethers.js** - Blockchain interaction
- **React.js** - Frontend framework
- **JavaScript** - Application logic
- **MetaMask** - Ethereum wallet

---

## Internship Details

| Detail | Information |
|--------|-------------|
| **Internship Period** | January 2023 - April 2023 |
| **Organization** | Advait Solutions |
| **College** | Bhagwan Arihant Institute of Technology, Surat |
| **Course** | BE Computer Engineering |
| **Academic Year** | 2022-2023 |

This project was developed as part of the internship program at **Advait Solutions**, where I learned and implemented blockchain technology concepts to build a practical decentralized application.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Hardhat Node
```bash
npx hardhat node
```

### 3. Deploy Contract
In a separate terminal:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Start Frontend
```bash
npm start
```

### 5. Connect MetaMask
- Add network: RPC `http://127.0.0.1:8545`, Chain ID `31337`
- Click "Connect to Blockchain" in the app

---

## Demo Mode

The app works without blockchain connection:
- Sample products with local images
- Simulated purchase functionality
- Full UI for testing

Click "Connect to Blockchain" when ready to use real blockchain.

---

## Project Structure

```
dappazon/
├── contracts/          # Smart contracts
│   └── Dappazon.sol
├── scripts/            # Deployment scripts
│   └── deploy.js
├── test/               # Smart contract tests
│   └── Dappazon.js
├── src/                # React frontend
│   ├── components/     # React components (Navigation, Section, Product, Rating)
│   ├── assets/         # Images and icons
│   │   └── items/      # Product images (camera, drone, shoes, etc.)
│   ├── abis/           # Contract ABIs
│   ├── config.json     # Contract addresses
│   ├── items.json      # Product catalog
│   └── App.js          # Main application
├── docs/               # Documentation
│   ├── project-info.md # Project details
│   ├── setup.md        # Setup guide
│   ├── contract-info.md # Smart contract docs
│   └── Screenshots/    # Project screenshots
│       ├── home-page.png
│       ├── product-detail.png
│       ├── demo-mode.png
│       ├── connected.png
│       └── metamask.png
├── hardhat.config.js
└── package.json
```

---

## Documentation

For detailed information, see the `docs/` folder:

| File | Description |
|------|-------------|
| `docs/project-info.md` | Academic details, timeline, technologies |
| `docs/setup.md` | Detailed setup instructions |
| `docs/contract-info.md` | Smart contract reference |

---

## Screenshots

The following screenshots showcase the Dappazon application:

### 1. Products Available for Sale
![Products Available](docs/Screenshots/Products%20are%20available%20for%20sell.png)
*Main marketplace view showing products organized by category*

### 2. After User Connects with Wallet
![Wallet Connected](docs/Screenshots/Dappazon%20after%20user%20connect%20with%20wallet.png)
*Application connected to blockchain with MetaMask*

### 3. Product Purchased
![Product Purchased](docs/Screenshots/Products%20was%20purchased.png)
*Transaction confirmation showing successful purchase*

---

## Features

- **Decentralized Marketplace**: All data stored on blockchain
- **Crypto Payments**: Purchase with ETH via MetaMask
- **Product Categories**: Electronics, Clothing, Toys
- **Stock Management**: Real-time inventory tracking
- **Order History**: Purchases recorded on blockchain
- **MetaMask Integration**: Connect wallet to interact with blockchain

---

## Requirements

- Node.js v16 or higher
- MetaMask browser extension
- npm or yarn

---

## Testing

```bash
# Run smart contract tests
npx hardhat test

# Compile contracts
npx hardhat compile
```

---

## Key Learnings from Internship

During the internship at **Advait Solutions**, I learned:

1. Smart contract development with Solidity
2. Setting up Ethereum development environment with Hardhat
3. Connecting frontend with blockchain using Ethers.js
4. MetaMask wallet integration
5. Understanding Web3 concepts and decentralized architecture
6. Real-world application of blockchain technology

---

## License

This project is for educational purposes and was developed as part of academic curriculum.

---

## Acknowledgments

- **Advait Solutions** - For providing the internship opportunity
- **College** - BE Computer Engineering Department
- **Mentors** - For guidance throughout the project
- **Open Source Libraries** - Hardhat, Ethers.js, React