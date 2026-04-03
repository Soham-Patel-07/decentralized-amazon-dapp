const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  console.log("Starting deployment...")
  
  // Setup accounts
  const [deployer] = await hre.ethers.getSigners()
  console.log("Deploying from:", deployer.address)

  // Deploy Dappazon
  const Dappazon = await hre.ethers.getContractFactory("Dappazon")
  const dappazon = await Dappazon.deploy()
  await dappazon.deployed()

  console.log(`Deployed Dappazon Contract at: ${dappazon.address}`)

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await dappazon.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
  
  console.log("\nDeployment complete!")
  console.log("Contract address:", dappazon.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
