import clsx from "clsx";
import React, { FunctionComponent, ReactEventHandler } from "react";
import { NoteType } from "../../domain/note";
import { usePressObserver } from "../PressObserver";
import "./style.css";

interface KeyProps {
    type: NoteType,
    label: string,
    disabled?: boolean,
    onUp: ReactEventHandler<HTMLButtonElement>,
    onDown: ReactEventHandler<HTMLButtonElement>
}

export const Key: FunctionComponent<KeyProps> = (props) => {
    const { type, label, onDown, onUp, ...rest } = props

    const pressed = usePressObserver({
        whatchKey: label,
        onStartPress: onDown,
        onFinishPress: onUp
    })

    return (
        <button
            className={clsx(`key key--${type}`, pressed && 'is-pressed')}
            onMouseDown={onDown}
            onMouseUp={onUp}
            type='button'
            {...rest}
        >
            {label}
        </button>
    )
}