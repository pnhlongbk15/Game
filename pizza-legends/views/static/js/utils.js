const utils = {
    withGrid(n) { // size of feet
      return n * 16;
    },
    asGridCoord(x,y){
      return `${x*16},${y*16}` ;
    },
    nextPosition(initialX, initialY, direction){
      let x = initialX ;
      let y = initialY ;
      const size = this.withGrid(1) ;
      
      if (direction === "left") {
        x -= size ;
      } else if (direction === "right") {
        x += size ;
      } else if (direction === "up") {
        y -= size ;
      } else if (direction === "down") {
        y += size ;
      }

      return {x,y};
    },
    emitEvent(name, detail){
      const event = new CustomEvent(name, {
        detail
      });
      document.dispatchEvent(event);
    }

  }

console.log(typeof(utils.withGrid))