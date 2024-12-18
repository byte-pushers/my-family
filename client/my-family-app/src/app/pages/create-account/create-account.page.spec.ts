import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { CreateAccountPage } from './create-account.page';
import { DatePipe } from '@angular/common';

describe('CreateAccountPage', () => {
  let component: CreateAccountPage; // Component instance for testing
  let fixture: ComponentFixture<CreateAccountPage>; // Test fixture for CreateAccountPage
  let alertController: AlertController; // AlertController instance for dependency injection

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ // Import necessary modules and components for the tests
        CreateAccountPage,
        ReactiveFormsModule,
        FormsModule,
        IonicModule.forRoot()
      ],
      providers: [DatePipe, AlertController], // Provide necessary services
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountPage); // Create the component instance
    component = fixture.componentInstance; // Assign the component instance for testing
    alertController = TestBed.inject(AlertController); // Inject the AlertController service
    fixture.detectChanges(); // Trigger initial change detection
  });

  // Test to ensure the component is created successfully
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test to validate the form when all fields are filled correctly
  it('should have a valid form when all fields are filled correctly', () => {
    component.profileForm.controls['firstName'].setValue('John');
    component.profileForm.controls['lastName'].setValue('Doe');
    component.profileForm.controls['email'].setValue('john@example.com');
    component.profileForm.controls['address'].setValue('123 Main St');
    component.profileForm.controls['birthday'].setValue('2000-01-01');
    component.profileForm.controls['age'].setValue(22);
    component.profileForm.controls['userName'].setValue('john_doe');
    component.profileForm.controls['password'].setValue('password123');

    expect(component.profileForm.valid).toBeTrue(); // Form should be valid
  });

  // Test to verify the age calculation logic
  it('should calculate age correctly based on input date', () => {
    const birthDate = new Date('2000-01-01'); // Test birth date
    const event = { target: { value: birthDate } } as any; // Mock input event
    component.calculateUserAge(event); // Call the method to calculate age

    expect(component.userAge).toBe(24); // Assuming the current year is 2024
  });

  // Test to verify success alert is called when the form is valid and submitted
  it('should call successAlert when form is valid and submitted', async () => {
    const alertSpy = jasmine.createSpyObj('Alert', ['present']); // Spy for alert presentation
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

    await component.onSubmit(); // Submit the form

    // Verify the alert was created and presented
    expect(alertCtrlSpy).toHaveBeenCalled();
    expect(alertSpy.present).toHaveBeenCalled();
  });

  // Test to verify the form resets correctly
  it('should reset the form when clearInputMethod is called', () => {
    component.profileForm.controls['firstName'].setValue('John'); // Set a form control value
    component.clearInputMethod(); // Call the method to reset the form

    expect(component.profileForm.controls['firstName'].value).toBeNull(); // Ensure the value is reset
  });

  // Test to ensure an alert is shown for non-image file selection
  it('should show an alert if non-image file is selected', () => {
    const input = document.createElement('input'); // Mock file input
    input.type = 'file';
    const file = new File(['content'], 'document.txt', { type: 'text/plain' }); // Non-image file
    const event = { target: { files: [file] } }; // Mock input event

    spyOn(window, 'alert'); // Spy on the alert function
    component.onFileChange(event as any); // Call the file change handler

    expect(window.alert).toHaveBeenCalledWith('Please select a valid image file.');
  });

  // Test to verify the selected image is previewed correctly
  it('should preview the selected image correctly', () => {
    const input = document.createElement('input'); // Mock file input
    input.type = 'file';
    const file = new File(['content'], 'image.png', { type: 'image/png' }); // Valid image file
    const event = { target: { files: [file] } }; // Mock input event

    component.onFileChange(event as any); // Call the file change handler
    fixture.detectChanges(); // Trigger change detection

    setTimeout(() => {
      expect(component.selectedImage).toContain('data:image/png;base64'); // Validate the image preview
    }, 100);
  });
});
