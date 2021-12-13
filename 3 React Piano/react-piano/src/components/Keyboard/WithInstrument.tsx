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
    ///ANTES DE USAR EL PATRON RENDER PROPS
    const { loading, play, stop, load, current } = useSoundfont({ AudioContext })

    // useMount(load);
    useEffect(() => {
        if (!loading && instrument !== current) load(instrument)
    }, [load, loading, current, instrument])

    return <Keyboard loading={loading} play={play} stop={stop} />
}
