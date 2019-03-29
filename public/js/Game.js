const WIDTH = 15
const HEIGHT = 25
const BLOCK_SIZE = 25
const SPEED = 250

let block
let shadow
let ui
let field
let paused = false
let failed = false
let lines = 0
let cPaused = 0
let cFailed = 0

const incCounter = (n) => lines += n

function setup() {
  createCanvas(windowWidth, windowHeight)

  field = new Field(WIDTH, HEIGHT)
  block = field.newBlock()
  shadow = new Shadow(block)
  ui = new UI(WIDTH)
}

function draw() {

  // Return if game is paused
  if (paused) return ui.drawPaused()
  else cPaused = 0

  // Return if game is failed
  if (failed) return ui.drawFailed()
  else cFailed = 0

  // Clear canvas
  clear()

  // Translate everything to the center
  translate(windowWidth / 2 - WIDTH * BLOCK_SIZE / 2, 0)

  // Draw field
  field.draw()

  // Draw blocks on field
  field.drawBlocks()

  // Draw a block
  block.draw()

  // Drawe a shadow
  shadow.draw()

  // Draw UI
  ui.draw()
}

// Block should fall with interval of (SPEED)
const falling = setInterval(() => (!paused && !failed) && block.moveDown(), SPEED)

// Handle keyboard events
function keyPressed() {
  if (keyCode === 27 && !failed) return paused = !paused
  if (keyCode === UP_ARROW) return block.rotate()
  if (keyCode === RIGHT_ARROW) return block.moveRight()
  if (keyCode === DOWN_ARROW) return block.bonanza()
  if (keyCode === LEFT_ARROW) return block.moveLeft()
}

// Handle touch events
function touchStarted() {
  if (!touches.length) return

  if (touches.length === 3) return block.bonanza()
  else if (touches.length === 2) return block.rotate()
  else if (touches[0].x > windowWidth / 2) block.moveRight()
  else block.moveLeft()
}

// On window resize should resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}