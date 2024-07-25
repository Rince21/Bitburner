/** @param {NS} ns */
export async function main(ns) {
 var prods = ["t1", "t2", "t3"]
  var xmin = [1, 1, 1]
  var xmax = [0, 0, 0]
  var cities = ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima", "Volhaven"]
  var upgrades = ["Smart Factories", "Smart Storage", "DreamSense", "Wilson Analytics", "Nuoptimal Nootropic Injector Implants", "Speech Processor Implants",
    "Neural Accelerators", "FocusWires", "ABC SalesBots", "Project Insight"]
  var jobs = ["Operations", "Engineer", "Business", "Management", "Research & Development", "Intern"]
  var researchs = ["uPgrade: Capacity.I", "uPgrade: Capacity.II", "uPgrade: Dashboard", "uPgrade: Fulcrum",
    "Hi-Tech R&D Laboratory", "AutoBrew", "AutoPartyManager", "Automatic Drug Administration", "CPH4 Injections", "Drones", "Drones - Assembly", "Drones - Transport", "Go-Juice", "HRBuddy-Recruitment", "HRBuddy-Training", "Market-TA.I", "Market-TA.II", "Overclock", "Self-Correcting Assemblers", "Sti.mu"]


  function PseudoMarktTAII() {
    //PSEUDO MAITII
    prods=[]
    try {ns.corporation.getProduct("to","Aevum","t1")
    //ns.tprint("got prod 2")
      prods.push("t1") } catch {}
      try {ns.corporation.getProduct("to","Aevum","t2")
      //ns.tprint("got prod 2")
      prods.push("t2") } catch {}
      try {ns.corporation.getProduct("to","Aevum","t3")

      //ns.tprint("got prod 3")
      prods.push("t3") } catch {}
      //ns.tprint(prods)
    for (var i = 0; i < prods.length; i++) {

      if (ns.corporation.getProduct("to", "Aevum", prods[i]).developmentProgress == 100) {
        if (xmax[i] == 0) {
          if (ns.corporation.getProduct("to", "Aevum", prods[i]).stored == 0) {
            //if (ns.corporation.getProduct("bacDiv", "Aevum", prods[i]).productionAmount < ns.corporation.getProduct("TobDiv", "Aevum", "t1").actualSellAmount) {
            xmin[i] = xmin[i] * 2;
          } else {
            xmax[i] = xmin[i]
            xmin[i] = xmin[i] / 2
          }
          for (var city of cities) {
            ns.corporation.sellProduct("to", city, prods[i], "MAX", "MP*" + String(xmin[i]))
          }

        }
        else {
          // if (ns.corporation.getProduct("bacDiv", "Aevum", prods[i]).stored ==0) {
          //ns.tprint(ns.corporation.getProduct("obacDiv", "Aevum", prods[i]).productionAmount-)
          if (ns.corporation.getProduct("to", "Aevum", prods[i]).productionAmount <= ns.corporation.getProduct("to", "Aevum", prods[i]).actualSellAmount + 1) {
            xmin[i] = Math.floor(xmin[i] * 1.1 * 1000) / 1000;
            for (var city of cities) {
              ns.corporation.sellProduct("to", city, prods[i], "MAX", "MP*" + String(xmin[i]))
            }
          }
          else {
            xmin[i] = Math.max(Math.floor(xmin[i] * 0.8 * 1000) / 1000, 1)
            for (var city of cities) {
              ns.corporation.sellProduct("to", city, prods[i], "MAX", "MP*" + String(xmin[i]))
            }
          }
        }
      }
      else {
        xmax[i] = 0
        xmin[i] = 1
      }
    }
  }

 while (!ns.corporation.hasResearched("to", "Market-TA.II")) {
    while (ns.corporation.getCorporation().state != "SALE") {
      //things to be done multiple times per cycle
      await ns.sleep(100)
    }
    while (ns.corporation.getCorporation().state == "SALE") {
      //things to be done multiple times per cycle
      await ns.sleep(100)
    }

    if (!ns.corporation.hasResearched("to", "Market-TA.II")) {
      PseudoMarktTAII()
    }

 
 

  }

}
