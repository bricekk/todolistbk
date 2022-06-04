import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { IonDatetime } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { AlertController } from '@ionic/angular';
import { HomePage} from '../home/home.page';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.page.html',
  styleUrls: ['./addtask.page.scss'],
})
export class AddtaskPage implements OnInit {

  @ViewChild(IonDatetime) datetime: IonDatetime;

  categories = ['Boulot', 'Personnel', 'Maison', 'Autres', 'Bricolage'];


  itemName = '';
  itemPriority
  itemCategory

  newTaskObj= {}

  dateValue = '';
  timeValue = '';

  options = {
    slidesPerView:2.5,
    centeredSlides:true,
    loop: true,
    spaceBetween: 5
  }

  constructor(public modalCtrl: ModalController, public todoService: TodoService,  public alertController: AlertController, public homePage: HomePage) { }

  ngOnInit() {
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


  /*MODAL FUNCTION*/

  async dismiss(){
    await this.modalCtrl.dismiss();
  }

  async dismissModal(){
    await this.modalCtrl.dismiss(this.newTaskObj);
  }

  /*SELECTED VALUE*/

  selectedCategory(index){
    this.itemCategory = this.categories[index];
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Oups',
      message: 'Tache et Date sont requis',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.homePage.GoToAddNewTask();
    console.log('onDidDismiss resolved with role', role);
  }

  /*TASK FNUCTION*/

  async add(){
    this.newTaskObj = ({itemName:this.itemName,
                        itemPriority:this.itemPriority,
                        itemCategory:this.itemCategory,
                        itemDate:this.dateValue,
                        itemTime:this.timeValue});
        
    let trimedTaskNamed = this.itemName.trim();
    let trimedTaskDate = this.dateValue.trim();

    let uid = this.itemName + this.dateValue;
    
    if(trimedTaskNamed.length != 0 && trimedTaskDate.length != 0){
      await this.todoService.addTask(uid, this.newTaskObj)
    }else{                 
      this.presentAlert();
      console.log(trimedTaskDate)
    }
    this.dismissModal();
  }
}
