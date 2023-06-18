import { Injectable } from '@angular/core';
import {Series} from "./series/series";

@Injectable()
export class MessageService {
  seriesInfo: Series | undefined;

  add(message: Series) {
    this.seriesInfo = message;
  }
}
