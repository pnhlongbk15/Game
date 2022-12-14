class GameObject {
    constructor(config) {
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "left";// part 4

        this.figure = new Figure({
            gameObject: this,
            src: config.src || "./static/images/characters/people/hero.png", 
        })

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }
    mount(map) {
        console.log("mounting!")
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // if we have a behavior, kick off after a short delay
        setTimeout(()=>{
            this.doBehaviorEvent(map);
        },10)
    }
    async doBehaviorEvent(map){

        // Don't do anything if there is a more important cutscene or I don't have config to do anything anyway.
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
            return;
        }
        // setting up our event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;
        
        // Create an event instance out of our next event config
        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init();

        // Setting the next event to fire
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }
        // Do it again!
        this.doBehaviorEvent(map)
    }
    update() {
        
    }
}