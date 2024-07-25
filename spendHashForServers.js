import * as utils from "myutils.js";
/** @param {NS} ns */
export async function main(ns) {

function findSingleTarget() {

    let hackables = utils.getHackableServers(ns)

    let list = [];
    for (let i = 0; i < hackables.length; i++) {
      if (ns.getPlayer().skills.hacking > ns.getServerRequiredHackingLevel(hackables[i]) * 2) {
        list.push({
          name: hackables[i], value: ns.getServerMaxMoney(hackables[i]), sec: ns.getServerMinSecurityLevel(hackables[i]),
          ratio: (ns.getServerMaxMoney(hackables[i]) / ns.getServerMinSecurityLevel(hackables[i])), hack: ns.getServerRequiredHackingLevel(hackables[i])
        });
      }
    }
    list.sort((a, b) => b.ratio - a.ratio)

    hackables = list

    return hackables[0].name
  }

while (true) {
  let server = findSingleTarget()
  if (ns.args.length > 0) {
    server = ns.args[0]
  }
  
    await ns.sleep(1000)
    if (ns.hacknet.hashCost("Increase Maximum Money") < ns.hacknet.hashCost("Reduce Minimum Security")) {
       if (ns.hacknet.numHashes() > ns.hacknet.hashCost("Increase Maximum Money")) {
        ns.hacknet.spendHashes("Increase Maximum Money",server)
        //ns.tprint("increasing money on ",server)
      }
    }
    else {
      if (ns.hacknet.numHashes() > ns.hacknet.hashCost("Reduce Minimum Security")) {
        ns.hacknet.spendHashes("Reduce Minimum Security",server)
        //ns.tprint("reducing sec on ",server)
      }
    }
    }
  }
