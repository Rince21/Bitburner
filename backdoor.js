import * as utils from "myutils.js";
/** @param {NS} ns */


export async function main(ns) {

  utils.getRootedServers(ns)
  var servers = [{ "name": "home", "scanned": false, "path": ["home"] }]
  var relevantServers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z",  "The-Cave", "w0r1d_d43m0n"] //"powerhouse-gym","fulcrumassets",
  var existUnscanned = true

  if (ns.args[0] == "c") {
    for (var serv of relevantServers) {
      try {ns.tprint(serv, ": ", ns.getServerRequiredHackingLevel(serv))} catch {}
    }
    return
  } else { await myscan() }

  async function myscan() {
    while (existUnscanned) {
      existUnscanned = false
      for (var j = 0; j < servers.length; j++) {
        // for (var serv of servers) {
        servers[j]
        if (!servers[j].scanned) {
          existUnscanned = true
          for (var newserv of ns.scan(servers[j].name)) {
            var serverNew = true
            for (var _serv of servers) {
              if (_serv.name == newserv) {
                serverNew = false
              }
            }
            if (serverNew) {
              var mypath = []
              for (var _serv of servers[j].path) {
                mypath.push(_serv)
              }
              //ns.tprint(servers[j].path)
              mypath.push(newserv)
              //ns.tprint(servers[j].path)
              servers.push({ "name": newserv, "scanned": false, "path": mypath })
            }

          }
          servers[j].scanned = true
        }
      }
      await ns.sleep(50)
    }
    //ns.tprint(servers.length)
    for (var serv of servers) {
      //ns.tprint("path ", serv.path)
    }
    for (var serv of servers) {
      for (var node of serv.path) {
        await ns.singularity.connect(node)

      }
      //ns.tprint(node,node in relevantServers)
      if (relevantServers.includes(node) && !ns.getServer(node).backdoorInstalled) {
        ns.tprint(node, ": ", ns.getServerRequiredHackingLevel(node))
        if (node != "w0r1d_d43m0n" || ns.args.length > 0) {
          try { await ns.singularity.installBackdoor() } catch { }
        }
      }
    }
    ns.singularity.connect("home")
  }
}
