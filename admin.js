
function getCompoFormAddProfil(e) {
    e.preventDefault();
    loadDiv('datas', getCompoFormSaveObject(colsWithEmail, colsTypeWithEmail, colsMandatoryWithEmail, 'addObjectForm', 'onAddUserClick', 'Add Profil', 'Add' ) );
}

function getCompoFormDelProfil(e) {
    e.preventDefault();
    loadDiv('datas', getCompoFormSaveObject(['Email'], ['text'], ['*'], 'delObjectForm', 'onDelUserClick', 'Delete Profil', 'Delete' ) );
}

///////////////////////////

function getCompoAdmin(e) {
    e.preventDefault();
    var s = ''
    s = s + '<div class="center">'
    s = s + '<button id="addProfil" class="btn" onclick="getCompoFormAddProfil(event);" > Add Profil </button>'
    s = s + '<button id="delProfil" class="btn" onclick="getCompoFormDelProfil(event);" > Delete Profil </button>'
    s = s + '</div>'

    s = s + '<div id="datas">'
    s = s + '</div>'    

    showCompo(s)
}