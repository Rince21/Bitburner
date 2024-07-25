/** @param {NS} ns */

export async function main(ns) {
  let limit = 0.9
if (ns.args.length > 0) {
  limit = ns.args[0]
}

  ns.tprint(ns.getServerMaxRam("home"))
let threads = Math.floor((ns.getServerMaxRam("home")-ns.getServerUsedRam("home"))*limit/ns.getScriptRam("stans.js"))
ns.exec("stans.js","home",threads)
}
