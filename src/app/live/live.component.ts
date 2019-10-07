import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RaceService} from '../race.service';
import {RaceModel} from '../models/race.model';
import {PonyWithPositionModel} from '../models/pony.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {

  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;

  constructor(private raceService: RaceService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const raceIdParam = this.activatedRoute.snapshot.paramMap.get('raceId');
    this.raceService.get(+raceIdParam).subscribe({ next: value => this.raceModel = value});
    this.positionSubscription = this.raceService.live(+raceIdParam).subscribe(
      {next: poniesWithPosition => this.poniesWithPosition = poniesWithPosition});
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
