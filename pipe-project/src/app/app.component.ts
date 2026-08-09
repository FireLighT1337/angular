import { DatePipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';
import { SortPipe } from './sort.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DatePipe, DecimalPipe, TemperaturePipe, SortPipe],
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  onReset(index: number) {
    // this wont work with our pipe, cause angular does not check if a value inside of an array changes
    // there is a way to make this work, but it should be used with caution
    // you can set the "pure" parameter of a pipe to false, this will make it track all changes
    // however this is disabled by default cause calculating certain functions too often can be very bad
    // this.historicTemperatures[index] = 18;

    // we need to change the whole array instead:
    const newTemps = [...this.historicTemperatures];
    newTemps[index] = 18;
    // this gives us a completely new pointer address in memory, cause the array itself changes, so angular tracks this
    this.historicTemperatures = newTemps;
  }
}
