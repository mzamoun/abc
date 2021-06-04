
function getCompoFormLogin() {
    var s = '';
    s = s + '<link rel="stylesheet" href="login.css">\n'
    s = s + '<form id="formLogin">';
        
    s = s+' <div class="login">'
    s = s + '  <h3 class="center"> Connexion: </h3>'
    s = s + '    <input type="text" placeholder="Email" id="username" autocomplete="username">  '
    s = s + '    <input type="password" placeholder="Password" id="password" autocomplete="current-password">  '

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

function saveLoginInBrowser() {
    setCookie("username", username);
    setCookie('userObj', JSON.stringify(userObj));
    setCookie('usersObj', JSON.stringify(usersObj));
    setCookie('usersObjFilter', JSON.stringify(usersObjFilter));
    setCookie('filtre', filtre);
}

function restoreLoginInBrowser() {
    username = getCookie('username');
    userObj = JSON.parse(getCookie('userObj'));
    usersObj = JSON.parse(getCookie('usersObj'));
    usersObjFilter = JSON.parse(getCookie('usersObjFilter'));
    if(!usersObjFilter) usersObjFilter=[]
    filtre = getCookie('filtre');
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
    hideInfos();
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
    //console.log('onConnected: ', e);
    userObj = e.data;
    username = userObj.Email;

    saveLoginInBrowser();

    showMenu();
    showAcceuil();

}
function onDisConnected() {
    ConfirmDialog('Do you want to disconnect ?', 
        function() {
            userObj='';
            username = '';
            saveLoginInBrowser();
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
    if(!isAjaxResultError(e, 'onLogin')) {
        onConnected(e);
    }else {
        console.log('onLogin NON TRUE');
    }
} 

//////////////
function onLoginClick(e) {

    //console.log('onLoginClick: ', e);
    
    var myData = {
        cmd: 'login',
        email : $("#username").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
        password : $("#password").val(),
        userGeo : JSON.stringify(userGeo),
        callbackFun : 'onLogin'
    };
    
    callAjaxPost(e, myData);    
}

/////////////////////////////////

function onForgotPassword(e) {
    if(!isAjaxResultError(e, 'onForgotPassword') ) {
        showSuccess("<p>Info onForgotPassword:</p>"  + e.msg );
    }else {
        console.log('onForgotPassword NON TRUE');
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
////////////
// function getInfosOnEnter() {
//     if(userGeo == null || userGeo == ''){

//         $.ajax({
//             type: 'POST',
//             crossDomain: true,
//             url: "https://api.ipify.org?format=json" ,
//             data: {},
//             dataType: "jsonp",
//             success: function(data) {
//                 userIp = data.ip;
//                 console.log('userIp', userIp)
//                 //
//                 $.ajax({
//                     type: 'GET',
//                     crossDomain: true,
//                     url: 'https://ip-api.com/json/' + userIp ,
//                     //data: myData,
//                     dataType: "jsonp",
//                     success: function(data2) {
//                         userGeo = data2;
//                         console.log('userGeo', userGeo)
//                     },
//                     error: function(err2) {
//                         console.log('call geo : error', err2);
//                     }
//                 });
//                 //
//             },
//             error: function(err) {
//                 console.log('call ip : error', err);
//             }
//         }); 

//     }
// }
////////////
function getInfosOnEnter() {
    if(userGeo == null || userGeo == ''){
        $.getJSON("https://api.ipify.org?format=json",
        
            function(data) {
                userIp = data.ip;
                console.log('userIp', userIp)
                // $.getJSON('https://ip-api.com/json/' + userIp, 
                //     // function(dd) {
                //     //     userGeo = dd;
                //     //     console.log('userGeo', userGeo)
                //     //     //console.log(userGeo.country + ', ' + userGeo.city)
                //     // }
                //     {}
                // ) .done(function() {
                //     console.log( "second success" );
                //   })
                //   .fail(function() {
                //     console.log( "error" );
                //   })
                //   .always(function() {
                //     console.log( "complete" );
                //     console.log('userGeo', userGeo)
                //   });

                $.ajax({
                    // type: 'GET',
                    crossDomain: true,
                    url: 'http://ip-api.com/json/' + userIp ,
                    data: {},
                    dataType: "json",
                    success: function(data2) {
                        userGeo = data2;
                        console.log('userGeo', userGeo)
                    },
                    error: function(err2) {
                        console.log('call geo : error', err2);
                    }
                });
            }
        
        );
    }
}
/////////////
