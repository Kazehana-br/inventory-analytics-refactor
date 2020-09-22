const ProductInput = require("../models/App/ProductInput");

module.exports = async function CalcAverageCost(TotalPrice, Quantity) {
  let count = await ProductInput.countDocuments();
  if (count > 0) {
    const pipeline = await ProductInput.aggregate([
      {
        $group: {
          _id: null,
          quantitytotal: { $sum: "$Quantity" },
          pricetotal: { $sum: "$TotalPrice" },
        },
      },
    ]).exec();

    return (
      (pipeline[0].pricetotal + TotalPrice) /
      (pipeline[0].quantitytotal + Quantity)
    );
  }

  return TotalPrice / Quantity;
};
