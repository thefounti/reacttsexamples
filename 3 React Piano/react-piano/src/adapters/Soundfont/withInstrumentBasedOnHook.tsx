import { ComponentType, useEffect } from "react";
import { InstrumentName } from "soundfont-player";
import { MidiValue } from "../../domain/note";
import { Optional } from "../../domain/types";
import { useSoundfont } from "./useSoundfont";

interface InjectedProps {
    loading: boolean,
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

interface ProviderProps {
    AudioContext: AudioContextType
    instrument: InstrumentName
}

interface ProviderState {
    loading: boolean
    current: Optional<InstrumentName>
}


export const withInstrument = (WrappedComponent: ComponentType<InjectedProps>) => {
    return function WithInstrumentComponent(props: ProviderProps) {
        const { AudioContext, instrument } = props
        const fromHook = useSoundfont({ AudioContext })
        const { loading, current, play, stop, load } = fromHook

        useEffect(() => {
            if (!loading && instrument !== current) load(instrument)
        }, [load, loading, current, instrument])

        return (
            <WrappedComponent loading={loading} play={play} stop={stop} />
        )
    }
}