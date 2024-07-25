/** @param {NS} ns */
export async function main(ns) {
  var divs = ["ag"]
  if (ns.corporation.getCorporation().divisions.includes("ch")) {
    divs.push("ch")
  }
  
  var cities = ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima", "Volhaven"]

  while (!ns.corporation.hasUnlock("Smart Supply")) {
    while (ns.corporation.getCorporation().state != "SALE") {
      //things to be done multiple times per cycle
      await ns.sleep(100)
    }
    while (ns.corporation.getCorporation().state == "SALE") {
      await ns.sleep(100)
      //things to be done multiple times per cycle
    }
    // things done exactly once per cycle
    for (var div of divs) {
      for (var city of cities) {
      if (div == "ag") {
      var water= ns.corporation.getMaterial(div, city, "Plants").productionAmount/2*10+100
      var stored = ns.corporation.getMaterial(div, city, "Water").stored 
      if (stored < water) {
        try {ns.corporation.bulkPurchase(div, city, "Water", water-stored)} catch {}
      }
      var chems = ns.corporation.getMaterial(div, city, "Plants").productionAmount*0.2*10+100
      stored = ns.corporation.getMaterial(div, city, "Chemicals").stored
      if (stored < chems) {
        try {ns.corporation.bulkPurchase(div, city, "Chemicals", chems-stored)} catch {}
      }
    } else if (div == "ch") {
      var plants= ns.corporation.getMaterial(div, city, "Chemicals").productionAmount*10+100
      var stored = ns.corporation.getMaterial(div, city, "Plants").stored 
      if (stored < plants) {
        try {ns.corporation.bulkPurchase(div, city, "Plants", plants-stored)} catch {}
      }
            var water= ns.corporation.getMaterial(div, city, "Chemicals").productionAmount/2*10+100
      stored = ns.corporation.getMaterial(div, city, "Water").stored 
      if (stored < water) {
        try {ns.corporation.bulkPurchase(div, city, "Water", water-stored)} catch {}
      }

    }
    }
    }
    await ns.sleep(100)
  }
}
