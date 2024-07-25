/** @param {NS} ns */
export async function main(ns) {

  while (true) {
    var c = ns.corporation.getCorporation()
  var div = c.divisions
  
  var cities = ns.corporation.getDivision(div[0]).cities
  
  for (var i = 0; i < div.length; i++) {
    for (var j = 0; j< cities.length; j++) {
      if (ns.corporation.getOffice(div[i],cities[j]).avgEnergy < ns.corporation.getOffice(div[i],cities[i]).maxEnergy-1) {
        try {ns.corporation.buyTea(div[i],cities[j])} catch {}
      if (ns.corporation.getOffice(div[i],cities[j]).avgMorale < ns.corporation.getOffice(div[i],cities[i]).maxMorale-1) {
        try {ns.corporation.throwParty(div[i],cities[j],500000)} catch {}
      }
      }
    }
  }
  await ns.sleep(1000)
  }
}
