import { appendPX } from '/js/utils.js';
import Simulation from '/js/Simulation.js';

const WIDTH = 1200;
const HEIGHT = 650;
const FRAME_RATE = 60;
const NUMBER_OF_BALLS = 10;
const CONTAINER = document.getElementById('container');

CONTAINER.style.width = appendPX(WIDTH);
CONTAINER.style.height = appendPX(HEIGHT);

const sim = new Simulation(CONTAINER, WIDTH, HEIGHT, NUMBER_OF_BALLS, FRAME_RATE);

sim.init();
sim.animate();
