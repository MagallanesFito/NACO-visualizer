function Particle(x,y){
	this.x = x;
	this.y = y;
	this.vx = Math.random();
	this.vy = Math.random();
	this.pbestScore = 100000;
	this.pbest_x = -9999;
	this.pbest_y = -9999;
}
Particle.prototype.show = function(){
		var x = this.x*SQUARE_SIZE;
        var y = this.y*SQUARE_SIZE;
        noStroke();
        
        fill(244, 244, 66);
        ellipse(y+15,x+15,15,15);
        noStroke();        
}