/**
 * Block object
 * @param {Number} rnd Random value for choosing figure
 * @param {Number} rot Random value for figure's rotation
 */
class Block {
  constructor(rnd, rot) {
    this.rnd = rnd
    this.rot = rot

    this.shape = figures[this.rnd].shape[this.rot]
    this.hue = figures[this.rnd].color
    this.color = {
      body: `hsl(${this.hue}, 100%, 50%)`,
      stroke: `hsl(${this.hue}, 70%, 50%)`
    }

    this.pos = createVector(floor(WIDTH / 2) - floor(this.shape.length / 2), -3)
  }

  /**
   * Draws block
   */
  draw() {
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
   * Moves block 1 step down
   */
  moveDown() {
    if (!this.collides(0, 1, this.shape)) this.pos.y++
    else {
      this.lock()
      block = field.newBlock()
      shadow = new Shadow(block)
    }
  }

  /**
   * Moves block 1 step right
   */
  moveRight() {
    if (!this.collides(1, 0, this.shape)) this.pos.x++
  }


  /**
   * Moves block 1 step left
   */
  moveLeft() {
    if (!this.collides(-1, 0, this.shape)) this.pos.x--
  }


  /**
   * Rotates block
   */
  rotate() {
    let nextShape = figures[this.rnd].shape[(this.rot + 1) % figures[this.rnd].shape.length]

    if (this.collides(0, 0, nextShape)) return

    this.rot = (this.rot + 1) % figures[this.rnd].shape.length
    this.shape = figures[this.rnd].shape[this.rot]
  }

  /**
   * Checks if block collides something
   * @param {Number} dx Delta x-pos
   * @param {Number} dy Delta y-pos
   * @param {Array} shape Shape of the block
   * @returns Boolean
   */
  collides(dx, dy, shape) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (!shape[i][j]) continue;

        let x = this.pos.x + i + dx
        let y = this.pos.y + j + dy

        if (y < 0) continue;
        if (y >= HEIGHT || x < 0 || x >= WIDTH) return true
        if (field.blocks[y][x] !== 0) return true
      }
    }

    return false
  }

  /**
   * Locks object in place
   */
  lock() {
    for (let ix = 0; ix < this.shape.length; ix++) {
      for (let iy = 0; iy < this.shape[ix].length; iy++) {
        if (!this.shape[ix][iy])
          continue;

        if (this.pos.y + iy < 0) {
          failed = true
          return
        }
        field.blocks[this.pos.y + iy][this.pos.x + ix] = this.hue;
      }
    }

    this.removeLines()
  }

  /**
   * Removes stacked lines
   */
  removeLines() {
    let n = 0

    for (let y = 0; y < HEIGHT; y++) {
      let line = true

      for (let x = 0; x < WIDTH; x++) {
        line = line && field.blocks[y][x] !== 0
      }

      if (line) {
        for (let y2 = y; y2 > 1; y2--) {
          for (let x = 0; x < WIDTH; x++) {
            field.blocks[y2][x] = field.blocks[y2 - 1][x]
          }
        }

        for (let x = 0; x < WIDTH; x++) {
          field.blocks[0][x] = 0
        }

        n++
      }
    }

    incCounter(n)
  }

  /**
   * Moves block all the way down
   */
  bonanza() {
    while (!this.collides(0, 1, this.shape)) {
      this.moveDown()
    }
  }
}