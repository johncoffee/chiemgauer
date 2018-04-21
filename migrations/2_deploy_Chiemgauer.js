var contract = artifacts.require("./Chiemgauer.sol");

module.exports = function(deployer) {

 deployer.deploy(contract, "0x7e0332fB5a513F340338bb33720b560e4D728752");

};