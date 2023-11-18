const content = document.querySelector('.content')
let token = null

function run() {
    if (!token) {
        renderLoginForm()
    } else {
        fetchMessages().then(messages => {
            renderMessages(messages)
        })

    }
}

run()

function renderLoginForm() {
    let loginTemplate =

        `<div class="login form-control">
                            
                            <input type="text" id="username" class="form-control mt-3" placeholder="username">
                            <input type="password" name="" id="password" class="form-control mt-3" placeholder="password">
                            
                         
                           
                            <button class="btn mt-3 boutonLogin" id="loginButton">Log in 😊</button>
                           
                        </div>`
    render(loginTemplate)
    const loginButton = document.querySelector('#loginButton')
    loginButton.addEventListener('click', () => {
        login()
    })
}


function login() {
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')

    let body = {
        username: username.value,
        password: password.value
    }

    let params = {
        headers: {"Content-type": "application/json"},
        method: "POST",
        body: JSON.stringify(body)

    }

    fetch('https://b1messenger.imatrythis.tk/login', params)
        .then(response => response.json())
        .then(data => {
            if (data.message == "Invalid credentials.") {
                renderLoginForm()
            } else {
                token = data.token
                run()
            }

        })
}

function generateMessage(message) {
    let messageTemplate = `
        <div class="message-container">
            <div class="row">
                <div class="message-bubble">
              
                    
                    <p><strong>${message.author.username} :</strong> ${message.content}</p>
                    
                    <div class="buttonMsg">
                       <button type="button" class="btn btn-success">Edit</button>
                       <button type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>`

    return messageTemplate
}
function renderMessages(tableauMessages) {
    let contentMessages = ""
    tableauMessages.forEach(message => {
        contentMessages += generateMessage(message)
    })
    render(contentMessages)
    renderMessageForm()
}

function render(pageContent) {
    content.innerHTML = ""
    content.innerHTML = pageContent
};

async function fetchMessages() {
    let params = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET",
    }
    return await fetch('https://b1messenger.imatrythis.tk/api/messages', params)
        .then(response => response.json())
        .then(data => {
            if (data.message == "Invalid credentials.") {
                renderLoginForm()
            } else {
                return data
            }
        })
}
// --------------------SEND MESSAGE -------------- //
function renderMessageForm() {
    let messageTemplate =
        `<div class="form-message mt-5" style="display: block;">
            <input type="text" id="message" class="form-message-input" placeholder="Message..." style="border: 1px solid black;">
            <button class="btn mt-3 boutonSend" id="sendButton" style=" color: white;">Envoyer</button>
        </div>`;

    content.innerHTML += messageTemplate;

    const sendButton = document.querySelector('#sendButton');

    sendButton.addEventListener('click', () => {
        postMessage();
    });
}

async function postMessage(){

    const message = document.querySelector('#message')


    let corpsMessage = {
        content : message.value
    }

    const messageParams = {
        headers : {"Content-type":"application/json",
            "Authorization":`Bearer ${token}`},
        method : "POST",
        body :  JSON.stringify(corpsMessage)
    }

    await fetch(`https://b1messenger.imatrythis.tk/api/messages/new`, messageParams)
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            run()
        })
}
// --------------------SEND MESSAGE -------------- //
