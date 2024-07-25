/** @param {NS} ns */
export async function main(ns) {
while (true) {
  ns.exec("pServers.js","home")
  if (ns.serverExists("pserv-24")) {
  if (ns.getPurchasedServerCost(ns.getServerMaxRam("pserv-24"))==Infinity) {
    break
  }
  }
  await ns.sleep(10000)
}
}
