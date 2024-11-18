import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { CreateAccountPage } from './create-account.page';
import { DatePipe } from '@angular/common';

describe('CreateAccountPage', () => {
  let component: CreateAccountPage;
  let fixture: ComponentFixture<CreateAccountPage>;
  let alertController: AlertController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountPage, ReactiveFormsModule, FormsModule, IonicModule.forRoot()], // Move CreateAccountPage to imports
      providers: [DatePipe, AlertController]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should have a valid form when all fields are filled correctly', () => {
    component.profileForm.controls['firstName'].setValue('John');
    component.profileForm.controls['lastName'].setValue('Doe');
    component.profileForm.controls['email'].setValue('john@example.com');
    component.profileForm.controls['address'].setValue('123 Main St');
    component.profileForm.controls['birthday'].setValue('2000-01-01');
    component.profileForm.controls['age'].setValue(22);
    component.profileForm.controls['userName'].setValue('john_doe');
    component.profileForm.controls['password'].setValue('password123');

    expect(component.profileForm.valid).toBeTrue();
  });

  it('should calculate age correctly based on input date', () => {
    const birthDate = new Date('2000-01-01');
    const event = { target: { value: birthDate } } as any;
    component.calculateUserAge(event);

    expect(component.userAge).toBe(24); // Assuming the current year is 2024
  });

  it('should call successAlert when form is valid and submitted', async () => {
    // Set up spy for the alert controller
    const alertSpy = jasmine.createSpyObj('Alert', ['present']);
    const alertCtrlSpy = spyOn(alertController, 'create').and.returnValue(Promise.resolve(alertSpy));

    // Fill out the form with valid data
    component.profileForm.controls['firstName'].setValue('John');
    component.profileForm.controls['lastName'].setValue('Doe');
    component.profileForm.controls['email'].setValue('john@example.com');
    component.profileForm.controls['address'].setValue('123 Main St');
    component.profileForm.controls['birthday'].setValue('2000-01-01');
    component.profileForm.controls['age'].setValue(22);
    component.profileForm.controls['userName'].setValue('john_doe');
    component.profileForm.controls['password'].setValue('password123');

    // Submit the form
    await component.onSubmit();

    // Expect the alert to be created and presented
    expect(alertCtrlSpy).toHaveBeenCalled();
    expect(alertSpy.present).toHaveBeenCalled();
  });


  it('should reset the form when clearInputMethod is called', () => {
    component.profileForm.controls['firstName'].setValue('John');
    component.clearInputMethod();

    expect(component.profileForm.controls['firstName'].value).toBeNull();
  });

  it('should show an alert if non-image file is selected', () => {
    const input = document.createElement('input');
    input.type = 'file';
    const file = new File(['content'], 'document.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } };

    spyOn(window, 'alert');
    component.onFileChange(event as any);

    expect(window.alert).toHaveBeenCalledWith('Please select a valid image file.');
  });

  it('should preview the selected image correctly', () => {
    const input = document.createElement('input');
    input.type = 'file';
    const file = new File(['content'], 'image.png', { type: 'image/png' });
    const event = { target: { files: [file] } };

    component.onFileChange(event as any);
    fixture.detectChanges();

    // Since FileReader is asynchronous, this will take some time
    setTimeout(() => {
      expect(component.selectedImage).toContain('data:image/png;base64');
    }, 100);
  });

});
