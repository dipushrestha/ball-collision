import { getDistance, getRandomColor, appendPX, resolveCollision } from './utils.js';

export default class Ball {
  constructor(x, y, radius, parent, parentWidth, parentHeight, balls) {
    this.x = x;
    this.y = y;
    this.balls = balls;
    this.mass = radius;
    this.radius = radius;
    this.parent = parent;
    this.dx = (Math.random() - 0.5) * 3;
    this.dy = (Math.random() - 0.5) * 3;
    this.parentWidth = parentWidth;
    this.parentHeight = parentHeight;
    this.element = null;
  }

  init() {
    this.element = document.createElement('div');
    this.element.className = 'ball';
    this.element.style.width = appendPX(this.radius * 2);
    this.element.style.height = appendPX(this.radius * 2);
    this.element.style.backgroundColor = getRandomColor();
    this.parent.appendChild(this.element);
    return this;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x - this.radius <= 0 || this.x + this.radius >= this.parentWidth) {
      this.dx *= -1;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= this.parentHeight) {
      this.dy *= -1;
    }

    for (let ball of this.balls) {
      if (this === ball) continue;

      let combinedRadius = this.radius + ball.radius;
      let distanceBetweenBalls = getDistance(this.x, this.y, ball.x, ball.y);

      if (distanceBetweenBalls < combinedRadius) {
        resolveCollision(this, ball);
        this.element.style.backgroundColor = getRandomColor();
      }
    }
  }

  draw() {
    this.element.style.left = appendPX(this.x - this.radius);
    this.element.style.top = appendPX(this.y - this.radius);
  }
}
