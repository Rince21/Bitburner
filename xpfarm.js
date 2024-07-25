/** @param {NS} ns */
export async function main(ns) {
  var script = "infweaken.js";
var ramneeded = ns.getScriptRam(script);
var ramOnHomeFree = ns.getServerMaxRam("home")-ns.getServerUsedRam("home");
var possibleThreads = Math.floor(ramOnHomeFree/ramneeded);
let target = "joesguns"
if (ns.args.length >0) {
  target = ns.args[0]
}
  ns.exec(script,"home",Math.floor(possibleThreads/9*8),target)
}
