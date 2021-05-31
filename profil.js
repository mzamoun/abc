var cols = ['Prenom', 'Nom', 'Localisation', 'Site', 'Tel', 'Pays_Origine', 'Ville_Origine', 'Metier', 'Expertises_Centre_Interrets', 'Proposition_Idees'];
var colsType = ['text', 'text', 'text',        'text', 'text', 'text',        'text',           'text',  'textArea',                    'textArea'];

function saveFormUser(e) {
    
}

function onSaveFormUserClick(e) {
    var myData = {
        cmd: 'saveFormUser',
        email : username,
        callbackFun : 'saveFormUser'
    };
    
    callAjaxPost(e, myData);
}

function showFormEditUser() {
    loadDiv('compo', getCompoFormEdit(userObj, cols, colsType, 'onSaveFormUserClick'));
}

function editProfilUser(e) {
   // notImplemented();
   console.log(e);
   if(e && e.data) {
       var msg = JSON.stringify(e.data);
       msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
       console.log('msg:' + msg+'.');
       if(msg.startsWith('ERROR')) {
            showError("<p>editProfilUser:</p>"  + msg );
       }else {
            userObj = e.data;
            showFormEditUser();
       }
   }else {
       showError("<p>No Information</p>" );
   }

}

////////
function onProfilUserClick(e) {
    
    var myData = {
        cmd: 'editProfilUser',
        email : username,
        callbackFun : 'editProfilUser'
    };
    
   callAjaxPost(e, myData);  
}

////////////

function showProfilAll() {
    notImplemented();
}