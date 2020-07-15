const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const meesageInput = document.getElementById('meassageInp');
const meesageContainer = document.querySelector(".container");
const name = prompt("Enter Your Name To Join");
var audio = new Audio("ting.mp3")



const append = (message, position) => {
    const meassageElement = document.createElement('div');
    meassageElement.innerText = message;
    meassageElement.classList.add('message');
    meassageElement.classList.add(position);
    meesageContainer.append(meassageElement);

    if (position == 'left') {

        audio.play();

    }

};


socket.emit('new-user-joined', name);


socket.on('user-joined', name => {
    append(`${name} joined to group`, 'right')
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = meassageInp.value;
    append(`you:${message}`, 'right');
    socket.emit('send', message);
    meassageInp.value = '';



});

socket.on('receive', data => {
    append(`${data.name} :${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left te chat`, 'left')
})