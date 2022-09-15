/* Lecture 4
 * CSCI 4611, Fall 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class SpaceMinesweeper extends gfx.GfxApp
{
    private ship: gfx.Rectangle;
    private star: gfx.Rectangle;
    private mine: gfx.Rectangle;

    // These transforms are "groups" that are used to hold instances
    // of the same base object when they need to be placed in the scene
    // multiple times. They contain an array called .children that
    // you can iterate through to access all these objects.
    private stars: gfx.Transform2;
    private mines: gfx.Transform2;

    private mousePosition: gfx.Vector2;

    private timeSinceLastMineSpawn: number;

    constructor()
    {
        // The first line of any child class constructor must call
        // the base class's constructor using the super() method. 
        super();

        this.ship = new gfx.Rectangle();
        this.star = new gfx.Rectangle();
        this.mine = new gfx.Rectangle();
        this.stars = new gfx.Transform2();
        this.mines = new gfx.Transform2();
        this.mousePosition = new gfx.Vector2();
        this.timeSinceLastMineSpawn = 0;

        this.renderer.viewport = gfx.Viewport.CROP;
    }

    createScene(): void 
    {
        this.star.material.texture = new gfx.Texture('./star.png');

        const numStars = 200;
        for(let i=0; i < numStars; i++)
        {
            const starInstance = new gfx.ShapeInstance(this.star);
            const starSize = Math.random() * 0.01;
            starInstance.scale.set(starSize, starSize);
            starInstance.position.set(Math.random()*2-1, Math.random()*2-1);
            this.stars.add(starInstance);
        }

        // Load the mine texture to make the object a sprite, then scale it 
        // to an appropriate size.
        this.mine.material.texture =  new gfx.Texture('./mine.png');
        this.mine.scale.set(0.12, 0.12);
    
        this.ship.material.texture = new gfx.Texture('./ship.png');

        this.ship.scale.x = 0.08;
        this.ship.scale.y = 0.08;

        this.scene.add(this.stars);
        this.scene.add(this.mines);
        this.scene.add(this.ship);
    }

    update(deltaTime: number): void 
    {
        const mineSpawnInterval = .5;

        this.ship.lookAt(this.mousePosition);

        this.timeSinceLastMineSpawn += deltaTime;
        if(this.timeSinceLastMineSpawn >= mineSpawnInterval)
        {
            this.spawnMine();
            this.timeSinceLastMineSpawn = 0;
        }
    }

    onMouseMove(event: MouseEvent): void {
        this.mousePosition = this.getNormalizedDeviceCoordinates(event.x, event.y);
    }

    private spawnMine(): void
    {
        const mineSpawnDistance = 1.25;
        
        const mineInstance = new gfx.ShapeInstance(this.mine);

        mineInstance.rotation = this.ship.rotation + (Math.random() * Math.PI / 3 - Math.PI / 6);
        mineInstance.translateY(mineSpawnDistance);
        this.mines.add(mineInstance);
    }
}