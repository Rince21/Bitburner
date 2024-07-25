/** @param {NS} ns */
export async function main(ns) {

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
      // ns.tprint(city)
    }
  }


  function CalcSizeOfMats(array) {
    var size = ns.corporation.getMaterialData("Hardware").size * array[0]
    size += ns.corporation.getMaterialData("Robots").size * array[1]
    size += ns.corporation.getMaterialData("AI Cores").size * array[2]
    size += ns.corporation.getMaterialData("Real Estate").size * array[3]
    //ns.tprint(size)
    return size
  }

  var cities = ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima", "Volhaven"]
  while (ns.corporation.getCorporation().state != "PRODUCTION") {
    //things to be done multiple times per cycle
    await ns.sleep(50)
  }
  //var divs = ns.corporation.getCorporation().divisions
  let divs = ["to","ch","ag"]
  var storageUsed = [0, 0, 0]
  var storageMin = [0, 0, 0]
  for (var i = 0; i < divs.length; i++) {
    storageUsed[i] = ns.corporation.getWarehouse(divs[i], "Aevum").sizeUsed
  }
  while (ns.corporation.getCorporation().state != "EXPORT") {
    //things to be done multiple times per cycle
    await ns.sleep(50)
  }
  for (var i = 0; i < divs.length; i++) {
    var newUsed = ns.corporation.getWarehouse(divs[i], "Aevum").sizeUsed
    if (newUsed > storageUsed[i]) {
      storageUsed[i] = newUsed
    }
  }
  while (ns.corporation.getCorporation().state != "SALE") {
    //things to be done multiple times per cycle
    await ns.sleep(50)
  }
  var workingSpace = [0, 0, 0]
  for (var i = 0; i < divs.length; i++) {
    storageMin[i] = ns.corporation.getWarehouse(divs[i], "Aevum").sizeUsed
    workingSpace[i] = storageUsed[i] - storageMin[i]
  }


  for (var i = 0; i < divs.length; i++) {
    //ns.tprint("usedstorage",divs[i],storageUsed)
    var freestorage = ns.corporation.getWarehouse(divs[i], "Aevum").size - workingSpace[i]
    if (divs[i] == "to") {
      freestorage = freestorage * 0.3
    } else if (divs[i]=="ag") {
      freestorage = freestorage*0.15
    } else{
      freestorage = freestorage * 0.3}
    //ns.tprint("freestorage",divs[i],freestorage)

    var hwfac = ns.corporation.getIndustryData(ns.corporation.getDivision(divs[i]).type).hardwareFactor / ns.corporation.getMaterialData("Hardware").size
    var rbfac = ns.corporation.getIndustryData(ns.corporation.getDivision(divs[i]).type).robotFactor / ns.corporation.getMaterialData("Robots").size
    var aifac = ns.corporation.getIndustryData(ns.corporation.getDivision(divs[i]).type).aiCoreFactor / ns.corporation.getMaterialData("AI Cores").size
    var refac = ns.corporation.getIndustryData(ns.corporation.getDivision(divs[i]).type).realEstateFactor / ns.corporation.getMaterialData("Real Estate").size
    var sum = hwfac + rbfac + aifac + refac
    hwfac = hwfac / sum
    rbfac = rbfac / sum
    aifac = aifac / sum
    refac = refac / sum
    //ns.tprint(hwfac+rbfac+aifac+refac)
    var hwbuy = Math.floor(hwfac * freestorage / ns.corporation.getMaterialData("Hardware").size)
    var rbbuy = Math.floor(rbfac * freestorage / ns.corporation.getMaterialData("Robots").size)
    var aibuy = Math.floor(aifac * freestorage / ns.corporation.getMaterialData("AI Cores").size)
    var rebuy = Math.floor(refac * freestorage) / ns.corporation.getMaterialData("Real Estate").size
    var array = [hwbuy, rbbuy, aibuy, rebuy]
    //ns.tprint("suggested buy: ",divs[i],array)
    //ns.tprint("calcsize: ",divs[i],CalcSizeOfMats(array))
    //if (divs[i]=="TobacDiv"){
    PurchaseMultsTo(array, divs[i])
    //}
  }

}
