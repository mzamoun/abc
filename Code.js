var appName = 'Groupe ABC : Projets Diaspora en Algerie';
var siteWeb = 'https://mzamoun.github.io/abc/index.html';
var urlWebApp= 'https://script.google.com/macros/s/AKfycbyTnZynDRTt2it5YkjUsPKd5X8QQFp9zeJ_Fw0NZHbNc10N2yVPb-wHFpEsgxOdy9Q/exec';

var urlID = '1J5RCOnCY1xNSZova8tQaXQuoM8ITU3Eaw-kYKV641v0';
var url = 'https://docs.google.com/spreadsheets/d/' + urlID;
var tabData = "Contacts";

var usersLine = {};
var cols = [];

var colEmail = null;
var colPass = null;

// function doGet(e) {
//   // e.queryString = name=alice&n=1&n=2
//   // var params = e.parameter; // {"name": "alice", "n": "1"}
//   // var param = params['name'];

//   // var res = {data: 'My-ERRRR-TEST'};

//   // return HtmlService.createHtmlOutputFromFile('get').setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

//   var result = '';

//   try {
//     result = 'GET Hello ' + e.parameter.name;
//   } catch (f) {
//     result = 'GET Error: ' + f.toString();
//   }

//   result = JSON.stringify({
//     result: result,
//   });

//   return ContentService.createTextOutput(
//     e.parameter.callback + '(' + result + ')'
//   ).setMimeType(ContentService.MimeType.JAVASCRIPT);

// }

/*
e: 
{"queryString":"callback=jQuery35104264563152154892_1621556813798&cmd=login&username=&password=&_=1621556813799","parameters":{"cmd":["login"],"username":[""],"callback":["jQuery35104264563152154892_1621556813798"],"_":["1621556813799"],"password":[""]}
,"parameter":{"password":"","_":"1621556813799","cmd":"login"
,"callback":"jQuery35104264563152154892_1621556813798","username":""},"contextPath":"","contentLength":-1}

*/

// function doPost(e) {
//   var result = '';

//   try {
//     result = 'POST Hello ' + e.parameter.name;
//   } catch (f) {
//     result = 'POST Error: ' + f.toString();
//   }

//   result = JSON.stringify({
//     result: result,
//   });

//   return ContentService.createTextOutput(
//     e.parameter.callback + '(' + result + ')'
//   ).setMimeType(ContentService.MimeType.JAVASCRIPT);
// }

// const doPost = (request = {}) => {
//   const { postData: { contents, type } = {} } = request;
//   return ContentService.createTextOutput(contents);
// };

// function doPost(e) {
//   // e.queryString = name=alice&n=1&n=2
//   var params = e.parameter; // {"name": "alice", "n": "1"}
//   var cmd = params['cmd'];
//   if (cmd == "login") {
//     var email = params['email'];
//     var pass = params['pass'];
//     var r = checkLoginPass(email, pass);
//     var res = {data: r};
//     return ContentService.createTextOutput(res).setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
//   }
// }

function GetSpreadSheet() {
  console.log("url", url);
  Logger.log("url="+url);
  //var ss= SpreadsheetApp.openByUrl(url);  //gen uncaught error
  var ss = SpreadsheetApp.open(DriveApp.getFileById(urlID));  //OK
  return ss;
}

function getSheet(name) {
  var ss = GetSpreadSheet();
  var sheet = ss.getSheetByName(name);
  return sheet;
}

function getCols() {

  if(cols.length > 0 ) {
    return cols ;
  }

  var webAppSheet = getSheet(tabData);

  for (var j=1; j<1000; j++) {
    var col = webAppSheet.getRange(1, j).getValue();
    if(col != null && col != "") {
      cols.push(col);
    }else {
      break;
    }
  }

  return cols;
}

function getIndCol(colName) {
  var cols = getCols();
  var ind = 0;
  var colNameUp = colName.toUpperCase();
  for (var i=0; i<cols.length; i++) {
    var col = cols[i].toUpperCase();
    if(col == colNameUp) {
      ind = i;
      break;
    }
  }
  return ind;
}

function getIndColEmail() {
  if(colEmail == null) {
    colEmail = getIndCol('Email');
  }
  return colEmail;
}

function getIndColPassword() {
  if(colPass == null) {
    colPass = getIndCol('Password');
  }
  return colPass;
}

function addObjValsToArray(obj, a) {
  var cols = getCols();
  var val = '';
  for (var i=0; i<cols.length; i++) {
    var col = cols[i];
    val = obj[col];
    if(val == null) val = '';
    a.push(val);
  }
  return a;
}

