/** @param {NS} ns */
export async function main(ns) {

var opts =["Exchange for Corporation Research",
  "Sell for Corporation Funds",
  "Improve Studying",
  "Improve Gym Training",
  "Company Favor",
  "Exchange for Bladeburner Rank",
  "Exchange for Bladeburner SP",
  "Generate Coding Contract","Sell for Money"]
var comp =["NWO","OmniTek Incorporated","KuaiGong International","Clarke Incorporated","Fulcrum Technologies","ECorp","Bachman & Associates","MegaCorp","Blade Industries"]
//let comp = ["Fulcrum Technologies"]
  var things = ns.args
var array = []

if (things.length > 0) {
for (var num of things){
  array.push(opts[num])
}  
} else {
  array =opts
}
ns.tprint(array)
var counter = 0
  while (true) {
    await ns.sleep(1000)
    var minPrice = ns.hacknet.hashCost(array[0])
    var minUpg = array[0]
    for (var thing of array){
      if (minPrice>ns.hacknet.hashCost(thing)) {
        minPrice =ns.hacknet.hashCost(thing)
        minUpg = thing
      }
      while (ns.hacknet.numHashes < minPrice) {
        await ns.sleep(1000)
      }
      ns.hacknet.spendHashes(minUpg,comp[counter%comp.length])
      counter++
    }
  }
}
