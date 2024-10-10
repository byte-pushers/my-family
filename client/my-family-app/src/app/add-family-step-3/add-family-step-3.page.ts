
/*constructor(private router: Router) {
    this.router.navigate(['./add-family-step-3']);
    this.addFamilyForm = new FormGroup({});
  }*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-family-step-3',
  templateUrl: './add-family-step-3.page.html',
  styleUrls: ['./add-family-step-3.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})

export class AddFamilyStep3Page implements OnInit {
  cousinName: string = '';
  uncleName:string = '';
  auntName:string = '';
  cousinsList: Array<{name: string}> = [];
  unclesList: Array<{name: string}> = [];
  auntsList: Array<{name:string}>=[];

  constructor(public alertCtrl: AlertController) {
  }

  async getCousins(event: Event){
    if (this.cousinName) {
      this.cousinsList.push({name: this.cousinName});
      this.clearFields('cousin');  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in cousin name",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  async getUncles(event: Event){
    if (this.uncleName) {
      this.unclesList.push({ name: this.uncleName});
      this.clearFields('uncle');  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in uncle name",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  async getAunts(event: Event){
    if (this.auntName) {
      this.auntsList.push({ name: this.auntName});
      this.clearFields('aunt');  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in aunt name",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  removeCousin(index: number) {
    this.cousinsList.splice(index, 1);
  }

  removeUncle(index: number) {
    this.unclesList.splice(index, 1);
  }

  removeAunt(index:number){
    this.auntsList.splice(index,1)
  }

  // clears all input fields
  clearFields(familyType: string) {
    if (familyType=='cousin') {
      this.cousinName = '';
    }
    if (familyType=='uncle') {
      this.uncleName = '';
    }
    if (familyType=='aunt') {
      this.auntName = '';
    }
  }

  ngOnInit() {
  }

  something() {
    console.log("it is clicking")
  }

  protected readonly event = event;
  protected readonly Event = Event;
}
