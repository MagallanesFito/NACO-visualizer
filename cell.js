function Cell(i,j){
    this.x = i;
    this.y = j;
           
    this.show = function(r,g,b) {
        var x = this.x*SQUARE_SIZE;
        var y = this.y*SQUARE_SIZE;
        noStroke();
        
        fill(r,g,b);
        rect(x,y,SQUARE_SIZE,SQUARE_SIZE);
        //stroke(0);
        
        line(x    , y    , x + SQUARE_SIZE, y);
        line(x + SQUARE_SIZE, y    , x + SQUARE_SIZE, y + SQUARE_SIZE);
        line(x + SQUARE_SIZE, y +SQUARE_SIZE, x    , y + SQUARE_SIZE);
        line(x    , y + SQUARE_SIZE, x    , y);
        noStroke();        
    }
    this.showCell = function(){
        var x = this.x*SQUARE_SIZE;
        var y = this.y*SQUARE_SIZE;
        noStroke();
        
        fill(0, 255, 0);
        rect(x,y,SQUARE_SIZE,SQUARE_SIZE);
        
        //line(x    , y    , x + SQUARE_SIZE, y);
        //line(x + SQUARE_SIZE, y    , x + SQUARE_SIZE, y + SQUARE_SIZE);
        //line(x + SQUARE_SIZE, y +SQUARE_SIZE, x    , y + SQUARE_SIZE);
        //line(x    , y + SQUARE_SIZE, x    , y);
        noStroke();        
    }
}