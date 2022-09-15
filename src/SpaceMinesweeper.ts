/* Lecture 4
 * CSCI 4611, Fall 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class SpaceMinesweeper extends gfx.GfxApp
{
    private ship: gfx.Rectangle;

    constructor()
    {
        // The first line of any child class constructor must call
        // the base class's constructor using the super() method. 
        super();

        this.ship = new gfx.Rectangle();
    }

    createScene(): void 
    {
        this.ship.material.texture = new gfx.Texture('./ship.png');

        this.ship.scale.x = 0.12;
        this.ship.scale.y = 0.12;

        this.scene.add(this.ship);
    }

    update(deltaTime: number): void 
    {
        
    }
}