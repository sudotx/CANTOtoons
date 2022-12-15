const hre = require("hardhat");

const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Boss");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log("contract depolyed to : ", domainContract.address);

  //After deployed access contract
  const domainContract = await ethers.getContractAt(
    "Boss",
    "0x97dae4f6a360a745d21edca3175e1a465dc78778"
  );
  const reveal = await domainContract.reveal();
  console.log("reveal", reveal);

  const disableWhitelist = await domainContract.setOnlyWhitelisted(false);
  console.log("disableWhitelist", disableWhitelist);
  // let whitelistUsers = await domainContract.whitelistUsers([]);
  // console.log("whitelistUsers", whitelistUsers);

  // let iswhitelisted = await domainContract.isWhitelisted(
  //   "0xeaB3D31283605c1730658304029e13F1b8f79BE3"
  // );
  // console.log("iswhitelisted", iswhitelisted);

  let setDR = await domainContract.mint(2, {
    value: hre.ethers.utils.parseEther("10"),
  });
  await setDR.wait();

  let tokenURI = await domainContract.tokenURI(1);
  console.log("tokenURI", tokenURI);

  let walletOfOwner = await domainContract.walletOfOwner(owner.address);
  console.log("walletOfOwner", walletOfOwner);

  // let whitelistUsers = await domainContract.whitelistUsers([superCoder.address]);
  // console.log("whitelistUsers",whitelistUsers);

  // let iswhitelisted = await domainContract.isWhitelisted(superCoder.address);
  // console.log("iswhitelisted",iswhitelisted);

  // // set white list nft mint limit 2
  // let setNftPerAddressLimit = await domainContract.setNftPerAddressLimit(2);
  // console.log("setNftPerAddressLimit",setNftPerAddressLimit);

  let setCost = await domainContract.setCost(hre.ethers.utils.parseEther("55"));
  console.log("setCost", setCost);

  // let getCost = await domainContract.cost;
  // console.log("getCost",getCost);

  // const bal = await hre.ethers.provider.getBalance(superCoder.address);
  // console.log("contract bef : ", hre.ethers.utils.formatEther(bal));
  // let setDR1 = await domainContract.connect(superCoder).mint(1,{value: hre.ethers.utils.parseEther("20")});
  // await setDR1.wait();
  // let setDR2 = await domainContract.connect(superCoder).mint(1,{value: hre.ethers.utils.parseEther("20")});
  // await setDR2.wait();

  // // let setDR3 = await domainContract.connect(superCoder).mint(1,{value: hre.ethers.utils.parseEther("20")});
  // // await setDR3.wait();
  // const bal1 = await hre.ethers.provider.getBalance(superCoder.address);
  // console.log("contract after : ", hre.ethers.utils.formatEther(bal1));

  // let walletOfOwner1 = await domainContract.connect(superCoder).walletOfOwner(superCoder.address);
  // console.log("walletOfOwner1",walletOfOwner1);

  // await domainContract.reveal()
  // let tokenURI1 = await domainContract.tokenURI(1);
  // console.log("tokenURI1",tokenURI1);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log("error: ", error);
    process.exit(1);
  }
};

runMain();
