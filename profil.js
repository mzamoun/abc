var cols = ['Prenom', 'Nom', 'Localisation', 'Site', 'Tel', 'Pays_Origine', 'Ville_Origine', 'Metier', 'Expertises_Centre_Interrets', 'Proposition_Idees'];
var colsType = ['text', 'text', 'text',        'text', 'text', 'text',        'text',           'text',  'textArea',                    'textArea'];

function saveFormUser(e) {
    if(!isAjaxResultError(e, 'saveFormUser') ) {
        showSuccess("<p>saveFormUser: </p>"  + e.msg );
    }else {
        console.log('saveFormUser NON TRUE');
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

    if(!isAjaxResultError(e, 'editProfilUser')) {
        userObj = e.data;
        //console.log('editProfilUser', userObj)
        saveLoginInBrowser();
        showFormEditUser();
    }else {
        console.log('editProfilUser NON TRUE');
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

/////////////////////////////////////////////////////////////////

function showProfilAll(e) {
    showCompo( getCompoFormEdit(userObj, cols, colsType, 'userForm', 'onProfilUserFromDb', 'onSaveFormUserClick'));
}

function showFormEditUser() {
    //console.log('DBG: showFormEditUser DEB');
    showCompo( getCompoFormEdit(userObj, cols, colsType, 'userForm', 'onProfilUserFromDb', 'onSaveFormUserClick'));
    $('#compo').toggleClass('center');
}

function getProfilUsersFromDbCallback(e) {

    if(!isAjaxResultError(e, 'getProfilUsersFromDbCallback')) {
        usersObj = e.data;
        //console.log('getProfilUsersFromDbCallback', usersObj)
        saveLoginInBrowser();
        showIhmUsers();
    }else {
        console.log('getProfilUsersFromDbCallback NON TRUE');
    }
}

////////
function getProfilUsersFromDbAjax(e) {
    
    var myData = {
        cmd: 'getProfilUsers',
        filtre : filtre,
        callbackFun : 'getProfilUsersFromDbCallback'
    };
    
   callAjaxPost(e, myData);  
}

////////////////
function getProfilAllClick(e) {

    hideInfos();

    restoreLoginInBrowser();
    
    if(usersObj != null && usersObj != '') {
        showIhmUsers();
    }else {
        getProfilAllFromDbAjax(e);
    } 
}

/////////////////////////////////////////////////////////////////