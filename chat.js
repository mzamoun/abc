function onChatClick(ev) {
    //notImplemented();
    var html = '';
    html += '<link rel="stylesheet" href="chat.css">\n'
    html += '<table class="tableChat">';
    html += '<tr>';
    
    html += '<td id="chanelsListRoot" class="v-align-top">';
    html += '<div id="chanelsList" class="v-align-top">';
        html += getElement('h1', null, 'Not implemented yet, but : ') + '<br>' ;
        html += getElement('button', {class:"btn", id:"channel1", onclick:"onClickChanel(event)"}, 'chanel 1 ') + '<br>' ;
        html += getElement('button', {class:"btn", id:"channel2", onclick:"onClickChanel(event)"}, 'chanel 2 ') + '<br>' ;
    html += '</div>';
    html += '</td>';
    
    html += '<td id="chanelContentRoot">';

    html += '<div id="chanelContent">';
    
    html += '</div>';
    
    html += '<div id="chanelMsgInputRoot">';
    // html += getElement('div', {id:"msgCorp", class:"msgCorp"}, '') + '<br>' ;
    html += getElement('div', {id:"msgInputRoot", class:"msgInputRoot"}, 
                getElement('input', {id:"msgInput", class:"msgInput", onkeyup:"onMsgEnter(event)"}, '') + '<br>'
        ) + '<br>' ;
    html += '</div>';

    html += '</td>';

    html += '</tr>';
    html += '</table>';

    showCompo(html);

}

var channelId = null;
var channelLabel = '';
var messagesMap = new Map();
var messages = [];

function onClickChanel(ev) {
    showDiv("chanelMsgInputRoot", true);
    var btn = ev.srcElement;
    channelId = btn.id;
    channelLabel = $('#'+channelId).text() ;
    $('#msgInput').attr('placeholder', 'Message #'+channelLabel);
    messages = messagesMap.get(channelId);
    if(!messages) messages = [];
    var el = $('#chanelContent');
    el.html('');
    for(var i=0; i<messages.length; i++) {
        addMsgInContent(messages[i]);
    }
}

function addMsgInContent(msg) {
    var el = $('#chanelContent')
    var s = '';
    s += getElement('b', null, msg.user) + ' : ' + getDateTimeStr(msg.date) + '<br>' ;
    var text = msg.text;
    text = getAnchorHttp(text);
    s += text + '<p>';
    el.append(s);
}

var listMsg = []
function addMessage(msg){
    addMsgInContent(msg)
    messages.push(msg)
    messagesMap.set(channelId, messages);
}

function onMsgEnter(ev) {
    var key = ev.key;
    if(key == "Enter") {
        var user = getUserName();
        var text = $('#msgInput').val();
        addMessage({channelId, user, text, date:new Date()});
        $('#msgInput').val('');
    }
}

