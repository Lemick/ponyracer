import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RaceService} from '../race.service';
import {RaceModel} from '../models/race.model';
import {PonyWithPositionModel} from '../models/pony.model';
import {Subscription} from 'rxjs';
import {filter, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {

  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription;
  error: boolean;
  betWon: boolean;
  winners: Array<PonyWithPositionModel>;

  constructor(private raceService: RaceService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const raceIdParam = this.activatedRoute.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService.get(+raceIdParam).pipe(
      tap(race => this.raceModel = race),
      filter(race => race.status !== 'FINISHED'),
      switchMap(race => this.raceService.live(race.id))
      ).subscribe({
         next: poniesWithPosition => {
           this.poniesWithPosition = poniesWithPosition;
           this.raceModel.status = 'RUNNING';
         },
         error: err => {
           this.error = true;
         },
        complete: () => {
          this.raceModel.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(winnerPony => winnerPony.id = this.raceModel.betPonyId);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
