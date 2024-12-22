import platform from "../png/platform.png";
import hills from "../png/hills.png";
import background from "../png/background.png";
import platformSmallTall from "../png/platformSmallTall.png";
import spriteRunLeft from "../png/spriteRunLeft.png";
import spriteRunRight from "../png/spriteRunRight.png";
import spriteStandLeft from "../png/spriteStandLeft.png";
import spriteStandRight from "../png/spriteStandRight.png";

console.log(platform);
const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5;

//player class
class Player {
  constructor() {
    this.speed = 10;
    // default position of player
    this.position = {
      x: 100,
      y: 100,
    };
    // defining velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 66;
    this.height = 150;

    this.image = createImage(spriteStandRight);
    this.frames = 0;
    this.sprites = {
      stand: {
        right: createImage(spriteStandRight),
        left: createImage(spriteStandLeft),
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidth: 341,
        width: 127.875,
      },
    };

    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }

  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    //c.fillStyle = "red";
    //c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.frames++;
    if (
      this.frames > 59 &&
      (this.currentSprite === this.sprites.stand.right ||
        this.currentSprite === this.sprites.stand.left)
    ) {
      this.frames = 0;
    } else if (
      this.frames > 29 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left)
    ) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // to land on ground after falling
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    //c.fillStyle = 'blue'
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)

    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    //c.fillStyle = 'blue'
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)

    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

//console.log(image)

let currentKey;
let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);

let player = new Player();
//const platform = new Platform()
let platforms = [];

let gb = [];

// left and right key both set default to false
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function init() {
  platformImage = createImage(platform);

  player = new Player();
  //const platform = new Platform()
  platforms = [
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: createImage(platformSmallTall),
    }),
    new Platform({
      x: -1,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width - 3,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 700 - 2,
      y: 470,
      image: platformImage,
    }),
  ];

  gb = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background),
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills),
    }),
  ];

  scrollOffset = 0;
}

// to call gravity
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  gb.forEach((gb) => {
    gb.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  // if right pressed then forward if left then backward else stop
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    // platform movement

    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });

      // for background
      gb.forEach((gb) => {
        gb.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;

      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });

      // for background
      gb.forEach((gb) => {
        gb.position.x += player.speed * 0.66;
      });
    }
  }

  console.log(scrollOffset);

  // platform

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // Movement logic and sprite updates
  if (
    keys.right.pressed &&
    currentKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    keys.left.pressed &&
    currentKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    !keys.left.pressed &&
    currentKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  } else if (
    !keys.right.pressed &&
    currentKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }

  //win condition
  if (scrollOffset > platformImage.width * 5 + 700 - 2) {
    console.log("you win!");
  }

  //lose condition
  if (player.position.y > canvas.height) {
    //console.log('you lose!')
    init();
  }
}
let lastKey;
init();
animate();

// movements using keys
window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65: // A (left)
      console.log("left");
      keys.left.pressed = true;
      currentKey = 'left';
      break;

    case 83: // S (down)
      console.log("down");
      break;

    case 68: // D (right)
      console.log("right");
      keys.right.pressed = true;
      currentKey = 'right';
      break;

    case 87: // W (up)
      console.log("up");
      player.velocity.y -= 25; // Jump or move up
      break;
  }
});

// Stop movement after lifting key
window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65: // A (left)
      console.log("left key released");
      keys.left.pressed = false;
      if (currentKey === 'left') {
        currentKey = ''; // Reset the current key when it's released
      }
      break;

    case 83: // S (down)
      console.log("down key released");
      break;

    case 68: // D (right)
      console.log("right key released");
      keys.right.pressed = false;
      if (currentKey === 'right') {
        currentKey = ''; // Reset the current key when it's released
      }
      break;

    case 87: // W (up)
      console.log("up key released");
      break;
  }
});