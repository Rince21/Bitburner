/** @param {NS} ns */
export async function main(ns) {
var stockSyms = ns.stock.getSymbols()
  //ns.tprint(stockSyms)
  var pos = []
  for (var sym of stockSyms) {
    //ns.tprint(sym,ns.stock.getPosition(sym));
    if (ns.stock.getPosition(sym)[0] > 0) {
      pos.push([sym,ns.stock.getPosition(sym)[0]])
    } 
  }
  
  let sum = 0
  for (var p of pos) {
    
    sum += ns.stock.getPrice(p[0])*p[1]
  }

  if (ns.args.length>0) {
  let sold = 0
  for (var p of pos) {
    if (sold < sum/ns.args[0]){
      sold +=ns.stock.getPrice(p[0])*p[1]
      ns.stock.sellStock(p[0],p[1])
    }
  }
  }
  ns.tprint(sum/1000000000,"b")
}
