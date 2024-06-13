// imports
const { ethers } = require("hardhat");
//ethers is being imported from hardhat. Another pluspoint of hardhat.

// async main
async function main() {
  // Get the contract factory for SimpleStorage
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage"); //This is cuz hardhat knows about the contract folder and it's compiled. On the otehr hand, for ether, it couldn't know about the folder and we need to explicitly give it's abi and binary there.
  console.log("Deploying contract...");
  
  // Deploy the contract and get the contract instance
  const simpleStorage = await SimpleStorageFactory.deploy();
  
  // Wait until the contract is fully deployed
  await simpleStorage.waitForDeployment();

  // Log the address of the deployed contract
  console.log(`Deployed contract to: ${simpleStorage.target}`);
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
