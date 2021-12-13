import React,{ FunctionComponent } from "react";
import { InstrumentProvider } from "../../state/Instrument/Provider";
import { InstrumentSelector } from "../InstrumentSelector";
import { WithInstrument } from "../Keyboard/WithInstrument";
// import { WithInstrument } from "../Keyboard/WithInstrumentClassAndProvider";
import { KeyboardWithInstrument } from "../Keyboard/WithInstrument_HOC";

export const PlayGround: FunctionComponent = () => {
    return (
        <InstrumentProvider>
            <div className='playground'>
                {/* <WithInstrument /> */}
                <KeyboardWithInstrument/>
                <InstrumentSelector />
            </div>
        </InstrumentProvider>
    )
}