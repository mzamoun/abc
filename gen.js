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
        success: function(e) {
            console.log('success', e);
        },
        error: function(e) {
            console.log('error', e);
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