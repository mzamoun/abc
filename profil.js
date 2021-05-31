var cols = ['Prenom', 'Nom', 'Localisation', 'Site', 'Tel', 'Pays_Origine', 'Ville_Origine', 'Metier', 'Expertises_Centre_Interrets', 'Proposition_Idees'];
var colsType = ['text', 'text', 'text',        'text', 'text', 'text',        'text',           'text',  'textArea',                    'textArea'];

function saveFormUser(e) {
       // notImplemented();
   console.log('saveFormUser', e);
   if(e && e.msg) {
       var msg = JSON.stringify(e.msg);
       msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
       console.log('msg:' + msg+'.');
       if(msg.startsWith('ERROR')) {
            showError("<p>saveFormUser:</p>"  + msg );
       }else {
            showSuccess("<p>saveFormUser: </p>"  + msg );
       }
   }else {
       showError("<p>saveFormUser: No Information</p>" );
   }
}

function onSaveFormUserClick(e) {
    e.preventDefault();
    userFormToObj(userObj, cols);
    setCookie('userObj', JSON.stringify(userObj));

    var myData = {
        cmd: 'saveFormUser',
        userObj : JSON.stringify(userObj),
        callbackFun : 'saveFormUser'
    };
    
    callAjaxPost(e, myData);
}

function showFormEditUser() {
    console.log('DBG: showFormEditUser DEB');
    showCompo( getCompoFormEdit(userObj, cols, colsType, 'userForm', 'onSaveFormUserClick', 'onProfilUserFromDb'));
    $('#compo').toggleClass('center');
}

function editProfilUser(e) {
   // notImplemented();
   console.log(e);
   if(e && e.msg) {
       var msg = JSON.stringify(e.msg);
       msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
       console.log('msg:' + msg+'.');
       if(msg.startsWith('ERROR')) {
            showError("<p>editProfilUser:</p>"  + msg );
       }else {
            userObj = e.data;
            setCookie('userObj', JSON.stringify(userObj));
            showFormEditUser();
       }
   }else {
       showError("<p>No Information</p>" );
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
    userObj = getCookie('userObj');
    console.log('onProfilUserClick', userObj)
    
    if(userObj != null && userObj != '') {
        userObj = JSON.parse(userObj)
        showFormEditUser();
    }else {
        onProfilUserFromDb(e);
    } 
}

////////////

function showProfilAll() {
    notImplemented();
}