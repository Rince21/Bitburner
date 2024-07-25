/** @param {NS} ns */
export async function main(ns) {
  var augs = ["Bionic Arms","Bionic Legs","Bionic Spine","BrachiBlades","Nanofiber Weave","Synthetic Heart","Synfibril Muscle","Graphene Bone Lacings"]
  
  for (var aug of augs) {
    for (var mem of ns.gang.getMemberNames()){

  if (ns.getPlayer().money > ns.gang.getEquipmentCost(aug)) {
    try {ns.gang.purchaseEquipment(mem,aug)} catch {}
  }
}
}
}
