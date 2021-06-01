function showAcceuil() {
    hideInfos();
    showCompo( 
    getElement('h1', null, 'مرحبا بكم في نادي الأعمال الجزائري ') + '<br>' +
    getElement('h1', null, 'Welcome to Algerian Business Club ') + '<br>' 
    );
}

function showInfos() {
    hideInfos();
    showCompo( getElement('h1', null, 'No Infos for now !'));
}