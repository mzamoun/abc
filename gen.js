String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
     
    return str;
}
/////////////////////
function getAnchorHttp(str) {
    if(str == '') return str;

    var s = str + '';
    var tab = s.split(" ");
    var s2 = '';
    for(var i=0; i<tab.length; i++) {
        var w = tab[i];
        if(w != '' && w.startsWith('http') ) {
            s2 = s2 + '<a href="' + w + '" target="_blank"> ' + w + ' </a><br>\n';
        }else {
            s2 = s2 + ' ' + w;
        }
    }
    return (s2+'').trim();
}

////////////////////
var mapAccents = {
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "Æ": "AE",
    "Ç": "C",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "Ð": "D",
    "Ñ": "N",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "Ý": "Y",
    "ß": "s",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "æ": "ae",
    "ç": "c",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "ñ": "n",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "ý": "y",
    "ÿ": "y",
    "Ā": "A",
    "ā": "a",
    "Ă": "A",
    "ă": "a",
    "Ą": "A",
    "ą": "a",
    "Ć": "C",
    "ć": "c",
    "Ĉ": "C",
    "ĉ": "c",
    "Ċ": "C",
    "ċ": "c",
    "Č": "C",
    "č": "c",
    "Ď": "D",
    "ď": "d",
    "Đ": "D",
    "đ": "d",
    "Ē": "E",
    "ē": "e",
    "Ĕ": "E",
    "ĕ": "e",
    "Ė": "E",
    "ė": "e",
    "Ę": "E",
    "ę": "e",
    "Ě": "E",
    "ě": "e",
    "Ĝ": "G",
    "ĝ": "g",
    "Ğ": "G",
    "ğ": "g",
    "Ġ": "G",
    "ġ": "g",
    "Ģ": "G",
    "ģ": "g",
    "Ĥ": "H",
    "ĥ": "h",
    "Ħ": "H",
    "ħ": "h",
    "Ĩ": "I",
    "ĩ": "i",
    "Ī": "I",
    "ī": "i",
    "Ĭ": "I",
    "ĭ": "i",
    "Į": "I",
    "į": "i",
    "İ": "I",
    "ı": "i",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "Ĺ": "L",
    "ĺ": "l",
    "Ļ": "L",
    "ļ": "l",
    "Ľ": "L",
    "ľ": "l",
    "Ŀ": "L",
    "ŀ": "l",
    "Ł": "l",
    "ł": "l",
    "Ń": "N",
    "ń": "n",
    "Ņ": "N",
    "ņ": "n",
    "Ň": "N",
    "ň": "n",
    "ŉ": "n",
    "Ō": "O",
    "ō": "o",
    "Ŏ": "O",
    "ŏ": "o",
    "Ő": "O",
    "ő": "o",
    "Œ": "OE",
    "œ": "oe",
    "Ŕ": "R",
    "ŕ": "r",
    "Ŗ": "R",
    "ŗ": "r",
    "Ř": "R",
    "ř": "r",
    "Ś": "S",
    "ś": "s",
    "Ŝ": "S",
    "ŝ": "s",
    "Ş": "S",
    "ş": "s",
    "Š": "S",
    "š": "s",
    "Ţ": "T",
    "ţ": "t",
    "Ť": "T",
    "ť": "t",
    "Ŧ": "T",
    "ŧ": "t",
    "Ũ": "U",
    "ũ": "u",
    "Ū": "U",
    "ū": "u",
    "Ŭ": "U",
    "ŭ": "u",
    "Ů": "U",
    "ů": "u",
    "Ű": "U",
    "ű": "u",
    "Ų": "U",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "ź": "z",
    "Ż": "Z",
    "ż": "z",
    "Ž": "Z",
    "ž": "z",
    "ſ": "s",
    "ƒ": "f",
    "Ơ": "O",
    "ơ": "o",
    "Ư": "U",
    "ư": "u",
    "Ǎ": "A",
    "ǎ": "a",
    "Ǐ": "I",
    "ǐ": "i",
    "Ǒ": "O",
    "ǒ": "o",
    "Ǔ": "U",
    "ǔ": "u",
    "Ǖ": "U",
    "ǖ": "u",
    "Ǘ": "U",
    "ǘ": "u",
    "Ǚ": "U",
    "ǚ": "u",
    "Ǜ": "U",
    "ǜ": "u",
    "Ǻ": "A",
    "ǻ": "a",
    "Ǽ": "AE",
    "ǽ": "ae",
    "Ǿ": "O",
    "ǿ": "o"
};

