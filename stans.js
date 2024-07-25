/** @param {NS} ns */
export async function main(ns) {
while(true) {
for (let frag of ns.stanek.activeFragments()){
    if (frag.type !=18){
await ns.stanek.chargeFragment(frag.x,frag.y)
}
}
}
//ns.tprint(ns.stanek.activeFragments())
//ns.tprint(ns.stanek.fragmentDefinitions())
}
