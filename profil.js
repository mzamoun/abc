function editProfilUser(e) {
   // notImplemented();
   console.log(e);
   var msg = JSON.stringify(e.data);
   msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
   console.log('msg:' + msg+'.');
   if(msg.startsWith('ERROR')) {
        showError("<p>Info Login:</p>"  + msg );
   }else {
        notImplemented();
   }

}
////////
function onProfilUserClick(e) {
    
    var myData = {
        cmd: 'editProfilUser',
        email : username,
        callbackFun : 'editProfilUser'
    };
    
    callAjaxPost(e, myData);  
}

////////////

function showProfilAll() {
    notImplemented();
}