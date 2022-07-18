require('dotenv').config();

const ethers = require('ethers');
// Get Alchemy App URL
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('rinkeby', API_KEY)
// Get contract ABI file
const contract = require("../artifacts/contracts/NFT.sol/NFT.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x97d74b2e8A364B29941b8BDf98F2ECCFa2089f4c'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://ipfs.filebase.io/ipfs/QmNUW9CAwKwKsDHYrnaSaeHHjMP85oiLxyEoVWhWhSYxyQ"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri);
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
