class Field {
  constructor(w, h) {
    this.width = w
    this.height = h

    this.blocks = Array(floor(WIDTH / BLOCK_SIZE)).fill(Array(floor(HEIGHT / BLOCK_SIZE)).fill(0))
  }

  draw() {
    fill(32)
    strokeWeight(4)
    stroke(255)

    rect(0, 0, this.width, this.height)

    for (let i = 0; i < WIDTH /BLOCK_SIZE; i++) {
      for (let j = 0; j < HEIGHT /BLOCK_SIZE; j++) {
        stroke(28)
        noFill()
        square(i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE)
      }
    }
  }

  drawBlocks() {
    for (let i in this.blocks) 
      for (let j in this.blocks[i]) 
        this.blocks[i][j].draw()
  }

  addBlock() {
    this.blocks[floor(random(this.blocks.length))][floor(random(this.blocks[0].length))] = new Block
  }
}