function replaceAccents(str) {
    var s = str;
    for (const key in mapAccents) {
        rep = mapAccents[key];
        s = s.replaceAll(key, rep);
    }
    return s;
} 

//////////////////
function getElement(tagName, attrs, content) {
    var s = '<' + tagName;
    var v = '';
    if(attrs != null ){
        for (const p in attrs) {
            v = attrs[p];
            s = s + ' ' + p + '="' + v + '"';
        }
    }

    s = s + '>';
    if(content != null){
        s = s + content;
    }   
    s = s + '</' + tagName + '>';

    return s;
}

///////////////////////
function loadDiv(idDiv, html) {
    var el = $('#'+idDiv);
    if(el) {
        el.html(html);
    }
}

///////////////////////
function notImplemented() {
    showCompo( getElement('h1', null, 'Not implemented yet !'));
}

///////////////////////

function loadButton(id, html) {
    var el = $('#'+id);
    if(el) {
        el.val(html);
    }
}

///////////////////////

function getValElement(id) {
    var s ='';

    var el = $('#'+id);
    if(el) {
        s = el.val();
    }
    s = s + '';

    return s.trim();
}

///////////////////////

function showDiv(idDiv, ok) {
    // style="display:none;
    var el = $('#'+idDiv);
    if(el) {
        if(ok) {
            el.show();
        }else {
            el.hide();
        }
    }
}
////////////
function hideInfos() {
    showDiv('success', false);
    showDiv('chargement', false);
    showDiv('error', false);
}
////
function showSuccess(msg) {
    var id = 'success';
    loadDiv(id, msg)
    showDiv(id, true);
}
////
function showError(msg) {
    var id = 'error';
    loadDiv(id, msg)
    showDiv(id, true);
}
//////
function showChargement(msg) {
    var id = 'chargement';
    loadDiv(id, msg)
    showDiv(id, true);
}
//////////
function hideChargement() {
    var id = 'chargement';
    showDiv(id, false);
}
///////////////////////////

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function enableElement(id, ok) {
    $('#' + id).attr('disabled', !ok);
    var bgColorOk = '#37a69b';
    var bgColorKo = 'gray';
    $('#' + id).css('background-color', ok? bgColorOk:bgColorKo);
}
///////////////////

function callAjaxPost(e, myData) {
    e.preventDefault();
    hideInfos();
    showChargement('En chargement ...');
    
    $.ajax({
        type: 'POST',
        crossDomain: true,
        url: url ,
        data: myData,
        dataType: "jsonp",
        success: function(ev) {
            //console.log('success', ev);
            hideChargement();
        },
        error: function(ev) {
            //console.log('error', ev);
            hideChargement();
        }
    });    
}
///////////////
function isAjaxResultError(e, fctName) {
    var ok = true;
    //console.log('isAjaxResultError: ', 'msg=/'+e.msg+'/');
    if(e && e.msg) {
        var msg = JSON.stringify(e.msg);
        msg = msg.substring(1, msg.length-1);   //supprimer les guillemets debut/fin
        if(msg.startsWith('ERROR')) {
             showError('<p>'+fctName+':</p>'  + msg );
        }else {
            ok = false;
        }
    }else {
        showError('<p>'+fctName+': No Information</p>' );
    }

    //console.log('isAjaxResultError: ', 'ok=/'+ok+'/');

    return ok;
 }

