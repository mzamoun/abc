//////////////////
function loadDiv(idDiv, html) {
    var el = $('#'+idDiv);
    if(el) {
        el.html(html);
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

