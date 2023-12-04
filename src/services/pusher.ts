import Pusher from 'pusher-js';
// Pusher.logToConsole = true;

const pusher = new Pusher('7ac0977315ae79c7da84', {
  cluster: 'eu'
});

export const channel = pusher.subscribe('map');






