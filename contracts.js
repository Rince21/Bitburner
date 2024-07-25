import * as utils from "myutils.js"

/** @param {NS} ns */
export async function main(ns) {

  let types = ["Find Largest Prime Factor", "Subarray with Maximum Sum", "Total Ways to Sum",
    "Total Ways to Sum II", "Spiralize Matrix", "Array Jumping Game", "Array Jumping Game II",
    "Merge Overlapping Intervals", "Generate IP Addresses", "Algorithmic Stock Trader I",
    "Algorithmic Stock Trader II", "Algorithmic Stock Trader III",
    "Algorithmic Stock Trader IV", "Minimum Path Sum in a Triangle", "Unique Paths in a Grid I",
    "Unique Paths in a Grid II", "Shortest Path in a Grid", "Sanitize Parentheses in Expression",
    "Find All Valid Math Expressions", "HammingCodes: Integer to Encoded Binary",
    "HammingCodes: Encoded Binary to Integer", "Proper 2-Coloring of a Graph",
    "Compression I: RLE Compression", "Compression II: LZ Decompression",
    "Compression III: LZ Compression", "Encryption I: Caesar Cipher", "Encryption II: Vigenère Cipher"]

  //for (let i = 0; i < types.length; i++) { if (types[i] == "Compression II: LZ Decompression") { ns.tprint(i) } }
  // todo  "Sanitize Parentheses in Expression"  "Compression II: LZ Decompression", "Compression III: LZ Compression"

  await DoContracts()

  async function DoContracts() {



    let cracks = utils.getCracks()
    for (let serv of utils.getNetworkNodes(ns)) {
      if (utils.canPenetrate(ns, serv, cracks)) {
        utils.penetrate(ns, serv, cracks)
      }
      for (let file of ns.ls(serv)) {

        if (file.endsWith(".cct")) {
          ns.tprint(file, " ", serv, " ", ns.codingcontract.getContractType(file, serv))

          if (ns.codingcontract.getContractType(file, serv) == types[0]) {
            ns.tprint("Did Type0 ", ns.codingcontract.attempt(type0(ns.codingcontract.getData(file, serv)), file, serv))
          }
          else
            if (ns.codingcontract.getContractType(file, serv) == types[1]) {
              let sol = type1(ns.codingcontract.getData(file, serv))

              ns.tprint("Did Type1 ", ns.codingcontract.attempt(sol, file, serv))
            }
            else
              if (ns.codingcontract.getContractType(file, serv) == types[2]) {
                //ns.tprint(ns.codingcontract.getDescription(file, serv))
                let sol = type2(ns.codingcontract.getData(file, serv))
                // ns.tprint("solution: ",sol)
                let success = ns.codingcontract.attempt(sol, file, serv)
                ns.tprint("Did Type2 ", success)
              }
              else
                if (ns.codingcontract.getContractType(file, serv) == types[3]) {
                  let sol = type3(ns.codingcontract.getData(file, serv))
                  let success = ns.codingcontract.attempt(sol, file, serv)
                  ns.tprint("Did Type3 ", success)
                }
                else
                  if (ns.codingcontract.getContractType(file, serv) == types[4]) {
                    // ns.tprint(ns.codingcontract.getDescription(file, serv))
                    let sol = type4(ns.codingcontract.getData(file, serv))
                    //ns.tprint("solution: ", sol)

                    ns.tprint("Did Type4 ", ns.codingcontract.attempt(sol, file, serv))
                  }
                  else
                    if (ns.codingcontract.getContractType(file, serv) == types[5]) {
                      // ns.tprint(ns.codingcontract.getDescription(file, serv))
                      let sol = type5(ns.codingcontract.getData(file, serv))
                      //ns.tprint("solution: ", sol)

                      ns.tprint("Did Type5 ", ns.codingcontract.attempt(sol, file, serv))
                    }
                    else
                      if (ns.codingcontract.getContractType(file, serv) == types[6]) {
                        //ns.tprint(ns.codingcontract.getDescription(file, serv))
                        let sol = type6(ns.codingcontract.getData(file, serv))
                        //ns.tprint("solution: ", sol)

                        ns.tprint("Did Type6 ", ns.codingcontract.attempt(sol, file, serv))
                      }
                      else
                        if (ns.codingcontract.getContractType(file, serv) == types[7]) {
                          let sol = type7(ns.codingcontract.getData(file, serv))
                          let success = ns.codingcontract.attempt(sol, file, serv)
                          ns.tprint("Did Type7", success)
                        }
                        else
                          if (ns.codingcontract.getContractType(file, serv) == types[8]) {
                            let sol = type8(ns.codingcontract.getData(file, serv))
                            let success = ns.codingcontract.attempt(sol, file, serv)
                            ns.tprint("Did Type8", success)
                          }
                          else
                            if (ns.codingcontract.getContractType(file, serv) == types[9]) {
                              // ns.tprint(ns.codingcontract.getDescription(file, serv))
                              let sol = type9(ns.codingcontract.getData(file, serv))
                              //ns.tprint("solution: ", sol)
                              ns.tprint("Did Type9 ", ns.codingcontract.attempt(sol, file, serv))
                            }
                            else
                              if (ns.codingcontract.getContractType(file, serv) == types[10]) {
                                // ns.tprint(ns.codingcontract.getDescription(file, serv))
                                let sol = type10(ns.codingcontract.getData(file, serv))
                                let success = ns.codingcontract.attempt(sol, file, serv)
                                ns.tprint("Did Type10", success)
                              }
                              else if (ns.codingcontract.getContractType(file, serv) == types[11]) {
                                //ns.tprint(ns.codingcontract.getDescription(file, serv))
                                let sol = type11(ns.codingcontract.getData(file, serv))
                                let success = ns.codingcontract.attempt(sol, file, serv)
                                ns.tprint("Did Type11", success)
                              }
                              else if (ns.codingcontract.getContractType(file, serv) == types[12]) {
                                //ns.tprint(ns.codingcontract.getDescription(file, serv))
                                let sol = type12(ns.codingcontract.getData(file, serv))
                                //ns.tprint(sol)
                                let success = ns.codingcontract.attempt(sol, file, serv)
                                ns.tprint("Did Type12", success)
                              }
                              else if (ns.codingcontract.getContractType(file, serv) == types[13]) {
                                //ns.tprint(ns.codingcontract.getDescription(file, serv))
                                let sol = type13(ns.codingcontract.getData(file, serv))
                                //ns.tprint(sol)
                                let success = ns.codingcontract.attempt(sol, file, serv)
                                ns.tprint("Did Type13", success)
                              }
                              else if (ns.codingcontract.getContractType(file, serv) == types[14]) {
                                //ns.tprint(ns.codingcontract.getDescription(file, serv))
                                let sol = type14(ns.codingcontract.getData(file, serv))
                                //ns.tprint(sol)
                                let success = ns.codingcontract.attempt(sol, file, serv)
                                ns.tprint("Did Type14", success)
                              }
                              else if (ns.codingcontract.getContractType(file, serv) == types[15]) {
                                let sol = type15(ns.codingcontract.getData(file, serv))
                                let success = ns.codingcontract.attempt(sol, file, serv)
                                ns.tprint("Did Type15", success)
                              }
                              else
                                if (ns.codingcontract.getContractType(file, serv) == types[16]) {
                                  //ns.tprint(ns.codingcontract.getDescription(file, serv))
                                  let sol = type16(ns.codingcontract.getData(file, serv))
                                  //ns.tprint("solution: ", sol)
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type16 ", success)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[17]) {
                                  let sol = type17(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type17 ", success)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[18]) {
                                  let sol = type18(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type18", success)
                                  await ns.sleep(100)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[19]) {
                                  let sol = type19(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type19", success)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[20]) {
                                  let sol = type20(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type20", success)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[21]) {
                                  let sol = type21(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type21", success)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[22]) {
                                  let sol = type22(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type22", success)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[23]) {
                                  let sol = type23(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type23", success)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[25]) {
                                  //ns.tprint(ns.codingcontract.getDescription(file, serv))
                                  let sol = type25(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type25", success)
                                }
                                else if (ns.codingcontract.getContractType(file, serv) == types[26]) {
                                  //ns.tprint(ns.codingcontract.getDescription(file, serv))
                                  let sol = type26(ns.codingcontract.getData(file, serv))
                                  let success = ns.codingcontract.attempt(sol, file, serv)
                                  ns.tprint("Did Type26", success)
                                }
          await ns.sleep(100)
        }
      }

    }
  }


  function type26(data) {//"Encryption II: Vigenère Cipher"
    let text = data[0]
    let shiftword = data[1]
    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let newtext = ""
    let shift = 0
    let w = text.length
    let currshiftletter = ""
    for (let i = 0; i < w; i++) {
      let letter = text.slice(0, 1)
      text = text.slice(1)
      currshiftletter = shiftword.substring(i % shiftword.length, i % shiftword.length + 1)
      for (let j = 0; j < alphabet.length; j++) {
        if (currshiftletter == alphabet[j]) {
          shift = j
        }
      }
      if (letter != " ") {
        for (let j = 0; j < alphabet.length; j++) {
          if (letter == alphabet[j]) {
            newtext += alphabet[(j + shift + 26) % 26]
          }
        }
      }
      else {
        newtext += " "
      }
    }
    return newtext
  }

  function type25(data) {//caesarsshift
    let text = data[0]
    let shift = data[1]
    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let newtext = ""
    let w = text.length
    for (let i = 0; i < w; i++) {
      let letter = text.slice(0, 1)
      text = text.slice(1)
      //ns.tprint(text)
      if (letter != " ") {
        for (let j = 0; j < alphabet.length; j++) {
          if (letter == alphabet[j]) {
            //ns.tprint(alphabet[j])
            newtext += alphabet[(j - shift + 26) % 26]
          }
        }
      }
      else {
        newtext += " "
      }
    }
    return newtext
  }

  function type23(data) {// "Compression II: LZ Decompression"

    function decodeNext(str, writ, text) {
      if (str == "") {
        return text
      }
      if (str[0] == 0) {
        return decodeNext(str.slice(1), !writ, text)
      }
      if (writ) {
        let index = parseInt(str[0]) + 1
        //ns.tprint(index)
        return decodeNext(str.slice(index), false, text + str.slice(1, index))
      }
      else {
        //text = 
        if (str[1] >= str[0]) {
          let str0 = parseInt(str[0])
          let str1 = parseInt(str[1])
          return decodeNext(str.slice(2), true, text + text.slice(text.length - str1, text.length - str1 + str0))
        }
        else {
          let parttext = text.slice(text.length - str[1])
          //ns.tprint(parttext)
          let addon = ""
          for (let i = 0; i < str[0]; i++) {
            addon = addon + parttext[i % parttext.length]
          }
          //ns.tprint(addon)
          return decodeNext(str.slice(2), true, text + addon)
        }
      }
    }
    return decodeNext(data, true, "")
  }

  function type22(data) {// "Compression I: RLE Compression"

    function countSameLetter(str, letter, count, sol) {
      //ns.tprint("str: ", str, " letter ", letter, " count ", count, " sol ", sol)
      if (str == "") {
        return sol + count + letter
      }
      if (str[0] != letter) {
        return countSameLetter(str.slice(1), str[0], 1, sol + count + letter)
        //return count
      } else {
        if (count == 9) {
          return countSameLetter(str.slice(1), str[0], 1, sol + count + letter)
        }
        return countSameLetter(str.slice(1), letter, count + 1, sol)
      }
    }
    let sol = countSameLetter(data, data[0], 0, "")
    return sol
  }



  function type21(data) { //"Proper 2-Coloring of a Graph"

    let map = {}
    for (let i = 0; i < data[0]; i++) {
      map[i] = { neigh: [], color: -1 }
    }
    for (let con of data[1]) {
      map[con[0]].neigh.push(con[1])
      map[con[1]].neigh.push(con[0])
    }
    for (let i = 0; i < data[0]; i++) {
      let startNode = -1
      for (let j = 0; j < data[0]; j++) {
        if (map[j].color == -1) {
          startNode = j
          break
        }
      }
      if (startNode == -1) {
        break
      }
      map[startNode].color = 0
      let nodes = [startNode]
      for (let node of nodes) {
        let tcolor = (map[node].color + 1) % 2
        for (let neigh of map[node].neigh) {
          if (map[neigh].color == map[node].color) {
            return []
          }
          map[neigh].color = tcolor
          if (!nodes.includes(neigh)) {
            nodes.push(neigh)
          }
        }
      }
    }
    let sol = []
    for (let i = 0; i < data[0]; i++) {
      if (map[i]) {
        sol.push(map[i].color)
      }
    }
    return sol
  }

  function type20(data) {//"HammingCodes: Encoded Binary to Integer"

    let hamming = []
    let currnum = data
    for (let i = 0; i < data.length; i++) {
      if (i == data.length - 1) {
        hamming.push(parseInt(currnum.slice(i)))
      } else {
        hamming.push(parseInt(currnum.slice(i, i + 1)))
      }
    }
    let count = 0
    let errors = []
    let squares = [128, 64, 32, 16, 8, 4, 2, 1]
    for (let sq of squares) {
      if (hamming.length - 1 >= sq) {
        count = 0
        for (let i = 0; i < hamming.length; i++) {
          if (i >= sq && i % (sq * 2) / sq / 2 >= 0.5) { // 
            count += hamming[i]
          }
        }
        if (count % 2) {
          errors.push(sq)
        }
      }
    }
    count = 0
    for (let i = 0; i < hamming.length; i++) {
      count += hamming[i]
    }
    if (count % 2) {
      errors.push(0)
    }

    let err = 0
    for (let i = 0; i < errors.length; i++) {
      err += errors[i]
    }

    if (err > 0) {
      hamming[err] += 1
      hamming[err] = hamming[err] % 2
    }
    let binarryarray = []
    for (let i = 1; i < hamming.length; i++) {
      if (!squares.includes(i)) {
        binarryarray.push(hamming[i])
      }
    }
    let number = 0
    let j = 0
    for (let i = binarryarray.length - 1; i >= 0; i--) {
      number += binarryarray[i] * (2 ** j)
      j++
    }
    return number

  }

  function type19(data) {//"HammingCodes: Integer to Encoded Binary"
    let binaryarray = []
    let currnum = data
    let bits = Math.floor(Math.log(currnum) / Math.LN2) + 1
    for (let i = 0; i < bits; i++) {
      binaryarray.push(currnum % 2)
      currnum -= currnum % 2
      currnum = currnum / 2
    }
    let hamming = []
    for (let i = 0; i < 256; i++) {
      if (binaryarray.length > 0) {
        if (i == 0) {
          hamming.push(1)
        } else
          if ((Math.log(i) / Math.LN2) % 1 == 0) {
            hamming.push(1)
          } else { hamming.push(binaryarray.pop()) }
      } else { break }
    }

    let squares = [128, 64, 32, 16, 8, 4, 2, 1]
    for (let sq of squares) {
      if (hamming[sq]) {
        let count = 0
        for (let i = 0; i < hamming.length; i++) {
          if (i > sq && i % (sq * 2) / sq / 2 >= 0.5) { // 
            count += hamming[i]
          }
          hamming[sq] = count % 2
        }
      }
    }
    let count = 0
    for (let i = 1; i < hamming.length; i++) {
      count += hamming[i]
    }
    hamming[0] = count % 2
    let bin = ""
    for (let i = 0; i < hamming.length; i++) {
      bin = bin + hamming[i].toString()
    }
    return bin
  }

  function type18(data) {// "Find All Valid Math Expressions"
    let nums = data[0]
    let tar = data[1]

    function mathcrawl(nums, c, sols, tar) {
      if (typeof nums[c + 1] == "undefined") {
        if (new Function("return " + nums)() == tar) {
          if (!sols.includes(nums)) {
            sols.push(nums)
          }
        }
        return
      }
      mathcrawl(nums.slice(0, c + 1) + "+" + nums.slice(c + 1), c + 2, sols, tar)
      mathcrawl(nums.slice(0, c + 1) + "-" + nums.slice(c + 1), c + 2, sols, tar)
      mathcrawl(nums.slice(0, c + 1) + "*" + nums.slice(c + 1), c + 2, sols, tar)
      if (!(nums[c] == "0" && (nums[c - 1] == "+" || nums[c - 1] == "-" || nums[c - 1] == "*"))) {
        mathcrawl(nums, c + 1, sols, tar)
      }
      // - 0 darf nicht am anfang einer längeren zahl sein; wenn also operator - 0 dann nicht ""
    }
    let sols = []
    mathcrawl(nums, 0, sols, tar)
    return sols
  }

  function type17(data) {// "Sanitize Parentheses in Expression"


    let str = data

    function checkParentheses(str) {
      let openPars = 0
      for (let i = 0; i < str.length; i++) {
        if (str[i] == "(") {
          openPars++
        }
        if (str[i] == ")") {
          openPars--
        }
        if (openPars < 0) {
          return false
        }
      }
      if (openPars == 0) {
        return true
      }
      else { return false }
    }


    if (checkParentheses(str)) {
      return [str]
    }

    //clean left
    let newStr = ""
    let copy = false
    for (let i = 0; i < str.length; i++) {
      if (copy) {
        newStr = newStr + str[i]
      } else {
        if (str[i] == "(") {
          copy = true
          newStr = newStr + str[i]
        }
        else if (str[i] != ")") {
          newStr = newStr + str[i]
        }
      }
    }
    str = newStr


    //clean right
    newStr = ""
    copy = false

    for (let i = str.length - 1; i >= 0; i--) {
      if (copy) {
        newStr = str[i] + newStr
      } else {
        if (str[i] == ")") {
          copy = true
          newStr = str[i] + newStr
        } else if (str[i] != "(") {
          newStr = str[i] + newStr
        }
      }
    }
    str = newStr


    let open = 0
    let close = 0

    for (let i = 0; i < str.length; i++) {
      if (str[i] == "(") {
        open++
      }
      if (str[i] == ")") {
        if (open > 0) {
          open--
        } else { close++ }
      }
    }


    let solutions = []

    function recurse(str, index, opens, closes, sol) {
      //ns.tprint("str ",str," index ",index," opens ",opens," closes ",closes," sol ",sol )
      if (index == str.length) {
        if (opens == 0 && closes == 0) {
          if (checkParentheses(sol)) {
            if (!(solutions.includes(sol))) {
              solutions.push(sol)
            }
          }
        }
        return
      }
      if (str[index] == "(" && open > 0) {
        recurse(str, index + 1, opens - 1, closes, sol)
        recurse(str, index + 1, opens, closes, sol + str[index])
      }
      else if (str[index] == ")" && closes > 0) {
        recurse(str, index + 1, opens, closes - 1, sol)
        recurse(str, index + 1, opens, closes, sol + str[index])
      }
      else {
        recurse(str, index + 1, opens, closes, sol + str[index])
      }
    }

    for (let i = 0; i < str.length / 2; i++) {
      recurse(str, 0, open, close, "")
    }

    return solutions
  }



function type16(data) { //"Shortest Path in a Grid" shit es gibt doch l und u TODO
  let maze = data //let data= [[0,0,0],[0,0,0],[0,0,0]]

  let lenx = maze[0].length
  let leny = maze.length
  let nodes = {}
  let existingNodes = []
  let nid = -1

  function id(x, y) { return x * leny + y }
  function x(id) { return Math.floor(id / leny) }
  function y(id) { return id % leny }


  nodes[id(0, 0)] = { path: "", x: 0, y: 0 }
  existingNodes.push(id(0, 0))


  for (let node of existingNodes) {

    let nx = x(node)
    let ny = y(node)

    if (nx == lenx - 1 && ny == leny - 1) {
      return (nodes[node].path)
    }

    if (nx > 0) {
      nid = id(nx - 1, ny) //west
      if (maze[ny][nx - 1] == 0) {
        if (!existingNodes.includes(nid)) {
          nodes[nid] = { path: nodes[node].path + "L", x: nx - 1, y: ny }
          existingNodes.push(nid)
        }
      }
    }
    if (ny > 0) { //north
      nid = id(nx, ny - 1)
      if (maze[ny - 1][nx] == 0) {
        if (!existingNodes.includes(nid)) {
          nodes[nid] = { path: nodes[node].path + "U", x: nx, y: ny - 1 }
          existingNodes.push(nid)
        }
      }
    }
    if (nx < lenx - 1) { //east
      nid = id(nx + 1, ny)
      if (maze[ny][nx + 1] == 0) {
        if (!existingNodes.includes(nid)) {
          nodes[nid] = { path: nodes[node].path + "R", x: nx + 1, y: ny }
          existingNodes.push(nid)
        }
      }
    }
    if (ny < leny - 1) { //south

      nid = id(nx, ny + 1)
      if (maze[ny + 1][nx] == 0) {
        if (!existingNodes.includes(nid)) {
          nodes[nid] = { path: nodes[node].path + "D", x: nx, y: ny + 1 }
          existingNodes.push(nid)
        }
      }
    }
  }
  return ""
}

function type15(data) {//"Unique Paths in a Grid II"
  let lenx = data[0].length
  let leny = data.length
  let xarr = []
  let arr = []
  for (let i = 0; i < lenx; i++) {
    xarr.push(0)
  }
  for (let i = 0; i < leny; i++) {
    arr.push(Array.from(xarr))
  }
  arr[0][0] = 1
  for (let y = 0; y < leny; y++) {
    for (let x = 0; x < lenx; x++) {
      if (x == 0 && y == 0) {
        continue
      }
      if (data[y][x] == 1) {
        arr[y][x] = 0
        continue
      }
      if (y > 0 && x > 0) {
        arr[y][x] = arr[y - 1][x] + arr[y][x - 1]
      }
      else if (y > 0) {
        arr[y][x] = arr[y - 1][x]
      }
      else if (x > 0) {
        arr[y][x] = arr[y][x - 1]
      }
    }
  }
  return (arr[leny - 1][lenx - 1])
}

function type14(data) {//"Unique Paths in a Grid I"
  let x = data[0] - 1
  let y = data[1] - 1
  function faculty(num) {
    let n = 1
    for (let i = 1; i < num + 1; i++) {
      n *= i
    }
    return n
  } //[[9],[5,1],[8,1,7]]
  return faculty(x + y) / faculty(x) / faculty(y)
}

function type13(data) { //"triangle
  let tri = data
  let len = data.length
  for (let i = len - 2; i > -1; i--) {
    for (let j = 0; j < data[i].length; j++) {
      tri[i][j] += Math.min(tri[i + 1][j], tri[i + 1][j + 1])
    }
  }
  return tri[0][0]
}


function type12(data) {//"Algorithmic Stock Trader IV"
  let num = data[0]
  let stocks = data[1]
  let cleanStocks = []
  let findMin = true
  for (let i = 0; i < stocks.length; i++) {
    if (findMin) {
      if (i == 0) {
        if (stocks[i] < stocks[i + 1]) {
          cleanStocks.push(stocks[i])
          findMin = false
        }
        continue
      }
      if (i == stocks.length) {
        continue
      }
      if (stocks[i] < stocks[i + 1] && stocks[i] < stocks[i - 1]) {
        cleanStocks.push(stocks[i])
        findMin = false
        continue
      }
    }
    else {
      if (i == 0) {
        continue
      }
    }
    if (i == stocks.length - 1) {
      if (stocks[i] > stocks[i - 1]) {
        cleanStocks.push(stocks[i])
        findMin = true
      }
      continue
    }
    if (stocks[i] > stocks[i + 1] && stocks[i] > stocks[i - 1]) {
      cleanStocks.push(stocks[i])
      findMin = true
      continue
    }
  }

  let nummax = cleanStocks.length / 2
  if (num < nummax) {
    let wiederholungen = nummax - num
    for (let j = 0; j < wiederholungen; j++) {
      let diffs = []
      for (let i = 0; i < cleanStocks.length - 1; i++) {
        diffs.push(Math.abs(cleanStocks[i + 1] - cleanStocks[i]))
      }
      let min = 1000
      let imin = -1
      for (let i = 0; i < diffs.length; i++) {
        if (diffs[i] < min) {
          min = diffs[i]
          imin = i
        }
      }
      cleanStocks.splice(imin, 2)
      nummax = cleanStocks.length / 2
    }
  }

  let sol = 0
  for (let i = 0; i < cleanStocks.length / 2; i++) {
    sol += cleanStocks[i * 2 + 1] - cleanStocks[i * 2]
  }
  return sol
}

function type11(data) {//"Algorithmic Stock Trader III"
  //ns.tprint(data) //137,117,152,165,129,92,32,55,87,172,66,156,27,163,17,90,65,94,199,57,41,126,50,4,40,182,88,19,156,38,124,77,196,194

  let max = 0
  for (let i = 0; i < data.length - 3; i++) {
    for (let j = i + 1; j < data.length - 2; j++) {
      for (let k = j + 1; k < data.length - 1; k++) {
        for (let l = k + 1; l < data.length; l++) {
          let profit = data[j] - data[i] + data[l] - data[k]
          if (profit > max) {
            max = profit
          }
        }
      }
    }
  }
  return max
}

function type10(data) {//"Algorithmic Stock Trader II"
  //ns.tprint(data) //62,11,31,187,119,121,104
  let sol = 0
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i] < data[i + 1]) {
      sol += data[i + 1] - data[i]
    }
  }
  //ns.tprint("sol: ",sol)
  return sol
}

function type9(data) {//"Algorithmic Stock Trader I"
  // 166,135,157,88,194,19,156,94,197,24,14,186,173,83,19,13,9,7,155,158,20,38,164,118,44,93,155
  let max = 0
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      if (data[j] - data[i] > max) {
        max = data[j] - data[i]
        //ns.tprint(data[i]," ",data[j])
      }
    }
  }
  return max
}

function type8(data) {//"Generate IP Addresses"
  let ips = []
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      for (let k = 1; k < 4; k++) {
        //ns.tprint("a".repeat(i), ".", "a".repeat(j), ".", "a".repeat(k), ".", "aaa")
        if (i + j + k <= data.length && data.length - i - j - k <= 3) {
          let str1 = data.slice(0, i)
          let str2 = data.slice(i, i + j)
          let str3 = data.slice(i + j, i + j + k)
          let str4 = data.slice(i + j + k)
          if (parseInt(str1) < 256 && parseInt(str2) < 256 && parseInt(str3) < 256 && parseInt(str4) < 256) {
            if (!(str1.startsWith("0") && str1.length > 1)) {
              if (!(str2.startsWith("0") && str2.length > 1)) {
                if (!(str3.startsWith("0") && str3.length > 1)) {
                  if (!(str4.startsWith("0") && str4.length > 1)) {
                    let ipcand = str1 + "." + str2 + "." + str3 + "." + str4
                    //ns.tprint(ipcand)
                    ips.push(ipcand)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return ips
}

function type7(data) {//"Merge Overlapping Intervals"
  //[[21,24],[1,10],[18,26],[16,20],[22,31],[8,9],[16,24]]
  let dat = Array.from(data)
  dat.sort(function (a, b) { return parseFloat(a[0] - b[0]) })
  let sol = [dat[0]]
  for (let i = 1; i < dat.length; i++) {
    if (sol[sol.length - 1][1] >= dat[i][0]) {
      sol[sol.length - 1][1] = Math.max(sol[sol.length - 1][1], dat[i][1])
    }
    else {
      sol.push(dat[i])
    }
  }
  return sol
}

function type6(data) {//"Array Jumping Game II"
  ns.tprint(data)
  let newrange = 0
  let range = 0
  let count = 0
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j <= range; j++) {
      if (data[j] + j > newrange) {
        newrange = data[j] + j
      }
    }
    if (newrange > range) {
      count++
    }
    if (newrange >= data.length - 1) {
      break
    }
    range = newrange
  }
  if (newrange >= data.length - 1) {
    return count
  }
  else { return 0 }
}

function type5(data) {//"Array Jumping Game"
  // ns.tprint(data)
  //for (let i = 0;i< data.length;i++) {//loop (überhaupt nötig??)
  let range = 0
  for (let j = 0; j <= range; j++) {
    if (data[j] + j > range) {
      range = data[j] + j
    }
  }
  //}
  if (range >= data.length - 1) {
    return 1
  }
  else { return 0 }
}


function type4(data) {//"Spiralize Matrix"
  //[[8,2,31,34,16,11,49],[24,41,27,42,7,29,17]]
  let y = data.length
  let x = data[0].length
  let number = x * y
  let solArray = []
  let dir = "r"
  let cx = 0
  let cy = 0
  let walls = { "r": 0, "u": 0, "l": 0, "o": 0 }
  while (solArray.length < number) {
    ns.print("y: ", cy, "x: ", cx)
    solArray.push(data[cy][cx])
    switch (dir) {
      case "r":
        if (cx < x - walls["r"] - 1) {
          cx++
        }
        else {
          walls["o"]++
          dir = "u"
          cy++
        }
        break

      case "u":
        if (cy < y - walls[dir] - 1) {
          cy++
        }
        else {
          walls["r"]++
          dir = "l"
          cx--
        }
        break

      case "l":
        if (cx > walls[dir]) {
          cx--
        }
        else {
          walls["u"]++
          dir = "o"
          cy--
        }
        break

      case "o":
        if (cy > walls[dir]) {
          cy--
        }
        else {
          walls["l"]++
          dir = "r"
          cx++
        }
        break
    }
  }
  //ns.tprint(walls)
  return solArray

}

function type3(data) {//"Total Ways to Sum II"
  let target = data[0]
  let dat = data[1]
  let arr = []
  for (let i = dat.length - 1; i >= 0; i--) {
    arr.push(dat[i])
  }
  function f(n, k) {
    if (n == 0) { return 1 }
    if (k < 0 || n < 0) { return 0 }
    return f(n - arr[k], k) + f(n, k - 1)
  }
  return f(target, arr.length - 1)
}


function type2(data) {//"Total Ways to Sum" TODO: DP abkürzung

  function f(n, k) {
    if (n == 0) { return 1 }
    if (k <= 0 || n < 0) { return 0 }
    return f(n - k, k) + f(n, k - 1)
  }

  return f(data, data - 1)

}


function type1(data) {//"Subarray with Maximum Sum"
  //Given the following integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return that sum. 'Sum' refers to the sum of all the numbers in the subarray.
  // -9,6,-2,9,-3,1,-5,-2,1,-2,-3,3,3,10,-4,-9
  let max = -Infinity
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length + 1; j++) {
      let sum = 0
      for (let k = i; k < j; k++) {
        sum += data[k]
      }
      if (sum > max) {
        max = sum
      }
    }
  }
  return max
}


function type0(data) {//"Find Largest Prime Factor"
  let num = data
  let sqr = Math.floor(Math.sqrt(data))
  let primes = []
  for (let i = 2; i <= sqr; i++) {
    let gotOne = true
    while (gotOne) {
      gotOne = false
      if ((num / i) % 1 == 0) {
        primes.push(i)
        gotOne = true
        num = num / i
      }
    }
  }

  if (num > 1) {
    primes.push(num)
  }

  let max = 1
  for (let number of primes) {
    if (number > max) {
      max = number
    }
  }
  return max
}




}
