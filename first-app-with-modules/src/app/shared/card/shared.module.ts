import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';

@NgModule({
  declarations: [CardComponent],
  // the exports array specifies that the CardComponent should be available if the Module is used somewhere
  exports: [CardComponent],
})
export class SharedModule {}
