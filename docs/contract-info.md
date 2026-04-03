# Smart Contract Documentation

## Dappazon.sol

### Contract Overview

The Dappazon smart contract is an Ethereum-based marketplace that handles product listings and purchases on the blockchain.

---

## Contract Structure

### Data Structures

#### Item Struct
```solidity
struct Item {
    uint256 id;
    string name;
    string category;
    string image;
    uint256 cost;
    uint256 rating;
    uint256 stock;
}
```

#### Order Struct
```solidity
struct Order {
    uint256 id;
    uint256 itemId;
    address buyer;
    uint256 cost;
    uint256 time;
}
```

---

## State Variables

```solidity
uint256 private _itemIds;           // Total items created
uint256 private _orderIds;          // Total orders created

mapping(uint256 => Item) private _items;      // Item ID → Item
mapping(address => uint256[]) private _userOrderIds;  // User → Order IDs
mapping(address => mapping(uint256 => Order)) private _orders;  // User → OrderID → Order
```

---

## Functions

### list()
Adds a new product to the marketplace.

```solidity
function list(
    uint256 id,
    string memory name,
    string memory category,
    string memory image,
    uint256 cost,
    uint256 rating,
    uint256 stock
) public
```

**Parameters:**
- `id` - Unique identifier
- `name` - Product name
- `category` - Category (electronics, clothing, toys)
- `image` - Image URL (IPFS)
- `cost` - Price in wei
- `rating` - Rating (0-5)
- `stock` - Available quantity

### buy()
Purchase a product.

```solidity
function buy(uint256 _id) public payable
```

**Parameters:**
- `_id` - Item ID to purchase

**Requirements:**
- Item must exist (id > 0)
- Stock must be available
- Payment must equal item cost

### items()
Get item details by ID.

```solidity
function items(uint256 _id) public view returns (Item memory)
```

### orders()
Get order details.

```solidity
function orders(address _customer, uint256 _id) public view returns (Order memory)
```

---

## Events

### Buy
Emitted when a purchase is made.

```solidity
event Buy(
    address indexed buyer,
    uint256 orderId,
    uint256 itemId
);
```

---

## Deployment

### Deployment Command
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Sample Data
The deployment script adds 9 products:
- 3 Electronics (Camera, Drone, Headset)
- 3 Clothing (Shoes, Sunglasses, Watch)
- 3 Toys (Puzzle Cube, Train Set, Robot Set)

---

## Contract Address

After deployment, the contract address will be shown in the terminal. Update `src/config.json` with this address.

Example:
```json
{
  "31337": {
    "dappazon": {
      "address": "0x..."
    }
  }
}
```

---

## Gas Costs

| Function | Estimated Gas |
|----------|---------------|
| list | ~150,000 |
| buy | ~100,000 |

---

## Security Considerations

1. **Reentrancy Protection**: Checks before state changes
2. **Access Control**: Only contract owner can list items
3. **Value Validation**: Ensures correct payment amount

---

## Testing

Run tests with:
```bash
npx hardhat test
```

---

## ABI

The contract ABI is stored in `src/abis/Dappazon.json` and is used by the frontend to interact with the contract.