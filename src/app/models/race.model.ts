import { PonyModel } from './pony.model';

export interface RaceModel {
  id: number;
  startInstant: string;
  name: string;
  ponies: Array<PonyModel>;
  betPonyId?: number;
}
