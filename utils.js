/** @param {NS} ns */
function getNodes(ns) {
  let nodes = ["home"]
  for (let node of nodes) {
    for (let neigh of ns.scan(node)) {
      if (!nodes.includes(neigh)) {
        nodes.push(neigh)
      }
    }
  }
  return nodes
}

function getPaths(ns) {
  let paths = { "home": [] }
  let nodes = ["home"]
  for (let node of nodes) {
    for (let neigh of ns.scan(node)) {
      if (!nodes.includes(neigh)) {
        let p = Array.from(paths[node])
        p.push(neigh)
        paths[neigh] = p
        nodes.push(neigh)
      }
    }
  }
  return paths
}

function crackServers(ns) {
  let cracks = ["bruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
  let numOfCracks = 0
  for (let crack of cracks) {
    if (ns.ls("home", crack)) {
      numOfCracks += 1
    }
    for (let server of getNodes(ns)) {
      try { ns.brutessh(server) } catch { }
      try { ns.ftpcrack(server) } catch { }
      try { ns.relaysmtp(server) } catch { }
      try { ns.httpworm(server) } catch { }
      try { ns.sqlinject(server) } catch { }
      try { ns.nuke(server) } catch { }
      try {
        ns.scp("weaken.js", server)
        ns.scp("hack.js", server)
        ns.scp("grow.js", server)
      } catch { }
    }
  }
  return (numOfCracks)
}

export function getRootedServers(ns) {
  crackServers(ns)
  return getNodes(ns).filter((server) => ns.hasRootAccess(server))
}


export function getWorkingServers(ns) {
  return getRootedServers(ns).filter((server) => server != "home" && !server.startsWith("hacknet"))
}

export function getHackableServers(ns) {
  crackServers(ns)
  let servers = getNodes(ns)
  servers = servers.filter((server) => ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server))
  servers = servers.filter((server) => server != "home" && !server.startsWith("hacknet") && !server.startsWith("pserv"))
  servers = servers.filter((server) => ns.getServerMaxMoney(server) > 0)
  return servers
}

export function getTargetServers(ns) {
  let servers = getHackableServers(ns)
  servers = servers.filter((server) => ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server) * 4)
  servers = servers.map((server) => [server, (100-ns.getServerMinSecurityLevel(server))*ns.getServerMaxMoney(server) *ns.getServerGrowth(server)/ns.getHackTime(server)])
  servers.sort((a, b) => b[1] - a[1])
  return servers
}

export function getServerData(ns) {
  let servers = getNodes(ns)
  servers = servers.map((server) => [server, ns.getServerNumPortsRequired(server)])
  servers.sort((a, b) => a[1] - b[1])
  
  for (let server of servers) {
  let cracks = ns.getServerNumPortsRequired(server[0])
  let ramm = ns.getServerMaxRam(server[0])
  let reqHack = ns.getServerRequiredHackingLevel(server[0])
  let maxMoney = ns.getServerMaxMoney(server[0]) /1000000
  let growth = ns.getServerGrowth(server[0])
  let minSec = ns.getServerMinSecurityLevel(server[0])
  let wtime = Math.floor(ns.getWeakenTime(server[0])/1000)  
  ns.tprint(server[0], " Ports: ",cracks, " Ram: ", ramm," HackLvl: ",reqHack, " MinSec: ",minSec, " MaxMoney: ", maxMoney/1000000, " Growth: ", growth, " Time: ",wtime)
  }
}

export async function main(ns) {

  //ns.tprint(getNodes())
  //ns.tprint(getPaths())
  //ns.tprint(crackServers())
  //ns.tprint(getRootedServers())
  //ns.tprint(getWorkingServers(ns))
  //ns.tprint(getHackableServers())
  ns.tprint(getTargetServers(ns))
//getServerData(ns)

}

export function getServers(ns) {

  var countPortHacks = 0

  var portHacks = []

  var localfiles = ns.ls()
  for (let i of localfiles) {
    if (i == "BruteSSH.exe") {
      countPortHacks++;
      portHacks.push("BruteSSH.exe")
    }
    if (i == "FTPCrack.exe") {
      countPortHacks++;
      portHacks.push("FTPCrack.exe")
    }
  }

  //ns.tprint("Porthacks: ", countPortHacks)

  var servers = [{ name: "home", nukable: false, hackable: false, minSec: 0, maxMoney: 0, scripts: 0, path: [], hacklevel: 0, growth: 0 }];
  for (var serv of servers) {
    for (var nserv of ns.scan(serv.name)) {
      //ns.tprint(nserv)
      if (servers.some(server => server.name === nserv) == false) {

        var hackable = false
        var nukable = false
        var hacklevel = ns.getServerRequiredHackingLevel(nserv)
        var minSec = ns.getServerMinSecurityLevel(nserv)
        var ports = ns.getServerNumPortsRequired(nserv)
        var maxMoney = ns.getServerMaxMoney(nserv)
        var scripts = Math.floor(ns.getServerMaxRam(nserv) / 1.75)
        let growth = ns.getServerGrowth(nserv)
        if (hacklevel <= ns.getPlayer().skills.hacking && ports <= countPortHacks) {
          hackable = true
        }
        if (ports <= countPortHacks) {
          nukable = true
        }

        let path = []
        for (let p of serv.path) {
          path.push(p)
        }
        path.push(serv.name)
        if (nserv.includes("pserv")) {
          hackable = true;
          nukable = true;
          hacklevel = 0;
          maxMoney = 0;
          growth = 0;
        }

        servers.push({ name: nserv, nukable: nukable, hackable: hackable, minSec: minSec, maxMoney: maxMoney, scripts: scripts, path: path, hacklevel: hacklevel, growth: growth })
      }
    }
  }

  var hackables = [];
  //ns.tprint("Hackables: ")
  for (var serv of servers) {
    if (serv.hackable) { hackables.push(serv.name) }
  }
  //ns.tprint(hackables)

  var usables = [];
  //ns.tprint("Usables: ")
  for (var serv of servers) {
    if (serv.nukable) { usables.push(serv.name) }
  }
  //ns.tprint(usables)

  for (serv of usables) {
    for (let pHack of portHacks) {
      if (pHack == "BruteSSH.exe") {
        ns.brutessh(serv)
      }
    }
    for (let pHack of portHacks) {
      if (pHack == "FTPCrack.exe") {
        ns.ftpcrack(serv)
      }
    }
    ns.nuke(serv)
    ns.scp("weaken.js", serv)
    ns.scp("hack.js", serv)
    ns.scp("grow.js", serv)
  }

  return servers;

};
