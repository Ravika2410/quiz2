var ques=[];
var a,b,c,d,index;
var ai,bi,ci,di;
var score;
var playerCount;
var na,submit;
var db, player;
var dp;
var a;
var bg,bgd;
var bga;
var hap1 ,py;
var sa,d;
var ave,hap;

function preload()
{
    ai = loadImage("a.png");
    bi = loadImage("b.png");
    ci = loadImage("c.png");
    di = loadImage("d.png");
    dp=loadImage("dp.png");
    bg=loadImage("bg.png");
   // bga=loadImage("er.webp");
    py=loadImage("h.png");
    hap=loadImage("as.png");
    d=loadImage("s.png");
}

function setup()
{
    createCanvas(800, 700);
    db = firebase.database();
    na = createInput("Enter Name here: ");
    na.position(width/2-100 , height/2+40);
    na.size(200, 30);
    submit = createButton("START");
    submit.position(width/2 - 50, height/2+50+40);
    submit.size(80, 30);
   /* bgd=createSprite(400,200);
    bgd.addImage(bg);
    bgd.scale=0.5;*/

    index = -1;
    score = 0;

    ques=[
        ["Who is Doraemon's best friend?","Nobita","Jian","Suneo","Sizuka",1],
        ["Who is Jian's sister?","Shizuka","Jackio","Mi Chan","None Of These",2],
        ["Which of these statements \n is correct?","Doraemon is a dogrobot","Doraemon always listens \n to Nobita.","All Of These","None of these",4],
        ["The time when Nobita used the \n Multiplier bank he had \n how much money?","Rs 100","Rs 5","Rs 10","Rs 1",3], 
        ["Who likes to sing?","Suneo","Jian","Nobita","Shizuka",2]
    ]

    a = createSprite(450, 295, 20, 20);
    a.addImage(ai);
    a.scale = 0.04;
    a.visible = false;
    b = createSprite(450, 340, 20, 20);
    b.addImage(bi);
    b.scale = 0.4;
    b.visible = false;
    c = createSprite(450, 415, 20, 20);
    c.addImage(ci);
    c.scale = 0.2;
    c.visible =  false;
    d = createSprite(450, 465, 20, 20);
    d.addImage(di);
    d.scale = 0.3;
    d.visible = false; 

    hap1=createSprite(450, 295);
    hap1.addImage(py);
   // hap1.scale = 0.04;
    hap1.visible = false;
    sa=createSprite(450, 295);
    sa.addImage(d);
  //  sa.scale = 0.04;
    sa.visible = false;
    ave=createSprite(450, 295);
    ave.addImage(hap);
   // ave.scale = 0.04;
    ave.visible = false;

    db.ref("contestantCount").on("value",function(u){playerCount = u.val();});
    db.ref("gameState").on("value",function(d){index = d.val();})
    player = new Player();
    player.index = index

   if(player != undefined && playerCount == 2){player.index = 0;}


}

function draw()
{
    background(255);
    db.ref("contestantCount").on("value",function(u){playerCount = u.val();});
    db.ref("gameState").on("value",function(d){player.index = d.val();})
    if(player.index == -1 && index!=-1.5)
    {
        image(bg,100,100,200,200);
        submit.mousePressed(function(){
            console.log(1);
         //   bgd.visible=false;
      
            na.hide();
            submit.hide();
           var n = na.value();
           playerCount += 1;
           
           player.name = n;
           player.number = playerCount;
           console.log(player.number);
           db.ref("/").update({"contestantCount" : player.number});
           db.ref("Players/Player"+player.number).update({"Name" : player.name});
           index = -1.5;
           if(playerCount == 2)
           {
               player.index = 0
               db.ref("/").update({"gameState" : player.index});
               index=0;
           }
       
        });
        

    }else if(index == -1.5 && player.index == -1 && playerCount!=2)
    {
        textSize(30);
        fill("blue");
        text("Waiting for Player 2......", width/2-100, height/2);
    }
    else if(index < ques.length && player.index == 0  )
    {
        image(bga,0,0,width,height);
        a.visible = true;
        b.visible = true;
        c.visible = true;
        d.visible = true;
        textSize(30);
        fill("red");
        text(ques[index][0], 350, 200);
        textSize(25);
        fill("magenta");
        text(ques[index][1], 500, 300);
        text(ques[index][2], 500, 355);
        text(ques[index][3], 500, 425);
        text(ques[index][4], 500, 475);

    if(mouseIsOver(a) && mouseWentDown("leftButton")){check(1);}
    if(mouseIsOver(b) && mouseWentDown("leftButton")){check(2);}
    if(mouseIsOver(c) && mouseWentDown("leftButton")){check(3);}
    if(mouseIsOver(d) && mouseWentDown("leftButton")){check(4);}

    text("Score: "+player.score,600,50);
  

}  
else if(index==ques.length){
    a.visible = false;
    b.visible = false;
    c.visible = false;
    d.visible = false;
    textSize(50);
    text("GAME OVER", width/2 - 170, height/2);
    text("You have scored "+player.score+"/"+ques.length, width/2 - 220, height/2 + 50);
    if(player.score<=2)
    {
        sa.visible=true;
    } else 
    if(player.score<=4)
    {
        ave.visible=true;
    } else
    if(player.score=5)
    {
        hap1.visible=true;
    }

}
drawSprites();
}

function check(a)
{
   if(a == ques[index][5])
   {
       player.score += 1;
       db.ref("Players/Player"+player.number).update({"Score":player.score});
   }
   index+=1;
}

/*function docheck()
{
    if(score==5)
    {
        a=createSprite()
        a.addImage(dp)

    }
}*/