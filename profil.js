var cols = ['Prenom', 'Nom', 'Localisation', 'Site', 'Tel', 'Pays_Origine', 'Ville_Origine', 'Metier', 'Expertises_Centre_Interrets', 'Proposition_Idees'];
var colsType = ['text', 'text', 'text',        'text', 'text', 'text',        'text',           'text',  'textArea',                    'textArea'];

function saveFormUser(e) {
    if(isAjaxResultError(e, 'saveFormUser') != true ) {
        showSuccess("<p>saveFormUser: </p>"  + msg );
    }
}

function onSaveFormUserClick(e) {
    e.preventDefault();
    userFormToObj(userObj, cols);
    saveLoginInBrowser();

    var myData = {
        cmd: 'saveFormUser',
        userObj : JSON.stringify(userObj),
        callbackFun : 'saveFormUser'
    };
    
    callAjaxPost(e, myData);
}

function showFormEditUser() {
    //console.log('DBG: showFormEditUser DEB');
    showCompo( getCompoFormEdit(userObj, cols, colsType, 'userForm', 'onProfilUserFromDb', 'onSaveFormUserClick'));
    $('#compo').toggleClass('center');
}

function editProfilUser(e) {

    if(isAjaxResultError(e, 'editProfilUser') != 'true') {
        userObj = e.data;
        //console.log('editProfilUser', userObj)
        saveLoginInBrowser();
        showFormEditUser();
    }else {
        console.log('NON TRUE');
    }
}

////////
function onProfilUserFromDb(e) {
    
    var myData = {
        cmd: 'editProfilUser',
        email : username,
        callbackFun : 'editProfilUser'
    };
    
   callAjaxPost(e, myData);  
}

////////////////
function onProfilUserClick(e) {

    hideInfos();

    restoreLoginInBrowser();
    
    if(userObj != null && userObj != '') {
        showFormEditUser();
    }else {
        onProfilUserFromDb(e);
    } 
}

////////////

function showProfilAll() {
    notImplemented();
}