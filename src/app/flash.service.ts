import { IFlash } from './flash/IFlash.model';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  flash: IFlash;

  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
    }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
    }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
    }];

    flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

  constructor() { }

  addFlash(flash: IFlash){
    this.flashs = [
      ...this.flashs, {
        ...flash,
        show: false,
        id: getRandomNumber()
      }
    ];
    this.flashs$.next(this.flashs);
  }

  toggleFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flash = this.flashs.find(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flash.show
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  deleteFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  rememberedChange(id: number, flag) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1)
    ]
    this.flashs$.next(this.flashs);
  }

  updateFlash(id, updatedFlash: IFlash) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...updatedFlash,
      },
      ...this.flashs.slice(index + 1),
    ]
    this.flashs$.next(this.flashs);
  }

  getFlash(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    return flash;
  }

}
