import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, input, Input, OnInit, signal } from '@angular/core';
import { ExpedienteService } from '@core/services/expediente.service';

@Component({
  standalone: true,
  imports: [ DatePipe],
  selector: 'app-tabla-expediente',
  templateUrl: './tabla-expediente.component.html',
  styleUrls: ['./tabla-expediente.component.css']
})
export class TablaExpedienteComponent{

  //@Input() expedientetabla: any = {};
  expedientetabla = input<any>();
  constructor(){
    console.log('expedientetabla', this.expedientetabla);
  }



}
