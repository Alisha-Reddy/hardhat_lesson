const { task } = require("hardhat/config")

// task(name, desription)
//setAction defines whaat the task do
task ("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blocknumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number: ${blocknumber}`);
    }
)


module.exports ={}