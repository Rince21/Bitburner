/** @param {NS} ns */
export async function main(ns) {
  let contracts = ["Retirement", "Bounty Hunter", "Tracking"]
  let generals = ["Training", "Field Analysis", "Recruitment", "Diplomacy", "Hyperbolic Regeneration Chamber", "Incite Violence"]
  let blackops = ["Operation Typhoon", "Operation Zero", "Operation X", "Operation Titan", "Operation Ares", "Operation Archangel", "Operation Juggernaut", "Operation Red Dragon", "Operation K", "Operation Deckard", "Operation Tyrell", "Operation Wallace", "Operation Shoulder of Orion", "Operation Hyron", "Operation Morpheus", "Operation Ion Storm", "Operation Annihilus", "Operation Ultron", "Operation Centurion", "Operation Vindictus", "Operation Daedalus"]
  //let operations = ["Investigation", "Undercover Operation", "Sting Operation", "Raid", "Stealth Retirement Operation", "Assassination"]
  let operations = ["Assassination", "Stealth Retirement Operation", "Undercover Operation", "Investigation"]
  let actions = ["Assassination", "Undercover Operation", "Investigation", "Retirement", "Bounty Hunter", "Tracking", "Training"]

  if (ns.args.length > 0) {
    operations = []
    blackops = []
  }

  //ns.sleeve.setToBladeburnerAction(0, "Take on contracts", "Tracking")
  //ns.sleeve.setToBladeburnerAction(1, "Take on contracts", "Bounty Hunter")
  //ns.sleeve.setToBladeburnerAction(2, "Take on contracts", "Retirement")
  ns.sleeve.setToBladeburnerAction(0, "Training")
  ns.sleeve.setToBladeburnerAction(1, "Training")
  ns.sleeve.setToBladeburnerAction(2, "Training")
  ns.sleeve.setToBladeburnerAction(3, "Training")
  ns.sleeve.setToBladeburnerAction(4, "Diplomacy")
  ns.sleeve.setToBladeburnerAction(5, "Field Analysis")
  ns.sleeve.setToBladeburnerAction(6, "Hyperbolic Regeneration Chamber")
  ns.sleeve.setToBladeburnerAction(7, "Infiltrate Synthoids")








  while (true) {
    let doingSmth = false
    let currAction = ""
    let type = ""
    if (ns.bladeburner.getStamina()[0] > ns.bladeburner.getStamina()[1] / 2) {

      if (!doingSmth) {
        let action = ns.bladeburner.getNextBlackOp().name
        if (ns.bladeburner.getBlackOpRank(action) <= ns.bladeburner.getRank() && blackops.length > 0) {
          if (ns.bladeburner.getActionEstimatedSuccessChance("BlackOps", action)[0] > 0.6 || ((action == "Operation Centurion" || action == "Operation Vindictus" || action == "Operation Daedalus") &&ns.bladeburner.getActionEstimatedSuccessChance("BlackOps", action)[0] > 0.35)) {
            type = "BlackOps"
            ns.bladeburner.startAction(type, action)

            currAction = action
            doingSmth = true

          }
        }
      }

      for (let action of operations) {
        if (!doingSmth) {

          if (ns.bladeburner.getActionCountRemaining("Operations", action) >= 1) {
            if (ns.bladeburner.getActionEstimatedSuccessChance("Operations", action)[0] > 0.7) {
              type = "Operations"
              ns.bladeburner.startAction(type, action)

              currAction = action
              doingSmth = true
            }
          }
        }
      }
      for (let action of contracts) {
        if (!doingSmth) {
          if (ns.bladeburner.getActionCountRemaining("Contracts", action) >= 1) {
            if (ns.bladeburner.getActionEstimatedSuccessChance("Contracts", action)[0] > 0.7) {
              type = "Contracts"
              ns.bladeburner.startAction(type, action)

              currAction = action
              doingSmth = true
            }
          }
        }
      }
      if (!doingSmth) {
        type = "General"
        ns.bladeburner.startAction(type, "Training")

        currAction = "Training"
      }
    } else {
      type = "General"
      ns.bladeburner.startAction(type, "Hyperbolic Regeneration Chamber")
      currAction = "Hyperbolic Regeneration Chamber"

    }
    let sleeptime = ns.bladeburner.getActionTime(type, currAction)
    if (ns.bladeburner.getBonusTime() != 1000) {
      sleeptime /= 5
    }

    await ns.sleep(sleeptime + 1100)

    let skillist = ["Blade's Intuition", "Cloak", "Short-Circuit", "Digital Observer", "Overclock", "Reaper", "Evasive System", "Hyperdrive"]
    let effs = { "Blade's Intuition": 5, "Cloak": 2.5, "Short-Circuit": 5.5, "Digital Observer": 6, "Overclock": 6, "Reaper": 5, "Evasive System": 5, "Hyperdrive": 1 }
    //ns.tprint(ns.bladeburner.getSkillUpgradeCost())
    let boughtone = true
    while (boughtone) {
    await ns.sleep(50)
    let maxeffpercost = 0
    let bestSkill = ""
    for (let skill of skillist) {
      if (effs[skill] / ns.bladeburner.getSkillUpgradeCost(skill) > maxeffpercost) {
        maxeffpercost = effs[skill] / ns.bladeburner.getSkillUpgradeCost(skill)
        bestSkill = skill
      }
    }
    if (ns.bladeburner.getSkillPoints() >= ns.bladeburner.getSkillUpgradeCost(bestSkill)) {
      ns.bladeburner.upgradeSkill(bestSkill)
    }
    else {boughtone = false}
    }

    let cities = ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima", "Volhaven"]
    let bestCity = "Sector-12"
    let bestVal = 0
    for (let city of cities) {
      let val = ns.bladeburner.getCityEstimatedPopulation(city) / Math.sqrt(ns.bladeburner.getCityChaos(city))
      if (val > bestVal) {
        bestCity = city
        bestVal = val
      }
    }
    ns.bladeburner.switchCity(bestCity)


  }
}
