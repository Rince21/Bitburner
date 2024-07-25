import * as utils from "utils.js";
/** @param {NS} ns */
export async function main(ns) {
// Kill All Method



  for (var serv of utils.getWorkingServers(ns)) {
    ns.killall(serv)
  }
}
