const WIDTH = 400
const HEIGHT = 400
const BLOCK_SIZE = 50
const SPEED = 500

let block

function setup() {
  createCanvas(WIDTH, HEIGHT)
  frameRate(5)

  field = new Field(WIDTH, HEIGHT)
  block = new Block()
}

function draw() {
  clear()

  // Draw field
  field.draw()

  block.draw()
}

setInterval(() => block.moveDown(), SPEED)

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}