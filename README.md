# Graphics
Some assignments and projects in Computer Graphics.


Procedural landscape repo @ https://github.com/pjo256/niarret

To model erosion, we implemented an erosion algorithm proposed by Musgrave[1989]. Moisture and sediment for a given vertex are transferred to neighbours at a smaller altitude, modelling flow. The resultant moisture values are used to specify a class of biomes, ranging from dryness to wetness. Noise is added to a temperature component, and is inversely related to altitude. This specifies a second class of biomes: freezing to warm. The intersection of these classes gives one particular climate, and a we used a gradient to map regions to some smooth colors depending on temperature, altitude, and moisture. Lastly, we introduced a concept of macro-climate. Regions of the map have a moisture and temperature offset to bias their climates, giving biomes a more consistent feel. The erosion algorithm has a set iteration that you can play around with, just need to wait a bit longer per load.

Prior to rendering, we sweep over the terrain to average vertex heights: height becomes the average value of neighbouring altitudes.

There's a camera attached to the mouse, so you can freely roam about the landscape using WASD and mouse movements. Use R and F to control position along the vertical axis. Furthermore, both heat and moisture maps can be toggled by pressing 2 and 3. 1 toggles the biome view. 'E' generates a new terrain. 

# Running

```
npm install
npm start
```
