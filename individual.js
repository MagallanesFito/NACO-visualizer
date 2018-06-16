function Individual(x,y){
	this.x  = x;
	this.y = y;
	this.fitness = Infinity; //100000;
}
Individual.prototype.show = function(){
	var x = this.x*SQUARE_SIZE;
        var y = this.y*SQUARE_SIZE;
        noStroke();
        
        fill(0,255,0);
        ellipse(y+15,x+15,15,15);
        noStroke();        
}
Individual.prototype.setFitness = function(value){
	this.fitness = value;        
}
Individual.prototype.mutate = function(){
	var steps = [-1,0,1]; //revisar para [-1,1]
	var index = Math.floor(Math.random() * steps.length);
	this.x = this.x+steps[index];
	index = Math.floor(Math.random() * steps.length);
	this.y = this.y+steps[index];
}
