import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { AlertController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  
  @Input() task;

  categorySlectedCategory

  @ViewChild(IonDatetime) datetime: IonDatetime;

  categories = [];

  itemName
  itemDate
  itemPriority
  itemCategory

  dateValue = '';
  timeValue = '';

  newTaskObj= {}

  constructor(public modalCtrl: ModalController, public todoService: TodoService) { }

  ngOnInit() {
    this.categories.push('Boulot')
    this.categories.push('personnel')
    this.categories.push('Maison')
    this.categories.push('Autres')


    this.itemName = this.task.value.itemName
    this.timeValue = this.task.value.itemTime
    this.dateValue = this.task.value.itemDate
    this.categorySlectedCategory = this.task.value.itemCategory
    this.itemPriority = this.task.itemPriority


  }



   /*DATE AND TIME*/

   confirmDate() {
    this.datetime.confirm(true);
  }
  
  resetDate() {
    this.datetime.reset();
  }

  confirmTime() {
    this.datetime.confirm(true);
  }
  
  resetTime() {
    this.datetime.reset();
  }

  formatDate(value: string, date_format = 'EEE, dd MMM yyy') {
    return format(parseISO(value), date_format);
  }

  formatTime(value:any, time_format = 'HH:mm'){
    return format(parseISO(value), time_format);
  }

  selectedCategory(index){
    this.categorySlectedCategory = this.categories[index];
  }

  async update(){

    this.newTaskObj = ({itemName:this.itemName,
      itemPriority:this.itemPriority,
      itemCategory:this.itemCategory,
      itemDate:this.dateValue,
      itemTime:this.timeValue});

      let uid = this.task.key

      await this.todoService.updateTask(uid, this.newTaskObj)
      this.dismiss()

  }
  async dismiss(){
    await this.modalCtrl.dismiss();
  }

}
