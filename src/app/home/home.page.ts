import { Component, Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddtaskPage } from '../addtask/addtask.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';
import { OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dataObj

  avaible=false;

  todoList = []

  today: number = Date.now();

  constructor(private routerOutlet: IonRouterOutlet,private platform: Platform,public todoService: TodoService, public modalCtrl: ModalController, public alertController: AlertController) {
    this.getAlltask()

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }


  async GoToAddNewTask() {

    const modal = await this.modalCtrl.create({
      component: AddtaskPage
    })

    modal.onDidDismiss().then(newTaskObj => {
      this.getAlltask()
    })


    return await modal.present();

  }

  getAlltask() {
    this.todoList = this.todoService.getAllTasks()
  }

  deleteTask(key) {
    this.todoService.deleteTask(key)
    this.getAlltask()
  }

  async update(selectedTask) {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask }
    })
    console.log(selectedTask)

    modal.onDidDismiss().then(() =>
      this.getAlltask()
    )

    return await modal.present()
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Erreur',
      message: 'Remplissez tous les champs',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.GoToAddNewTask();
  }

  ngOnInit() {

  }
}
