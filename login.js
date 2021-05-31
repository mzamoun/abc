
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

///////////////////////////
function addEventValidElement(el, listBtns) {

    for(var i=0; i<listBtns.length; i++) {
        enableElement(listBtns[i] , false);
    }

    el.on('keyup', function () {
        for(var i=0; i<listBtns.length; i++) {
            enableElement(listBtns[i] , isEmail(el.val()));
        }
    });
}  

function addEventValidUsername(listBtns) {

    var el = $("#username");
    addEventValidElement(el, listBtns);
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
function onConnected(e) {
    console.log('onConnected: ', e);
    userObj = e.data;
    username = userObj.Email;

    setCookie("username", username);
    setCookie('userObj', JSON.stringify(userObj));

    showMenu();
    showAcceuil();

}
function onDisConnected() {
    ConfirmDialog('Do you want to disconnect ?', 
        function() {
            userObj='';
            username = '';
            setCookie("username", username);
            setCookie("userObj", userObj);
            showMenu();
            showLogin();
        },
        function() {
            ;
        }
    );


}

  //////////////////

function onLogin(e) {
    console.log('onLogin: ', e);
    var msg = JSON.stringify(e.msg);
    msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
    console.log('msg:' + msg+'.');
    if(msg.startsWith('ERROR')) {
        showError("<p>Info Login:</p>"  + msg );
    }else {
        onConnected(e);
    }

} 

//////////////
function onLoginClick(e) {

    console.log('onLoginClick: ', e);
    
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
    var msg = JSON.stringify(e.msg);
    msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
    if(msg.startsWith('ERROR')) {
        showError("<p>Info onForgotPassword:</p>"  + msg );
    }else {
        showSuccess("<p>Info onForgotPassword:</p>"  + msg );
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