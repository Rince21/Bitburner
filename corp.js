/** @param {NS} ns */


export async function main(ns) {




  //ns.corporation.upgradeOfficeSize(div[2],cities[1],diff)
  //var c = ns.corporation.getCorporation()
  //var div = c.divisions
  //ns.tprint(div)
  var cities = ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima", "Volhaven"]
  var jobs = ["Operations", "Engineer", "Business", "Management", "Research & Development", "Intern"]
  var upgrades = ["Smart Factories", "Smart Storage", "DreamSense", "Wilson Analytics", "Nuoptimal Nootropic Injector Implants", "Speech Processor Implants",
    "Neural Accelerators", "FocusWires", "ABC SalesBots", "Project Insight"]

  var researchs = ["uPgrade: Capacity.I", "uPgrade: Capacity.II", "uPgrade: Dashboard", "uPgrade: Fulcrum",
    "Hi-Tech R&D Laboratory", "AutoBrew", "AutoPartyManager", "Automatic Drug Administration", "CPH4 Injections", "Drones", "Drones - Assembly", "Drones - Transport", "Go-Juice", "HRBuddy-Recruitment", "HRBuddy-Training", "Market-TA.I", "Market-TA.II", "Overclock", "Self-Correcting Assemblers", "Sti.mu"]
  var divs = ["ag", "ch", "to"]
  var industries = ["Agriculture", "Chemical", "Tobacco"]

  //PreInv1()
  function Corp1() {
    ns.corporation.createCorporation("cp", true)
    ns.corporation.expandIndustry("Agriculture", "ag")
    for (var city of cities) {
      if (city != "Sector-12") {
        try { ns.corporation.expandCity("ag", city) } catch { }
        ns.corporation.purchaseWarehouse("ag", city)
      }
      ns.corporation.sellMaterial("ag", city, "Food", "MAX", "MP")
      ns.corporation.sellMaterial("ag", city, "Plants", "MAX", "MP")
    }
    ns.exec("spendHash.js", "home", 1, 1)

    ns.exec("party.js", "home")

    Hire([2, 2, 1, 2, 1, 0], "ag")
    ns.corporation.hireAdVert("ag")
    ns.corporation.hireAdVert("ag")
    ns.exec("marketer.js", "home")
    LevelToArray([1, 1, 0, 0, 1, 1, 1, 1, 0, 0])
    UpgWarehouseTo("ag", 2)
    ns.exec("corpMult.js", "home")
  }

  //Corp1()
  //Hire([2, 2, 1, 2, 1, 0], "ag")

  //Hire([6,6,3,6,1,0],"ag")

  //150b
  //LevelToArray([5,5,1,0,3,3,3,3,0,0])
  //var lvl = 10
  //LevelToArray([lvl,lvl,1,0,lvl,lvl,lvl,lvl,0,0])
  //   UpgWarehouseTo("ag",lvl+1)
  //ns.exec("corpMult.js","home")
  //Corp2()
  //pgWarehouseTo("ag",13)
  //ns.exec("corpMult.js","home")
  //8b über

  //58b
  //LevelToArray([3,3,1,0,3,3,3,3,0,0])
  //UpgWarehouseTo("ag",14)
  //ns.exec("corpMult.js","home")

  //hab 1105
 // GetTobacDiv()
  //hab 633
 // GetChemDiv()
  //hab133
 // temp()
Hire([60, 60, 30, 60, 15, 0], "ch")

//Hire([12, 12, 6, 12, 3, 0], "ch")
 // Hire([4, 4, 2, 4, 1, 0], "ag")
 //UpgWarehouseTo("ch",20)
 //UpgWarehouseTo("ag",20)
//ns.exec("corpMult.js","home")

  function temp() {
    ns.corporation.purchaseUnlock("Smart Supply")
    for (var city of cities) {
      ns.corporation.setSmartSupply("ag", city, true)
      ns.corporation.setSmartSupply("to", city, true)
      ns.corporation.setSmartSupply("ch", city, true)
    }
    LevelToArray([10, 10, 0, 2, 10, 10, 10, 10, 0, 1])
    for (var i = 0; i < 20; i++) {
      ns.corporation.hireAdVert("to")
    }
    ns.exec("PseudoT2.js", "home")
    ns.exec("spendHash.js", "home", 1, 0)
  }
  //UpgWarehouseTo("to",6)
  //UpgWarehouseTo("ch",10)
  //LevelToArray([7,7,0,2,7,7,7,7,0,2])
  //hab80
  //hab 34
  //LevelToArray([8,8,0,2,8,8,8,8,0,0])
  //Hire([4,4,2,4,1,0],"ag")
  //UpgWarehouseTo("ch",11)
  //UpgWarehouseTo("to",6)
 //ns.exec("corpMult.js","home")


  //Hire([26,26,13 ,25 , 0, 0], "to",["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Volhaven"])
  //Hire([2,2,1 ,2 , 23, 0], "to",["Aevum"])
  //LevelToArray([20, 20, 20, 5, 20, 20, 20, 20, 0, 1])
  //ns.exec("corpMain.js","home")
  function upgStorageAg() {
    var doneSmth = false
    var costLevel = ns.corporation.getUpgradeLevelCost(upgrades[1])
    var costWare = ns.corporation.getUpgradeWarehouseCost("ag", cities[0], 1) * 6
    ns.tprint(costLevel, costWare)
    var storPerLevel = ns.corporation.getWarehouse("ag", cities[0]).level * 10 * 6
    var storPerWare = (100 + 20 * ns.corporation.getUpgradeLevel(upgrades[1])) * 6
    ns.tprint(storPerLevel, storPerWare)
    var sPerCLevel = storPerLevel / costLevel
    var sPerCWare = storPerWare / costWare
    if (sPerCLevel > sPerCWare) {
      ns.tprint("rec level")
      if (ns.corporation.getCorporation().funds * 0.7 > costLevel) {
        ns.corporation.levelUpgrade(upgrades[1])
        doneSmth = true
      }
    } else {
      ns.tprint("rec warehouse")
      if (ns.corporation.getCorporation().funds * 0.7 > costWare) {
        for (var city of cities) {
          ns.corporation.upgradeWarehouse("ag", city)
        }
        doneSmth = true
      }
    }
    if (doneSmth) {
      ns.exec("corpMult.js", "home")
    }
  }

  //  await Corp2()
  //Export("ch", ["ag"], "Chemicals")
  //    Export("ag", ["ch"], "Plants")
  // Hire([4, 4, 2, 3, 1, 0], "ag")


  async function Corp2() {
    Hire([2, 2, 1, 2, 1, 0], "ag")
    while (ns.corporation.getDivision("ag").numAdVerts < 8) {
      ns.corporation.hireAdVert("ag")
      await ns.sleep(1000)
    }

    try { ns.corporation.expandIndustry("Chemical", "ch") } catch { }
    for (var city of cities) {
      if (city != "Sector-12") {
        try { ns.corporation.expandCity("ch", city) } catch { }
        try { ns.corporation.purchaseWarehouse("ch", city) } catch { }
        //ns.corporation.upgradeWarehouse("ChemDiv",city)
      }
      ns.corporation.upgradeWarehouse("ch", city)
      ns.corporation.sellMaterial("ch", city, "Chemicals", "MAX", "MP")
    }
    Hire([2, 2, 1, 2, 1, 0], "ch")
    ns.corporation.purchaseUnlock("Export")
    Export("ch", ["ag"], "Chemicals")
    Export("ag", ["ch"], "Plants")
    ns.kill("marketer.js", "home")
    ns.exec("marketer.js", "home")
    ns.exec("corpMult.js", "home")
  }

  //  GetTobacDiv()
  //UpgWarehouseTo("TobacDiv",2)
  //ns.exec("corpMult.js", "home")
  //  ns.exec("PseudoT2.js","home")
  //     Export("ch", ["ag"], "Chemicals")
  //   Export("ag", ["ch","TobacDiv"], "Plants")

  for (var city of cities) {
    // ns.corporation.sellMaterial("ChemDiv",city,"Chemicals","MAX","MP")
    //ns.corporation.sellProduct("TobacDiv",city,"t1","MAX","MP")
    //   ns.corporation.setSmartSupply("ag", city, true)
    //     ns.corporation.setSmartSupply("to", city, true)
    //      ns.corporation.setSmartSupply("ch", city, true)

  }


  //LevelToArray([7,7,1,1,7,7,7,7,0,1])
  //ns.exec("corpMult.js", "home")

  //UpgWarehouseTo("AgrarDiv", 3)
  //var array = [50, 50, 50, 10000]
  //ns.tprint(CalcSizeOfMats(array))
  //PurchaseMultsTo(array, "AgrarDiv")

  //ns.exec("spendHash.js", "home", 1, "Sell for Corporation Funds")
  //Hire([2, 2, 1, 2, 1, 0], "AgrarDiv")
  //UpgWarehouseTo("AgrarDiv", 4)
  //var array = [150, 150, 150, 30000]
  //ns.exec("corpMult.js", "home", 1)
  //LevelToArray([3,0,0,0,3,3,3,3,0,0])
  //Hire([4, 4, 2, 4, 1, 0], "AgrarDiv")
  //   LevelToArray([7, 7, 0, 0, 7, 7, 7, 7, 0, 0])
  //PreInv2()
  // LevelToArray([10, 10, 1, 0, 10, 10, 10, 10, 5, 0])
  //UpgWarehouseTo("AgrarDiv", 10)
  //array = [200, 200, 200, 70000]
  //GetChemDiv()
  //PurchaseMultsTo(array,"AgrarDiv")
  //Hire([4, 4, 2, 4, 1, 0], "ChemDiv")

  //Export("ChemDiv", ["AgrarDiv"], "Chemicals")
  //   Export("AgrarDiv", ["ChemDiv", "TobacDiv"], "Plants")
  //ns.exec("spendHash.js","home",1,"Exchange for Corporation Research")

  //  ns.tprint(CalcSizeOfMats(array))
  //PreIvn3()
  //UpgWarehouseTo("ChemDiv", 5)
  //var array = [400, 600, 600, 60000]
  //CalcSizeOfMats(array)
  // PurchaseMultsTo(array, "ChemDiv")
  // Export("ChemDiv", ["AgrarDiv"], "Chemicals")
  // Export("AgrarDiv", ["ChemDiv", "TobacDiv"], "Plants")
  //HireMoreChem()
  for (var city of cities) {
    //Export("ChemDiv", ["AgrarDiv"], "Chemicals")
    //Export("AgrarDiv", ["ChemDiv"], "Plants")
    //  ns.corporation.sellProduct("TobacDiv",city,"t1","MAX","MP")
  }
  // ns.corporation.makeProduct("TobacDiv","Aevum","t2",1000000000,1000000000)

  for (var city of cities) {
    //ns.corporation.sellProduct("TobacDiv",city,"t2","MAX","MP")
  }
  // ns.corporation.makeProduct("TobacDiv","Aevum","t3",1000000000,1000000000)
  for (var city of cities) {
    //ns.corporation.sellProduct("TobacDiv",city,"t3","MAX","MP")
  }

  //ns.tprint(ns.corporation.getOfficeSizeUpgradeCost("TobacDiv","Aevum",45))
  //Hire([20,20,10 ,20 , 5, 0], "TobacDiv",["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Volhaven"])
  //Hire([2,2,1 ,2 , 8, 0], "TobacDiv",["Aevum"])
  //HireMoreChem()


  //ns.exec("corpMain.js","home",1)



  function PurchaseMults(multArray, division) {
    var office = ns.corporation.getOffice(division, cities[1])
    //ns.tprint(ns.corporation.getMaterial(division,"Aevum"))
    //ns.tprint(ns.corporation.getWarehouse(division,cities[1]))
    //ns.tprint(ns.corporation.getMaterialData("Hardware"))
    //ns.tprint(ns.corporation.getConstants().materialNames)
    var matNames = ["Water", "Ore", "Minerals", "Food", "Plants", "Metal", "Hardware", "Chemicals", "Drugs", "Robots", "AI Cores", "Real Estate"] //6 9 10 11
    for (var city of cities) {
      ns.corporation.bulkPurchase(division, city, matNames[6], multArray[0])
      ns.corporation.bulkPurchase(division, city, matNames[9], multArray[1])
      ns.corporation.bulkPurchase(division, city, matNames[10], multArray[2])
      ns.corporation.bulkPurchase(division, city, matNames[11], multArray[3])
    }
  }




  async function HireMoreTabac() {

    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("TobacDiv", cities[i])
      WaitForMoney(ns.corporation.getOfficeSizeUpgradeCost("TobacDiv", cities[i], 15))
      ns.corporation.upgradeOfficeSize("TobacDiv", cities[i], 15)

      if (cities[i] == "Aevum") {
        var array = [4, 4, 2, 4, 1, 0]
        //var array = [0,0,0,0,0,0]
      }
      else {
        var array = [2, 2, 1, 2, 8, 0]
      }
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < array[j]; k++) {
          ns.corporation.hireEmployee("TobacDiv", cities[i], Object.keys(office.employeeJobs)[j])
        }
      }
    }
  }




  async function HireMoreWater() {
    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("WaterDiv", cities[i])
      WaitForMoney(ns.corporation.getOfficeSizeUpgradeCost("WaterDiv", cities[i], 15))
      ns.corporation.upgradeOfficeSize("WaterDiv", cities[i], 15)

      var array = [4, 4, 2, 4, 1, 0]
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < array[j]; k++) {
          ns.corporation.hireEmployee("WaterDiv", cities[i], Object.keys(office.employeeJobs)[j])
        }
      }
    }
  }

  function UpgWarehouse(div, times) {
    for (var i = 0; i < cities.length; i++) {
      for (var j = 0; j < times; j++) {
        ns.corporation.upgradeWarehouse(div, cities[i])
      }
    }
  }


  //HireMoreWater()
  //HireMoreChem()
  //Hire([4,4,2,4,1,0],"AgrarDiv")
  // PurchaseMults([0,0,0,5000],"AgrarDiv")
  // Export("AgrarDiv",["TobacDiv"],"Plants")
  //UpgWarehouse("AgrarDiv",1)
  //PurchaseMults([100,100,100,125000],"AgrarDiv")
  function GetChemDiv() {
    try { ns.corporation.expandIndustry("Chemical", "ch") } catch { }
    for (var city of cities) {
      if (city != "Sector-12") {
        try { ns.corporation.expandCity("ch", city) } catch { }
        try { ns.corporation.purchaseWarehouse("ch", city) } catch { }
        //ns.corporation.upgradeWarehouse("ChemDiv",city)
      }
      ns.corporation.sellMaterial("ch", city, "Chemicals", "MAX", "MP")
    }
    Hire([8, 8, 4, 8, 2, 0], "ch")
    UpgWarehouseTo("ch", 5)
    //var array = [400, 600, 600, 60000]
    //CalcSizeOfMats(array)
    //PurchaseMultsTo(array, "ChemDiv")
    ns.exec("corpMult.js", "home")
    Export("ch", ["ag"], "Chemicals")
    Export("ag", ["ch", "to"], "Plants")
  }
  //PurchaseMults([900,900,900,21000],"ChemDiv")

  function GetWaterDiv() {
    ns.corporation.expandIndustry("Water Utilities", "WaterDiv")
    for (var city of cities) {
      if (city != "Sector-12") {
        try { ns.corporation.expandCity("WaterDiv", city) } catch { }
        ns.corporation.purchaseWarehouse("WaterDiv", city)
        //ns.corporation.upgradeWarehouse("ChemDiv",city)
      }
    }
    Hire([4, 4, 2, 4, 4, 2], "WaterDiv")
    //PurchaseMults([0,900,900,21000],"ChemDiv")
    Export("WaterDiv", ["ChemDiv", "AgrarDiv"], "Water")
    PurchaseMults([0, 50, 50, 5000], "WaterDiv")

  }
  // Export("WaterDiv", ["AgrarDiv", "ChemDiv"], "Water")
  //PurchaseMults([0, 50, 50, 5000], "WaterDiv")


  //UpgWarehouse("WaterDiv",2)
  //  PurchaseMults([0, 500, 500, 50000], "WaterDiv")
  //UpgWarehouse("ChemDiv",2)
  //PurchaseMults([900,900,900,21000],"ChemDiv")

  //ns.corporation.sellMaterial("AgrarDiv",city,"Hardware","MAX","MP*0.5")
  //ns.corporation.sellMaterial("AgrarDiv",city,"Robots","MAX","MP*0.5")
  //ns.corporation.sellMaterial("AgrarDiv",city,"AI Cores","MAX","MP*0.5")
  //ns.corporation.sellMaterial("AgrarDiv",city,"Real Estate","MAX","MP*0.5")
  //ns.corporation.sellMaterial("AgrarDiv",city,"Hardware","0","MP*0.5")
  //ns.corporation.sellMaterial("AgrarDiv",city,"Robots","0","MP*0.5")
  //ns.corporation.sellMaterial("AgrarDiv",city,"AI Cores","0","MP*0.5")
  //ns.corporation.sellMaterial("AgrarDiv",city,"Real Estate","0","MP*0.5")

  // ns.corporation.sellMaterial("AgrarDiv",city,"Food","MAX","MP")
  //ns.corporation.sellMaterial("AgrarDiv",city,"Plants","MAX","MP")

  function PreInv1() {
    ns.corporation.createCorporation("Corp", true)
    ns.corporation.expandIndustry("Agriculture", "AgrarDiv")
    for (var city of cities) {
      if (city != "Sector-12") {
        try { ns.corporation.expandCity("AgrarDiv", city) } catch { }
        ns.corporation.purchaseWarehouse("AgrarDiv", city)
      }
      ns.corporation.sellMaterial("AgrarDiv", city, "Food", "MAX", "MP")
      ns.corporation.sellMaterial("AgrarDiv", city, "Plants", "MAX", "MP")
    }

    Hire([2, 1, 1, 1, 1, 0], "AgrarDiv")
    ns.corporation.hireAdVert("AgrarDiv")
    ns.exec("marketer.js", "home")
    LevelToArray([2, 0, 0, 0, 2, 2, 2, 2, 0, 0])
    UpgWarehouseTo("AgrarDiv", 3)
    var array = [50, 50, 50, 10000]
    //ns.tprint(CalcSizeOfMats(array))
    //PurchaseMultsTo(array, "AgrarDiv")

    ns.exec("party.js", "home")
    //ns.exec("spendHash.js", "home", 1, "Sell for Corporation Funds")
    Hire([2, 2, 1, 2, 1, 0], "AgrarDiv")
    UpgWarehouseTo("AgrarDiv", 4)
    var array = [150, 150, 150, 30000]
    //PurchaseMultsTo(array, "AgrarDiv")
    //ns.exec("corpMult.js", "home", 1)
  }

  //180b
  function PreInv2() {
    for (var city of cities) {
      ns.corporation.sellMaterial("AgrarDiv", city, "Food", "MAX", "MP")
      ns.corporation.sellMaterial("AgrarDiv", city, "Plants", "MAX", "MP")
    }

    Hire([4, 4, 2, 4, 1, 0], "AgrarDiv")
    LevelToArray([7, 7, 0, 0, 7, 7, 7, 7, 0, 0])
    UpgWarehouseTo("AgrarDiv", 5)
    var array = [50, 50, 50, 10000]
    //ns.tprint(CalcSizeOfMats(array))
    PurchaseMultsTo(array, "AgrarDiv")
    array = [200, 100, 200, 60000]
    PurchaseMultsTo(array, "AgrarDiv")

    //var array = [600, 600, 600, 120000]
    //    ns.tprint(CalcSizeOfMats(array))
    //PurchaseMultsTo(array, "AgrarDiv")
  }

  //   PreInv2()
  // 
  //got 2.3 t
  //To10levels







  async function WaitForInvest(money) {
    while (true) {
      if (ns.corporation.getInvestmentOffer().funds >= money) {
        return
      }
      await ns.sleep(100)
    }
  }
  //ns.tprint("offer",ns.corporation.getInvestmentOffer() )
  //  if (ns.corporation.getInvestmentOffer().funds>=160000000000) {
  //await WaitForInvest(155000000000)
  //ns.tprint("accept", ns.corporation.getInvestmentOffer())
  //ns.corporation.acceptInvestmentOffer()


  //ns.exec("spendHash.js","home",1,"Sell for Corporation Funds")
  //Hire([4,4,2,4,1,0],"AgrarDiv")  


  function PreIvn3() {
    //await LevelToArray([10, 10, 1, 1, 10, 10, 10, 10, 0, 1])
    //GetTobacDiv()
    //GetChemDiv()
    //ns.corporation.makeProduct("TobacDiv", "Aevum", "t1", 1000000000, 1000000000)
    //ns.corporation.purchaseUnlock("Smart Supply")
    for (var city of cities) {
      // ns.corporation.sellMaterial("ChemDiv",city,"Chemicals","MAX","MP")
      //ns.corporation.sellProduct("TobacDiv",city,"t1","MAX","MP")
      ns.corporation.setSmartSupply("AgrarDiv", city, true)
      ns.corporation.setSmartSupply("TobacDiv", city, true)
      ns.corporation.setSmartSupply("ChemDiv", city, true)

    }
    //ns.corporation.purchaseUnlock("Export")
    Export("ChemDiv", ["AgrarDiv"], "Chemicals")
    Export("AgrarDiv", ["ChemDiv", "TobacDiv"], "Plants")
    //ns.kill("spendHash.js","home","Sell for Corporation Funds")
    //ns.exec("spendHash.js","home",1,"Exchange for Corporation Research")
    LevelToArray([20, 20, 20, 5, 20, 20, 20, 20, 0, 1])
    for (var i = 0; i < 20; i++) {
      ns.corporation.hireAdVert("TobacDiv")
    }
    ns.exec("PseudoT2.js", "home", 1)
  }

  //await PreIvn3()
  //  ns.kill("spendHash.js","home","Sell for Corporation Funds")
  //ns.kill("spendHash.js","home","Sell for Corporation Funds","Exchange for Corporation Research")
  //ns.exec("spendHash.js","home",1,"Exchange for Corporation Research")
  //await HireMoreChem()

  //UpgWarehouse("AgrarDiv",1)
  //await LevelToArray([20, 20, 20, 5, 20, 20, 20, 20, 0, 1])
  //for (var i = 0; i < 20; i++) {
  //    ns.corporation.hireAdVert("TobacDiv")
  //  }

  //ns.exec("PseudoT2.js","home",1)
  //  Hire([2, 2, 1, 2, 8, 0], "TobacDiv", ["Aevum"])
  //Hire([2, 2, 1, 2, 23, 0], "TobacDiv", ["Aevum"])
  //    Hire([20, 20, 10, 20, 5, 0], "TobacDiv", ["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Volhaven"])
  // HireMoreChem()


  //await LevelToArray([7, 7, 1, 0, 7, 7, 7, 7, 0, 0])
  //await LevelToArray([10, 10, 1, 0, 10, 10, 10, 10, 0, 1])
  //PurchaseMults([200,100,200,50000],"AgrarDiv")
  //UpgWarehouse("AgrarDiv",1)

  //await WaitForInvest(3100000000000)
  //ns.corporation.acceptInvestmentOffer()

  function GetTobacDiv() {
    ns.corporation.expandIndustry("Tobacco", "to")
    for (var city of cities) {
      if (city != "Sector-12") {
        try { ns.corporation.expandCity("to", city) } catch { }
        ns.corporation.purchaseWarehouse("to", city)
        //ns.corporation.upgradeWarehouse("ChemDiv",city)
      }
    }
    Hire([1, 1, 1, 1, 11, 0], "to", ["Aevum"])
    Hire([22, 22, 11, 20, 0, 0], "to", ["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Volhaven"])
    ns.corporation.makeProduct("to", "Aevum", "t1", 1000000000, 1000000000)
    ns.corporation.makeProduct("to", "Aevum", "t2", 2000000000, 2000000000)
    ns.corporation.makeProduct("to", "Aevum", "t3", 4000000000, 4000000000)
    ns.corporation.purchaseUnlock("Export")
    Export("ag", ["to"], "Plants")
    UpgWarehouseTo("to", 6)
  }

  for (var city of cities) {
    // ns.corporation.sellMaterial("ChemDiv",city,"Chemicals","MAX","MP")
    //ns.corporation.sellProduct("TobacDiv",city,"t1","MAX","MP")
    //   ns.corporation.setSmartSupply("AgrarDiv",city,true)
    //   ns.corporation.setSmartSupply("TobacDiv",city,true)
  }

  //ns.corporation.purchaseUnlock("Smart Supply")

  //GetTobacDiv()
  //ns.corporation.makeProduct("TobacDiv","Aevum","t1",1000000000,1000000000)
  //LevelToArray([10,10,20,0,20,20,20,20,0,10])

  //LevelToArray([10,10,20,1,20,20,20,20,0,10])


  //ns.corporation.makeProduct("TobacDiv","Aevum","t2",1000000000,1000000000)

  for (var city of cities) {
    //ns.corporation.sellProduct("TobacDiv",city,"t2","MAX","MP")
  }
  //ns.corporation.makeProduct("TobacDiv","Aevum","t3",1000000000,1000000000)
  for (var city of cities) {
    //ns.corporation.sellProduct("TobacDiv",city,"t3","MAX","MP")
  }
  //ns.exec("corpMain.js","home",1)

  //if (ns.corporation.getDivision("TobacDiv").researchPoints > 10000) {
  //ns.corporation.research("TobacDiv","Hi-Tech R&D Laboratory")
  //}


  //LevelToArray([10,10,20,10,20,20,20,20,0,10])
  for (var i = 0; i < 20; i++) {
    //ns.corporation.hireAdVert("TobacDiv")
  }

  //Hire([20,20,10 ,20 , 5, 0], "TobacDiv",["Sector-12", "Chongqing", "New Tokyo", "Ishima", "Volhaven"])
  //Hire([2,2,1 ,2 , 8, 0], "TobacDiv",["Aevum"])

  //UpgWarehouse("TobacDiv",4)
  var array = [400, 1200, 400, 40000]
  //ns.tprint(CalcSizeOfMats(array))
  //PurchaseMultsTo(array,"TobacDiv")

  //ns.exec("spendHash.js","home",1,"Sell for Corporation Funds","Exchange for Corporation Research")

  //GetChemDiv()
  //UpgWarehouse("ChemDiv",5)
  //var array = [2000,2500,2000,200000]
  //CalcSizeOfMats(array)
  //PurchaseMultsTo(array,"ChemDiv")

  //Hire([8,8,4,8,2,0],"AgrarDiv")
  //Hire([16,16,8,16,4,0],"AgrarDiv")
  //ns.exec("spendHash.js","home",1,"Exchange for Corporation Research")




  //  PreInv1()






  //var prods = ["t1", "t2", "t3"]
  //for (var city of cities) {
  //  for (var i=0; i< prods.length;i++){
  //           ns.corporation.sellProduct("TobacDiv", city, prods[i], "MAX", "MP*" + String(1))
  //        }
  //}

  //ns.kill("spendHash.js","home","Sell for Corporation Funds","Exchange for Corporation Research")
  //ns.exec("spendHash.js","home",1,"Exchange for Corporation Research")





  //ns.corporation.sellMaterial("AgrarDiv",city,"Water","0","MP")

  //ns.corporation.buyMaterial("AgrarDiv",city,"Chemicals","0","MP")
  //PurchaseMults([0,900,900,21000],"ChemDiv")
  //PurchaseMults([0, 50, 50, 5000], "WaterDiv")
  //HireMoreTabac()

  //ns.corporation.upgradeOfficeSize("TobacDiv", "Aevum", 7)
  //HireMoreChem()
  //UpgWarehouse("TobacDiv",1)
  //PurchaseMults([500,1000,500,50000],"TobacDiv")
  //GetWaterDiv()
  // Hire([4,4,2,4,4,0],"WaterDiv")
  //Export("AgrarDiv",["ChemDiv","TobacDiv"],"Plants")
  //ns.corporation.expandIndustry("Chemical","ChemDiv")
  //"Water Utilities", "Spring Water", "Agriculture", "Fishing", "Mining", "Refinery", "Restaurant", "Tobacco", "Chemical", "Pharmaceutical", "Computer Hardware", "Robotics", "Software", "Healthcare", "Real Estate"
  //Hire([2, 2, 1, 2, 6, 2], "WaterDiv")
  //Hire([6,6,3,6,9,0],"Water2Div")
  //  Hire([12,12,6,12,18,0],"Water2Div")
  //Hire([20,20,10,20,20,0],"WaterDiv")
  //PurchaseMults([125,75,50,2700],"AgrarDiv")
  // Hire([6, 6, 3, 6, 3, 4], div[2])
  //PurchaseMults([2000,2000,2000,50000],"ChemDiv")
  //PurchaseMults([500, 1000, 1000, 100000], "WaterDiv")
  //PurchaseMults([0, 500, 500, 50000], "Water2Div")
  //HireMoreTabac()
  //ns.tprint(Math.log10(ns.corporation.getCorporation().funds))
  //Hire([2,2,1,2,19,4],"TobacDiv",["Aevum"])
  //Hire([10,10,5,10,0,3],"TobacDiv",["Sector-12","Chongqing","New Tokyo","Ishima","Volhaven"])
  //Hire([22,22,11,22,13,0],"ChemDiv")
  //4,4,2,4,1-sind 15
  //HireMore("TobacDiv",15)
  //Export("WaterDiv",["ChemDiv","AgrarDiv"],"Water")
  //Export("Water2Div",["AgrarDiv","ChemDiv"],"Water")


  //Export("ChemDiv",["AgrarDiv"],"Chemicals")


  function HireMoreAgrar() {
    var target = 0
    var max = ns.corporation.getOffice("AgrarDiv", cities[0]).size
    var uneven = false
    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("AgrarDiv", cities[i])
      if (office.size > max) {
        max = office.size
        uneven = true
      } else if (office.size < max) {
        uneven = true
      }
      if (uneven) { target = max } else { target = max + 15 }
    }



    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("AgrarDiv", cities[i])
      var times = (target - office.size) / 15
      ns.corporation.upgradeOfficeSize("AgrarDiv", cities[i], target - office.size)
      for (let m = 0; m < times; m++) {
        var array = [4, 4, 2, 4, 1, 0]

        for (let j = 0; j < 6; j++) {
          for (let k = 0; k < array[j]; k++) {
            ns.corporation.hireEmployee("AgrarDiv", cities[i], Object.keys(office.employeeJobs)[j])
          }
        }
      }
    }
  }

  function CalcSizeOfMats(array) {
    var size = ns.corporation.getMaterialData("Hardware").size * array[0]
    size += ns.corporation.getMaterialData("Robots").size * array[1]
    size += ns.corporation.getMaterialData("AI Cores").size * array[2]
    size += ns.corporation.getMaterialData("Real Estate").size * array[3]
    ns.tprint(size)
    return size
  }


  function LevelToArray(arrayTarget) {
    var upgrades = ["Smart Factories", "Smart Storage", "DreamSense", "Wilson Analytics", "Nuoptimal Nootropic Injector Implants", "Speech Processor Implants",
      "Neural Accelerators", "FocusWires", "ABC SalesBots", "Project Insight"]
    var arrayAdd = []
    for (var i = 0; i < upgrades.length; i++) {
      arrayAdd.push(Math.max(arrayTarget[i] - ns.corporation.getUpgradeLevel(upgrades[i]), 0))
    }
    for (var i = 0; i < upgrades.length; i++) {
      for (var j = 0; j < arrayAdd[i]; j++) {
        ns.corporation.levelUpgrade(upgrades[i])
      }
    }
  }


  function UpgWarehouseTo(div, times) {
    for (var i = 0; i < cities.length; i++) {

      for (var j = 0; j < times - ns.corporation.getWarehouse(div, cities[i]).level; j++) {
        ns.corporation.upgradeWarehouse(div, cities[i])
      }
    }
  }


  async function WaitForMoney(money) {
    while (ns.corporation.getCorporation().funds < money) {
      ns.tprint("Waiting for money: ", Math.log10(ns.corporation.getCorporation().funds, " of ", Math.log10(money)))
      await ns.sleep(1000)
    }
    return
  }

  function HireMoreChem() {
    var target = 0
    var max = ns.corporation.getOffice("ChemDiv", cities[0]).size
    var uneven = false
    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("ChemDiv", cities[i])
      if (office.size > max) {
        max = office.size
        uneven = true
      } else if (office.size < max) {
        uneven = true
      }
      if (uneven) { target = max } else { target = max + 15 }
    }



    for (var i = 0; i < cities.length; i++) {
      var office = ns.corporation.getOffice("ChemDiv", cities[i])
      var times = (target - office.size) / 15
      ns.corporation.upgradeOfficeSize("ChemDiv", cities[i], target - office.size)
      for (let m = 0; m < times; m++) {
        var array = [4, 4, 2, 4, 1, 0]

        for (let j = 0; j < 6; j++) {
          for (let k = 0; k < array[j]; k++) {
            ns.corporation.hireEmployee("ChemDiv", cities[i], Object.keys(office.employeeJobs)[j])
          }
        }
      }
    }
  }
  function PurchaseMultsTo(multArray, division) {
    var office = ns.corporation.getOffice(division, cities[1])
    //ns.tprint(ns.corporation.getMaterial(division,"Aevum"))
    //ns.tprint(ns.corporation.getWarehouse(division,cities[1]))
    //ns.tprint(ns.corporation.getMaterialData("Hardware"))
    //ns.tprint(ns.corporation.getConstants().materialNames)
    var matNames = ["Water", "Ore", "Minerals", "Food", "Plants", "Metal", "Hardware", "Chemicals", "Drugs", "Robots", "AI Cores", "Real Estate"] //6 9 10 11
    for (var city of cities) {

      ns.corporation.bulkPurchase(division, city, matNames[6], Math.max(0, multArray[0] - ns.corporation.getMaterial(division, city, matNames[6]).stored))
      ns.corporation.bulkPurchase(division, city, matNames[9], Math.max(0, multArray[1] - ns.corporation.getMaterial(division, city, matNames[9]).stored))
      ns.corporation.bulkPurchase(division, city, matNames[10], Math.max(0, multArray[2] - ns.corporation.getMaterial(division, city, matNames[10]).stored))
      ns.corporation.bulkPurchase(division, city, matNames[11], Math.max(0, multArray[3] - ns.corporation.getMaterial(division, city, matNames[11]).stored))
      ns.tprint(city)
    }
  }

  function Export(division, targetDivs, material) {
    for (var city of cities) {
      for (var tDiv of targetDivs) {
        try {
          ns.corporation.cancelExportMaterial(division, city, tDiv, city, material)
        } catch { }

        ns.corporation.exportMaterial(division, city, tDiv, city, material, "IPROD*-1")

      }
    }
  }


  function Hire(array, division, except = []) {
    var sum = array.reduce((sum, i) => { return sum += i })

    for (var i = 0; i < cities.length; i++) {

      if (!(except.includes(cities[i]))) {
        var office = ns.corporation.getOffice(division, cities[i])
        var diff = sum - office.size
        if (diff > 0) {
          ns.corporation.upgradeOfficeSize(division, cities[i], diff)
        }
        for (let j = 0; j < 6; j++) {
          diff = array[j] - Object.values(office.employeeJobs)[j]
          ns.tprint(diff)
          if (diff > 0) {
            for (let k = 0; k < diff; k++) {

              ns.corporation.hireEmployee(division, cities[i], Object.keys(office.employeeJobs)[j])
            }
          }
        }
      }
    }
  }


}
