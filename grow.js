/** @param {NS} ns */
export async function main(ns) {
	await ns.grow(ns.args[0], {additionalMsec:  ns.args[1],stock:true},);
  //ns.tprint("grown")
}
