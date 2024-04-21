async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const EMS = await ethers.getContractFactory("EMS");
  const contract = await EMS.deploy();

  console.log("Contract deployed at:", await contract.getAddress());

//   const saySomething = await contract.speak();

//   console.log("saySomething value:", saySomething);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
