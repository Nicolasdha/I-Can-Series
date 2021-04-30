const selector = (basket) => {
  return basket?.reduce(
    (initalAmt, eachItem) => initalAmt + eachItem.item.price,
    0
  );
};

export default selector;
// return basket.length !== 0
//     ? basket.reduce((initalAmt, eachItem) => initalAmt + eachItem.item.price, 0)
//     : 0;
