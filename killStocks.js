/** @param {NS} ns */
export async function main(ns) {
  ns.scriptKill("stocks.js", "home");
  ns.scriptKill("stocks4s.js", "home");
  let stocks = ns.stock.getSymbols()
  for (let stck of stocks) {
    let pos = ns.stock.getPosition(stck)
    if (pos[0] > 0) {
      ns.stock.sellStock(stck, pos[0])
    }
    if (pos[2] > 0) {
      ns.stock.sellShort(stck, pos[2])
    }
  }
}
