'use strict';

class Cloud {
  constructor (canvasWidth, canvasHeight, z) {
    this.radius = canvasHeight / 10;
    this.position = {
      x: canvasWidth + this.radius + (canvasWidth / (z / 100)),
      y: canvasHeight * 0.2,
      z: z
    };

    this.speed = -5;
    this.animationAngle = 0;
  }

  update () {
    this.position.x += this.speed;

    this.position.y += Math.sin(RADIANS(this.animationAngle)) * 1;
    this.animationAngle += 5;
  }

  checkIfEnded () {
    return (this.position.x <= 0 - this.radius);
  }
}
