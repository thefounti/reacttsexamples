import { FunctionComponent } from "react";
import { withInstrumentStatic } from "../../adapters/Soundfont/withInstrumentStatic";
import { useAudioContext } from "../AudioContextProvider/useAudioContext";
import { Keyboard } from "./Keyboard";

const withGuitar = withInstrumentStatic('acoustic_guitar_steel')
const withPiano = withInstrumentStatic('acoustic_grand_piano')
const WrappedKeyboard = withPiano(Keyboard);
// const WrappedKeyboard = withGuitar(Keyboard);

export const KeyboardWithInstrument: FunctionComponent = () => {
    const AudioContext = useAudioContext()!
    return <WrappedKeyboard AudioContext={AudioContext} />
}