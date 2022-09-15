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

    // These transforms are "groups" that are used to hold instances
    // of the same base object when they need to be placed in the scene
    // multiple times. They contain an array called .children that
    // you can iterate through to access all these objects.
    private stars: gfx.Transform2;

    private mousePosition: gfx.Vector2;

    constructor()
    {
        // The first line of any child class constructor must call
        // the base class's constructor using the super() method. 
        super();

        this.ship = new gfx.Rectangle();
        this.star = new gfx.Rectangle();
        this.stars = new gfx.Transform2();
        this.mousePosition = new gfx.Vector2();

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
    
        this.ship.material.texture = new gfx.Texture('./ship.png');

        this.ship.scale.x = 0.08;
        this.ship.scale.y = 0.08;

        this.scene.add(this.stars);
        this.scene.add(this.ship);
    }

    update(deltaTime: number): void 
    {
        this.ship.lookAt(this.mousePosition);
    }

    onMouseMove(event: MouseEvent): void {
        this.mousePosition = this.getNormalizedDeviceCoordinates(event.x, event.y);
    }
}