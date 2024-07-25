/** @param {NS} ns */
export async function main(ns) {
  let homeServ = "home";
  let pRam = 8; // purchased ram
  let servPrefix = "pserv-";

  let maxRam = ns.getPurchasedServerMaxRam();
  let maxServers = ns.getPurchasedServerLimit();

  if (ns.serverExists("pserv-0")) {
    pRam = ns.getServerMaxRam("pserv-0")
  }
  if (ns.serverExists("pserv-24")) {
    if(pRam == ns.getServerMaxRam("pserv-24")) {
      pRam *= 2
    }
    ns.tprint(pRam, " ",ns.getPurchasedServerUpgradeCost("pserv-24",pRam)/1000000000)
  }
  else {
    ns.tprint(pRam," ",ns.getPurchasedServerCost(pRam)/1000000000 )
  }
  

  for (let i = 0; i < maxServers; i++) {
    let serv = servPrefix + i.toString()
    
    if (ns.serverExists(serv)) {
      //ns.tprint("checking ",serv, " ",ns.getPurchasedServerUpgradeCost(serv,pRam))
      if (ns.getServerMaxRam(serv) < pRam) {
        if (ns.getPlayer().money > ns.getPurchasedServerUpgradeCost(serv,pRam)) {
       //   ns.tprint("trying upgrade ",serv,pRam)
          ns.upgradePurchasedServer(serv,pRam)
        } else { break }
      }
    } else {
      if (ns.getPlayer().money > ns.getPurchasedServerCost(pRam)) {
        ns.purchaseServer(serv,pRam)
      }
    }
  }

  for (let i = 0; i < maxServers; i++) {
    let serv = servPrefix + i.toString()
  if (ns.serverExists(serv)) {
    ns.tprint(serv, " ",ns.getServerMaxRam(serv))
  }
  }
}
