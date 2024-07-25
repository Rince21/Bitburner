/** @param {NS} ns */
export async function main(ns) {
  let maxInvestStock = 1
  let holdBack = 10000000
  let histLen = 16
  let stateLen = 12
  let buy = 0.05
  let sell = 0.0
  let minInvest =100000000

  let stocks = ns.stock.getSymbols()
  let stockData = {} // {history = [...],state:8,long=0
  
  //ns.tprint(stocks)
  for (let stck of stocks) {
    stockData[stck] = { history: [ns.stock.getPrice(stck)], long: 0, volat: ns.stock.getVolatility(stck) ,forecast:ns.stock.getForecast(stck),prio:Math.abs(ns.stock.getForecast(stck)-0.5)*ns.stock.getVolatility(stck)}
  }
  //ns.tprint(stockData)


  while (true) {
    await ns.sleep(2000)
    if (stockData[stocks[0]].history[stockData[stocks[0]].history.length - 1] == ns.stock.getPrice(stocks[0])) { continue }
    for (let stck of stocks) {
      stockData[stck].forecast = ns.stock.getForecast(stck)
    }


    let stocksVolSorted = Object.keys(stockData).map(function (key) {
      return [key, stockData[key].prio]
    })

    stocksVolSorted.sort(function (first, second) {
      return second[1] - first[1]
    })

    for (let item of stocksVolSorted) {
    
      //ns.tprint(item[0], " ", stockData[item[0]].forecast, " ", stockData[item[0]].volat.toFixed(2))
    }

    stocksVolSorted = stocksVolSorted.map(function (key) {
      return key[0]
    })

    //ns.tprint(stocksVolSorted)
    //for (let stck of []) {
    for (let stck of stocksVolSorted) {
      if (stockData[stck].long == 1 && stockData[stck].forecast <= 0.5+sell) {
        stockData[stck].long = 0
        ns.stock.sellStock(stck,ns.stock.getPosition(stck)[0])
        ns.print("sell ", stck)
      }
      if (stockData[stck].long == -1 && stockData[stck].forecast >= 0.5-sell) {
        stockData[stck].long = 0
        ns.stock.sellShort(stck,ns.stock.getPosition(stck)[2])
        ns.print("sell short ", stck)
      }
      //ns.tprint(stockData)
      let maxInvest = ns.stock.getMaxShares(stck)*ns.stock.getPrice(stck)*maxInvestStock
      let availableMoney = ns.getPlayer().money - holdBack-minInvest
      if (availableMoney > 0) {
        if (stockData[stck].forecast >=0.5+buy && stockData[stck].long ==0) {
          stockData[stck].long = 1
          let buyAmount = Math.min(maxInvest,availableMoney+minInvest)/ns.stock.getAskPrice(stck)
          ns.stock.buyStock(stck,buyAmount)
          ns.print("buy long ",stck, " ",buyAmount, " for ", buyAmount*ns.stock.getAskPrice(stck))
        }
        if (stockData[stck].forecast <=0.5-buy && stockData[stck].long ==0) {
          stockData[stck].long = -1
          let buyAmount = Math.min(maxInvest,availableMoney+minInvest)/ns.stock.getBidPrice(stck)
          ns.stock.buyShort(stck,buyAmount)
          ns.print("buy short ",stck, " ",buyAmount, " for ", buyAmount*ns.stock.getBidPrice(stck))
        }
      }
    
    }

    
  }
}
