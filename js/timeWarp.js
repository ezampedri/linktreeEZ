const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);
  
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  let delta = 1;
  
  const colors = [
    "blue",
    "lightblue",
    "skyblue",
    "dodgerblue",
    "deepskyblue",
    "steelblue",
    "cornflowerblue",
    "mediumslateblue",
    "slateblue",
    "royalblue",
    "powderblue",
    "darkblue",
    "navy",
    "azure",
    "aliceblue",
    "lightsteelblue",
    "lightcyan",
    "cyan"
];
  
  const getRandomColor = () => {
    const max = colors.length;
    return colors[Math.floor(Math.random() * max)];
  };
  
  class Star {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.color = color;
      this.radius = 1;
    }
  
    reset = () => {
      if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
      ) {
        this.radius = 0.1;
        this.x = getRandomInt(1, canvas.width);
        this.y = getRandomInt(1, canvas.height);
      }
    };
  
    move = () => {
      this.radius += 0.1 / delta;
      const speed = 100 * delta;
      this.x += (this.x - canvas.width / 2) * (this.radius / speed);
      this.y += (this.y - canvas.height / 2) * (this.radius / speed);
    };
  
    draw = () => {
      this.reset();
      this.move();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    };
  }
  
  const generateStars = (num = 500) => {
    return Array.from(
      { length: num },
      () =>
        new Star(
          getRandomInt(1, canvas.width),
          getRandomInt(1, canvas.height),
          getRandomColor()
        )
    );
  };
  const stars = generateStars();
  
  const drawStars = () => {
    stars.forEach((star) => star.draw());
  };
  
  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStars();
    requestAnimationFrame(update);
  };
  
  update();
  
  addEventListener("scroll", () => {
    delta = window.scrollY * 0.01 + 0.5;
  });  

  addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });