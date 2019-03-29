/**
 * Shadow object
 */
class Shadow extends Block {
  constructor(block) {
    super(block.rnd, block.rot)
    this.shape = block.shape

    this.color = {
      body: `hsla(${this.hue}, 100%, 50%, 0.2)`,
      stroke: `hsla(${this.hue}, 70%, 50%, 0.1)`
    }
  }

  /**
   * Draw shadow
   */
  draw() {
    this.update()

    fill(this.color.body)
    stroke(this.color.stroke)

    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] !== 0) {
          square(this.pos.x * BLOCK_SIZE + i * BLOCK_SIZE, this.pos.y * BLOCK_SIZE + j * BLOCK_SIZE, BLOCK_SIZE)
        }
      }
    }
  }

  /**
   * Moves shadow to the bottom according to block's position and shape
   */
  update() {
    this.shape = block.shape
    this.pos.x = block.pos.x
    this.pos.y = block.pos.y
    
    while (!this.collides(0, 1, this.shape)) this.pos.y++
  }
}