////////////////
function ConfirmDialog(question, fctYes, fctNo) {
    $('<div></div>').appendTo('body')
      .html('<div><h4>' + question + '</h4></div>')
      .dialog({
        modal: true,
        title: 'Confirmation',
        zIndex: 10000,
        autoOpen: true,
        width: 'auto',
        resizable: false,
        buttons: {
          Yes: function() {
            // $(obj).removeAttr('onclick');                                
            // $(obj).parents('.Parent').remove();
  
            $(fctYes).next()
  
            $(this).dialog("close");
          },
          No: function() {
            $(fctNo).next();
  
            $(this).dialog("close");
          }
        },
        close: function(event, ui) {
          $(this).remove();
        }
      });
  };
  /////////////////////////
  function getCompoFormEdit(line, cols, colsType, idForm, fctRefreshName, fctSaveName ){
    var s = '';
    s = s + '<link rel="stylesheet" href="table.css">\n'
    s = s + '<form id="'+idForm+'">';
        
    s = s + '<h3 class="center"> User Profil: </h3>'
    s = s+' <table class="form">'
    for(var i=0; i<cols.length; i++) {
        var key = cols[i];
        var type = colsType[i];
        var val = line[key];
        var val = val.trim();

        s = s + '<tr>\n';
        s = s + '  <td>  <label for="'+key+'">'+key+'</label> </td>';
        s = s + '  <td>';
        if(type == 'textArea') {
            s = s + '    <textarea name="'+key+'" id="'+key+'" rows="4" cols="50"> '+val+' </textarea> <br>\n';
        }else {
            s = s + '    <input type="text" size="50" name="'+key+'" id="'+key+'" value="'+val+'" >  <br>\n';            
        }
        s = s + '  </td>\n';
        s = s + '</tr>\n';
    }

    s = s + '<tr>\n';
    s = s + '  <td colspan="2">';
    s = s + '  <input type="button" id="btnRefresh" value="Refresh">'
    s = s + '  <input type="submit" id="btnSave" value="Save">'
    s = s + '  </td>\n';

    s = s + '</tr>\n';

    s = s + ' </table>'

    s = s + '</form>'

    s = s + '<script>'
    s = s + '$(document).ready(function(){'
    s = s + '   $("#btnRefresh").click(function(e){ '+fctRefreshName+'(e); });'
    s = s + '   $("#btnSave").click(function(e){ '+fctSaveName+'(e); });'
    s = s + ' }); '
    s = s + '</script>'
    return s;
  }

  /////////////////////

  function userFormToObj(obj, cols) {
    
    for(var i=0; i<cols.length; i++) {
        var key = cols[i];
        var val = getValElement(key);
        obj[key] = val;
    }   
    
}

///////////////////////////////////////

function getCompoListObjectDatas(lines, cols ){
    // console.log('getCompoListObjectDatas length:', lines.length)
    var s = '';

    s = s + '<h3 class="center"> Users Profil: '+ lines.length +' </h3>'
    
    s = s+' <table class="table">'

    s = s + '<tr>\n';
    for(var i=0; i<cols.length; i++) {
        var key = cols[i];
        s = s + '  <th>'+key+'</th>';
    }
    s = s + '</tr>\n';

    for(var j=0; j<lines.length; j++) {
        var line = lines[j];
        //console.log('DBG getCompoListObject line='+line, line)
        s = s + '<tr>\n';
        for(var i=0; i<cols.length; i++) {
            var key = cols[i];
            var val = line[key]+'';
            //console.log('DBG getCompoListObject key='+key, 'val:', val)

            var val = val.trim();
            val = getAnchorHttp(val);
            s = s + '  <td>'+val+'</td>';
        }
        s = s + '</tr>\n';
    }


    s = s + ' </table>'


    return s;
  }

///////////////////////////////////////

  function getCompoListObject(lines, cols, fctRefreshName, fctSearchName, varFiltre ){
    var s = '';
    s = s + '<link rel="stylesheet" href="table.css">\n'
    
    s = s + '  <input type="button" id="btnRefresh" value="Refresh">'
    s = s + '  <input type="text" id="btnSearch" placeholder="filter key words" size="100" value="'+varFiltre+'" >'

    s = s + '<div id="datas">\n'

    s = s + getCompoListObjectDatas(lines, cols);

    s = s + '</div>\n'

    s = s + '<script>'
    s = s + '$(document).ready(function(){\n'
    s = s + '   $("#btnRefresh").click(function(e){ '+fctRefreshName+'(e); });\n'
    s = s + '   $("#btnSearch").keyup(function(e){ '+fctSearchName+'(e, $("#btnSearch").val()); });\n'
    s = s + '   $("#btnSearch").focus();\n'
    s = s + ' }); \n'
    s = s + '</script>'
    return s;
  }

  /////////////////////////////////////