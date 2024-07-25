/** @param {NS} ns */
export async function main(ns) {

  //recruit neuen
  //ausstatten mit equip
  //ascend alle mit bonusx2
  //trainiere neue und ascended UND aus pool unter 3/4quartil bis schwellwert und minZeit; evtl ascend wenn x2, restart minzeit
  //trainiere bis gain/sec < 0.5% von hack
  //ab schwellwert kommen in pool zur arbeit; schwellwert gruppe; median? bester?

  //train/pool: die niedrigsten 20% trainieren incl. ascended
  //wer asc x2 erreicht asc
  let terwarfs = 0
  if (ns.args.length > 0) {
    terwarfs = ns.args[0]
  }

  var ascFac = 2
  var trainFac = 0.2 //abgerundet
  //var tasks = [{"name":"Plant Virus","minHack":1000,"name":"Cyberterrorism","minHack":3000}]
  var tasks = ["Unassigned", "Mug People", "Deal Drugs", "Strongarm Civilians", "Run a Con",
    "Armed Robbery", "Traffick Illegal Arms", "Threaten & Blackmail", "Human Trafficking",
    "Terrorism", "Vigilante Justice", "Train Combat", "Train Hacking", "Train Charisma", "Territory Warfare"]
  var taskEarly = "Mug People"
  var threshMid = 200
  var taskMid = "Strongarm Civilians"
  var taskTrain = "Train Combat"
  var threshTerror = 800
  var taskRespect = "Terrorism"
  var taskMoney = "Traffick Illegal Arms"
  var taskWanted = "Vigilante Justice"
  var names = ["m0", "m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11"]
  let toggle = true

  ns.print(ns.gang.getTaskNames())

  var battleEquip = []
  for (var eq of ns.gang.getEquipmentNames()) {
    //ns.print(ns.gang.getEquipmentType(eq))
    if (ns.gang.getEquipmentType(eq) == "Weapon") {
      // ns.print("got one")
      battleEquip.push(eq)
    }
    else if (ns.gang.getEquipmentType(eq) == "Armor") {
      // ns.print("got one")
      battleEquip.push(eq)
    } else if (ns.gang.getEquipmentType(eq) == "Vehicle") {
      // ns.print("got one")
      battleEquip.push(eq)
    }
  }

  //  EquipHack()
  let oldWanted = ns.gang.getGangInformation().wantedPenalty
  let vigis = 0



  while (true) {

    if (ns.gang.getGangInformation().wantedPenalty - oldWanted < 0) {
      vigis++
    } else if (ns.gang.getGangInformation().wantedLevel > 0.99) {
      if (vigis > 0) {
        vigis--
      }
    }
    ns.print("vigis: ", vigis)
    oldWanted = ns.gang.getGangInformation().wantedPenalty

    ns.print("can recruit: ", ns.gang.canRecruitMember())
    let name = ""
    if (ns.gang.canRecruitMember()) {
      for (var i = 0; i < names.length; i++) {
        if (!(ns.gang.getMemberNames().includes(names[i]))) {
          name = names[i]
          break
        }
      }
      ns.tprint("recruiting ", name)
      ns.gang.recruitMember(name)

      ns.exec("gangEquip.js","home")
    }


    if (ns.gang.getMemberNames().length == 12) {
      if (ns.gang.getGangInformation().territory < 1) {
        //taskRespect = "Territory Warfare"
        taskRespect = "Terrorism"

      }
      else {
        taskRespect = "Terrorism"
      }
    }
    //    if (ns.getPlayer().factions == 12) {
    //mytask = "Money Laundering"
    //  }

    for (var mem of ns.gang.getMemberNames()) {
      //ns.print(ns.gang.getAscensionResult(mem))
      var hac = undefined
      try { hac = (ns.gang.getAscensionResult(mem).str + ns.gang.getAscensionResult(mem).def + ns.gang.getAscensionResult(mem).dex + ns.gang.getAscensionResult(mem).agi) / 4 } catch { }
      if (hac != undefined) {
        if (hac > ascFac) {
          ns.gang.ascendMember(mem)
          ns.exec("gangEquip.js","home")
        }
      }
    }


    var mems = []
    for (var mem of ns.gang.getMemberNames()) {
      var skil = (ns.gang.getMemberInformation(mem).str + ns.gang.getMemberInformation(mem).def + ns.gang.getMemberInformation(mem).dex + ns.gang.getMemberInformation(mem).agi) / 4
      var dict = { "name": mem, "skill": skil, "resp": ns.gang.getMemberInformation(mem).earnedRespect }
      mems.push(dict)
    }
    mems.sort((a, b) => parseFloat(a.skill) - parseFloat(b.skill));
    ns.print(mems)



    for (let k = 0; k < 2; k++) { //sortiere nach skill
      if (mems[k].skill > threshTerror) {
        ns.print("setting ", mems[k].name, " to train terr ")
        ns.gang.setMemberTask(mems[k].name, "Terrorism")
      } else {
        ns.print("setting ", mems[k].name, " to train")
        ns.gang.setMemberTask(mems[k].name, taskTrain)
      }
      await ns.sleep(1200)
    }
    let pool = []
    for (let k = 2; k < mems.length; k++) {
      pool.push(mems[k])
    }
    mems = pool

    mems.sort((a, b) => parseFloat(b.resp) - parseFloat(a.resp)); //höchster respekt macht vigilante
    ns.print(mems)
    for (let k = 0; k < vigis; k++) {
      ns.print("setting ", mems[k].name, " to vigi")
      ns.gang.setMemberTask(mems[k].name, taskWanted)
      await ns.sleep(1200)
    }

    ns.print(mems[0].name)
    for (let k = Math.max(vigis, 0); k < terwarfs + vigis; k++) {//und dann warfare
      ns.print("warfaretest", k)
      ns.print(mems[k])
      ns.print("setting ", mems[k].name, " to warfare")
      if (ns.gang.getGangInformation().territory == 1) {
        ns.gang.setMemberTask(mems[k].name, "Traffick Illegal Arms")
      }
      else {
        ns.gang.setMemberTask(mems[k].name, "Territory Warfare")
      }
      await ns.sleep(1200)
    }


    for (let k = terwarfs + vigis; k < mems.length; k++) {
      var tsk = taskTrain
      if (mems[k].skill > 50) {
        tsk = taskEarly
      }
      if (mems[k].skill > threshMid) {
        tsk = taskMid
      }
      if (mems[k].skill > threshTerror) {
        if (ns.gang.getMemberNames().length < 12) {
          tsk = taskRespect
        }
        else {
          if (toggle) {
            tsk = taskMoney
            //toggle = !toggle
          } else { tsk = taskRespect 
          //toggle = !toggle
          }
        }
      }
      //ns.print(pool)
      ns.print("setting ", mems[k].name, " to2 ", tsk)
      ns.gang.setMemberTask(mems[k].name, tsk)
      await ns.sleep(1200)
    }

  }
}
