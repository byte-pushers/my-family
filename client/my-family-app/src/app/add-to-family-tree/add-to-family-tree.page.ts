import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AlertController, IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-to-family-tree',
  templateUrl: './add-to-family-tree.page.html',
  styleUrls: ['./add-to-family-tree.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class AddToFamilyTreePage implements OnInit {

  parentName: string = '';
  parentType: string = '';
  grandParentName:string ='';
  grandParentType:string='';
  siblingName:string='';
  siblingType:string='';
  spouseName:string='';
  spouseType:string='';
  childrenName:string='';
  childrenType:string='';
  parentsList: Array<{name: string, type: string}> = [];
  grandParentList: Array<{name: string, type: string}> = [];
  siblingList: Array<{name:string, type:string}>=[];
  spouseList: Array<{name:string, type:string}>=[];
  childrenList:Array<{name:string,type:string}>=[];

  constructor(public alertCtrl: AlertController) { }

  async getParents(event: Event){
    if (this.parentName && this.parentType) {
      this.parentsList.push({ name: this.parentName, type: this.parentType });
      this.clearFields(this.parentType);  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in both parent name and select MOM or DAD",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
     await alert.present()
    }
  }

  //gets the grandparents name and type
  async getGrandParents(event: Event){
    if (this.grandParentName && this.grandParentType) {
      this.grandParentList.push({ name: this.grandParentName, type: this.grandParentType });
      this.clearFields(this.grandParentType);  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in both Grand parent name and select Grandma or Grandpa",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  //gets the name of siblings and type
  async getSiblings(event: Event){
    if (this.siblingName && this.siblingType) {
      this.siblingList.push({ name: this.siblingName, type: this.siblingType });
      this.clearFields(this.siblingType);  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in both sibling name and select brother or sister",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  //this gets the name of the spouse and spouse type
  async getSpouse(event: Event){
    if (this.spouseName && this.spouseType) {
      this.spouseList.push({ name: this.spouseName, type: this.spouseType });
      this.clearFields(this.spouseType);  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in both sibling name and select brother or sister",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  // this gets children name and children type
  async getChildren(event: Event){
    if (this.childrenName && this.childrenType) {
      this.childrenList.push({ name: this.childrenName, type: this.childrenType });
      this.clearFields(this.childrenType);  // Clear the input fields after adding
    } else {
      const alert = await this.alertCtrl.create({
        header:'Error',
        message:"Please fill in both children name and select Son or Daughter",
        buttons:['OK'],
        cssClass: 'custom-alert',
      })
      await alert.present()
    }
  }

  //this method removes the parents
  removeParent(index: number) {
    this.parentsList.splice(index, 1);
  }

  //this removes grandparents
  removeGrandParent(index: number) {
    this.grandParentList.splice(index, 1);
  }

  //this removes siblings from the list
  removeSiblings(index:number){
    this.siblingList.splice(index,1)
  }

  //This removes the spouse from the list
  removeSpouse(index:number){
    this.spouseList.splice(index,1);
  }

  //This removes the children from the list
  removeChildren(index:number){
    this.childrenList.splice(index,1)
  }

  //clears all input fields
  clearFields(Type:string) {
   if(Type=="mom" || Type=="dad" ){
     this.parentName = '';
     this.parentType = '';
   }
    if(Type=="Grandma" || Type=="Grandpa" ){
      this.grandParentName ='';
      this.grandParentType='';
    }
    if(Type=="Brother" || Type=="Sister" ){
      this.siblingName='';
      this.siblingType=''
    }
    if(Type=="Husband" || Type=="Wife" ){
      this.spouseName='';
      this.spouseType='';
    }
    if(Type=="Son" || Type=="Daughter" ){
      this.childrenName='';
      this.childrenType='';
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
