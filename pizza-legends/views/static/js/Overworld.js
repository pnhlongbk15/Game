class Overworld {
  constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector('.game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.map = null;
  }

  startGameLoop(){
    const step = () => {
      /* main content of function step */

      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Establish the camera person
      const cameraPerson = this.map.gameObjects.hero; //overworldMap

      // Update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({ // object = new Person
          arrow: this.directionInput.direction,
          map: this.map,
        })
        object.figure.draw(this.ctx, cameraPerson);
      })

      // Draw Lower layer
      this.map.drawLowerImage(this.ctx,cameraPerson);

      // Draw Game Objects
      Object.values(this.map.gameObjects).sort((a,b)=>{
        return a.y - b.y;
      }).forEach(object => {
        object.figure.draw(this.ctx, cameraPerson);
      })

      // Draw Upper layer
      this.map.drawUpperImage(this.ctx,cameraPerson);

      // loop
      requestAnimationFrame(()=>{
        step();
      })
    }
    step()
  }

  init(){
    // start 
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    
    this.map.mountObjects();
    
    // Direction
    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map.startCutscene([
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "npcA", type: "walk", direction: "left" },
      { who: "npcA", type: "walk", direction: "left" },
      { who: "npcA", type: "stand", direction: "up", time: 800 },

    ])
  
  }
}