import { PonyModel, PonyWithPositionModel } from './pony.model';

export interface RaceModel {
  id: number;
  startInstant: string;
  name: string;
  ponies: Array<PonyModel>;
  betPonyId?: number;
  status?: 'PENDING' | 'RUNNING' | 'FINISHED';
}

export interface LiveRaceModel {
  ponies: Array<PonyWithPositionModel>;
  status: 'PENDING' | 'RUNNING' | 'FINISHED';
}
