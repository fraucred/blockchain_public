module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink();
  deployer.deploy(MetaCoin);
  deployer.deploy(HelloWorld);
  deployer.deploy(Contract);
  deployer.deploy(SimpleStorage);
};
