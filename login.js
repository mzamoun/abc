
function getCompoFormLogin() {
    var s = '';
    s = s + '<link rel="stylesheet" href="login.css">\n'
    s = s + '<form id="formLogin">';
        
    s = s+' <div class="login">'
    s = s + '  <h3 class="center"> Connexion: </h3>'
    s = s + '    <input type="text" placeholder="Email" id="username">  '
    s = s + '    <input type="password" placeholder="Password" id="password">  '

    s = s + '        <a id="forgotPassword" href="#" class="forgot" onclick="return onForgotPasswordClick(event);">forgot password?</a>'

    s = s + '  <input type="submit" id="btnLogin" value="Sign In">'

    s = s +  ' <!-- <div class="shadow"></div> -->'
    s = s + ' </div>'

    s = s + '</form>'

    s = s + '<script>'
    s = s + '$(document).ready(function(){'
    s = s + '   //hideInfos();\n'
    s = s + '   $("#btnLogin").click(function(e){ onLoginClick(e); });'
    s = s + '   addEventValidUsername(["btnLogin", "forgotPassword"]);'
    s = s + ' }); '
    s = s + '</script>'

    return s;
}

////////////

function showLogin() {
    //loadDiv("menu",  '' );
    loadDiv("compo",  getCompoFormLogin() );
}

///////////////

function isConnected() {
    username = getCookie("username");
    ok = false;
    if (username != null && username != '') {
        ok = true;
    }
    return ok;
}
function onConnected() {
    username = $("#username").val();
    setCookie("username", username);
    showMenu();
    loadDiv("btnUserIcon",  username );
    showAcceuil();

}
function onDisConnected() {
    username = '';
    setCookie("username", username);
    loadDiv("btnUserIcon",  username );
    showLogin();

}

  //////////////////

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
        onConnected();
    }

} 

//////////////
function onLoginClick(e) {
    
    var myData = {
        cmd: 'login',
        email : $("#username").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
        password : $("#password").val(),
        callbackFun : 'onLogin'
    };
    
    callAjaxPost(e, myData);    
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
    
    var myData = {
        cmd: 'resetPass',
        email : $("#username").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
        callbackFun : 'onForgotPassword'
    };

    callAjaxPost(e, myData);  

}