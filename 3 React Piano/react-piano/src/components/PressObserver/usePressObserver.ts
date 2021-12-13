
import { ButtonHTMLAttributes, KeyboardEvent, useEffect, useState } from "react";
import { Key as KeyLabel } from '../../domain/keyboard'
type IsPressed = boolean
type EventCode = string

interface Settings {
    whatchKey: KeyLabel
    onStartPress: Function
    onFinishPress: Function
}


function fromEventCode(code: EventCode): KeyLabel {
    const prefixRegex = /Key|Digit/gi
    return code.replace(prefixRegex, "")
}

function equal(whatchKey: KeyLabel, code: EventCode): boolean {
    return fromEventCode(code).toUpperCase() === whatchKey.toUpperCase()
}

export function usePressObserver({
    whatchKey,
    onStartPress,
    onFinishPress
}: Settings): IsPressed {
    const [pressed, setPressed] = useState<IsPressed>(false)

    useEffect(() => {
        function handlePressStart(event: Event): void {
            const _parsedEvent = event as unknown as KeyboardEvent<HTMLButtonElement>
            if (pressed || !equal(whatchKey, _parsedEvent.code)) return
            setPressed(true)
            onStartPress()
        }

        function handlePressFinish(event: Event): void {
            const _parsedEvent = event as unknown as KeyboardEvent<HTMLButtonElement>
            if (!pressed || !equal(whatchKey, _parsedEvent.code)) return
            setPressed(false)
            onFinishPress()
        }

        document.addEventListener('keydown', handlePressStart);
        document.addEventListener('keyup', handlePressFinish);

        return () => {
            document.removeEventListener('keydown', handlePressStart);
            document.removeEventListener('keyup', handlePressFinish);
        }
    }, [whatchKey, pressed, setPressed, onStartPress, onFinishPress])

    return pressed;
}

