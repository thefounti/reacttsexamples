import React, { FunctionComponent, useEffect } from "react";
import { SoundfontProvider } from "../../adapters/Soundfont/SoundfontProvider";
import { SoundfontProviderClass } from "../../adapters/Soundfont/SoundfontProviderClass";
import { useSoundfont } from "../../adapters/Soundfont/useSoundfont";
import { MidiValue } from "../../domain/note";
import { useInstrument } from "../../state/Instrument/Context";
import { useMount } from "../../utils/useMount";
import { useAudioContext } from "../AudioContextProvider/useAudioContext";
import { Keyboard } from "./Keyboard";

export const WithInstrument: FunctionComponent = () => {
    const AudioContext = useAudioContext()!
    const { instrument } = useInstrument()
    ///USADO CON  PROVEEDOR SOUNDFONT
    // return (
    //     <SoundfontProvider
    //         AudioContext={AudioContext}
    //         instrument={instrument}
    //         render={(props) => <Keyboard {...props} />}
    //     />
    // )

    ///USADO CON EL PATRON DE PROVEEDOR PERO USANDO UN PROVEEDOR DE CLASE
    return (
        <SoundfontProviderClass
            AudioContext={AudioContext}
            instrument={instrument}
            render={(props) => <Keyboard {...props} />}
        />
    )
}
