/** @param {NS} ns */
export async function main(ns) {
  let maxInvestStock = 0.2
  let holdBack = 10000000
  let histLen = 16
  let stateLen = 12
  let buy = 6
  let sell = -4
  let minInvest =100000000

  let stocks = ns.stock.getSymbols()
  let stockData = {} // {history = [...],state:8,long=0
  let states = {}
  //ns.tprint(stocks)
  for (let stck of stocks) {
    stockData[stck] = { history: [ns.stock.getPrice(stck)], state: 0, long: 0, volat: 0 }
  }
  //ns.tprint(history)


  while (true) {
    await ns.sleep(2000)
    if (stockData[stocks[0]].history[stockData[stocks[0]].history.length - 1] == ns.stock.getPrice(stocks[0])) { continue }

    for (let stck of stocks) {
      let hist = stockData[stck].history
      //ns.tprint(hist)
      hist.push(ns.stock.getPrice(stck))
      if (hist.length > histLen) {
        hist.shift()
      }
      stockData[stck].history = hist

      if (hist.length >= stateLen) {
        let count = 0
        for (let i = 0; i < stateLen - 1; i++) {
          if (hist[stateLen - i] > hist[stateLen - i - 1]) {
            count += 1
          }
          else {
            count += -1
          }
        }
        stockData[stck].state = count
      }

      let sum = hist.reduce((partialSum, a) => partialSum + a, 0)
      let avg = sum / hist.length
      let volArray = []
      for (let d of hist) {
        volArray.push(Math.sqrt(Math.abs(d - avg) / avg))
      }
      //ns.tprint(stck, " ", sum, " ", avg, " ", volArray)

      stockData[stck].volat = volArray.reduce((partialSum, a) => partialSum + a, 0) / volArray.length
    }



    let stocksVolSorted = Object.keys(stockData).map(function (key) {
      return [key, stockData[key].volat]
    })

    stocksVolSorted.sort(function (first, second) {
      return second[1] - first[1]
    })

    for (let item of stocksVolSorted) {
      //ns.tprint(stockData[key].history)
      ns.print(item[0], " ", stockData[item[0]].state, " ", stockData[item[0]].volat.toFixed(2))
    }

    stocksVolSorted = stocksVolSorted.map(function (key) {
      return key[0]
    })

    //ns.tprint(stocksVolSorted)
    
    for (let stck of stocksVolSorted) {
      if (stockData[stck].long == 1 && stockData[stck].state <= sell) {
        stockData[stck].long = 0
        ns.stock.sellStock(stck,ns.stock.getPosition(stck)[0])
        ns.tprint("sell ", stck)
      }
      if (stockData[stck].long == -1 && stockData[stck].state >= -sell) {
        stockData[stck].long = 0
        ns.stock.sellShort(stck,ns.stock.getPosition(stck)[2])
        ns.tprint("sell short ", stck)
      }
      //ns.tprint(stockData)
      let maxInvest = ns.stock.getMaxShares(stck)*ns.stock.getPrice(stck)*maxInvestStock
      let availableMoney = ns.getPlayer().money - holdBack-minInvest
      if (availableMoney > 0) {
        if (stockData[stck].state >=buy && stockData[stck].long ==0) {
          stockData[stck].long = 1
          let buyAmount = Math.min(maxInvest,availableMoney+minInvest)/ns.stock.getAskPrice(stck)
          ns.stock.buyStock(stck,buyAmount)
          ns.tprint("buy long ",stck, " ",buyAmount, " for ", buyAmount*ns.stock.getAskPrice(stck))
        }
        if (stockData[stck].state <=-buy && stockData[stck].long ==0) {
          stockData[stck].long = -1
          let buyAmount = Math.min(maxInvest,availableMoney+minInvest)/ns.stock.getBidPrice(stck)
          ns.stock.buyShort(stck,buyAmount)
          ns.tprint("buy short ",stck, " ",buyAmount, " for ", buyAmount*ns.stock.getBidPrice(stck))
        }
      }
    
    }


    
  }
}
