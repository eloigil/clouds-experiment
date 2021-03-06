'use strict';

class Animation {
  constructor (canvas, ctx) {
    this.ctx = ctx;

    this.width = canvas.width;
    this.height = canvas.height;

    this.horizon = {
      x: this.width / 2,
      y: this.height * 0.6
    };
    this.maxZ = 100;

    this.floor = null;
    this.clouds = [[], [], []];

    this.renderEngine = new RenderEngine(this.ctx, this.width, this.height, this.horizon, this.maxZ);

    this.intervalTime = 25;
    this.time = 0;
    this._start();
  }

  _start () {
    this._createFloor();
    this._interval = setInterval(() => { this._update(); }, this.intervalTime);
    this.renderEngine.render();
  }

  _createFloor () {
    this.floor = {
      y: this.horizon.y,
      color: '#a9f27b'
    };

    this.renderEngine.floor = this.floor;
  }

  _createClouds () {
    for (let ix = 0; ix < 3; ix++) {
      if (this.clouds[ix].length < 15 && this.time % 1000 === 0) {
        const z = 100 - ix * 30;
        this.clouds[ix].push(new Cloud(this.width, this.height, z));
        this.renderEngine.clouds = this.clouds;
      }
    }
  }

  _updateTime () {
    this.time += this.intervalTime;
  }

  _destroyCloud (line, index) {
    this.clouds[line].splice(index, 1);
  }

  _update () {
    this._updateTime();

    this._createClouds();
    this.clouds.forEach((cloudsLine, line) => {
      cloudsLine.forEach((cloud, index) => {
        cloud.checkIfEnded() ? this._destroyCloud(line, index) : cloud.update(); // @ shifting error when destroy cloud
      });
    });
  }
}
