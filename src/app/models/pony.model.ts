export interface PonyModel {
  id: number;
  name: string;
  color: string;
}

export interface PonyWithPositionModel extends  PonyModel {
  position: number;
  boosted?: boolean;
}

export class Test {
  private _test: string;
}
