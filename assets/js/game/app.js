function include(file) { 
  
    var script  = document.createElement('script'); 
    script.src  = file; 
    script.type = 'text/javascript'; 
    script.defer = true; 
    
    document.getElementsByTagName('head').item(0).appendChild(script); 
    
} 

include('assets/js/game/game_variable.js'); 
include('assets/js/game/send_score.js'); 
include('assets/js/game/ui.js'); 
include('assets/js/game/.js'); 
include('assets/js/game/.js'); 
include('assets/js/game/.js'); 