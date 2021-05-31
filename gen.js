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
    loadDiv('compo', getElement('h1', null, 'Not implemented yet !'));
}

///////////////////////

function loadButton(id, html) {
    var el = $('#'+id);
    if(el) {
        el.val(html);
    }
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
    
    $.ajax({
        type: 'POST',
        crossDomain: true,
        url: url ,
        data: myData,
        dataType: "jsonp",
        success: function(ev) {
            console.log('success', ev);
        },
        error: function(ev) {
            console.log('error', ev);
        },
    });    
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
  function getCompoFormEdit(line, cols, colsType, fctSaveName){
    var s = '';
    s = s + '<link rel="stylesheet" href="login.css">\n'
    s = s + '<form id="formUser">';
        
    s = s+' <div class="login">'
    s = s + '  <h3 class="center"> User Profil: </h3>'
    for(var i=0; i<cols.length; i++) {
        var key = cols[i];
        var type = colsType[i];
        var val = line[key];
        if(type == 'textArea') {
            s = s + '    <label for="'+key+'">'+key+'</label>';
            s = s + '    <textarea name="'+key+'" id="'+key+'" rows="4" cols="50"> '+val+' </textarea> <br>\n';
        }else {
            s = s + '    <label for="'+key+'">'+key+'</label>';
            s = s + '    <input type="text" name="'+key+'" id="'+key+'" value="'+val+'" >  <br>\n';            
        }
    }

    s = s + '  <input type="submit" id="btnSave" value="Save">'

    s = s + ' </div>'

    s = s + '</form>'

    s = s + '<script>'
    s = s + '$(document).ready(function(){'
    s = s + '   $("#btnSave").click(function(e){ '+fctSaveName+'(e); });'
    s = s + ' }); '
    s = s + '</script>'
  }