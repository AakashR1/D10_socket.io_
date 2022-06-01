const socket = io('http://localhost:8000');
console.log('here');
const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message,position)=>{
    const messaageElement = document.createElement('div');
    messaageElement.innerText = message;
    messaageElement.classList.add('message');
    messaageElement.classList.add(position);
    messageContainer.append(messaageElement);
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,"right");
    socket.emit('send',message);
    messageInput.value = ""
})

let Name = prompt('Enter your name to join');
socket.emit('new-user-joined',Name);

socket.on("user-joined",(Name)=>{
    append(`${Name} joined the chat`,'right');
})

socket.on("receive",(data)=>{
    append(`${data.Name}: ${data.message}`,'left');
})

socket.on('left',(Name)=>{
    append(`${Name} left the chat`,'left');
})