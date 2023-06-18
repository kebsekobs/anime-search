import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Series } from './series';
import { SeriesService } from './series.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  providers: [SeriesService],
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  series: Series[] = [];
  editSeries: Series | undefined;
  seriesName = '';

  constructor(private seriesService: SeriesService, private messenger: MessageService) {}

  @ViewChild('heroEditInput')
  set seriesEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.getSeries();
  }

  getSeries(): void {
    this.seriesService.getSeries()
      .subscribe(series => (this.series = series));
  }

  info(series1: Series): void {
    this.seriesService
      .getInfoSeries(series1.id)
      .subscribe();
    this.messenger.add(series1);
  }

  search(searchTerm: string) {
    this.editSeries = undefined;
    if (searchTerm) {
      this.seriesService
        .searchSeries(searchTerm)
        .subscribe(series => (this.series = series));
    } else {
      this.getSeries();
    }
  }
}
