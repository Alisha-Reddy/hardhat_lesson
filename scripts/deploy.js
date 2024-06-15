// imports
const { ethers, run, network } = require("hardhat")
//ethers is being imported from hardhat. Another pluspoint of hardhat.

// async main
async function main() {
    // Get the contract factory for SimpleStorage
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage") //This is cuz hardhat knows about the contract folder and it's compiled. On the otehr hand, for ether, it couldn't know about the folder and we need to explicitly give it's abi and binary there.
    console.log("Deploying contract...")

    // Deploy the contract and get the contract instance
    const simpleStorage = await SimpleStorageFactory.deploy()

    // Wait until the contract is fully deployed
    await simpleStorage.waitForDeployment()

    // Log the address of the deployed contract
    console.log(`Deployed contract to: ${simpleStorage.target}`)

    // What happens when we deploy to our hardhat network? Etherscan does not support hardhat network
    //Then we import 'network' above so we call the verify in if
    // Checking Sepolia testnet chainId and if there's an api key exist or not in the environment
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await simpleStorage.waitForDeployment(6)
        await verify(simpleStorage.target, []) // however it's best practice to wait for few blocks to be mined before we run any verification process
    }

    // Interacting with contract
    const currentFavNum = await simpleStorage.retrieve()
    console.log(`Current favourite number is: ${currentFavNum}`)

    const transactionResponse = await simpleStorage.store("7")
    await transactionResponse.wait(1)
    const updatedFavNum = await simpleStorage.retrieve()
    console.log(`Update favourite numebr: ${updatedFavNum}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        }) //the function runs the task verify. The first argument in it is taskIdentifier, the second is task arguments and the later is the sub task argument
        //There is a chance the contract is already verified and it throws an error so we put this block in try catch
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            Console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
