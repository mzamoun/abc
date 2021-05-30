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
    loadDiv('compo', getElement('h1', null, 'Not implemented for now !'));
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

