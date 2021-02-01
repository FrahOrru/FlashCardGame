import { FlashService } from './flash.service';
import { IFlash } from './flash/IFlash.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FlashCardGame';
  flash: IFlash;
  flashs;
  editing = false;
  editingId: number;
  subscription: Subscription;

  @ViewChild('flashForm', {static: true}) flashForm: NgForm;

  constructor(private flashService: FlashService){
    this.flashs = this.flashService.flashs;
  }
  flash$: Observable<IFlash[]>;

  ngOnInit(){
    this.flash$ = this.flashService.flashs$
  }

  handleSubmit(): void{
    this.flashService.addFlash(this.flashForm.value)
    this.handleClear();
  }

  handleToggleCard(id: number){
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }
  handleRememeberedChange({id, flag}) {
    this.flashService.rememberedChange(id,flag);
  }

  handleUpdate(){
    this.flashService.updateFlash(this.editingId,this.flash)
    this.handleCancel();
  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    this.flash = this.flashService.getFlash(id);
  }

  handleClear(){
    this.flash = {
        question: '',
        answer: '',
        show: false,
        id: null
    };
    this.flashForm.reset();
  }

  handleCancel(){
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

}
