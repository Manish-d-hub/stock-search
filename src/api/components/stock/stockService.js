import axios from 'axios';
import logger from '../../middleware/logger.js';
import Search from '../search/searchModel.js';
import Stock from './stockModel.js';

export const getOneStock = async (symbol, userId) => {
  logger.info('Inside getOneStock service');
  const askedStock = await Stock.findOne({ name: symbol });

  if (!askedStock) {
    let prices = [];
    let dates = [];

    const apiRes = await axios({
      method: 'GET',
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
    });

    let stockData = apiRes.data['Time Series (Daily)'];
    const stockDates = Object.keys(stockData);
    const stockPrices = Object.values(stockData);

    for (let i = 0; i < 7; i++) {
      dates.push(stockDates[i]);
      prices.push(stockPrices[i]['4. close']);
    }

    prices = prices.map(Number);
    let weeklyData = Object.assign.apply(
      {},
      dates.map((v, i) => ({ [v]: prices[i] }))
    );

    const stockPrice = prices[0];

    const currStock = await Stock.create({
      name: symbol,
      price: stockPrice,
      weeklyData,
    });
    if (!currStock) return { err: "Couldn't find your stock", statusCode: 404 };

    await Search.create({ stock: currStock, user: userId });
    return currStock;
  }
  await Search.create({ stock: askedStock, user: userId });
  return askedStock;
};

export const upadteDbStocks = async () => {
  logger.info('Inside upadteOneStock service');
  const stocks = await Stock.find();

  if (!stocks)
    return { err: "Stocks dosen't exist in your database", statusCode: 404 };

  for (let i = 0; i < stocks.length; i++) {
    let weeklyData = stocks[i].weeklyData[0];

    const apiRes = await axios({
      method: 'GET',
      url: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocks[i].name}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
    });

    const updatedStockPrice = apiRes.data['Global Quote']['05. price'];
    const updatedDate = apiRes.data['Global Quote']['07. latest trading day'];

    let dates = Object.keys(weeklyData);
    let prices = Object.values(weeklyData);

    dates.pop();
    dates.unshift(updatedDate);
    prices.pop();
    prices.unshift(Number(updatedStockPrice));

    weeklyData = Object.assign.apply(
      {},
      dates.map((v, i) => ({ [v]: prices[i] }))
    );

    const stock = await Stock.updateOne(
      { name: stocks[i].name },
      { price: updatedStockPrice, weeklyData }
    );

    if (!stock) return { err: "Couldn't find your stock", statusCode: 404 };
  }
  return { message: 'Database Upadted', updatedCount: stocks.length };
};
