const ROWS = 21;
const COLS = 21;
const SQUARE_SIZE = 30;
const SIZE = ROWS*COLS-1;
const POP_SIZE = 10;
const ELITISM_RATE = 0.3;
const MUTATION_RATE = 0.1;
var grid = [];
var gBestPSO = 100000;
var gBest_x = -9999;
var gBest_y = -9999;
var phi1 = 0.2;
var phi2 = 0.8;
var individuals = [];
var particles = [];
var running = -1; // -1 neither running, 0 ga running 1 pso running

function mapCoodinates(x,y){
    return [-int(ROWS/2)+y,int(COLS/2)-x];
}
function pos(x,y){
    return (x*ROWS + y);
}
function matyas(x_,y_){
    var coords = mapCoodinates(x_,y_);
    var x = coords[0];
    var y = coords[1];
    return 0.26*(x*x + y*y) - 0.48
}
function booth(x,y){
    return Math.pow((x+2*y-7),2) + Math.pow((2*x+y-5),2) 
}
function setup(){
    createCanvas(ROWS*SQUARE_SIZE,COLS*SQUARE_SIZE);
    for(var i=0;i<ROWS;i++)
    {
        for(var j=0;j<COLS;j++)
        {
            //x,y,valor
            var cell = new Cell(i,j);
            grid.push(cell);
            
        }
    }
    running = -1;
}
/*function _map(x,y){
    return [int(ROWS/2)-y,int(COLS/2)+x];
}*/
function initialize(){
    individuals = [];
    for(var i=0;i<POP_SIZE;i++){
        var xRnd = Math.floor(Math.random() * 21);
        var yRnd = Math.floor(Math.random() * 21);
        individuals.push(new Individual(xRnd,yRnd));
    }
    running = 0;
}
function initializePSO(){
    particles = [];
    for(var i=0;i<POP_SIZE;i++){
        var xRnd = Math.floor(Math.random() * 21);
        var yRnd = Math.floor(Math.random() * 21);
        particles.push(new Particle(xRnd,yRnd));
    }
    running = 1;
    //console.log(particles);
}
function sigmoid(a){
    return 1/(1+Math.exp(-a));
}
function nextStepPSO(){
    //calculate pbest & gbest
    
    for(let particle of particles){
        var pdist = matyas(particle.x,particle.y);
        if(pdist < particle.pbestScore){
            pbest = pdist;
            particle.pbest_x = particle.x;
            particle.pbest_y = particle.y;
        }
        if(pdist < gBestPSO){
            gBestPSO = pdist;
            gBest_x = particle.x;
            gBest_y = particle.y;
        }
    }

    //update velocity and position
    for(let particle of particles){
        var c1 = Math.random() * phi1;
        var c2 = Math.random() * phi2;
        particle.vx = particle.vx + c1*(particle.pbest_x-particle.x) + c2*(gBest_x-particle.x);
        particle.vy = particle.vy + c1*(particle.pbest_y-particle.y) + c2*(gBest_y-particle.y);

        var sigmx = sigmoid(particle.vx);
        var sigmy = sigmoid(particle.vy);

        if(sigmx < 0.25) particle.vx = -1;
        else if(sigmx > 0.75) particle.vx = 1;
        else particle.vx = 0;

        if(sigmy < 0.25) particle.vy = -1;
        else if(sigmy > 0.75) particle.vy = 1;
        else particle.vy = 0;  
        //console.log(particle.vy);
        particle.x = particle.x + particle.vx;
        particle.y = particle.y + particle.vy;
    }
}
function calculateFitness(){
    for(let individual of individuals){
        individual.setFitness(matyas(individual.x,individual.y));
    }
}
function compare(a,b) {
    return (a.fitness > b.fitness);
}
function crossover(ind1,ind2){
    var newInd = new Individual(ind1.x,ind2.y);
    return newInd;
}
function nextStep(){
    calculateFitness();
    var newPop = [];
    individuals.sort(compare);
    var drawn = int(POP_SIZE*ELITISM_RATE);
    for(var i=0;i<drawn;i++){
        newPop.push(individuals[i]);
    }
    while(newPop.length < POP_SIZE){
        var newOffspring;
        var drawnInd1;
        var drawnInd2;
        //let weak individuals crossover with low probability
        if(Math.random() < 0.05){
            var index1 = Math.floor(Math.random() * POP_SIZE);
            var index2 = Math.floor(Math.random() * POP_SIZE); 
            drawnInd1 = individuals[index1];
            drawnInd2 = individuals[index2];      
        } 
        else{
            var index1 = Math.floor(Math.random() * newPop.length);
            var index2 = Math.floor(Math.random() * newPop.length);
            drawnInd1 = newPop[index1];
            drawnInd2 = newPop[index2];
        } 
        newOffspring = crossover(drawnInd1,drawnInd2);
        if(Math.random() < MUTATION_RATE){
            newOffspring.mutate();
        }
        newPop.push(newOffspring); 
    }
    individuals = newPop;
}
function draw(){
    background(0);
    for(var i=0;i<ROWS;i++)
    {
        for(var j=0;j<COLS;j++){
            var  r = map(matyas(i,j),0,51,0,255);
            var  b = map(matyas(i,j),0,51,255,0);
            grid[pos(i,j)].show(r,0,b);    
        }
        
    }
    if(running == 0){
        for(let individual of individuals){
            individual.show();
        }
    }
    else if(running === 1){
        for(let particle of particles){
            particle.show();
        }
    }
}