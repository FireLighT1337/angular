import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // this is angulars http client, you have to add providers: [provideHttpClient()] in the main.ts for example to make it work
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the places',
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favourite places',
    ).pipe(
      // we can use this tap operator to update the places without subscribing
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      }),
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        // catchError always wants to return a new observable, so we use throwError
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to store selected place');
          return throwError(() => new Error('Failed to store selected place'));
        }),
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to remove selected place');
          return throwError(() => new Error('Failed to remove selected place'));
        }),
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    // you can also configure this get request if you want
    // example: ('http://localhost:3000/places', {observe: "events"})
    return (
      this.httpClient
        .get<{ places: Place[] }>(url)
        // we dont need to do this technically but for demo purposes, this is how you could modify data from the get request if needed
        .pipe(
          map((resData) => resData.places),
          // here we can also add this for the error handling logic, to keep the actual error method a bit cleaner
          catchError((error) => {
            console.log(error);
            return throwError(() => new Error(errorMessage));
          }),
        )
    );
  }
}
