
var c, ctx;
window.addEventListener('load', function () {
    c = document.getElementById("paintbox");
    ctx = c.getContext("2d");
    document.getElementById("outputcode").innerHTML='#include <stdio.h>\n#include<conio.h>\n#include<graphics.h>\n\tint main() {\n\tint gd=DETECT, gm;\n\tinitgraph(&gd, &gm, " ");\n\tsetbkcolor(WHITE);\n\tcleardevice();';
})
var x1;
var y1;
var constr = 1;
var shape="line";
var color="black";


function drawEvent(event) {
    let x = Math.round(event.clientX/10)*10;
    let y = Math.round(event.clientY/10)*10;
    
    
    if(document.getElementById("outputcode").innerHTML.slice(-1)==";"){
        let add;
        if(shape == "line"){
            add = "line("+x+","+y;
        }
        if(shape == "circle"){
            add = "circle("+x+","+y;
        }
        if(shape == "rectangle"){
            add = "rectangle("+x+","+y;
        }
        document.getElementById("outputcode").innerHTML = document.getElementById("outputcode").innerHTML + "\n\t" + add;
        x1=x;
        y1=y;
    }else{
        if(constr==1 && x1!=null && shape=="line"){
            if(Math.abs(x1-x)>Math.abs(y1-y)) y=y1;
            else x=x1
        }
        let add;
        if(shape=="line") {
            drawLine(x1,y1,x,y);
            add = ","+x+","+y+");";
        }
        if(shape=="circle"){
            let r = Math.sqrt(Math.pow(Math.abs(x1-x), 2) + Math.pow(Math.abs(y1-y), 2));
            drawCircle(x1,y1,r);
            add = ","+r+");";
        }
        if(shape=="rectangle"){
            drawRect(x1,y1,x,y);
            add = ","+x+","+y+");";
        }

        document.getElementById("outputcode").innerHTML = document.getElementById("outputcode").innerHTML + add;
    }
}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
function drawCircle(x,y,r){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function drawRect(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.strokeRect(x1, y1, x2-x1, y2-y1);
    ctx.closePath();
}
function toolSelect(obj){
    shape = obj.className;
}
function setColor(obj){
    color = obj.className;
    add = "setcolor("+color.toUpperCase()+");";
    document.getElementById("outputcode").innerHTML = document.getElementById("outputcode").innerHTML + "\n\t" + add;
}
function finalize(){
    add = "getch();\n\tclosegraph();\n\treturn 0;\n}";
    document.getElementById("outputcode").innerHTML = document.getElementById("outputcode").innerHTML + "\n\t" + add;
}
function constrain(){
    if(constr == 1) constr = 0;
    else constr = 1;
}