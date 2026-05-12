/** @param {NS} ns */
import { getWorkingServers, getTargetServers } from "utils.js"
export async function main(ns) {
  let target = getTargetServers(ns)[0][0]
  if (ns.args[0]) {
    target = ns.args[0]
  }
  let servers = getWorkingServers(ns)

  let numThreads = 0
  for (let server of servers) {
    numThreads += Math.floor(ns.getServerMaxRam(server) / 1.75)
  }

  let hackTime = ns.getHackTime(target)
  let growTime = ns.getGrowTime(target)
  let weakenTime = ns.getWeakenTime(target)

  let takt = 50
  let perc = 0.5


  while (ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target) > 0) {

    ns.tprint("Weakening ", target, " ", ns.getServerMinSecurityLevel(target), " ", ns.getServerSecurityLevel(target))

    for (let server of servers) {
      let remainder = Math.floor(ns.getServerMaxRam(server) / 1.75)
      if (remainder == 0) { continue }
      ns.exec("weaken.js", server, remainder, target, 0, 1)
    }
    await ns.sleep(ns.getWeakenTime(target) + 50)
  }


  while (ns.getServerMoneyAvailable(target) - ns.getServerMaxMoney(target) < 0) {

    let numGrow = numThreads
    let numWeaken = Math.ceil(ns.growthAnalyzeSecurity(numGrow, target))
    numGrow = numThreads - numWeaken


    let growTime = ns.getGrowTime(target)
    let weakenTime = ns.getWeakenTime(target)
    //ns.tprint(numGrow, " ", numWeaken, " ", growTime, " ", weakenTime)
    let maxTime = Math.max(growTime, weakenTime) + 150
    let growDelay = maxTime - growTime - 100
    let weakenDelay = maxTime - weakenTime - 50

    ns.tprint("Growing ", target, " ", ns.getServerMaxMoney(target), " ", ns.getServerMoneyAvailable(target))
    ns.tprint("Grow: ", numGrow, " Weaken: ", numWeaken, " Time: ", Math.floor(maxTime / 1000))


    for (let server of servers) {
      let remainder = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 1.75)
      if (numGrow > 0 && remainder > 0) {
        let threads = Math.min(numGrow, remainder)
        ns.exec("grow.js", server, threads, target, growDelay, 1)
        numGrow -= threads
        remainder -= threads
      }
      if (numWeaken > 0 && remainder > 0) {
        let threads = Math.min(numWeaken, remainder)
        ns.exec("weaken.js", server, threads, target, weakenDelay, 1)
        numWeaken -= threads
        remainder -= threads
      }
    }
    await ns.sleep(maxTime)
  }

