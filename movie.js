
const socket = new WebSocket("ws://127.0.0.1:6969/")
const movie = document.getElementById('movie')
const fiveMinutes = 300000

const sendMessage = (msg, time) => {
	socket.send(JSON.stringify({
		msg: msg,
		time: time
	}))
}

// keep connection alive
const ping = () => {
	socket.send('ping')
}

setInterval(ping, fiveMinutes);

const getMessage = (data) => {
	return JSON.parse(data)
}

socket.onopen = () => {
	console.log("[open] Connection established");
};

movie.onpause = () => {
	sendMessage('pause', movie.currentTime)
}

movie.onplay = () => {
	sendMessage('play', movie.currentTime)
}


socket.onmessage = (event) => {
	data = getMessage(event.data)

	switch (data.msg) {
		case 'play':
			console.log(data.msg)
			movie.play()
			break;
		case 'pause':
			console.log(data.msg)
			movie.pause()
			break;

		default:
			break;
	}
	movie.currentTime = data.time
}