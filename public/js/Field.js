/**
 * Field object. Contains all blocks on itself
 * @param {Number} w Width of the field
 * @param {Number} h Height of the field
 */
class Field {
  constructor(w, h) {
    this.width = w
    this.height = h

    this.blocks = []
    for (let i = 0; i < HEIGHT; i++) {
      this.blocks.push([])
      for (let j = 0; j < WIDTH; j++) {
        this.blocks[i].push(0)
      }
    }
  }

  /**
   * Draws field base on canvas
   */
  draw() {
    fill(32)
    strokeWeight(2)
    stroke(255)

    rect(0, 0, this.width * BLOCK_SIZE, this.height * BLOCK_SIZE)

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        stroke(28)
        noFill()
        square(i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE)
      }
    }
  }

  /**
   * Draws all blocks in field on canvas
   */
  drawBlocks() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        if (this.blocks[i][j] !== 0) {
          fill(`hsl(${this.blocks[i][j]}, 100%, 50%)`)
          stroke(`hsl(${this.blocks[i][j]}, 80%, 50%)`)

          square(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE)
        }
      }
    }
  }

  /**
   * Adds new random block on canvas
   * @returns {Block}
   */
  newBlock() {
    let rnd = floor(random(figures.length))
    let rot = floor(random(figures[rnd].shape.length))
    
    return new Block(rnd, rot)
  }
}