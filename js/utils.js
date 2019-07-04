export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function getRandomColor() {
  return `rgb(${getRandomInt(0, 256)}, 
    ${getRandomInt(0, 256)}, 
    ${getRandomInt(0, 256)}
  )`;
}

export function appendPX(num) {
  return `${num}px`;
}

export function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

export function resolveCollision(ballA, ballB) {
  let dxDiff = ballA.dx - ballB.dx;
  let dyDiff = ballA.dy - ballB.dy;

  let xDist = ballB.x - ballA.x;
  let yDist = ballB.y - ballA.y;

  if (dxDiff * xDist + dyDiff * yDist >= 0) {
    const angle = -Math.atan2(yDist, xDist);

    let m1 = ballA.mass;
    let m2 = ballB.mass;

    let u1 = rotate({ x: ballA.dx, y: ballA.dy }, angle);
    let u2 = rotate({ x: ballB.dx, y: ballB.dy }, angle);

    const v1 = { x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2), y: u1.y };
    const v2 = { x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2), y: u2.y };

    let vf1 = rotate(v1, -angle);
    let vf2 = rotate(v2, -angle);

    ballA.dx = vf1.x;
    ballA.dy = vf1.y;

    ballB.dx = vf2.x;
    ballB.dy = vf2.y;
  }
}
