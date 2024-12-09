import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileData } from '../models/profile-data';

/**
 * Service for managing profile data.
 *
 * @author Danny Amezquita
 * @version 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private initialProfile: ProfileData = {
    id: '1',
    firstName: 'Danny',
    middleName: '',
    lastName: 'Amezquita',
    nickName: 'Dan the Man',
    dateOfBirth: '2024-11-15',
    age: 25,
    email: 'test@example.com',
    phone: '(555)-123-4567',
    address: '206 Myrtle Drive Pottsville, Ar',
    spouse: '',
    children: [''],
    parents: {
      mother: 'Alejandra Quintanilla',
      father: 'Daniel Quintanilla'
    },
    siblings: ['Fernando Quintanilla', 'Gabriela Quintanilla'],
    profileImage: 'https://ionicframework.com/docs/img/demos/avatar.svg'
  };

  private profileSubject = new BehaviorSubject<ProfileData>(this.initialProfile);

  /**
   * Returns an observable of the profile data.
   *
   * @returns An observable of the profile data.
   */
  getProfile(): Observable<ProfileData> {
    return this.profileSubject.asObservable();
  }

  /**
   * Returns the current profile data.
   *
   * @returns The current profile data.
   */
  getCurrentProfile(): ProfileData {
    return this.profileSubject.getValue();
  }

  /**
   * Updates the profile data with the provided partial profile data.
   *
   * @param updatedProfile The partial profile data to update.
   */
  updateProfile(updatedProfile: Partial<ProfileData>): void {
    const currentProfile = this.profileSubject.getValue();
    const newProfile = { ...currentProfile, ...updatedProfile };
    this.profileSubject.next(newProfile);
  }

  /**
   * Updates the profile image with the provided image URL.
   *
   * @param imageUrl The URL of the new profile image.
   */
  updateProfileImage(imageUrl: string) {
    const currentProfile = this.profileSubject.getValue();
    this.profileSubject.next({
      ...currentProfile,
      profileImage: imageUrl
    });
  }
}
