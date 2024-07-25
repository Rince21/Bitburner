/** @param {NS} ns */
export async function main(ns) {


  let factions = ["CyberSec", "Tian Di Hui", "Chongqing", "NiteSec", "The Black Hand", "BitRunners", "Daedalus","Clarke Incorporated", "NWO", "OmniTek Incorporated", "Fulcrum Secret Technologies", "ECorp", "MegaCorp", "KuaiGong International", "Bachman & Associates"]
  var corps = ["Clarke Incorporated", "NWO", "OmniTek Incorporated", "Fulcrum Technologies", "ECorp", "MegaCorp", "KuaiGong International", "Bachman & Associates"]
  var cities = ["Aevum", "Volhaven", "Volhaven", "Chongqing", "Aevum", "Aevum", "Aevum", "Sector-12"]

  

  let sleeveID = 0
  for (let i =0; i < ns.sleeve.getNumSleeves();i++) {
    ns.sleeve.travel(i,"Volhaven")
    ns.sleeve.setToUniversityCourse(i,"ZB Institute of Technology", "Algorithms")
  }


  for (let i = 0;i < factions.length; i++) {
    let fact = factions[i]
    let usefuls = []

    for (let aug of ns.singularity.getAugmentationsFromFaction(fact)) {
      var augStats = ns.singularity.getAugmentationStats(aug)
      //ns.tprint(ns.singularity.getAugmentationStats(aug))
      if (aug != "NeuroFlux Governor") {
        if (augStats.charisma > 1 || augStats.charisma_exp > 1 || augStats.company_rep > 1 || augStats.faction_rep > 1 || augStats.work_money > 1 || augStats.hacking > 1 || augStats.hacking_chance > 1 || augStats.hacking_exp > 1 || augStats.hacking_grow > 1 || augStats.hacking_money > 1 || augStats.hacking_speed > 1) {
          usefuls.push(aug)
        }

      }
      if (aug == "The Red Pill") {
        usefuls.push("The Red Pill")
      }
    }
    if (usefuls.length > 0) {
      for (let aug of usefuls) {
        if (aug in ns.singularity.getOwnedAugmentations()) {
          usefuls.pop(aug)
        }
      }
    }
    ns.tprint(fact, usefuls)
    if (usefuls.length > 0) {
      ns.tprint(ns.getPlayer().factions)
      ns.tprint(fact)
      ns.tprint(String(fact) in ns.getPlayer().factions)
      let factInFactions = false
      for (let lfact of ns.getPlayer().factions) {
        if (lfact ==fact) {
           factInFactions = true
        ns.tprint("set sleeve to work",fact)
        if (sleeveID < ns.sleeve.getNumSleeves()) {
          ns.sleeve.setToFactionWork(sleeveID, fact, "hacking")
          sleeveID++
        }
        }
      }
      
      if (!factInFactions) {
        let factInJobs = false
        let job = ""
      if (fact in ns.getPlayer().jobs) {
        factInJobs = true
        job = fact
      }
      if (fact = "Fulcrum Secret Technologies") {
        if ("Fulcrum Technologies" in ns.getPlayer().jobs) {
          factInJobs = true
          job = "Fulcrum Technologies"
        }
      }
      if (factInJobs) {
        if (sleeveID < ns.sleeve.getNumSleeves()) {
          ns.sleeve.setToCompanyWork(sleeveID,job)
          sleeveID++
        }
      }
      }
    }
    ns.tprint(fact, usefuls)
  }
}
