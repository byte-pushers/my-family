import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    AlertController,
    IonAlert,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {FamilyMember, NameType, Person, RelationshipType} from "../models/family-member.model";
import {FamilyTreeService} from "../services/family-tree.service";
import {GlobalErrorService} from "../services/GlobalError.service";
import {GlobalErrorHandler} from "../GlobalExceptionHandler/GlobalErrorHandler";
import {ApiError} from "../models/ApiError.model";

@Component({
    selector: 'app-add-to-family-tree',
    templateUrl: './add-to-family-tree.page.html',
    styleUrls: ['./add-to-family-tree.page.scss'],
    standalone: true,
    providers: [GlobalErrorService, GlobalErrorHandler],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonAlert]
})
export class AddToFamilyTreePage implements OnInit {

    errorMessages: ApiError[] = [];

    parentName: string = '';
    parentType: RelationshipType | '' = '';
    grandParentName: string = '';
    grandParentType: RelationshipType | '' = '';
    siblingName: string = '';
    siblingType: RelationshipType | '' = '';
    spouseName: string = '';
    spouseType: RelationshipType | '' = '';
    childrenName: string = '';
    childrenType: RelationshipType | '' = '';

    parentsList: FamilyMember[] = [];
    grandParentList: FamilyMember[] = [];
    siblingList: FamilyMember[] = [];
    spouseList: FamilyMember[] = [];
    childrenList: FamilyMember[] = [];


    constructor(public alertCtrl: AlertController,
                private familyTreeService: FamilyTreeService,
                private globalError: GlobalErrorHandler,
                private globalErrorService: GlobalErrorService) {

    }

    async getParents(event: Event) {
        if (this.parentName && this.parentType) {
            const person = new Person(this.parentName.split(' ')[0], this.parentName.split(' ')[1], 45);
            const familyMember = new FamilyMember(NameType.FULL_NAME, this.parentType, person)
            this.parentsList.push(familyMember);
            // this.parentsList.push({ name: this.parentName, type: this.parentType });
            this.clearFields(this.parentType);  // Clear the input fields after adding

        } else {
            const alert = await this.alertCtrl.create({
                header: 'Error',
                message: "Please fill in both parent name and select MOM or DAD",
                buttons: ['OK'],
                cssClass: 'custom-alert',
            })
            await alert.present()
        }
    }

    //gets the grandparents name and type
    async getGrandParents(event: Event) {
        if (this.grandParentName && this.grandParentType) {
            const person = new Person(this.grandParentName.split(' ')[0], this.grandParentName.split(' ')[1], 45);
            const familyMember = new FamilyMember(NameType.FULL_NAME, this.grandParentType, person)
            this.grandParentList.push(familyMember);
            // this.grandParentList.push({ name: this.grandParentName, type: this.grandParentType });
            this.clearFields(this.grandParentType);  // Clear the input fields after adding

        } else {
            const alert = await this.alertCtrl.create({
                header: 'Error',
                message: "Please fill in both Grand parent name and select Grandma or Grandpa",
                buttons: ['OK'],
                cssClass: 'custom-alert',
            })
            await alert.present()
        }
    }

    //gets the name of siblings and type
    async getSiblings(event: Event) {
        if (this.siblingName && this.siblingType) {
            const person = new Person(this.siblingName.split(' ')[0], this.siblingName.split(' ')[1], 45);
            const familyMember = new FamilyMember(NameType.FULL_NAME, this.siblingType, person)
            this.siblingList.push(familyMember);
            // this.siblingList.push({ name: this.siblingName, type: this.siblingType });
            this.clearFields(this.siblingType);  // Clear the input fields after adding
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Error',
                message: "Please fill in both sibling name and select brother or sister",
                buttons: ['OK'],
                cssClass: 'custom-alert',
            })
            await alert.present()
        }
    }

    //this gets the name of the spouse and spouse type
    async getSpouse(event: Event) {
        if (this.spouseName && this.spouseType) {
            const person = new Person(this.spouseName.split(' ')[0], this.spouseName.split(' ')[1], 45);
            const familyMember = new FamilyMember(NameType.FULL_NAME, this.spouseType, person)
            this.spouseList.push(familyMember);
            // this.spouseList.push({ name: this.spouseName, type: this.spouseType });
            this.clearFields(this.spouseType);  // Clear the input fields after adding
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Error',
                message: "Please fill in both sibling name and select brother or sister",
                buttons: ['OK'],
                cssClass: 'custom-alert',
            })
            await alert.present()
        }
    }

    // this gets children name and children type
    async getChildren(event: Event) {
        if (this.childrenName && this.childrenType) {
            const person = new Person(this.childrenName.split(' ')[0], this.childrenName.split(' ')[1], 45);
            const familyMember = new FamilyMember(NameType.FULL_NAME, this.childrenType, person)
            this.childrenList.push(familyMember);
            // this.childrenList.push({ name: this.childrenName, type: this.childrenType });
            this.clearFields(this.childrenType);  // Clear the input fields after adding
        } else {
            const alert = await this.alertCtrl.create({
                header: 'Error',
                message: "Please fill in both children name and select Son or Daughter",
                buttons: ['OK'],
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
    removeSiblings(index: number) {
        this.siblingList.splice(index, 1)
    }

    //This removes the spouse from the list
    removeSpouse(index: number) {
        this.spouseList.splice(index, 1);
    }

    //This removes the children from the list
    removeChildren(index: number) {
        this.childrenList.splice(index, 1)
    }

    //clears all input fields
    clearFields(Type: string) {
        if (Type == "mom" || Type == "dad") {
            this.parentName = '';
            this.parentType = '';
        }
        if (Type == "Grandma" || Type == "Grandpa") {
            this.grandParentName = '';
            this.grandParentType = '';
        }
        if (Type == "Brother" || Type == "Sister") {
            this.siblingName = '';
            this.siblingType = ''
        }
        if (Type == "Husband" || Type == "Wife") {
            this.spouseName = '';
            this.spouseType = '';
        }
        if (Type == "Son" || Type == "Daughter") {
            this.childrenName = '';
            this.childrenType = '';
        }

    }

    //creating family member object to send to the backend


    async submit() {
        const response = [
            {
                code: 'E008',
                message: 'Password should be at least 8 characters long',
                messageKey: null,
            },
            {
                code: 'E001',
                message: 'Last Name is Required',
                messageKey: null,
            },
            {
                code: 'E002',
                message: 'First Name is Required',
                messageKey: null,
            },
        ];

        //here goes logic that collects the data of the family members and sends to the service class to post to the backend
        if (response) {
            this.globalError.handleError(response);
            this.globalErrorService.getErrorMessages().subscribe((errors: ApiError[]) => {
                this.errorMessages = errors;
            });

            const alert = await this.alertCtrl.create({
                header: 'Error',
                message: this.errorMessages.map(erro => erro.message).join(' --- '),
                buttons: ['OK'],
                cssClass: 'custom-alert',
            })
            await alert.present()
        } else {

        }


        console.log(this.parentsList)
        console.log(this.grandParentList)
        console.log(this.spouseList)
        console.log(this.siblingList)
    }

    ngOnInit() {

    }


    protected readonly event = event;
    protected readonly Event = Event;
    protected readonly parent = parent;
}
