//Grabbing data ftrom the css file
export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked'
}


export function createBord(bordSize, numberOfMines){
    const bord = []
    const minePosition = getMinePosition(bordSize, numberOfMines)
    for(let xCord = 0; xCord < bordSize; xCord++){
        const row = []
        for(let yCord = 0; yCord < bordSize; yCord++){
            const element = document.createElement('div')
            element.dataset.status = TILE_STATUSES.HIDDEN

            const tile = {
                element,
                xCord,
                yCord,
                mine: minePosition.some(positonMatch.bind(null, {xCord, yCord})),
                get status(){
                    return element.dataset.status
                },
                set status(value){
                    this.element.dataset.status = value
                }
            }
            row.push(tile)
        }
        bord.push(row)
    }
    
    return bord
}


export function markTile(tile){
    if(tile.status !== TILE_STATUSES.HIDDEN && 
        tile.status !== TILE_STATUSES.MARKED){
        return
    }

    if(tile.status === TILE_STATUSES.MARKED){
        tile.status = TILE_STATUSES.HIDDEN
    }
    else{
        tile.status = TILE_STATUSES.MARKED
    }
}

export function revealTile(bord, tile){
    if (tile.status !== TILE_STATUSES.HIDDEN){
        console.log(tile)
        return
    }
    
    if (tile.mine){
        tile.status = TILE_STATUSES.MINE
        return
    }

    tile.status = TILE_STATUSES.NUMBER
    const adjacentTiles = nearbyTiles(bord, tile)
    const mine = adjacentTiles.filter(t => t.mine)
    if (mine.length === 0){
        adjacentTiles.forEach(revealTile.bind(null, bord))
    }
    else{
        tile.element.textContent = mine.length
    }
}

function getMinePosition(bordSize, numberOfMines){
    const positions = []

    while(positions.length < numberOfMines){
        const positon = {
            xCord: randomNumber(bordSize),
            yCord: randomNumber(bordSize)
        }
        
        if (!positions.some(positonMatch.bind(null, positon))) {
            positions.push(positon)
        }

    }

    return positions
}

function positonMatch(positonA, positionB) {
    return positonA.xCord === positionB.xCord && positonA.yCord === positionB.yCord
}
  
function randomNumber(size) {
    return Math.floor(Math.random() * size)
}

function nearbyTiles(bord, {xCord ,yCord}) {
    const tiles = []

    for(let xOffset = -1;  xOffset <= 1; xOffset++){
        for(let yOffset = -1; yOffset <= 1; yOffset++){
            const tile = bord[xCord + xOffset]?.[yCord + yOffset]
           if(tile) tiles.push(tile)

        }
    }
    return tiles
}


