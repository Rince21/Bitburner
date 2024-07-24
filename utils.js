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
      }
    }
    return(numOfCracks)
  }

export  function getRootedServers(ns) {
    crackServers(ns)
    return getNodes(ns).filter((server)=>ns.hasRootAccess(server))
  }


export  function getWorkingServers(ns){
    return getRootedServers(ns).filter((server)=>server!="home"&& !server.startsWith("hacknet"))
  }

export  function getHackableServers(ns) {
    crackServers(ns)
    let servers = getNodes(ns)
    servers = servers.filter((server)=>ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server))
    servers = servers.filter((server)=>server != "home" && !server.startsWith("hacknet") && !server.startsWith("pserv"))
    servers = servers.filter((server)=>ns.getServerMaxMoney(server)>0)
    return servers
  }

export  function getTargetServers (ns) {
    let servers = getHackableServers(ns)
    servers = servers.filter((server)=>ns.getHackingLevel()>=ns.getServerRequiredHackingLevel(server)*2)
    servers = servers.map((server)=>[server,ns.getServerRequiredHackingLevel(server)])
    servers.sort((a,b)=>b[1]-a[1])
    return servers
  }

export async function main(ns) {

  //ns.tprint(getNodes())
  //ns.tprint(getPaths())
  //ns.tprint(crackServers())
  //ns.tprint(getRootedServers())
  ns.tprint(getWorkingServers(ns))
  //ns.tprint(getHackableServers())
//ns.tprint(getTargetServers())



}
