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
        var val = line[key].trim();

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

  function getCompoListObject(lines, cols, fctRefreshName, fctSearchName ){
    var s = '';
    s = s + '<link rel="stylesheet" href="table.css">\n'
        
    s = s + '<h3 class="center"> Users Profil: </h3>'
    
    s = s + '  <input type="button" id="btnRefresh" value="Refresh">'
    s = s + '  <input type="text" id="btnSearch" size="100">'

    s = s + '</tr>\n';

    s = s+' <table class="table">'

    s = s + '<tr>\n';
    for(var i=0; i<cols.length; i++) {
        var key = cols[i];
        s = s + '  <th>'+key+'</th>';
    }
    s = s + '</tr>\n';

    for(var j=0; i<lines.length; i++) {
        var line = lines[j];
        s = s + '<tr>\n';
        for(var i=0; i<cols.length; i++) {
            var key = cols[i];
            var val = line[key].trim();
            s = s + '  <td>'+val+'</td>';
        }
        s = s + '</tr>\n';
    }


    s = s + ' </table>'

    s = s + '<script>'
    s = s + '$(document).ready(function(){'
    s = s + '   $("#btnRefresh").click(function(e){ '+fctRefreshName+'(e); });'
    s = s + '   $("#btnSave").keyup(function(e){ '+fctSearchName+'(e); });'
    s = s + ' }); '
    s = s + '</script>'
    return s;
  }

  /////////////////////////////////////