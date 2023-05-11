import { createSignal } from 'solid-js';

interface TimeDisplayProps {
    seconds: number
}

export default function TimeDisplay(props: TimeDisplayProps) {
    const [minutes, setMinutes] = createSignal(Math.floor(props.seconds / 60));
    const [seconds, setSeconds] = createSignal(props.seconds % 60);

    function formatTime(value: number) {
        return value < 10 ? `0${value}` : `${value}`;
    }

    function updateDisplay() {
        setMinutes(Math.floor(props.seconds / 60));
        setSeconds(props.seconds % 60);
    }

    updateDisplay();

    return (
        <span>
            {minutes()}:{formatTime(seconds())}
        </span>
    );
}