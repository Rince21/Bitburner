/** @param {NS} ns */
export async function main(ns) {
while (true) {
ns.exec("contracts.js","home")
await ns.sleep(60000)
}

}
