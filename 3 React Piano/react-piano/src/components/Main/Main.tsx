import React, { FunctionComponent } from "react"
import { useAudioContext } from "../AudioContextProvider/useAudioContext"
import { Keyboard } from "../Keyboard/Keyboard"
import { WithInstrument } from "../Keyboard/WithInstrumentClassAndProvider"
import { NoAudioMessage } from "../NoAudioMessage/NoAudioMessage"
import { PlayGround } from "../PlayGround"

export const Main: FunctionComponent = () => {
    const AudioContext = useAudioContext()
    return !!AudioContext ? (
        <PlayGround />
    ) : (
        <NoAudioMessage />
    )
}
