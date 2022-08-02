class Figure {
    constructor (config) {
        // set up the image for figure
        this.image = new Image();
        this.image.src = config.src;

        this.image.onload = () => {
            this.isLoaded = true;
        }

        // shadow for figure
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false
        if (this.useShadow) {
            this.shadow.src = "./static/images/characters/shadow.png";
        }
        this.shadow.onload = ()=>{
            this.isShadowLoaded = true;
        }

        // configure animation & initial state
        this.animations = config.animations || {    // part 5: animation
            "idle-down"     : [ [0,0] ],
            "idle-right"    : [ [0,1] ],
            "idle-up"       : [ [0,2] ],
            "idle-left"     : [ [0,3] ],
            "walk-down"     : [ [1,0],[2,0],[3,0],[0,0] ],
            "walk-right"    : [ [1,1],[2,1],[3,1],[0,1] ],
            "walk-up"       : [ [1,2],[2,2],[3,2],[0,2] ],
            "walk-left"     : [ [1,3],[2,3],[3,3],[0,3] ],
        }

        // this.currentAnimation =      ; config.currentAnimation || "idle-down";
        this.currentAnimation = ""; // modify by myself
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animetionFrameProgress = this.animationFrameLimit;

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    

    setAnimation(key){
        
        if (this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    get frame() { // part 5
        return this.animations?.[this.currentAnimation]?.[this.currentAnimationFrame]; // ?. add by myself
    }

    updateAnimationProgress(){ // part 5
        // Downtick frame progress
        if (this.animetionFrameProgress > 0){
            this.animetionFrameProgress -= 1;
            return;
        }

        // Reset the counter
        this.animetionFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {

        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow,x-2,y+2);

        const [frameX, frameY] = this.frame || [0,0];  // modify by myself

        this.isLoaded && ctx.drawImage(
            this.image,
            frameX*32 , frameY*32 ,32,32,
            x,y,32,32,
        )

        this.updateAnimationProgress();
    }
}