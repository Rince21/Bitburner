/** @param {NS} ns */
export async function main(ns) {
var factions =  ns.getPlayer().factions
//var myfac = factions[0]
//var myfac = "Daedalus"
var myfac = ns.args[0]
while (ns.getPlayer().money > ns.singularity.getAugmentationPrice("NeuroFlux Governor") && ns.singularity.getAugmentationRepReq("NeuroFlux Governor")<ns.singularity.getFactionRep(myfac)) {
  ns.singularity.purchaseAugmentation(myfac,"NeuroFlux Governor")
}
}
