/** @param {NS} ns */
export async function main(ns) {

  var maxTime = ns.args[0];
  var cacheTime =ns.args[1];
  var stats;

  function getHashGainRate(level, ram, cores) {
    return ns.formulas.hacknetServers.hashGainRate(level, 0, ram, cores, ns.getHacknetMultipliers().production)
  }

  //ns.tprint(getMoneyGainRate(127,32,4));

  function newLevelGainRate(level, ram, cores) {
    return getHashGainRate(level + 1, ram, cores) - getHashGainRate(level, ram, cores);
  }
  function newRamGainRate(level, ram, cores) {
    return getHashGainRate(level, 2 * ram, cores) - getHashGainRate(level, ram, cores);
  }
  function newCoreGainRate(level, ram, cores) {
    return getHashGainRate(level, ram, cores + 1) - getHashGainRate(level, ram, cores);
  }

  function hoursToRepayLevel(node) {
    return ns.hacknet.getLevelUpgradeCost(node) / newLevelGainRate(ns.hacknet.getNodeStats(node).level, ns.hacknet.getNodeStats(node).ram, ns.hacknet.getNodeStats(node).cores) / 250000 / 3600;
  }
  function hoursToRepayRam(node) {
    return ns.hacknet.getRamUpgradeCost(node) / newRamGainRate(ns.hacknet.getNodeStats(node).level, ns.hacknet.getNodeStats(node).ram, ns.hacknet.getNodeStats(node).cores) / 250000 / 3600;

  }

  function hoursToRepayCore(node) {
    return ns.hacknet.getCoreUpgradeCost(node) / newCoreGainRate(ns.hacknet.getNodeStats(node).level, ns.hacknet.getNodeStats(node).ram, ns.hacknet.getNodeStats(node).cores) / 250000 / 3600;

  }

  async function purchaseLevel(node) {
    while (ns.getServerMoneyAvailable("home") < ns.hacknet.getLevelUpgradeCost(node)) {
      await ns.sleep(1000);
      //ns.tprint("waiting for money...")
    }
    ns.hacknet.upgradeLevel(node);
  }

  async function purchaseRam(node) {
    while (ns.getServerMoneyAvailable("home") < ns.hacknet.getRamUpgradeCost(node)) {
      await ns.sleep(1000);
      //ns.tprint("waiting for money...")
    }
    ns.hacknet.upgradeRam(node);
  }

  async function purchaseCore(node) {
    while (ns.getServerMoneyAvailable("home") < ns.hacknet.getCoreUpgradeCost(node)) {
      await ns.sleep(1000);
      //ns.tprint("waiting for money...")
    }
    ns.hacknet.upgradeCore(node);
  }


  async function optimizeNode(maxTime, node) {
    var foundOne = true;
    var levelTime;
    var ramTime;
    var coresTime;
    var minTime;
    var next;
    while (foundOne == true) {
      foundOne = false
      var stats = ns.hacknet.getNodeStats(node)
      ns.tprint(stats);
      levelTime = hoursToRepayLevel(node, stats.level, stats.ram, stats.cores);
      ramTime = hoursToRepayRam(node, stats.level, stats.ram, stats.cores);
      coresTime = hoursToRepayCore(node, stats.level, stats.ram, stats.cores);
      ns.tprint("leveltime: ", levelTime, " ramtime: ", ramTime, " coretime: ", coresTime);
      minTime = maxTime * 2;
      next = "none";

      if (levelTime < minTime) {
        minTime = levelTime;
        next = "level";
        foundOne = true;
      }
      if (ramTime < minTime) {
        minTime = ramTime;
        next = "ram";
        foundOne = true;
      }
      if (coresTime < minTime) {
        minTime = coresTime;
        next = "core"
        foundOne = true;
      }
      if (minTime > maxTime) {
        foundOne = false;
        next = "none";
      }
      ns.tprint("buying ", next, " on ", node)
      if (next == "level") {
        await purchaseLevel(node);
      } else if (next == "ram") {
        await purchaseRam(node);
      } else if (next == "core") {
        await purchaseCore(node);
      }
      //await ns.sleep(100);
    }
  }

  async function buyNodes(maxTime) {
    //mal zwei wegen ca. Dreieck; mehr cash durch rückzahlung mittlerer Level, ungefähr die Hälfte
    ns.tprint("checking for value in new Node: ", ns.hacknet.getNodeStats(1).production / 250000 / 3600, " ", ns.hacknet.getPurchaseNodeCost(), " ", ns.hacknet.getPurchaseNodeCost() * 2 / ns.hacknet.getNodeStats(0).production * 250000 / 3600)
    while (ns.hacknet.getPurchaseNodeCost() * 2 / ns.hacknet.getNodeStats(1).production / 250000 / 3600 < maxTime) {
      while (ns.getServerMoneyAvailable("home") < ns.hacknet.getPurchaseNodeCost()) {
        ns.print("waiting for money...");
        await ns.sleep(1000);
      }
      ns.print("buying node ", ns.hacknet.numNodes() + 1);
      ns.hacknet.purchaseNode();
      await optimizeNode(maxTime, ns.hacknet.numNodes() - 1);
      await ns.sleep(100);
    }
  }

  async function PurchaseCache(target, node) {
    while (ns.hacknet.getNodeStats(node).cache < target) {
      while (ns.getServerMoneyAvailable("home") < ns.hacknet.getCacheUpgradeCost(node)) {
        //ns.tprint("waiting for money...");
        await ns.sleep(1000);
      }
      ns.hacknet.upgradeCache(node)
      await ns.sleep(100)
    }
  }

  async function _Main() {

    if (ns.hacknet.numNodes() == 0) {
      while (ns.getServerMoneyAvailable("home") < ns.hacknet.getPurchaseNodeCost()) {
       // ns.tprint("waiting for money...");
        await ns.sleep(1000);
      }
      ns.print("buying node ", ns.hacknet.numNodes() + 1);
      ns.hacknet.purchaseNode();
      while (ns.getServerMoneyAvailable("home") < ns.hacknet.getPurchaseNodeCost()) {
       // ns.tprint("waiting for money...");
        await ns.sleep(1000);
      }
      ns.print("buying node ", ns.hacknet.numNodes() + 1);
      ns.hacknet.purchaseNode();
      await optimizeNode(maxTime, ns.hacknet.numNodes() - 1);
    }

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      await optimizeNode(maxTime, i);
    }

    await buyNodes(maxTime);
    await _UpgradeCache()
  }
  //var node0 = ns.hacknet.getNodeStats(0)
  //ns.tprint(node0)
  //ns.tprint(getHashGainRate(node0.level,node0.ram,node0.cores))
  

  async function _UpgradeCache() {

    while (ns.hacknet.getNodeStats(0).hashCapacity / ns.hacknet.getNodeStats(0).production / 3600 < cacheTime) {
      for (var i = 0; i < ns.hacknet.numNodes(); i++) {
        while (ns.getServerMoneyAvailable("home") < ns.hacknet.getCacheUpgradeCost(i)) {
          //ns.tprint("waiting for money...");
          await ns.sleep(1000);
        }
        ns.hacknet.upgradeCache(i)
      }
      await ns.sleep(100)
    }
  }

 await _Main()
  //ns.tprint(ns.formulas.hacknetNodes.constants())
  //ns.tprint(newLevelGainRate(node0.level, node0.ram, node0.cores))
  //ns.tprint(hoursToRepayLevel(0))
  //ns.tprint(hoursToRepayRam(0))
  //ns.tprint(hoursToRepayCore(0))

  //await optimizeNode(maxTime,0)
  //ns.tprint(newRamGainRate(currStats[0], currStats[1], currStats[2]))
  //ns.tprint(newCoreGainRate(currStats[0], currStats[1], currStats[2]))
  //ns.tprint(ns.getPlayer().mults.hacknet_node_money)

  //ns.tprint(getMoneyGainRate(currStats[0],currStats[1],currStats[2]))
  //ns.tprint(ns.formulas.hacknetServers.hashGainRate(6,0,16,2,ns.getHacknetMultipliers().production))
}
