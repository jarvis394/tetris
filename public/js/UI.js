class UI {
  constructor(w) {
    this.fieldWidth = w
  }
  
  /**
   * Draws score
   */
  draw() {
    fill(255)
    stroke(0)
    strokeWeight(3)
    textSize(48)
    textAlign(CENTER, CENTER)
    text(lines, this.fieldWidth * BLOCK_SIZE + 50, 50)
  }

  /**
   * Draws paused screen
   */
  drawPaused() {
    noStroke()
    if (!cPaused && !failed) {
      fill(0, 0, 0, 100)
      rect(0, 0, windowWidth, windowHeight)
  
      fill(255)
      textAlign(CENTER, CENTER)
      text("Paused", windowWidth / 2, windowHeight / 2 - 60)
  
      cPaused++
    }
  }

  /**
   * Draws failed screen
   */
  drawFailed() {
    noStroke()
    if (!cFailed) {
      fill(0, 0, 0, 100)
      rect(0, 0, windowWidth, windowHeight)
  
      fill(255)
      textAlign(CENTER, CENTER)
      text("Failed. Hit 'space' to restart", windowWidth / 2, windowHeight / 2 - 60)
  
      cFailed++
    } else if (keyIsDown(32)) {
      field = new Field(WIDTH, HEIGHT)
      block = field.newBlock()
      shadow = new Shadow(block)

      failed = false
    }
  }
}