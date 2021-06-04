var url = 'https://script.google.com/macros/s/AKfycbw4sFHHEcZ5gP-SSoYAW4AFOudA-uaF9PvxMuhJrs53Io4lR0UG64odPHMsUJbKw3Sw/exec';
var username='';
var userObj = '';
var filtre = '';
var usersObj = '';
var usersObjFilter = [];
var userIp='';
var userGeo='';

var cols = ['Prenom', 'Nom', 'Localisation', 'Site', 'Tel', 'Pays_Origine', 'Ville_Origine', 'Metier', 'Expertises_Centre_Interrets', 'Proposition_Idees'];
var colsType = ['text', 'text', 'text',        'text', 'text', 'text',        'text',           'text',  'textArea',                    'textArea'];
var colsMandatory = ['*', '*', '',            '',      '',    '',               '',            '',         '',                             ''];

var colsWithEmail = cols;
colsWithEmail.splice(0, 0, 'Email');

var colsTypeWithEmail = colsType;
colsTypeWithEmail.splice(0, 0, 'text');

var colsMandatoryWithEmail = colsMandatory;
colsMandatoryWithEmail.splice(0, 0, '*');
