let canva = document.querySelector('canvas');
let ctx = canva.getContext('2d');

let button = document.querySelector('.button');

canva.width = window.innerWidth - (window.innerWidth/100*60);
canva.height = window.innerHeight;

let tailleCube = 48;
let grille = [20, 16];

let casesSpeciales = {
    'baseDeChargement': [[2, 19], [13, 19]],
    'stationDeChargement': [[7, 11], [8, 11]],
    'fileAttenteChargement': [[1, 17], [1, 18], [1, 19], [2, 19], [3, 19], [4, 19], [14, 17], [14, 18], [14, 19], [13, 19], [12, 19], [11, 19], [4, 18], [11, 18]]
}

function baseDeChargement(x, y){
    for(let element of casesSpeciales.baseDeChargement){
        if(element[0] == x && element[1] == y){
            console.log('base de chargement');  
        return true;
        }
    };
}

function stationDeChargement(x, y){
    return x == 7 && y == 11 || x == 8 && y == 11;
}

function fileAttenteChargement(x, y){
    return x == 1 && y > 16 || x > 2 && x<5 && y == 19 || x == 14 && y > 16 || x > 10 && x<13 && y == 19 || x == 4 && y == 18 || x == 11 && y == 18;
}

//draw grid
function drawGrid(){
    for(let i = 0; i < grille[1]; i++){
        for(let j = 0; j < grille[0]; j++){
            ctx.beginPath();
            ctx.rect(i * tailleCube, j * tailleCube, tailleCube, tailleCube);
            if(i == 0 && j>0 && j<grille[0]-3 || i == grille[1]-1 && j>0 && j<grille[0]-3 || j == 0 && i>0 && i<5 || j == 0 && i>grille[1]-6 && i<grille[1]-1 || i == 5 && j>0 && j<grille[0]-10 || i == grille[1]-6 && j>0 && j<grille[0]-10){
                ctx.fillStyle = 'grey';
                ctx.fill();
            }else if(j == grille[0]-10 && i > 4 && i <= grille[1]-6){
                ctx.fillStyle = 'black';
                ctx.fill();
    
            }else if(i > 0 && i < 5 && j > 0 && j < grille[0]-9 || i > grille[1]-6 && i < grille[1]-1 && j > 0 && j < grille[0]-9 || j >10 && j < grille[0] && i > 0 && i < grille[1]-1){
                ctx.fillStyle = 'cyan';
                ctx.fill();
            }
    
            if(baseDeChargement(i, j)){
                ctx.fillStyle = 'red';
                ctx.fill();
            }
    
            if(stationDeChargement(i, j)){
                ctx.fillStyle = 'yellow';
                ctx.fill();
            }
    
            if(fileAttenteChargement(i, j)){
                ctx.fillStyle = 'blue';
                ctx.fill();
            }
    
            ctx.strokeStyle = '#333';
            ctx.stroke();
            ctx.closePath();
        } 
    }
}


class Robot{

    constructor(x, y, direction){
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.radius = tailleCube/2-2;
    }

    draw(){
        //draw robot
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.x*tailleCube-tailleCube/2, this.y*tailleCube-tailleCube/2, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        //draw direction
        ctx.beginPath();
        ctx.moveTo(this.x*tailleCube-tailleCube/2, this.y*tailleCube-tailleCube/2);
        ctx.lineTo(this.x*tailleCube-tailleCube/2 + this.radius * Math.cos(this.direction), this.y*tailleCube-tailleCube/2 + this.radius * Math.sin(this.direction));
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    }

    up(){
        this.y--;
        this.draw();
    }

    down(){
        this.y++;
        this.draw();
    }

    left(){
        this.x--;
        this.draw();
    }

    right(){
        this.x++;
        this.draw();
    }

}

let robot = new Robot(11, 12, Math.PI*2);
robot.draw();
drawGrid();

let instructions = [robot.right(), robot.down(), robot.left(), robot.up()];

