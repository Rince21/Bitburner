/** @param {NS} ns */
export async function main(ns) {
var stuff =  []
  for (var eq of ns.gang.getEquipmentNames()) {
    //ns.tprint(ns.gang.getEquipmentType(eq))
    if (ns.gang.getEquipmentType(eq) != "Rootkit" && ns.gang.getEquipmentType(eq) != "Augmentation") {
      // ns.tprint("got one")
      stuff.push({name:eq,price:ns.gang.getEquipmentCost(eq)})
    }
  }
  stuff.sort((a, b) => a.price - b.price)

//ns.tprint(stuff)
Equip()

  function Equip() {
  for (var eq of stuff) {
    for (var mem of ns.gang.getMemberNames()) {
      //ns.tprint(ns.getPlayer().money / 10 > eq.price)
        if (ns.getPlayer().money > eq.price) {
            ns.gang.purchaseEquipment(mem, eq.name)
        }
      }
    }
  }
}
