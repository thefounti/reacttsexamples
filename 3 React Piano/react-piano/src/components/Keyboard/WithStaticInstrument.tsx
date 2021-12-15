import { FunctionComponent } from "react";
import { withInstrumentStatic } from "../../adapters/Soundfont/withInstrumentStatic";
import { useAudioContext } from "../AudioContextProvider/useAudioContext";

const withGuitar = withInstrumentStatic('acoustic_guitar_steel')
const withPiano = withInstrumentStatic('acoustic_grand_piano')
const WrappedKeyboard = withPiano(keyboard);

export const KeyboardWithInstrument: FunctionComponent = () => {
    const AudioContext = useAudioContext()!
    return <WrappedKeyboard AudioContext={AudioContext} />
}