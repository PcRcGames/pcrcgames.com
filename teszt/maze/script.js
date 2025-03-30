const labyrinthDiv = document.querySelector("#labyrinth-div");

const size = 30;

let cells = new Array();
let directions = ["bottom-div", "top-div", "left-div", "right-div"]

let startCell;
let endCell;

let testedCells;

labyrinthDiv.style.gridTemplateColumns = "1fr ".repeat(size);
labyrinthDiv.style.gridTemplateRows = "1fr ".repeat(size);

for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {

        let div = document.createElement("div");
        labyrinthDiv.appendChild(div);
        
        cells.push({
            "x" : x,
            "y" : y,
            "div" : div,
            "directions" : []
        })
        
        div.setAttribute("onclick", "getPoint(this)")
        
        for (let i = 0; i < 4; i++) {
            let insideDiv = document.createElement("div")     
            insideDiv.className = directions[i]
            div.appendChild(insideDiv)       
        }
    }
}

let sets = new Array();
let time = 0
let speed = 10

for (let i = 0; i < cells.length; i++) {
    sets.push(new Set([cells[i]]));
}

//console.log(sets);

function generateLabyrinth() {
    while (sets.length > 1) {
        let firstSet = sets[Math.floor(Math.random() * sets.length)];
        var firstPoint = Array.from(firstSet)[Math.floor(Math.random() * firstSet.size)];

        let found = false
        for (let i = 0; i < sets.length; i++) {
            if (found) break;

            for (let e = 0; e < Array.from(sets[i]).length; e++) {
                if (Array.from(sets[i])[e].x == firstPoint.x - 1 && Array.from(sets[i])[e].y == firstPoint.y) {
                    var secondSet = sets[i]
                    var secondPoint = Array.from(secondSet)[e]
                    if (!firstSet.has(secondPoint) && !secondSet.has(firstPoint)) found = true;
                    break;
                }
            }

            if (found) break;
            for (let e = 0; e < Array.from(sets[i]).length; e++) {
                if (Array.from(sets[i])[e].x == size - 1) continue
                if (Array.from(sets[i])[e].x == firstPoint.x + 1 && Array.from(sets[i])[e].y == firstPoint.y) {
                    var secondSet = sets[i]
                    var secondPoint = Array.from(secondSet)[e]
                    if (!firstSet.has(secondPoint) && !secondSet.has(firstPoint)) found = true;
                    break;
                }
            }

            if (found) break;
            for (let e = 0; e < Array.from(sets[i]).length; e++) {
                if (Array.from(sets[i])[e].x == firstPoint.x && Array.from(sets[i])[e].y == firstPoint.y - 1) {
                    var secondSet = sets[i]
                    var secondPoint = Array.from(secondSet)[e]
                    if (!firstSet.has(secondPoint) && !secondSet.has(firstPoint)) found = true;
                    break;
                }
            }

            if (found) break;
            for (let e = 0; e < Array.from(sets[i]).length; e++) {
                if (Array.from(sets[i])[e].y == size - 1) continue
                if (Array.from(sets[i])[e].x == firstPoint.x && Array.from(sets[i])[e].y == firstPoint.y + 1) {
                    var secondSet = sets[i]
                    var secondPoint = Array.from(secondSet)[e]
                    if (!firstSet.has(secondPoint) && !secondSet.has(firstPoint)) found = true;
                    break;
                }
            }
        }

        if (!found) continue
        else {
            if (firstPoint.y == secondPoint.y) {
                if (firstPoint.x > secondPoint.x) {
                    firstPoint.directions.push("left-div")
                    secondPoint.directions.push("right-div")
                } else {
                    firstPoint.directions.push("right-div")
                    secondPoint.directions.push("left-div")
                }
            } else {
                if (firstPoint.y > secondPoint.y) {
                    firstPoint.directions.push("top-div")
                    secondPoint.directions.push("bottom-div")
                } else {
                    firstPoint.directions.push("bottom-div")
                    secondPoint.directions.push("top-div")
                }
            }

            setTimeout(visualize.bind(null, firstPoint, secondPoint), time += speed)

            let newSet = firstSet.union(secondSet)
            sets.splice(sets.indexOf(firstSet), 1)
            sets.splice(sets.indexOf(secondSet), 1)
            sets.push(newSet)
        }
    }
}

function visualize(aPoint, bPoint) {
    aPoint.directions.forEach(dir => {
        aPoint.div.querySelector(`.${dir}`).style.display = "block"
        aPoint.div.classList.add(dir.slice(0, dir.length - 4))
    });

    bPoint.directions.forEach(dir => {
        bPoint.div.querySelector(`.${dir}`).style.display = "block"
        bPoint.div.classList.add(dir.slice(0, dir.length - 4))
    });
}

function getPoint(element) {
    if (!startCell) startCell = cells.find(x => x.div == element);
    else if (!endCell) {
        endCell = cells.find(x => x.div == element);
        document.querySelectorAll(".path-div").forEach((div) => {
            div.classList.remove("path-div")
        })

        pathfinding()
    }
    else {
        startCell = cells.find(x => x.div == element);
        endCell = null
        testedCells = [];
    }
}

function pathfinding() {
    console.log(startCell);
    console.log(endCell);

    let path = [startCell];
    testedCells = [startCell];
    while (1) {
        let nCells = nearCells(path[path.length - 1]);

        if (nCells.length > 0) {
            path.push(nCells[0]);
            testedCells.push(nCells[0]);
        } else path.pop()
        
        if (path[path.length - 1] == endCell) break;
    }

    for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
            path[i].div.classList.add("path-div")
        }, 10 * i) 
    }
}

function nearCells(cell) {
    let nearCells = new Array();
    if (cell.directions.includes("bottom-div") && !testedCells.includes(cells.find(c => c.x == cell.x && c.y == cell.y + 1))) nearCells.push(cells.find(c => c.x == cell.x && c.y == cell.y + 1))
    if (cell.directions.includes("top-div") && !testedCells.includes(cells.find(c => c.x == cell.x && c.y == cell.y - 1))) nearCells.push(cells.find(c => c.x == cell.x && c.y == cell.y - 1))
    if (cell.directions.includes("left-div") && !testedCells.includes(cells.find(c => c.x == cell.x - 1 && c.y == cell.y))) nearCells.push(cells.find(c => c.x == cell.x - 1 && c.y == cell.y))
    if (cell.directions.includes("right-div") && !testedCells.includes(cells.find(c => c.x == cell.x + 1 && c.y == cell.y))) nearCells.push(cells.find(c => c.x == cell.x + 1 && c.y == cell.y))
    return(nearCells)
}

generateLabyrinth()