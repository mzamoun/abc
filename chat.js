function onChatClick(ev) {
    //notImplemented();
    var html = '';
    html += '<link rel="stylesheet" href="chat.css">\n'
    html += getElement('h1', null, 'Not implemented yet, but : ') + '<br>' ;
    html += '<table class="tableChat">';
    html += '<tr>';
    
    html += '<td id="chanelsList">';
    html += getElement('button', {class:"btn", id:"channel1", onclick:"onClickChanel(event)"}, 'chanel 1 ') + '<br>' ;
    html += getElement('button', {class:"btn", id:"channel2", onclick:"onClickChanel(event)"}, 'chanel 2 ') + '<br>' ;
    html += '</td>';
    
    html += '<td id="chanelContentRoot">';

    html += '<div id="chanelContent">';

    html += '</div>';

    html += '<div id="chanelMsgInputRoot">';
    html += getElement('div', {id:"msgCorp", class:"msgCorp"}, '') + '<br>' ;
    html += getElement('div', {id:"msgInputRoot", class:"msgInputRoot"}, 
                getElement('input', {id:"msgInput", onclick:"addMessage(event)", class:"msgInput"}, '') + '<br>'
        ) + '<br>' ;
    html += '</div>';

    html += '</td>';

    html += '</tr>';
    html += '</table>';

    showCompo(html);

}

var channelId = null;
var channelLabel = '';
function onClickChanel(ev) {
    var btn = ev.srcElement;
    channelId = btn.id;
    channelLabel = $('#'+channelId).text() ;
    $('#msgInput').attr('placeholder', 'Message #'+channelLabel)
    
}

