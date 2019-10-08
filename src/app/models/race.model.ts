import {PonyModel, PonyWithPositionModel} from './pony.model';

export interface RaceModel {
  id: number;
  startInstant: string;
  name: string;
  ponies: Array<PonyModel>;
  betPonyId?: number;
}

export interface LiveRaceModel {
  ponies: Array<PonyWithPositionModel>;
}
