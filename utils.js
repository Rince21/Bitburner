/** @param {NS} ns */
export async function main(ns) {

  //ns.tprint(getNodes())
  //ns.tprint(getPaths())
  //ns.tprint(crackServers())
  //ns.tprint(getRootedServers())
  //ns.tprint(getWorkingServers())
  //ns.tprint(getHackableServers())
ns.tprint(getTargetServers())

  function getNodes() {
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

  function getPaths() {
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

  function crackServers(servers) {
    //let cracks = ["bruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
    let numOfCracks = 0
    for (let crack of cracks) {
      if (ns.ls("home", crack)) {
        numOfCracks += 1

      }
      for (let server of getNodes()) {
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

  function getRootedServers() {
    return servers.filter((server)=>ns.hasRootAccess(server))
  }


  function getWorkingServers(){
    return getRootedServers().filter((server)=>server!="home"&& !server.startsWith("hacknet"))
  }

  function getHackableServers() {
    let servers = getNodes()
    servers = servers.filter((server)=>ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server))
    servers = servers.filter((server)=>server != "home" && !server.startsWith("hacknet") && !server.startsWith("pserv"))
    servers = servers.filter((server)=>ns.getServerMaxMoney(server)>0)
    return servers
  }

  function getTargetServers () {
    let servers = getHackableServers()
    servers = servers.filter((server)=>ns.getHackingLevel()>=ns.getServerRequiredHackingLevel(server)*2)
    servers = servers.map((server)=>[server,ns.getServerRequiredHackingLevel(server)])
    servers.sort((a,b)=>b[1]-a[1])
    return servers
  }

}