//takt an ram kapazität anpassen
// script für andere server berechnen


  //ns.tprint(hackTime, " ", growTime, " ", weakenTime)

  let batchHack = Math.floor(perc / ns.hackAnalyze(target))
  let batchWeaken1 = Math.ceil(ns.hackAnalyzeSecurity(batchHack, target) / 0.05) + 2
  let batchGrow = Math.ceil(ns.growthAnalyze(target, 1 / (1 - ns.hackAnalyze(target) * batchHack))) + 2
  let batchWeaken2 = Math.ceil(ns.growthAnalyzeSecurity(batchGrow, target) / 0.05) + 2
  let batchThreads = batchHack + batchWeaken1 + batchGrow + batchWeaken2
  let batches = Math.floor(numThreads / batchThreads)

  hackTime = ns.getHackTime(target)
  growTime = ns.getGrowTime(target)
  let weaken1Time = ns.getWeakenTime(target)
  let weaken2Time = ns.getWeakenTime(target)

  let hackDelay = Math.round(Math.ceil(hackTime / takt/4) *4* takt - hackTime)
  let weaken1Delay = Math.round(Math.ceil(weakenTime / takt/4)*4 * takt - weakenTime)
  let growDelay = Math.round(Math.ceil(growTime / takt/4) *4* takt  - growTime)
  let weaken2Delay = Math.round(Math.ceil(weakenTime / takt/4)*4 * takt - weakenTime)
  ns.tprint("HackTime: ", hackTime, " Weaken1Time: ", weaken1Time, " GrowTime: ", growTime," Weaken2Time: ", weaken2Time)

 
  hackTime =Math.round(hackTime+hackDelay)
  weaken1Time =Math.round(weaken1Time+weaken1Delay)
  growTime = Math.round(growTime+ growDelay)
  weaken2Time = Math.round(weaken2Time+weaken2Delay)
 
  ns.tprint("Batches: ", batches, " Hack: ", batchHack, " Weaken: ", batchWeaken1, " Grow: ", batchGrow, " Weaken: ", batchWeaken2)
  ns.tprint("HackTime: ", hackTime, " Weaken1Time: ", weaken1Time, " GrowTime: ", growTime," Weaken2Time: ", weaken2Time)
  ns.tprint("Delays H: ", hackDelay, " G: ", growDelay, " W1: ", weaken1Delay, " W2: ", weaken2Delay)
  let processes = batchHack * hackTime / takt + batchWeaken1 * weakenTime / takt + batchGrow * growTime / takt + batchWeaken2 * weakenTime / takt
  ns.tprint(processes, " ", numThreads)

  let hackWait = Math.round((weakenTime - hackTime) / takt) +3
  let growWait = Math.round((weakenTime - growTime) / takt) +3

  let step = 0

  while (true) { //HWGW

    if (step % 4 == 0 && step >= hackWait) {
      let c = batchHack
      for (let server of servers) {
        let remainder = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 1.75)
        if (c > 0 && remainder > 0) {
          let threads = Math.min(c, remainder)
          ns.exec("hack.js", server, threads, target, hackDelay, "hack")
          c -= threads
        }
      }
    }


    if (step % 4 == 1) {
      let c = batchWeaken1
      for (let server of servers) {
        let remainder = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 1.75)
        if (c > 0 && remainder > 0) {
          let threads = Math.min(c, remainder)
          ns.exec("weaken.js", server, threads, target, weaken1Delay, "weaken1")
          c -= threads
        }
      }
    }


    if (step % 4 == 2 && step >= growWait) {
      let c = batchGrow
      for (let server of servers) {
        let remainder = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 1.75)
        if (c > 0 && remainder > 0) {
          let threads = Math.min(c, remainder)
          ns.exec("grow.js", server, threads, target, growDelay, "grow")
          c -= threads
        }
      }
    }


    if (step % 4 == 3) {
      let c = batchWeaken2
      for (let server of servers) {
        let remainder = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 1.75)
        if (c > 0 && remainder > 0) {
          let threads = Math.min(c, remainder)
          ns.exec("weaken.js", server, threads, target, weaken2Delay, "weaken2")
          c -= threads
        }
      }
    }

    step++
    await ns.sleep(takt/2)
    //ns.tprint("next: ",step%4)
    if (step%4 == 0) {
      //calc hackDelay
      hackTime = ns.getHackTime(target)
      hackDelay = Math.round(Math.ceil(hackTime / takt/4) *4* takt - hackTime)
    }
    if (step%4 == 1) {
      //calc weaken1Delay
      weaken1Time = ns.getWeakenTime(target)
      weaken1Delay = Math.round(Math.ceil(weakenTime / takt/4)*4 * takt - weakenTime)
    }
    if (step%4 == 2) {
      //calc growDelay
      growTime = ns.getGrowTime(target)
      growDelay = Math.round(Math.ceil(growTime / takt/4) *4* takt  - growTime)
    }
    if (step%4 == 3) {
      //calc weaken2Delay
      weaken2Time = ns.getWeakenTime(target)
      weaken2Delay = Math.round(Math.ceil(weakenTime / takt/4)*4 * takt - weakenTime)
    }
    await ns.sleep(takt/2)
  }
}

/*


  */
