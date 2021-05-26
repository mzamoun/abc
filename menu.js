function showAcceuil() {

}

function getCompoMenu() {
    var s = '';

    s = s +  '<nav class="navbar navbar-inverse">'
    s = s +  ' <div class="container-fluid">'
    s = s +  '  <div class="navbar-header">'
    s = s +  '    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">'
    s = s +  '      <span class="icon-bar"></span>'
    s = s +  '      <span class="icon-bar"></span>'
    s = s +  '      <span class="icon-bar"></span>           '             
    s = s +  '    </button>'
    s = s +  '  <div id="btnAcceuil" class="navbar-brand btnAcceuil" onclick="showAcceuil();" >Acceuil </div>'
    s = s +  '  <div id="btnUserIcon" class="navbar" style="float:right; color: white;" onclick="editProfilUser();" > </div>'

    s = s +  '  <div class="collapse navbar-collapse navbar-right" id="myNavbar">'
    s = s +  '   <ul class="nav navbar-nav" id="menusPage" > '
    s = s +  '       <li> <button id="menuDisconnect" class="btnMenu" onclick="onDisConnected()" >Disconnect</button> </li> '
    s = s +  '       <li> <button id="menuProfilUser" class="btnMenu" onclick="editProfilUser()" >Profil User</button> </li> '
    s = s +  '       <li> <button id="menuProfilAll" class="btnMenu" onclick="showProfilAll()" >Profil All</button> </li> '
    s = s +      '</ul>'
    s = s +  '  </div>'
    s = s +  ' </div>'
    s = s +  '</nav>'

    return s;
}

function showMenu() {

    loadDiv("menu",  getCompoMenu() );

    loadDiv("btnUserIcon",  username );


}