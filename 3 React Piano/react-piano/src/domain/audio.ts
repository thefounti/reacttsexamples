import { InstrumentName } from 'soundfont-player';
import { Optional } from './types';

export function accessContext(): Optional<AudioContextType> {
    return window.AudioContext || window.webkitAudioContext || null
}

export const DEFAULT_INSTRUMENT: InstrumentName= 'acoustic_grand_piano'