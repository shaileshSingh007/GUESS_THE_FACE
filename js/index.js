document.addEventListener('DOMContentLoaded', function(){
    // Declaring all the sounds 
    const arrowsclicksound = document.getElementById("arrowsclick");
    const gameoversound = document.getElementById("gameoversound");
    const winlevel = document.getElementById("wineachL");
    const clicksound = document.getElementById("clicksound");
    const correctsound = document.getElementById("correctsound");
    //localStorage.clear();
    let SCR = 0;
    let HSCR = parseInt(localStorage.getItem('LS_HSCR'),10)||0;
    $('#HighScore').text(HSCR);
    let livD =100;
    let timerInt;
    let seqInt;
    let timer = 100;

//initial image upload
 

// adding media quary for mobile and laptop
let windw = window.innerWidth;
let windH = window.innerHeight;
if(windw>windH){
    $('#container').css({'width':'30%','height':'100%'});
}else{
    $('#container').css({'width':'100%','height':'100%'});
}


//home page button
$("#GTF_but").on("click", function(){
    $(".app").fadeOut(10);
    $("#GTF_GB").fadeIn(10);
    $("#GTF_start").animate({"top":"80%" });   //appeared
    $("#GTF_Desc").animate({"top":"15%" });;   //appeared
    $('#GTF_progress').css({'width':'0%'});
    $("#set_SB").fadeOut(10);
    clicksound.play();
});

//image sequence display function
function seq(){
    let seqindex = 1;
    seqInt = setInterval(function(){
       if(seqindex<1076){
           $("#GTF_pics").css({"background":"url(./img/GTF_pics/"+seqindex+".jpg) no-repeat center/100% 100%"});
           seqindex++;
       } else {
           $('#G_GameWin').fadeIn();
           $('#F_score').text(SCR);
           $("#GTF_play,#GTF_pics,#GTF_lives,#GTF_score,#GTF_timer,#Game_back").fadeOut(500); 
           seqindex = 1; 
       }
       let ww = (seqindex/1076)*100;
       $('#GTF_progress').css({'width':+ww+'%'});
    },2000);
}

//60 seconds timer function 
function timerC(){
    timerInt = setInterval(function(){
       timer = timer-100/120;
       $("#GTF_timer").css({'width':+timer+'%'});
    },250);
}
 

 

//if matched function
function ifyes(){
    correctsound.play();
    if(timer>75){SCR = SCR+25;}else if(timer<75 && timer>50){SCR = SCR+20}else if(timer<50){SCR = SCR+15}
    $('#SCR_N').text(SCR);
    let sw = (SCR/1800)/100;
    $("#SCR_B").css({'width':+sw+'%'});
    $('#GTF_score').css({'box-shadow':'0px 0px 2px cyan'});
    setTimeout(function(){$('#GTF_score').css({'box-shadow':'2px 2px 5px black'})},500);
    clearInterval(timerInt); timer = 100; timerC();
 }

 //if not matched function
 function ifno(){
    gameoversound.play();
    livD = livD-20;
    $("#GTF_lives").css({'width':+livD+'%'});
    if (livD === 0) {gameover();}
 }

 //game over function
function gameover(){
    $('#GO_score').text('YOUR SCORE : '+SCR);
    $('#GTF_pics').css({'background':'transparent'});
    $("#GTF_play,#GTF_pics,#GTF_lives,#GTF_score,#GTF_timer,#Game_back").fadeOut(500);  //appeared
    $("#G_GameOver").show();
    clearInterval(timerInt);  timer = 100;
    clearInterval(seqInt);
    $('#SCR_N').text('0');
    let HSCR = parseInt(localStorage.getItem('LS_HSCR'),10)||0;
    if(SCR>HSCR){
        $('#HighScore').text(SCR);
        localStorage.setItem('LS_HSCR',SCR);  
    } else{
       $('#HighScore').text(HSCR);
 }
}


 const CorrMatch = [5,10,17,24,33,39,50,59,63,74,82,89,94,97,101,109,115,121,125,130,137,139,144,150,154,158,164,171,184,192,198,205,214,219,230,237,248,259,270,280,291,298,306,313,319,325,328,335,
    342,347,355,358,359,360,365,371,378,388,397,404,409,416,423,429,434,446,454,462,468,478,486,495,504,510,517,522,529,536,546,551,556,
    562,566,570,575,590,597,604,608,621,629,635,639,646,651,654,659,665,670,676,682,686,701,706,711,718,722,734,742,748,754,760,766,773,781,
    787,799,804,807,814,821,828,833,838,851,858,866,876,884,894,900,907,916,922,929,940,950,958,963,969,975,981,985,994,999,1010,1017,1023,1030,
    1033,1039,1046,1053,1058,1064,1069,1074]
  



//gAME START And all GTF game page loading
$("#GTF_start").click(function(){
    clicksound.play();
    $("#GTF_start").animate({"top":"130%"});   //removed
    $("#GTF_Desc").animate({"top":"-150%"});   //removed
    $("#GTF_play,#GTF_pics,#GTF_lives,#GTF_score,#GTF_timer,#Game_back").fadeIn(500);  //appeared
    timerC();
    setInterval(function(){ if(timer<=0){ gameover();} },1000);
    seq();
});




//game play click button
$("#GTF_play").on("click",()=> {
    //disable the button for next 3 seconds after click;
    $("#GTF_play").hide();
    setTimeout(function () { $("#GTF_play").show(); }, 2000);
    
    var backgroundImage = $('#GTF_pics').css('background-image');
    var number =parseInt(backgroundImage.match(/\d+(?=\.jpg)/)[0],10);
    let matched;
    for(i=0;i<=CorrMatch.length;i++){
      if(number===CorrMatch[i]){  matched = true; } 
             }
    if(matched){ ifyes(); } else { ifno(); }
});




$('#GO_back').on('click',function(){
    $("#G_GameOver").fadeOut();
    $(".app").fadeIn();
    $("#set_SB").fadeOut(10);
    $('#GTF_pics').css({'background':'transparent'});
    $("#GTF_play,#GTF_pics,#GTF_lives,#GTF_score,#GTF_timer,#Game_back").fadeOut(500);
    $("#GTF_GB").fadeOut(500);
    clicksound.play();
    livD =100;
    $("#GTF_lives").css({'width':'100%'});
});


$('#Game_back,#POM_back').on('click',function(){
    $(".app").fadeIn();
    $('#G_GameWin').fadeOut();
    clicksound.play();
    livD =100;
    clearInterval(timerInt);  timer = 100;
    clearInterval(seqInt);
    $('#SCR_N').text('0');
    $("#GTF_lives").css({'width':'100%'});
    let HSCR = parseInt(localStorage.getItem('LS_HSCR'),10)||0;
    if(SCR>HSCR){
        $('#HighScore').text(SCR);
        localStorage.setItem('LS_HSCR',SCR);  
       } else{
       $('#HighScore').text(HSCR);
       }
    $('#GTF_pics').css({'background':'transparent'});
    $("#GTF_play,#GTF_pics,#GTF_lives,#GTF_score,#GTF_timer,#Game_back").fadeOut(500);
    $("#GTF_GB").fadeOut(600);
    
});

$("#Game_set").on("click", function(){ $("#GTF_GB").fadeOut(10); $("#set_SB").fadeIn(10); clicksound.play(); });
 
});


 