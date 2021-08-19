import { TILE_STATUSES, createBord, markTile, revealTile } from "./logic.js";

const BORD_SIZE = 7
const NUMBER_OF_MINES = 5
const bord = createBord(BORD_SIZE, NUMBER_OF_MINES)
const bordElemnt = document.querySelector('.bord')
const mineLeftCountText = document.querySelector('[data-mine-count]')

bord.forEach(row =>{
    row.forEach(tile => {
        bordElemnt.append(tile.element)
        tile.element.addEventListener('click', () => {
            revealTile(bord, tile)
        })
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})
bordElemnt.style.setProperty("--size", BORD_SIZE)
mineLeftCountText.textContent = NUMBER_OF_MINES


function listMinesLeft(){
    const markedTilesCount = bord.reduce((count, row) => {
        return count + row .filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)

    mineLeftCountText.textContent = NUMBER_OF_MINES - markedTilesCount
}