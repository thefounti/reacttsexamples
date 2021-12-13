import { FunctionComponent, useState } from "react";
import { DEFAULT_INSTRUMENT } from "../../domain/audio";
import { InstrumentContext } from "./Context";

export const InstrumentProvider: FunctionComponent = ({
    children
}) => {
    const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT)

    return (
        <InstrumentContext.Provider value={{ instrument, setInstrument }}>
            {children}
        </InstrumentContext.Provider>
    )
}