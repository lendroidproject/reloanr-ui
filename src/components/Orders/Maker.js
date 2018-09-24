import Maker from '@makerdao/dai'

const drawDaiAsync = async (maker, cdp, drawAmount) => {
  const defaultAccount = maker
    .service('token')
    .get('web3')
    .currentAccount()
  const dai = maker.service('token').getToken('DAI');
  const txn = await cdp.drawDai(parseInt(drawAmount * 0.6));
  const balance = await dai.balanceOf(defaultAccount);
  console.log('Transaction from drawing Dai:', txn);
  console.log('Dai balance after drawing:', balance.toString(), '+' + parseInt(drawAmount * 0.6).toString());
};

const wipeDebtAsync = async (maker, cdp, drawAmount) => {
  const defaultAccount = maker
    .service('token')
    .get('web3')
    .currentAccount();
  const dai = maker.service('token').getToken('DAI');
  const txn = await cdp.wipeDai(parseInt(drawAmount) - parseInt(drawAmount * 0.8));
  const balance = await dai.balanceOf(defaultAccount);

  console.log('Transaction from wiping Dai:', txn);
  console.log('Dai balance after wiping:', balance.toString());
};

const shutCdpAsync = async (cdp) => {
  const txn = await cdp.shut();
  console.log('Transaction from shutting the CDP:', txn);
};

export const startAsync = async (amount, amountInDAI, privateKey = null, callback = null) => {
  const maker = Maker.create(process.env.REACT_APP_NETWORK, {
    privateKey: privateKey || process.env.REACT_APP_PRIVATE_KEY,
    overrideMetamask: true
  })
  await maker._authenticatedPromise

  const cdp = await maker.openCdp()
  console.log('cdp:', cdp)
  const lockEthTx = await cdp.lockEth(amount)
  console.log('transaction to lock eth:', lockEthTx)
  await drawDaiAsync(maker, cdp, amountInDAI)
  await wipeDebtAsync(maker, cdp, amountInDAI)
  await shutCdpAsync(cdp)
  if (callback) callback()
};
