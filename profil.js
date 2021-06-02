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

function showIhmProfilAll(e) {
    showCompo( getCompoListObject(usersObjFilter, cols, 'getProfilAllFromDbAjax', 'searchProfilAll', filtre));
    $('#compo').toggleClass('center');
}

function searchProfilAll(e, filtreIhm) {
   // e.preventDefault();
    filtre = filtreIhm;

    console.log('searchProfilAll: filtre: ', filtre)

    var usersObjFilter = [];
    var words00 = null;
    var words = null;
    if(filtre) words00 = filtre.replaceAll(",", " ").split(" ");
    if(words00){
        words = [];
        for(var k=0; k<words00.length; k++) {
            var w = words00[k];
            if(w) {
                words.push(w);
            }
        }
        if(words.length == 0) {
            words = null;
        }
    }

    var add = false;
    if(words == null) add = true;

    if(usersObj) {
        for(var i=0; i<usersObj.length; i++) {
            var u = usersObj[i];
            var isAdded = false;
            if(words){
                for(var k=0; k<words.length; k++) {
                    var w = words[k].toUpperCase();
                    for(var j=0; j<cols.length; j++) {
                        var key = cols[j];
                        var val = u[key] + '';
                        var val = val.trim().toUpperCase();
                        if( val.includes(w) ) {
                            isAdded = true;
                            usersObjFilter.push(u);
                            break;
                        }
                    }  
                    if(isAdded) {
                        break;
                    }                  
                }
            }else {
                usersObjFilter.push(u);
            }
        }
    }
    saveLoginInBrowser();
    showIhmProfilAll(e);
}

function getProfilAllFromDbCallback(e) {

    if(!isAjaxResultError(e, 'getProfilUsersFromDbCallback')) {
        usersObj = e.data;
        //console.log('getProfilUsersFromDbCallback', usersObj)
        saveLoginInBrowser();
        showIhmProfilAll();
    }else {
        console.log('getProfilUsersFromDbCallback NON TRUE');
    }
}

////////
function getProfilAllFromDbAjax(e) {
    
    var myData = {
        cmd: 'getProfilAll',
        //filtre : filtre,
        callbackFun : 'getProfilAllFromDbCallback'
    };
    
   callAjaxPost(e, myData);  
}

////////////////
function getProfilAllClick(e) {

    hideInfos();

    restoreLoginInBrowser();
    
    if(usersObj != null && usersObj != '') {
        showIhmProfilAll();
    }else {
        getProfilAllFromDbAjax(e);
    } 
}

/////////////////////////////////////////////////////////////////