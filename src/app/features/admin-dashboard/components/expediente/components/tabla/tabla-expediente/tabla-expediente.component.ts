import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ExpedienteService } from '@core/services/expediente.service';

@Component({
  standalone: true,
  imports: [ DatePipe],
  selector: 'app-tabla-expediente',
  templateUrl: './tabla-expediente.component.html',
  styleUrls: ['./tabla-expediente.component.css']
})
export class TablaExpedienteComponent{

  @Input() expedientetabla: any = {};


}
