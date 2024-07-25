/** @param {NS} ns */
export async function main(ns) {
var numSleeves = ns.sleeve.getNumSleeves()

    for (var i =0; i< numSleeves;i++) {
    for (var aug of ns.sleeve.getSleevePurchasableAugs(i)){
      let augStats = ns.singularity.getAugmentationStats(aug.name)
      if (augStats.hacking > 1 || augStats.hacking_chance > 1 || augStats.hacking_exp > 1 || augStats.hacking_grow > 1 || augStats.hacking_money > 1 || augStats.hacking_speed > 1 ||augStats.charisma>1|| augStats.charisma_exp>1||augStats.company_rep>1||augStats.faction_rep>1||augStats.work_money>1) {
          if (ns.sleeve.getSleeveAugmentationPrice(aug.name) < ns.getPlayer().money) {
          ns.sleeve.purchaseSleeveAug(i,aug.name)
      }
      }
      //
    }

    }
}
