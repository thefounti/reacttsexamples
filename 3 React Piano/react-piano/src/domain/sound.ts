import { Player } from "soundfont-player";
import { MidiValue } from "./note";
import { Optional } from "./types";

export type AudioNodesRegistry=Record<MidiValue,Optional<Player>>