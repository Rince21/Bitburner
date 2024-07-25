/** @param {NS} ns */
export async function main(ns) {

var corps =["NWO","OmniTek Incorporated","KuaiGong International","Clarke Incorporated","Fulcrum Technologies","ECorp","Bachman & Associates","MegaCorp","Blade Industries"]
var cities = ["Volhaven","Volhaven","Chongqing","Aevum","Aevum","Aevum","Aevum","Sector-12","Sector-12"]

for (var i = 0; i < corps.length;i++) {
if (ns.getPlayer().city != cities[i]) {
ns.singularity.travelToCity(cities[i])
}
ns.singularity.applyToCompany(corps[i],"IT")
}

}
