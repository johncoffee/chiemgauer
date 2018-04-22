const MetaCoin = artifacts.require("Chiemgauer");

const ownsAll = "0x7e0332fB5a513F340338bb33720b560e4D728752"

contract('Chiemgauer', function(accounts) {

  it("should put 10000 MetaCoin in the first account", async () => {
    const instance = await MetaCoin.deployed()
    const balance = await instance.balanceOf.call(ownsAll)
    assert.equal(balance.valueOf(), "0", "10000 wasn't in the first account");
  });

})