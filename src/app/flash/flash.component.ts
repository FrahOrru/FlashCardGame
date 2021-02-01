import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IFlash } from './IFlash.model';
@Component({
 selector: 'app-flash',
 templateUrl: './flash.component.html',
 styleUrls: ['./flash.component.css'],
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashComponent {
 @Input() flash: IFlash = {
 id: 1,
 question: 'React to Angular',
 answer: 'No Reaction :)',
 show: false,
 };

 @Output() onToggleCard = new EventEmitter();
 @Output() onDelete = new EventEmitter();
 @Output() onEdit = new EventEmitter();
 @Output() onRememberChange = new EventEmitter();

 toggleCard(){
   this.onToggleCard.emit(this.flash.id);
 }

 markCorrect(){
   this.onRememberChange.emit({
     id: this.flash.id,
     flag: 'correct'
   })
 }

 markIncorrect(){
   this.onRememberChange.emit({
     id: this.flash.id,
     flag: 'incorrect'
   })
 }

 editFlash(){
   this.onEdit.emit(this.flash.id);
 }

 deleteFlash(){
   this.onDelete.emit(this.flash.id);
 }

}
