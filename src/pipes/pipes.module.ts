import { NgModule } from '@angular/core';
import { ClassePipe } from './classe/classe';
import { EnumPipe } from './enum/enum';
@NgModule({
	declarations: [ClassePipe,
    EnumPipe],
	imports: [],
	exports: [ClassePipe,
    EnumPipe]
})
export class PipesModule {}
