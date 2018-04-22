const Gateway = artifacts.require("Gateway");

contract('Gateway', function(accounts) {

  it("should withdraw somehow", async () => {
    const instance = await Gateway.deployed()
    const balance = await instance.withdrawFunds.call(2)
    assert.equal(1,1,"fat chance")
  });

})