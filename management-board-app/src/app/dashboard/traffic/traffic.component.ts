import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.css',
})
export class TrafficComponent {
  @Input({ required: true }) dummyTrafficData!: {
    id: string;
    value: number;
  }[];
  maxTraffic!: number;
  ngOnInit(): void {
    this.maxTraffic = Math.max(
      ...this.dummyTrafficData.map((data) => data.value),
    );
  }
}
