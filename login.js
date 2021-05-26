function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function enableElement(id, ok) {
    $('#' + id).attr('disabled', !ok);
    var bgColorOk = '#37a69b';
    var bgColorKo = 'gray';
    $('#' + id).css('background-color', ok? bgColorOk:bgColorKo);
}

function addEventValidUsername(listBtns) {

    for(var i=0; i<listBtns.length; i++) {
        enableElement(listBtns[i] , false);
    }

    var el = $("#username");
    el.on('keyup', function () {
        for(var i=0; i<listBtns.length; i++) {
            enableElement(listBtns[i] , isEmail(el.val()));
        }
    });
}

function onLogin(e) {
    console.log(e);
    var msg = JSON.stringify(e.data);
    msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
    console.log('msg:' + msg+'.');
    if(msg.startsWith('ERROR')) {
        showError("<p>Info Login:</p>"  + msg );
    }else {
        editProfilUser();
    }

} 

//////////////
function onLoginClick(e) {
    e.preventDefault();
    hideInfos();
    
    var myData = {
        cmd: 'login',
        email : $("#username").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
        password : $("#password").val(),
        callbackFun : 'onLogin'
    };
    
    $.ajax({
        type: 'POST',
        crossDomain: true,
        url: url ,
        data: myData,
        dataType: "jsonp",
        success: function(e) {
            console.log('success', e);
        },
        error: function(e) {
            console.log('error', e);
        },
    });    
}

/////////////////////////////////

function onForgotPassword(e) {
    console.log(e);
    var msg = JSON.stringify(e.data);
    msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
    if(msg.startsWith('ERROR')) {
        showError("<p>Info Login:</p>"  + msg );
    }else {
        showSuccess("<p>Info Login:</p>"  + msg );
    }

} 

/////////////////////////////////

function onForgotPasswordClick(e) {

    if(!isEmail($("#username").val())) return;

    e.preventDefault();
    hideInfos();

    var myData = {
        cmd: 'resetPass',
        email : $("#username").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
        callbackFun : 'onForgotPassword'
    };

    $.ajax({
        type: 'POST',
        crossDomain: true,
        url: url ,
        data: myData,
        dataType: "jsonp",
        success: function(e) {
            console.log('success', e);
        },
        error: function(e) {
            console.log('error', e);
        },
    });    

}