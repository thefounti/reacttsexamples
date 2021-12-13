import { Component, ReactElement } from 'react';
import Soundfont, { InstrumentName, Player } from 'soundfont-player'
import { DEFAULT_INSTRUMENT } from '../../domain/audio';
import { MidiValue } from '../../domain/note';
import { AudioNodesRegistry } from '../../domain/sound';
import { Optional } from '../../domain/types';

interface ProvidedProps {
    loading: boolean,
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

interface ProviderProps {
    instrument: InstrumentName
    AudioContext: AudioContextType
    render(props: ProvidedProps): ReactElement
}

interface ProviderState {
    loading: boolean
    current: Optional<InstrumentName>
}

