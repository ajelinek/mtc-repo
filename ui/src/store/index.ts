import { createSignal } from 'solid-js';

import socket from '../api/socket';

socket.on('timer', (time: number) => {
    console.log('timer', time)
    timerSignal.setTimer(time);
});

export function startTimer(seconds: number = 60*5) {
    socket.emit('timer-start', seconds)
}

const [timer, setTimer] = createSignal<number>();

export const timerSignal = {
    value: timer, 
    setTimer, 
}