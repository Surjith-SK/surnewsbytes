import { NgModule } from '@angular/core';

//Material imports
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  ToolbarComponent } from '../home/components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const materialModules = [
  MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
];

@NgModule({
  declarations: [    ToolbarComponent
  ],
  imports: [
    ...materialModules,CommonModule,RouterModule,FormsModule,HttpClientModule,    FlexLayoutModule.withConfig({ ssrObserveBreakpoints: ['xs','sm','md'] , addOrientationBps:true}),

  ],
  exports: [...materialModules, ToolbarComponent,CommonModule,RouterModule,FormsModule,HttpClientModule
  ],
  providers:[]
})
export class MaterialModule { }