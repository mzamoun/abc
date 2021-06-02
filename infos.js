function showAcceuil() {
    hideInfos();
    showCompo( 
    getElement('h1', null, 'مرحبا بكم في نادي الأعمال الجزائري ') + '<br>' +
    getElement('h1', null, 'Welcome to Algerian Business Club ') + '<br>' 
    );
}

function getCompoPersonPrez(prenom, nom, fonction, desc) {
    var urlImage = prenom + '_' + nom + '.jpg';

    var s = getElement('img', {src:urlImage}, '')+
    getElement('h3', null, prenom + ' ' + nom)+
    getElement('h4', null, fonction)+
    getElement('p', null, '')+
    getElement('h4', null, desc)
    ;

    return s;
}

function showInfos() {
    hideInfos();
    showCompo(
         '<link rel="stylesheet" href="table.css">\n'+
         getElement('h1', null, 'Who we are ?')+
         getElement('p', null, 'We are a group of ambitious algerians with a shared goal')+'<br>'+
         getElement('table', null, 
             getElement('tr', null, 
                getElement('td', {class:"center"}, 
                    getCompoPersonPrez('Ahmed', 'Laouedj', 'Founder', 'I decided to return to my country to participate in its development with the help of all my Algerian compatriots.')
                    ) 
                + getElement('td', {class:"center"}, 
                    getCompoPersonPrez('Mohamed', 'Masmoudi', 'Co-Founder', 'Always looking to learn and take on new challenges that keep me active in a very competitive professional atmosphere.')
                ) 
             )
         )

         
         );
}
