/** @param {NS} ns */
export async function main(ns) {

  var arg = ns.args


  var corps = ["Clarke Incorporated", "NWO", "OmniTek Incorporated", "Fulcrum Technologies", "ECorp", "MegaCorp", "KuaiGong International", "Bachman & Associates"]
  var cities = ["Aevum", "Volhaven", "Volhaven", "Chongqing", "Aevum", "Aevum", "Aevum", "Sector-12"]

  async function _main() {
    var numSleeves = ns.sleeve.getNumSleeves()
    if (arg.length > 0) {
      if (arg[0] == 2) {
        ns.tprint("Training Sleeves...")
        await gang()
      }
      else if (arg[0] == 3) {
        for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
          ns.sleeve.setToCommitCrime(i, "Homicide")
        }
        return
      }
      else if (arg[0] == 4) {
        for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
          ns.sleeve.setToShockRecovery(i)
        }
        return
      } else if (arg[0] == 5) {
        for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
          ns.sleeve.setToBladeburnerAction(i, "Training")
        }
        return
      }
      else if (arg[0] == 6) {
        for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
          let crimes = ["Mug", "Homicide", "Grand Theft Auto", "Kidnap", "Assassination", "Heist"]
          let max = 0
          let maxc = ""
          for (let c of crimes) {
            let pers = ns.formulas.mockPerson()
            pers.skills = ns.sleeve.getSleeve(i).skills
            let cstats = ns.singularity.getCrimeStats(c)
            let gain = ns.formulas.work.crimeSuccessChance(pers, c) * cstats.money / cstats.time
            if (gain > max) {
              max = gain
              maxc = c
            }
          }
          ns.sleeve.setToCommitCrime(i,maxc)
        }
        return
      }
    }

    for (var i = 0; i < numSleeves; i++) {

      if (ns.getPlayer().skills.hacking >= 225 && arg.length > 0) {
        ns.sleeve.travel(i, cities[i])
        ns.sleeve.setToCompanyWork(i, corps[i])
      } else {
        if (ns.getPlayer().money < 2000000) {
          if (ns.sleeve.getSleeve(i).city == "Sector-12") {
            ns.sleeve.setToUniversityCourse(i, "Rothman University", "Computer Science")
          }
          else {
            ns.sleeve.setToUniversityCourse(i, "ZB Institute of Technology", "Computer Science")

          }
        } else {
          ns.sleeve.travel(i, "Volhaven")
          ns.sleeve.setToUniversityCourse(i, "ZB Institute of Technology", "Algorithms")
        }
      }
    }
    //ns.exec("spendHash.js", "home", 1, "Improve Studying")
    //ns.sleeve.setToShockRecovery(0)
    //while (ns.sleeve.getSleeve(0).shock > 0) {
    // await ns.sleep(60000)
    //}
    //await hacks()
  }

  async function gang() {
    var thresh = []
    for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
      thresh.push(Math.min(ns.sleeve.getSleeve(i).skills.strength, ns.sleeve.getSleeve(i).skills.defense, ns.sleeve.getSleeve(i).skills.dexterity, ns.sleeve.getSleeve(i).skills.agility, ns.sleeve.getSleeve(i).skills.charisma) + 5)
    }
    var disciplines = ["Strength", "Defense", "Dexterity", "Agility"]
    while (true) {

      for (var i = 0; i < ns.sleeve.getNumSleeves(); i++) {
        if (ns.sleeve.getSleeve(i).shock > 95) {
          ns.sleeve.setToShockRecovery(i)
          continue
        }
        if (thresh[i] > 1000) {
          ns.sleeve.setToCommitCrime(i, "Homicide")
        } else {
          if (ns.sleeve.getSleeve(i).skills.strength < thresh[i]) {
            ns.sleeve.travel(i, "Sector-12")
            ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", disciplines[0])
          }
          else if (ns.sleeve.getSleeve(i).skills.defense < thresh[i]) {
            ns.sleeve.travel(i, "Sector-12")
            ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", disciplines[1])
          } else if (ns.sleeve.getSleeve(i).skills.dexterity < thresh[i]) {
            ns.sleeve.travel(i, "Sector-12")
            ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", disciplines[2])
          } else if (ns.sleeve.getSleeve(i).skills.agility < thresh[i]) {
            ns.sleeve.travel(i, "Sector-12")
            ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", disciplines[3])
          } else {
            thresh[i] += 10
          }
        }

      }
      await ns.sleep(10000)
    }
  }

  async function hacks() {
    ns.exec("spendHash.js", "home", 1, "Improve Studying")

    ns.sleeve.travel(0, "Volhaven")
    var thresh = ns.sleeve.getSleeve(0).skills.hacking + 10
    while (true) {
      ns.sleeve.setToUniversityCourse(0, "ZB Institute of Technology", "Algorithms")
      while (ns.sleeve.getSleeve(0).skills.hacking < thresh) {
        await ns.sleep(1000)
      }

      if (ns.sleeve.getSleeve(0).shock > 0) {
        ns.sleeve.setToShockRecovery(0)
        await ns.sleep(600000)
      }
      if (ns.sleeve.getSleeve(0).sync < 80) {
        ns.sleeve.setToSynchronize(0)
        await ns.sleep(600000)
      }
    }
  }

  await _main()
}