function debug(cle, msg) {
  var webAppSheet = getSheet("debug");
  webAppSheet.getRange(1, 1).setValue(new Date());
  webAppSheet.getRange(1, 2).setValue(cle);
  webAppSheet.getRange(1, 3).setValue(msg);
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function TestSaveRecord() {

  var objStr = '{"Horodateur":"2021-04-05T17:59:21.384Z","Prenom":"mourad","Nom":"zamoun","Localisation":"France","Email":"mourad.zamoun@gmail.com","Site_Linkedin":"https://www.linkedin.com/in/mourad-zamoun-34a1a713/","Tel":33662366914,"Pays_Origine":"Algérie","Ville_Origine":"Sidi Moussa","Metier":"Développement informatique","Expertises_Interrets":"informatique, mathématiques, agriculture, innovation, industrie, bâtiment, ","Secteur":"IT2","Proposition_Idees":"groupement pour agriculture tout type, centre d\'idées innovation et Industrie, dev application informatique, construction de résidences, villes nouvelles, ...."}';
  saveRecord("mourad.zamoun@gmail.com", objStr);
 // Logger.log("obj="+obj);
}

function saveRecord(username, obj) {
  //objStr =  JSON.stringify(obj).replace("'", "\\'");
  debug('obj', obj);
 // return new Date();

 var res = 'ok';

 // var obj = JSON.parse(objStr);
 // Logger.log("obj="+obj);
  var webAppSheet = getSheet(tabData);
  var a = [];
  if(obj.Horodateur == null) {
    Logger.log("Horodateur = NULL !!");
    a = [new Date()];
  }else {
    Logger.log("Horodateur != NULL !!");
    obj.Horodateur = new Date();
  }
  a = addObjValsToArray(obj, a);
  var iLine = getNumLineOfUser(username);
  if(iLine>0) {
    for(var j=0; j<a.length; j++) {
      webAppSheet.getRange(iLine, j+1).setValue(a[j]);
    }
  }else {
    res = 'ERROR: username not found: ' + usersLine;
  }

  return res;
}

function getNumLineOfUser(username) {

  if(usersLine[username] != null) {
    return usersLine[username] ;
  }

  colEmail = getIndColEmail();
  colPass = getIndColPassword();

  var webAppSheet = getSheet(tabData);
  var iLine = 0;
  var lastRow =  webAppSheet.getLastRow();
  var usernameUp = username.toUpperCase();
  var val = ''; //val de la cell en court
  for(var i = 1; i <= lastRow; i++)
  {
    val = webAppSheet.getRange(i, colEmail+1).getValue();
    Logger.log("val="+val);
   if(val != null && val.toUpperCase() == usernameUp )
   {
     iLine = i;
     usersLine[username] = i;
     break;
   }    
  }

  return iLine;
}

function TestGetLineUser() {
  var obj = GetLineUser("mourad.zamoun@gmail.com", 0);
  Logger.log("obj="+obj);
}

function GetLineUser(username, isWithPass) {
  // var url = '';
  //Paste URL of GOOGLE SHEET
  var webAppSheet = getSheet(tabData);
  var obj = null;
  var cols = getCols();
  var n = cols.length -1; // pour ne pas inclure Password
  if(isWithPass == 1) n = cols.length;
  var iLine = getNumLineOfUser(username);
  //var iLine = 2;
  if(iLine>0) {
    obj = {};
    for(var j=0; j<n; j++) {
      obj[cols[j]] = webAppSheet.getRange(iLine, j+1).getValue();
    }
  }  
  //return JSON.stringify(obj);
  return obj;
}

function GetLineAll(filtre, isWithPass) {
  debug("filtre", filtre);
  // var url = '';
  //Paste URL of GOOGLE SHEET
  var webAppSheet = getSheet(tabData);
  var lastRow =  webAppSheet.getLastRow();
  var a = [];
  var obj = {};
  var cols = getCols();
  var n = cols.length - 1; //ne pas inclure Password
  if(isWithPass == 1) n = cols.length;

  for(var i=2; i<=lastRow; i++)
  {
    var add = false;
    if(filtre == null || filtre == '') add = true;
    obj = {};
    for(var j=0; j<n; j++) {
      obj[cols[j]] = webAppSheet.getRange(i, j+1).getValue();
      if(j>0 && !add && filtre != null && filtre != '') {
        var ok = (obj[cols[j]]+'').toUpperCase().includes(filtre.toUpperCase());
        if(ok) add = true;
      }
    }
    if(add) a.push(obj);
  }
  //return JSON.stringify(a);
  return a;
}

function isIdNotExist(email) {
  var obj = GetLineUser(email, 0);
  return obj == null;
}

function AddRecord(obj) {
  var msg = 'OK';
  try {
    if(isEmail(obj.Email)) {
      if(isIdNotExist(obj.Email)){
        var webAppSheet = getSheet(tabData);
        //var a = [new Date()];
        var a = [];
        obj.Horodateur = new Date();
        a = addObjValsToArray(obj, a);
        webAppSheet.appendRow(a);
      }else {
        msg = 'ERROR: email exist !! : ' + obj.Email;
      }
    }else {
      msg = 'ERROR: email Not Correct !! : ' + obj.Email;
    }
  }catch(error) {
    msg = 'ERROR: AddRecord: error='+error+', objStr='+JSON.stringify(obj);
  }
  return {data:obj, msg:msg};
}

function DelRecord(email) {
  var msg = 'OK';
  try {
    var iLine = getNumLineOfUser(email);
    if(iLine<2) {
      msg = 'ERROR: DelRecord: No record of ' + email;
    }else {
      var webAppSheet = getSheet(tabData);
      webAppSheet.deleteRow(iLine);
    }

  }catch(error) {
    msg = 'ERROR: DelRecord: error='+error+', email='+ email;
  }

  return {data:email, msg:msg};
}

function showError(msg) {
  msg = "Error: " + msg;
  //...
}

function genCode()
{
    var length = 10;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%?.";

    for( var i=0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function setPassword(username, password) {
  // var url = '';
  //Paste URL of GOOGLE SHEET
  var webAppSheet = getSheet(tabData);

  colEmail = getIndColEmail();
  colPass = getIndColPassword();

  var iLine = getNumLineOfUser(username);
  if(iLine>0) webAppSheet.getRange(iLine, colPass+1).setValue(password);

  return 'iLine='+iLine+'; colPass='+(colPass+1);

}

function sendEmail(username, code) {
  var message = 'Hi,\n\n';
  message = message + 'Votre nouveau mot de passe est : ' + code + '\n\n';
  message = message + 'Login sur : ' + siteWeb;

  GmailApp.sendEmail(username, appName + ' : Your password', message);

  return true;
}

function genNewPass(username){
  var code = genCode();
  var setPass = setPassword(username, code);

  var sendEm = sendEmail(username, code);

  return 'setPass='+setPass+'; sendEmail='+sendEm;
}

/**
Algo					
email exist	  pass exist	egaux	  show data_user and all_datas		
		                      non	    login faild	Btn pass oublié	
                    non	send email avec un mot de passe aleatoire			
non					
	your email not exist; contact your admin.				
									
*/
function checkLoginPass(username, password) {

  var msg = 'ERROR';
  var res = '';

  //var url = '';
  //Paste URL of GOOGLE SHEET
  username = username.replace(" ", "");
  password = password.replace(" ", "");

  var userObj = GetLineUser(username, 1);
  var pass = null;
  if(userObj != null) pass = userObj.Password;

  if(pass != null) {
    pass = pass.replace(" ", "");
    if(pass != "") {
      if(pass == password) {
        msg = 'OK';
        res = userObj;	
      }else {
        msg = "ERROR: Login/Pass ";
      }
    }
  }else {
    msg = "ERROR: Login not exist. Contact your admin. Email: " + username;
  }

  return {msg:msg, data:res};
  
}

function resetPass(params) {

  var msg = 'ERROR';
  var res = '';

  var username = params['email'];
  username = username.replace(" ", "");

  var userObj = GetLineUser(username, 1);
  var pass = null;
  if(userObj != null) pass = userObj.Password;

  if(pass != null) {
    msg = "Un email vous a été envoyé avec un nouveau mot de passe. Email: " + username;
    res = genNewPass(username);
  }else {
    msg = "ERROR: Login not exist. Contact your admin. Email: " + username;
  }

  return {'data': res, 'msg': msg};
  
}

function setInfosAfterLogin(params, resAfterLogin) {
  var tab='LOGIN';
  var resLogin=resAfterLogin.msg; 

  var email = params['email'];
  var pass = params['password'];
  var userIp = params['userIp'];
  var urlIp = 'http://ip-api.com/json/' + userIp ;

  if(userIp != null && userIp != '') {
    try{
        var webAppSheet = getSheet(tab);
        var userGeoJson = UrlFetchApp.fetch(urlIp);
        var userGeo = JSON.parse(userGeoJson);
        // Horodateur	Email	Password	Res	Country	City	Provider  GeoJson
        var a = [new Date(), email, pass, resLogin, userGeo.country, userGeo.city, userGeo.isp, userGeoJson];
        webAppSheet.appendRow(a);
    }catch(err) {
        webAppSheet.appendRow([new Date(), email, pass, resLogin, userIp, urlIp, 'userGeoJson='+userGeoJson ,'err='+ err]);
    }  
  }
}

function onLogin(params) {

    var email = params['email'];
    var pass = params['password'];
    var result = checkLoginPass(email, pass);

    setInfosAfterLogin(params, result);

    return result;
}

function editProfilUser(params) {
    var email = params['email'];
    var userObj = GetLineUser(email, 0);
    var msg = 'OK';
    if(userObj == null) msg = 'ERROR: user not Found !';

    return {data: userObj, msg: msg};
}

function getProfilAll(params) {
    var usersObj = GetLineAll(null, 0);
    var msg = 'OK';
    if(usersObj == null) msg = 'ERROR: users not Found !';

    return {data: usersObj, msg: msg};
}

function saveFormUser(params) {
    var msg = '';
    var res = '';

    var userObj = JSON.parse(params.userObj);
    res = userObj;
    var cols = getCols();
    var n = cols.length-1;  //on ne sauvegarde pas le pass ici.
    var webAppSheet = getSheet(tabData);

    try {
        var iLine = getNumLineOfUser(userObj.Email);

        if(iLine>0) {
          for(var j=0; j<n; j++) {
            webAppSheet.getRange(iLine, j+1).setValue(userObj[cols[j]]);
          }
          msg = 'OK';
        } else {
          msg = 'ERROR: no user for email: ' + userObj.Email;
        }
    }
    catch(err) {
        msg = 'ERROR: problem in calcul: userObj=' + userObj + ', err='+err + ', params='+JSON.stringify(params);
    } 
    finally {
        //
    }


    return {data: res, msg:msg};
}

function addUser(params) {
    var msg = '';
    var res = '';

    var user = JSON.parse(params.user);
    res = user;

    var result=null;

    try {
        result = AddRecord(user);
    }
    catch(err) {
        msg = 'ERROR: problem in add user: userObj=' + userObj + ', err='+err + ', params='+JSON.stringify(params);
        result = {data: res, msg:msg};
    } 
    finally {
        //
    }

    return result;
}

function delUser(params) {
    var msg = '';
    var res = '';

    var email = params.email;
    res = email;

    var result=null;

    try {
        result = DelRecord(email);
    }
    catch(err) {
        msg = 'ERROR: problem in del user: email=' + email + ', err='+err + ', params='+JSON.stringify(params);
        result = {data: res, msg:msg};
    } 
    finally {
        //
    }

    return result;
}

function onCmdNotFound(params) {
    var cmd = params['cmd'];
    var msg = "ERROR: Cmd Not Found. cmd: " + cmd;
    var res = '';
    return {data: res, msg: msg};
}

function doGet(e) {
  var params = e.parameter; 
  var cmd = params['cmd'];
  var callbackFun = params['callbackFun'];
  if(callbackFun == null || callbackFun == '') {
    callbackFun = 'callMeGet';
  }
  var res = {data:'', msg:''};

  colEmail = getIndColEmail();
  colPass = getIndColPassword();

  if (cmd == "login") {
    res = onLogin(params);
  }else if(cmd == 'resetPass') {
    res = resetPass(params);
  } else if(cmd == 'editProfilUser') {
    res = editProfilUser(params);
  } else if(cmd == 'saveFormUser') {
    res = saveFormUser(params);
  } else if(cmd == 'getProfilAll') {
    res = getProfilAll(params);
  } else if(cmd == 'addUser') {
    res = addUser(params);
  } else if(cmd == 'delUser') {
    res = delUser(params);
  } else {
    res = onCmdNotFound(params);
  }

  data = JSON.stringify(res);
  return ContentService.createTextOutput(
   callbackFun + '(' + data + ')'
  ).setMimeType(ContentService.MimeType.JAVASCRIPT);
};

/////////////////
// function doPost (e) {
//   var params = e.parameter; 
//   var cmd = params['cmd'];
//   var callbackFun = params['callbackFun'];
//   if(callbackFun == null || callbackFun == '') {
//     callbackFun = 'callMePost';
//   }
//   var res = {};

//   colEmail = getIndColEmail();
//   colPass = getIndColPassword();

//   if (cmd == "login") {
//     res = onLogin(params);
//   }else {
//     res = onCmdNotFound(params);
//   }

//   data = JSON.stringify(res);
//   return ContentService.createTextOutput(
//    callbackFun + '(' + data + ')'
//   ).setMimeType(ContentService.MimeType.JAVASCRIPT);
// };


////////////END////////////
