import { InstrumentName } from "soundfont-player";
import instruments from 'soundfont-player/names/musyngkite.json';

interface Option {
    label: string
    value: InstrumentName
}

type OptionsList = Option[]
type InstrumenList = InstrumentName[]

function normalizeList(list: InstrumenList): OptionsList {
    return list.map((instrument) => ({
        value: instrument,
        label: instrument.replace('/_/gi', '')
    }))
}

export const options = normalizeList(instruments as InstrumenList)
