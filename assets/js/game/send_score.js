function sendScore(score){

    var scoreToSend = score;
    var pseudo = "ZZZ";
   
    if(!$('#pseudo').val() == ""){
        pseudo = $('#pseudo').val().toUpperCase();
    }
    if(scoreToSend > 0){

        $.ajax({
            method: "POST",
            data:{score:scoreToSend,pseudo:pseudo},
            url:"updatescore.php",
        })
        .done(function(result){ 
            //SI SOUCIS POUR ENVOYER LE SCORE C EST ICI QUE CA SE PASSE
            //console.log(result)

            //On charge le highscore après s'être assuré que le score est dans la base de donnée
            //Comme Ajax est asynchrone
            $.getJSON('highscore.php',jsonCallBack);

            function jsonCallBack(data){
                if(data != undefined){
                    highscore = data.score[0].score;
                    hiScore = data.score[0].score;

                    var html = "<li class='list__header clearfix'>"+"<div>"+"Rank"+"</div>"+"<div>"+"Score"+"</div>"+"<div>"+"Name"+"</div>"+"</li>";

                    for(var i = 0; i < 10 && data.score[i].pseudo != undefined; i++){
                        $(".top10").html(html += "<li class='list__el clearfix'>"+ "<div>"+ (i+1) +"</div>" +"<div>" + data.score[i].score + "</div>" +  "<div>" + data.score[i].pseudo +"</div>" + "</li>");
                    }

                    $(".top10").html(html);
                }
            }
            jsonCallBack();
        });
    }
    //Polishing needed
    $('.pseudo__div').html('Thank you !');
    $('.pseudo__div').val().toUpperCase();
    $('.pseudo__div').css({'font-family':'PixelyishFont','font-size':'24px'});
}


    
