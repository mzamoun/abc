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

//////////////////////////////////////////////////////////////////

function addUserCallback(e) {
    if(!isAjaxResultError(e, 'addUserCallback') ) {
        showSuccess("<p>addUserCallback: </p>"  + e.msg );
    }else {
        console.log('addUserCallback NON TRUE');
    }
}

function onAddUserClick(e) {
    e.preventDefault();
    var user = {};
    userFormToObj(user, cols);

    var myData = {
        cmd: 'addUser',
        user : JSON.stringify(user),
        callbackFun : 'addUserCallback'
    };
    
    callAjaxPost(e, myData);
}

/////////////////////////////////////////////////////////////////

function showIhmProfilAllDatas(e) {
    //console.log('showIhmProfilAllDatas: length:', usersObjFilter.length);
    loadDiv('datas', getCompoListObjectDatas(usersObjFilter, cols) );
//    loadDiv('datas', '' );
}

function showIhmProfilAll(e) {
    showCompo( getCompoListObject(usersObjFilter, cols, 'getProfilAllFromDbAjax', 'searchProfilAll', filtre));
    $('#compo').toggleClass('center');
}

function searchProfilAll(e, filtreIhm) {
    //e.preventDefault();
    filtre = filtreIhm + '';
    filtre = replaceAccents(filtre);
    //filtre = filtre.normalize().toUpperCase();

    //console.log('searchProfilAll: filtre: ', filtre)

    usersObjFilter = [];
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

    //console.log('searchProfilAll: words: ', words)
    //console.log('searchProfilAll: usersObj.length: ', usersObj.length)

    if(usersObj) {
        for(var i=0; i<usersObj.length; i++) {
            var u = usersObj[i];
            var isAdded = true;
            if(words && words.length > 0){
                
                for(var k=0; k<words.length; k++) {
                    var w = (words[k]+'').toUpperCase();
                   // console.log('w:', w);
                    var isContain = false;
                    for(var j=0; j<cols.length; j++) {
                        var key = cols[j];
                        var val = u[key] + '';
                        val = replaceAccents(val);
                        val = val.trim().toUpperCase();
                       // console.log('val:', val);
                        if( val.includes(w) ) {
                            isContain = true;
                            break;
                        }
                    }
                    if(!isContain) {
                        isAdded=false;
                        break;
                    }
                }
                if(isAdded) {
                    usersObjFilter.push(u);
                }                  
            }else {
                usersObjFilter.push(u);
            }
        }
    }

    // console.log('searchProfilAll: usersObjFilter.length: ', usersObjFilter.length)

    saveLoginInBrowser();
    showIhmProfilAllDatas(e);
}

function getProfilAllFromDbCallback(e) {

    if(!isAjaxResultError(e, 'getProfilUsersFromDbCallback')) {
        filtre = '';
        usersObj = e.data;
        usersObjFilter = usersObj;
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