const load_messages = function(my_id, his_id) {
    cordovaHTTP.get("https://hackaton-i-pro-backend.herokuapp.com/messages", {
        'from_user_id':my_id,
        'to_user_id':his_id,
    },
    function(response) {
        console.log(response.status);
        try {
            response.data = JSON.parse(response.data);
            //extract messages
            var target = document.getElementsByClassName('chat-messages')[0]
            
            to_user_id = 3
            from_user_id = 4
            time = "6:52"
            message_text = "aboba"
            target.innerHtml +=
       `<div class="message message-${from_user_id!=my_id ? "not" : ""}mine">
            <div class="message__text">
                ${message_text}
            </div>
            <div class="message__footer">
                <div class="message__footer__time">
                ${time}
                </div>
            </div>
        </div>`
        } catch(e) {
            console.error("JSON parsing error");
        }
    }, 
    function(response) {
        // prints 403
        console.log(response.status);
        
        //prints Permission denied 
        console.log(response.error);
    });
}

load_messages(3,4)
console.log("Done!")