pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Gateway.sol";

contract TestGateway {

  function testsetErc20ContractAddress() public {
    Gateway meta = Gateway(DeployedAddresses.Gateway());
    Chiemgauer metaerc = Chiemgauer(DeployedAddresses.Chiemgauer());

    meta.setErc20ContractAddress(DeployedAddresses.Gateway());
    Assert.equal(meta.setErc20ContractAddress(DeployedAddresses.Gateway()), expected, "setErc20ContractAddress Executed succesfully");
  }

}
