import { createSignal, createComputed, Accessor, createEffect } from 'solid-js';

interface TimeDisplayProps {
    seconds: Accessor<number>
}

export default function TimeDisplay(props: TimeDisplayProps) {

    const [secondsDisplay, setSecondsDisplay] = createSignal('00');
    const [minutesDisplay, setMinutesDisplay] = createSignal('00');

    createEffect(() => {
        if(props.seconds() === -1 ) return
        const seconds = props.seconds() % 60
        setSecondsDisplay(seconds === 0 ? '00' : seconds.toString())
        setMinutesDisplay(Math.floor(props.seconds() / 60).toString())
    })

    return (<span>{minutesDisplay()}:{secondsDisplay()} </span>);
}