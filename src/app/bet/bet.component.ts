import { Component, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  raceModel: RaceModel;
  betFailed = false;

  constructor(private activatedRoute: ActivatedRoute, private raceService: RaceService) {}

  ngOnInit() {
    const raceId = +this.activatedRoute.snapshot.paramMap.get('raceId');
    this.raceService.get(raceId).subscribe({
      next: value => {
        this.raceModel = value;
      }
    });
  }

  betOnPony(pony: PonyModel) {
    if (this.isPonySelected(pony)) {
      this.raceService.cancelBet(this.raceModel.id).subscribe({
        next: value => this.raceModel.betPonyId = null,
        error: err => this.betFailed = true
      });
    } else {
      this.raceService.bet(this.raceModel.id, pony.id).subscribe({
        next: race => this.raceModel = race,
        error: err => this.betFailed = true
      });
    }
  }

  isPonySelected(pony: PonyModel) {
    return pony.id === this.raceModel.betPonyId;
  }
}
