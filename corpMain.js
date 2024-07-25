/** @param {NS} ns */
export async function main(ns) {
  //var prods = ["t1", "t2", "t3"]
  var prods = ["t1", "t2", "t3"]
  //var xmin = [1, 1, 1]
 // var xmax = [0, 0, 0]
  var xmin = [1, 1, 1]
  var xmax = [0, 0, 0]
  var cities = ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima", "Volhaven"]
  var upgrades = ["Smart Factories", "Smart Storage", "DreamSense", "Wilson Analytics", "Nuoptimal Nootropic Injector Implants", "Speech Processor Implants",
    "Neural Accelerators", "FocusWires", "ABC SalesBots", "Project Insight"]
  var jobs = ["Operations", "Engineer", "Business", "Management", "Research & Development", "Intern"]
  var researchs = ["uPgrade: Capacity.I", "uPgrade: Capacity.II", "uPgrade: Dashboard", "uPgrade: Fulcrum",
    "Hi-Tech R&D Laboratory", "AutoBrew", "AutoPartyManager", "Automatic Drug Administration", "CPH4 Injections", "Drones", "Drones - Assembly", "Drones - Transport", "Go-Juice", "HRBuddy-Recruitment", "HRBuddy-Training", "Market-TA.I", "Market-TA.II", "Overclock", "Self-Correcting Assemblers", "Sti.mu"]

  var fundeds = 0
  //ns.exec("spendHash.js","home",1,"Exchange for Corporation Research")
  if (!("party.js" in ns.ps("home"))) {
    ns.exec("party.js", "home", 1)
  }

  function UpgWarehouse(div, times) {
    for (var i = 0; i < cities.length; i++) {
      for (var j = 0; j < times; j++) {
        ns.corporation.upgradeWarehouse(div, cities[i])
      }
    }
  }

  function HireMoreChem() {
    var target = 0
    var max = ns.corporation.getOffice("ch", cities[0]).size
    var uneven = false
    for (var i = 0; i < cities.length; i++) {
      ns.corporation.upgradeWarehouse("ch", cities[i])
      var office = ns.corporation.getOffice("ch", cities[i])
      if (office.size > max) {
        max = office.size
        uneven = true
      } else if (office.size < max) {
        uneven = true
      }
      if (uneven) { target = max } else { target = max + 15 }
    }



    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("ch", cities[i])
      var times = (target - office.size) / 15
      if (times > 0) {
        ns.corporation.upgradeOfficeSize("ch", cities[i], target - office.size)
        for (let m = 0; m < times; m++) {
          var array = [4, 4, 2, 4, 1, 0]

          for (let j = 0; j < 6; j++) {
            for (let k = 0; k < array[j]; k++) {
              ns.corporation.hireEmployee("ch", cities[i], Object.keys(office.employeeJobs)[j])
            }
          }
        }
      }
    }
  }


  function HireMoreAgrar() {
    var target = 0
    var max = ns.corporation.getOffice("ag", cities[0]).size
    var uneven = false
    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("ag", cities[i])
      if (office.size > max) {
        max = office.size
        uneven = true
      } else if (office.size < max) {
        uneven = true
      }
      if (uneven) { target = max } else { target = max + 15 }
    }



    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("ag", cities[i])
      var times = (target - office.size) / 15
      if (times > 0) {
        ns.corporation.upgradeOfficeSize("ag", cities[i], target - office.size)
        for (let m = 0; m < times; m++) {
          var array = [4, 4, 2, 4, 1, 0]

          for (let j = 0; j < 6; j++) {
            for (let k = 0; k < array[j]; k++) {
              ns.corporation.hireEmployee("ag", cities[i], Object.keys(office.employeeJobs)[j])
            }
          }
        }
      }
    }
  }


  function PseudoMarktTAII() {
    //PSEUDO MAITII
    for (var i = 0; i < prods.length; i++) {

      if (ns.corporation.getProduct("to", "Aevum", prods[i]).developmentProgress == 100) {
        if (xmax[i] == 0) {
          if (ns.corporation.getProduct("to", "Aevum", prods[i]).stored == 0) {
            //if (ns.corporation.getProduct("Tobaiv", "Aevum", prods[i]).productionAmount < ns.corporation.getProduct("ToDiv", "Aevum", "t1").actualSellAmount) {
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
          //ns.tprint(ns.corporation.getProduct("bacDiv", "Aevum", prods[i]).productionAmount-)
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



  function HireMoreTabac() {

    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("to", cities[i])
      //WaitForMoney(ns.corporation.getOfficeSizeUpgradeCost("TacDiv", cities[i], 15))
      ns.corporation.upgradeOfficeSize("to", cities[i], 15)

      if (cities[i] == "Aevum") {
        var array = [4, 4, 2, 4, 1, 0]
        //var array = [0,0,0,0,0,0]
      }
      else {
        var array = [2, 2, 1, 2, 8, 0]
      }
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < array[j]; k++) {
          ns.corporation.hireEmployee("to", cities[i], Object.keys(office.employeeJobs)[j])
        }
      }
    }
  }


  function FindProductInDev() {
    var oneInDev = false
    for (var prod of prods) {
      if (ns.corporation.getProduct("to", "Aevum", prod).developmentProgress < 100) {
        return prod
      }
    }
    return ""
  }

  function FindWorstProduct() {
    var worstRating = 0
    var name = ""
    for (var prod of prods) {

      var rate = ns.corporation.getProduct("to", "Aevum", prod).effectiveRating
      ns.tprint(prod, rate)
      if (1 / rate > worstRating) {
        worstRating = 1 / rate
        name = prod
      }
    }
    return name
  }
  async function Develop() {
    //ns.tprint(FindProductInDev())
    if (FindProductInDev() == "") {
      for (var prod of prods) {
        try { ns.corporation.setProductMarketTA2("to", prod, true) } catch { }
      }
      await ns.sleep(20000)
      var nextDev = FindWorstProduct()
      ns.corporation.discontinueProduct("to", nextDev)
      var budget = ns.corporation.getCorporation().funds
      ns.tprint("Developing new Product ", nextDev, " for ", Math.log10(budget))
      ns.corporation.makeProduct("to", "Aevum", nextDev, Math.floor(budget / 3), Math.floor(budget / 3))

      var xmin = [1, 1, 1]
  var xmax = [0, 0, 0]
    }

  }

  while (true) {
    while (ns.corporation.getCorporation().state != "SALE") {
      //things to be done multiple times per cycle
      await ns.sleep(100)
    }
    while (ns.corporation.getCorporation().state == "SALE") {
      //things to be done multiple times per cycle
      await ns.sleep(100)
    }

    if (!ns.corporation.hasResearched("to", "Market-TA.II")) {
      //PseudoMarktTAII()
    }

    if (ns.corporation.getDivision("to").researchPoints > 140000) {
      ns.corporation.research("to", "Market-TA.I")
      ns.corporation.research("to", "Market-TA.II")
      for (var prod of prods) {
        ns.corporation.setProductMarketTA2("to", prod, true)
      }
    }


    var funds = ns.corporation.getCorporation().funds

    var doneSmth = false
    //Wils
    if (funds * 0.3 > ns.corporation.getUpgradeLevelCost(upgrades[3])) {
      ns.corporation.levelUpgrade(upgrades[3])
      doneSmth = true
    }

    // GrowTobac
    var cost = ns.corporation.getOfficeSizeUpgradeCost("to", "Aevum", 15)
    cost += ns.corporation.getOfficeSizeUpgradeCost("to", "Sector-12", 15) * 5
    if (funds * 0.1 > cost) {
      HireMoreTabac()

      doneSmth = true
    }

    //adverts
    while (funds * 0.05 > ns.corporation.getHireAdVertCost("to")) {
      ns.corporation.hireAdVert("to")
      doneSmth = true
    }

    var funds = ns.corporation.getCorporation().funds
    //otherupgrades
    var cost = ns.corporation.getUpgradeLevelCost(upgrades[0])
    cost += ns.corporation.getUpgradeLevelCost(upgrades[1])
    cost += ns.corporation.getUpgradeLevelCost(upgrades[4])

    cost += ns.corporation.getUpgradeLevelCost(upgrades[5])
    cost += ns.corporation.getUpgradeLevelCost(upgrades[6])
    cost += ns.corporation.getUpgradeLevelCost(upgrades[7])
    cost += ns.corporation.getUpgradeLevelCost(upgrades[8])
    cost += ns.corporation.getUpgradeLevelCost(upgrades[9])
    if (funds * 0.1 > cost) {
      ns.corporation.levelUpgrade(upgrades[0])
      ns.corporation.levelUpgrade(upgrades[1])
      ns.corporation.levelUpgrade(upgrades[4])
      ns.corporation.levelUpgrade(upgrades[5])
      ns.corporation.levelUpgrade(upgrades[6])
      ns.corporation.levelUpgrade(upgrades[7])
      ns.corporation.levelUpgrade(upgrades[8])
      ns.corporation.levelUpgrade(upgrades[9])
    }


    //if (funds * 0.01 > ns.corporation.getUpgradeWarehouseCost("to","Aevum",1)*6) {
    //UpgWarehouse("to",1)
    //  ns.exec("corpMult.js","home",1)

    //} 
    var funds = ns.corporation.getCorporation().funds
    //if (ns.corporation.getMaterial("ch","Aevum","Chemicals").actualSellAmount==0 ) {
    //  HireMoreChem()
    //}
    //var funds = ns.corporation.getCorporation().funds
    //if (ns.corporation.getMaterial("ag","Aevum","Plants").actualSellAmount==0) {
    //  HireMoreAgrar()
    //}
    var funds = ns.corporation.getCorporation().funds

    if (funds * 0.01 > ns.corporation.getUpgradeLevelCost(upgrades[2])) {
      ns.corporation.levelUpgrade(upgrades[2])
    }

    // if (ns.getDivision("ChemDiv")) {
    //   if (ns.corporation.getMaterial("ChemDiv", "Aevum", "Chemicals").actualSellAmount < 0) {
    //    if (funds * 0.3 > ns.corporation.getOfficeSizeUpgradeCost("ChemDiv", "Aevum", 15) * 6) {
    //     Hire([4, 4, 2, 4, 1, 0], "ChemDiv")
    //  }
    //}
    //}

    if (!doneSmth) {
      await Develop()

      if (fundeds == 0) {
        if (ns.corporation.getInvestmentOffer().funds > 180000000000000) {
          ns.exec("investors.js", "home")
          fundeds += 1
        }
      }
      if (fundeds == 1) {
        if (ns.corporation.getInvestmentOffer().funds > 25000000000000000) {
          ns.exec("investors.js", "home")
          fundeds += 1
        }
      }
    }
  }    //things done exactly once per cycle
}



