class Block {
  constructor() {
    this.rnd = floor(random(shapes.length))
    this.rot = floor(random(shapes.length[this.rnd]))

    this.shape = shapes[this.rnd][this.rot]
    this.color = {
      body: `hsl(${floor(random(360))}, 50%, 50%)`,
      stroke: `hsl(${floor(random(360))}, 30%, 50%)`
    }

    this.pos = createVector(floor(random(WIDTH / BLOCK_SIZE)), -2)
  }

  draw() {
    fill(this.color.body)
    stroke(this.color.stroke)

    for (let i in this.shape) {
      for (let j in this.shape[i]) {
        if (this.shape[i][j]) square(this.pos.x + i * BLOCK_SIZE, this.pos.y + j * BLOCK_SIZE)
      }
    }
  }

  moveDown() {
    if (!this.collides(0, 1, this.shape)) this.pos.y += BLOCK_SIZE
  }

  moveRight() {
    if (!this.collides(1, 0, this.shape)) this.pos.x += BLOCK_SIZE
  }

  moveLeft() {
    if (!this.collides(-1, 0, this.shape)) this.pos.x -= BLOCK_SIZE
  }

  rotate() {
    let nextShape = shapes[this.rnd][(this.rot + 1) % shapes[this.rnd].length]

    if (this.collides(0, 0, nextShape)) return

    this.rot = (this.rot + 1) % shapes[this.rnd].length
    this.shape = shapes[this.rnd][this.rot]
  }

  collides(dx, dy, shape) {
    for (let ix in shape) {
      for (let iy in shape[ix]) {
        if (!shape[ix][iy]) {
          continue;
        }

        var x = this.pos.x + ix + dx
        var y = this.pos.y + iy + dy
        if (y >= HEIGHT || x < 0 || x >= WIDTH) {
          return true
        }
        if (y < 0) {
          // Ignore negative space rows
          continue;
        }
        if (field.blocks[y][x]) {
          return true
        }
      }
    }

    return false
  }

  lock() {
    for (let ix = 0; ix < this.shape.length; ix++) {
      for (let iy = 0; iy < this.shape.length; iy++) {
        if (!this.pattern[ix][iy]) {
          continue;
        }

        if (this.pos.y - iy * BLOCK_SIZE < 0) {
          alert("You're done!")
          return done = true
        }

        board[this.pos.y / BLOCK_SIZE + iy][this.pos.x / BLOCK_SIZE + ix] = 1
      }
    }

    let nlines = 0

    for (let y = 0; y < HEIGHT; y++) {
      let line = true;
      for (let x = 0; x < WIDTH; x++) {
        line = line && board[y][x] !== 0
      }

      if (line) {
        for (let y2 = y; y2 > 1; y2--) {
          for (let x = 0; x < WIDTH; x++) {
            board[y2][x] = board[y2 - 1][x]
          }
        }

        for (let x = 0; x < width; x++) {
          board[0][x] = 0
        }

        nlines++
      }
    }
  }
}