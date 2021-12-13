import React, { createContext, useContext } from "react"
import { InstrumentName } from "soundfont-player";
import { DEFAULT_INSTRUMENT } from "../../domain/audio";

export interface ContextValue {
    instrument: InstrumentName
    setInstrument: (instrument: InstrumentName) => void
}

export const InstrumentContext = createContext<ContextValue>({
    instrument: DEFAULT_INSTRUMENT,
    setInstrument() { }
})

export const InstrumentContextConsumer = InstrumentContext.Consumer
export const useInstrument = () => useContext(InstrumentContext)
