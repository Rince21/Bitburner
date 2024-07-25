import * as utils from "myutils.js";
/** @param {NS} ns */


export async function main(ns) {



  const jobTime = 500
  const weakenScript = "myWeakenPirate.js"
  const growScript = "myGrowPirate.js"
  const hackScript = "myHackPirate.js"

  const weakenSecurity = 0.05
  const growSecurity = 0.004
  const hackSecurity = 0.002
  //2 weaken
  //25 grow
  //50 hack




  async function shotgun(target, weakenScript, growScript, hackScript) {

    const weakenSecurity = 0.05
    const growSecurity = 0.004
    const hackSecurity = 0.002
    const port = 1
    ns.clearPort(port)
    let gotMoney = 0
    let maxRam = 8
    try { maxRam = ns.getServerMaxRam("pserv-0") / 4 } catch { }
    if (maxRam <= 8) {
      maxRam = 8
    }
    ns.tprint("maxRam: ", maxRam)
    let totalWeakenThreads = Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) / weakenSecurity)

    let ratio = ns.getServerMaxMoney(target) / ns.getServerMoneyAvailable(target)
    let totalGrowThreads = Math.ceil(ns.growthAnalyze(target, ratio, 1))


    let maxThreads = Math.floor(maxRam / ns.getScriptRam(weakenScript))

    const player = ns.getPlayer()
    const ptarget = ns.getServer(target)
    ptarget.hackDifficulty = ptarget.minDifficulty

    let batchThreads = 4
    let hackThreads = 1
    let weakenHackThreads = 1
    let actualStolen = 0
    let growThreads2 = 1
    let weakenGrowThreads = 1

    function calcThreads2(h,ptarget) {
      if (h==0) {
        hackThreads = Math.floor(0.9 / ns.formulas.hacking.hackPercent(ptarget, ns.getPlayer()))
      }
      else {hackThreads = Math.ceil(h/2)}
      weakenHackThreads = Math.ceil(hackThreads / weakenSecurity * hackSecurity)
      actualStolen = hackThreads * ns.formulas.hacking.hackPercent(ptarget, ns.getPlayer())
      ptarget.moneyAvailable = ptarget.moneyMax * (1 - actualStolen)
      growThreads2 = Math.ceil(ns.formulas.hacking.growThreads(ptarget, player, ptarget.moneyMax))
      weakenGrowThreads = Math.ceil(growThreads2 * growSecurity / weakenSecurity)
      batchThreads = hackThreads + weakenHackThreads + growThreads2 + weakenGrowThreads
      if (batchThreads < maxThreads) {
        //ns.tprint("maxram reached ", h, " ",wh," ",g, " ",wg)
        return [hackThreads,weakenHackThreads,growThreads2,weakenGrowThreads]
      }
      else {return calcThreads2(hackThreads,ptarget)}
    }


    function calcThreads(h, wh, g, wg, ptarget) {
      hackThreads = h * 2
      weakenHackThreads = Math.ceil(hackThreads / weakenSecurity * hackSecurity)
      actualStolen = hackThreads * ns.formulas.hacking.hackPercent(ptarget, ns.getPlayer())
      if (actualStolen > 0.5) {
        ns.tprint("actual stolen reached ", h, " ",wh," ",g, " ",wg)
        return [h, wh, g, wg]
      }
      ptarget.moneyAvailable = ptarget.moneyMax * (1 - actualStolen)
      growThreads2 = Math.ceil(ns.formulas.hacking.growThreads(ptarget, player, ptarget.moneyMax))
      weakenGrowThreads = Math.ceil(growThreads2 * growSecurity / weakenSecurity)
      batchThreads = hackThreads + weakenHackThreads + growThreads2 + weakenGrowThreads
      if (batchThreads > maxThreads) {
        ns.tprint("maxram reached ", h, " ",wh," ",g, " ",wg)
        return [h, wh, g, wg]
      }
      return calcThreads(hackThreads, weakenHackThreads, growThreads2, weakenGrowThreads, ptarget)
    }


    if (maxRam == 8) {
      hackThreads = 1
      weakenHackThreads = 0
      growThreads2 = 2
      weakenGrowThreads = 1
    } else {
      //let threads = calcThreads2(0, ptarget)
      let threads = calcThreads(1,1,1,1,ptarget)
      hackThreads = threads[0]
      weakenHackThreads = threads[1]
      growThreads2 = threads[2]
      weakenGrowThreads = threads[3]
    }

    ns.tprint(maxRam)
    ns.print("prepthreads: ", totalWeakenThreads, " ", totalGrowThreads)
    ns.print("hwgw threads: ", hackThreads, " ", weakenHackThreads, " ", growThreads2, " ", weakenGrowThreads)
    ns.tprint("est. time: ", ns.getWeakenTime(target))


    let ramForBatch = ns.getScriptRam(weakenScript) * (weakenHackThreads + weakenGrowThreads) + ns.getScriptRam(growScript) * growThreads2 + ns.getScriptRam(hackScript) * hackThreads

    let servers = utils.getWorkingServers(ns)



    for (let j = 0; j < servers.length; j++) {

      let s = servers.length - 1 - j
      ns.scp(weakenScript, servers[s])
      ns.scp(growScript, servers[s])
      ns.scp(hackScript, servers[s])

      if (totalWeakenThreads > 0) {
        let weakenThreads = Math.floor(ns.getServerMaxRam(servers[s]) / ns.getScriptRam(weakenScript))
        if (weakenThreads > 0) {
          ns.exec(weakenScript, servers[s], weakenThreads, target, 0)
          totalWeakenThreads -= weakenThreads

        }
      }
      else if (totalGrowThreads > 0) {
        let growThreads3 = Math.max(Math.floor(ns.getServerMaxRam(servers[s]) / ns.getScriptRam(growScript) / 27 * 25) - 1, 1)
        let weakenThreads = Math.floor(ns.getServerMaxRam(servers[s]) / ns.getScriptRam(weakenScript) / 27 * 2) + 1

        if (growThreads3 > 0) {
          ns.exec(growScript, servers[s], growThreads3, target, ns.getWeakenTime(target) - ns.getGrowTime(target) + jobTime)
          totalGrowThreads -= growThreads3

        }
        if (weakenThreads > 0) {
          ns.exec(weakenScript, servers[s], weakenThreads, target, jobTime)

        }
      }
      else {

        let batches = Math.floor(ns.getServerMaxRam(servers[s]) / ramForBatch)
        //let batches = 0
        if (batches > 0) {
          //ns.tprint("batches on: ", servers[s], " ", batches)

          for (let i = 0; i < batches; i++) {
            ns.exec(hackScript, servers[s], hackThreads, target, ns.getWeakenTime(target) - ns.getHackTime(target) + 2 * jobTime)
            if (weakenHackThreads>0) {ns.exec(weakenScript, servers[s], weakenHackThreads, target, 2 * jobTime)}
            
            ns.exec(growScript, servers[s], growThreads2, target, ns.getWeakenTime(target) - ns.getGrowTime(target) + 2 * jobTime)
            ns.exec(weakenScript, servers[s], weakenGrowThreads, target, 2 * jobTime)
          }
          gotMoney = 1
        }
      }
    }


    let allDone = false
    while (!allDone) {
      allDone = true
      for (let serv of servers) {
        if (ns.ps(serv).length > 0) {
          allDone = false
        }
      }
      await ns.sleep(100)
    }
    //message = ""
    //while (message != "last") {
    //  await ns.nextPortWrite(port)
    //  message = ns.readPort(port).message
    //  ns.print(message)
    //}
    await ns.sleep(jobTime)
    //ns.print("port: ", ns.readPort(port))
    ns.print("batch done: ", ns.getServerMaxMoney(target), " ", ns.getServerMoneyAvailable(target))
    return gotMoney
  }

  function findSingleTarget() {

    
    return utils.getTargetServers(ns)[0].name

  }



  let target = findSingleTarget()

  let moneyCounter = 5
  //
  while (true) {


    if (ns.args.length > 0) {
      target = ns.args[0]
    } else if (moneyCounter >= 5) {
      target = findSingleTarget()
      moneyCounter = 0
    }
    let cash = ns.getPlayer().money
    moneyCounter += await shotgun(target, weakenScript, growScript, hackScript)
    ns.tprint("Made ", (ns.getPlayer().money - cash) / 1000000000, "b")
    ns.tprint("Per second: ", (ns.getPlayer().money - cash) / 1000000000 * 1000 / ns.getWeakenTime(target))
    ns.tprint("Per Server per hour: ", (ns.getPlayer().money - cash) / 1000000000 * 1000 / ns.getWeakenTime(target) / 25 * 3600)
  }


}



