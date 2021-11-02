// @ts-ignore
const socket = io();

const text = document.getElementById('menssage');
const button = document.getElementById('menssageButton');
const chat = document.getElementById('chat');
const urlSearch = new URLSearchParams(location.search);

socket.emit('lobbyId', urlSearch.get('id'));

socket.on('getLobby', lobby => {
    const userId = document.cookie.split('chatLogin=')[1]
    button.addEventListener('click', btnClick);
    text.addEventListener('keydown', e => {
        if(e.key === "Enter") btnClick(e);
    })

    function btnClick(e){
        let data = {
            id: urlSearch.get('id'),
            // @ts-ignore
            message: text.value,
            userId: userId 
        }

        socket.emit('message', data);
        // @ts-ignore
        text.value = '';
    }
})

socket.on('message', data => {
    chat.innerHTML += `<h4>${data.user.name}: ${data.text} </h4>`
})