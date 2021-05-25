function onLogin  (e) {
    console.log(e);
    var msg = JSON.stringify(e.data);
    msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
    if(msg.startsWith('ERROR')) {
        setErrorAndShow("<p>Info Login:</p>"  + msg );
    }else {
        // setSuccessAndShow("<p>Info Login:</p>"  + msg );
        editProfilUser();
        showProfils();
    }

} 

/////////////////////////////////

function onForgotPassword() {
    setErrorAndShow("<p>Tu as oublié ton pass !!?? </p>" );
}