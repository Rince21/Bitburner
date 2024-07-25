/** @param {NS} ns */
export async function main(ns) {
  //if (ns.ps("home").includes("go.js")){
  //  ns.kill("go.js","home")
  //}

  var factions = [ "Illuminati"] ////,"Daedalus","Tetrads","Slum Snakes""Netburners",,""Tetrads""Daedalus","Tetrads","Slum Snakes""The Black Hand", ,"Slum Snakes"
const boardSize = 5

  //nachbarfelder
  //struktur
  //freiheiten von struktur
  //freiheiten "innerhalb" struktur
  //territorium ? struktur + wand


  function flattenState(state) {
    var newState = []
    var newString
    for (let i = 0; i < 5; i++) {
      newString = ""
      for (let j = 0; j < 5; j++) {
        if (state[i][j] == "O") {
          newString = newString + "O"
        } else {
          newString = newString + "x"
        }
      }
      newState.push(newString)
    }
    return newState
  }

  function getNeighbours(x, y) {
    var neighb = []
    //check west
    if (x > 0) {
      neighb.push([x - 1, y])
    }
    if (y > 0) {
      neighb.push([x, y - 1])
    }
    if (x < 4) {
      neighb.push([x + 1, y])
    }
    if (y < 4) {
      neighb.push([x, y + 1])
    }
    return neighb
  }

  async function findValidMove() {
    var state = ns.go.getBoardState()
    var okMove = false
    var i = 0
    //can kill somewhere?
    for (var x = 0; x < boardSize; x++) {
      for (var y = 0; y < boardSize; y++) {
        if (ns.go.analysis.getValidMoves()[x][y]) {
          //kills own ist nicht valid
          //ko ist nicht valid

          //kann ich killen?
          // nicht in eigenes territorium setzen
          //aktiv umschließen wenn chains sich berühren und meine freiheit >= seine freiheit?

          for (var n of getNeighbours(x, y)) {
            if (ns.go.getBoardState()[n[0]][n[1]] == "O" && ns.go.analysis.getLiberties()[n[0]][n[1]]==1) {
              return [x, y]
            }
          }
        }
      }
    }

    //else follow order
    while (okMove == false) {
      //ns.tprint(ns.go.getBoardState())
      var coords = order[i]

      state = ns.go.getBoardState()
      //ns.tprint(state)
      if(ns.go.analysis.getValidMoves()[coords[0]][coords[1]]){
        
      if (state[coords[0]][coords[1]] == "." && ns.go.analysis.getControlledEmptyNodes()[coords[0]][coords[1]] != "X") {
        var neighbours = getNeighbours(coords[0], coords[1])
        var freedoms = ns.go.analysis.getLiberties()
        var killingWhite = false
        var killingBlack = false
        var hasFreedom = false
        for (var neigh of neighbours) {
          if (state[neigh[0]][neigh[1]] == "O" && freedoms[neigh[0]][neigh[1]] == 1) {
            killingWhite = true
            hasFreedom = true
          }
        }
        if (!killingWhite) {
          var savingBlack = false
          for (var neigh of neighbours) {
            if (state[neigh[0]][neigh[1]] == "X" && freedoms[neigh[0]][neigh[1]] > 2) {
              savingBlack = true
            }
            if (!savingBlack && state[neigh[0]][neigh[1]] == "X" && freedoms[neigh[0]][neigh[1]] == 1) {
              killingBlack = true
            }
          }
          for (var neigh of neighbours) {
            if (state[neigh[0]][neigh[1]] == "." || state[neigh[0]][neigh[1]] == "X") {
              hasFreedom = true
            }
          }
        }
        //ns.tprint(i,killingBlack,killingWhite,hasFreedom)
        if (!killingBlack && hasFreedom) {
          return (coords)

        }
        else {
          i += 1
          if (i >= 25) {
            return ([])
          }
        }
      } else {          i += 1
          if (i >= 25) {
            return ([])
          }}
      
    }else {          i += 1
          if (i >= 25) {
            return ([])}
    }
    await ns.sleep(50)
  }
  }
  //okMove = true
  //sit = await ns.go.makeMove(coords[0], coords[1])
  //ns.tprint(sit)
  //ns.tprint(ns.go.analysis.getLiberties())
  //ns.tprint(ns.go.getBoardState())
  //ns.tprint(ns.go.getGameState())
  //if (ns.go.getGameState().previousMove == []) {
  //  passed = true
  //}
var order = [
      [2, 2],
      [2, 1], [2, 3], [1, 2], [3, 2],
      [0, 2], [2, 0], [4, 2], [2, 4],
      [0, 1], [0, 3], [1, 4], [3, 4], [4, 3], [4, 1], [3, 0], [1, 0],

      [1, 1], [1, 3], [3, 1], [3, 3],
      [0, 0], [0, 4], [4, 4], [4, 0]
    ]

  async function runGame(faction) {
    ns.go.resetBoardState(faction, 5)
    //start in middle
    

    var moveCounter = 0
    var coords = []
    while (ns.go.getGameState().currentPlayer=="Black") {
    //ns.tprint(ns.go.getBoardState())
    //ns.tprint(ns.go.getGameState())
      moveCounter += 1
      coords = await findValidMove()
      //      ns.tprint(coords)

            if (coords.length>0){
        await ns.go.makeMove(coords[0],coords[1])
      } else {await ns.go.passTurn()
      continue
      }
      if (moveCounter > 3 &&ns.go.getGameState().previousMove ==null){
        await ns.go.passTurn()   
        continue 
      }

      await ns.sleep(50)
    }
    

  }

  //await ns.sleep(200)
  //ns.tprint("passing")



  var k = 0;
  while (true) {
    await runGame(factions[k % factions.length])
    k = k + 1;
    ns.print("Done Game ", k)
    await ns.sleep(100)
  }
}
