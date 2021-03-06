
function showMenu() {

    username = getCookie("username");
    loadDiv("menu",  getCompoMenu() );
    if(isConnected()) {
        var prenom = userObj.Prenom;
        var nom = userObj.Nom;
        loadDiv("btnUserIcon",  prenom + " " + nom );
    }else {
        loadDiv("btnUserIcon",  'Login' );
    }

}

function getCompoMenuLogin() {
    var s = '';

    s = s +  '                <button id="menuLogin" class="btnMenu" onclick="showLogin()" >Login</button> '

    return s;
}

function getCompoMenuLoged() {
    restoreLoginInBrowser();

    if(!isConnected()) return '';

    var s = '';

    s = s +  '                <div class="nav-item dropdown btnUserIcon">'
    s = s +  '                    <div class="dropdown-toggle btnMenu" id="btnUserIcon" data-toggle="dropdown">'
    s = s +  '                      Dropdown User'
    s = s +  '                    </div>'
    s = s +  '                    <div class="dropdown-menu btnMenu box"  > '
    s = s +  '                         <li> <a class="dropdown-item btnMenu" > <button id="menuProfilUser" class="btnMenu " onclick="onProfilUserClick(event)" >Profil User</button> </a> '
    s = s +  '                         <li> <a class="dropdown-item btnMenu" > <button id="menuProfilAll" class="btnMenu " onclick="getProfilAllClick(event)" >Profil All</button> </a> '
    s = s +  '                         <li> <a class="dropdown-item btnMenu" > <button id="menuChat" class="btnMenu " onclick="onChatClick(event)" > Chat </button> </a> '
    if(userObj.Admin ) {
        s = s +  '                         <li> <a class="dropdown-item btnMenu" > <button id="menuAdmin" class="btnMenu " onclick="getCompoAdmin(event)" >Admin</button> </a> '
    }
    s = s +  '                         <li> <a class="dropdown-item btnMenu" > <button id="menuDisconnect" class="btnMenu " onclick="onDisConnected()" >Disconnect</button> </a> '
    s = s +  '                    </div>'
    s = s +  '                </div>'

    return s;
}

function openMenuUser(e) {
    e.stopPropagation();

    var el = $('#btnUserIcon');
    if(el)    {el.dropdown('toggle'); }
    else {
        debug('el btn user is NULL!!')
    }
}

function getCompoMenuUser() {
    var s = '';

    if(isConnected()) {
        s = getCompoMenuLoged();
    }else {
        s = getCompoMenuLogin();
    }

    return s;
}

function getCompoMenuAll() {
    var s = '';

    s = s +  '    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbarAll">'
    s = s +  '      <span class="icon-bar"></span>'
    s = s +  '      <span class="icon-bar"></span>'
    s = s +  '      <span class="icon-bar"></span>'             
    s = s +  '    </button>'
    
    s = s +  '  <div class="collapse navbar-collapse navbar-right" style="float:right;" id="myNavbarAll">'
    s = s +  '   <ul class="nav navbar-nav" id="menusAll" > '
    s = s +  '       <li> <button id="menuInfos" class="btnMenu" onclick="showInfos()" >Infos</button> </li> '
    s = s +      '</ul>'
    s = s +  '  </div>'

    return s;
}

function getCompoMenuAcceuil() {
    var s = '';

    s = s +  '    ' + getElement('div', {id:"btnAcceuil", class:"navbar-brand btnAcceuil btnMenu", onclick:"showAcceuil();"}, 'Acceuil') ;

    return s;
}

function getCompoMenu() {
    var s = '';

    s = s +  '<nav class="navbar navbar-inverse">'
    s = s +  ' <div class="container-fluid">'
    s = s +  '  <div class="navbar-header">'
    s = s +  getCompoMenuAcceuil()
    s = s +  getCompoMenuAll()
    s = s +  getCompoMenuUser()
    s = s +  ' </div>'
    s = s +  '</nav>'

    return s;
}
