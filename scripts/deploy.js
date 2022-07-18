
const main=async()=>{
    const contract= await ethers.getContractFactory("NFT");
    const contractdeploy= await contract.deploy();
    await contractdeploy.deployed();
    console.log("Address Contract:",contractdeploy.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });