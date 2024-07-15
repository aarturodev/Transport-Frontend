import { Component, inject, OnInit } from '@angular/core';
import { ExpedienteService } from '@core/services/expediente.service';

interface Expediente {
  Id: number;
  Descripcion: string;
  Fecha_Creacion: Date;
}

@Component({
  selector: 'app-crear-expediente',
  standalone: true,
  imports: [],
  templateUrl: './crear-expediente.component.html',
  styleUrl: './crear-expediente.component.css'
})
export default class CrearExpedienteComponent implements OnInit {

  private http = inject(ExpedienteService)

  // informacion de los expedientes
  motivoInvestigacion: Expediente[] = [];

  conducta: any;
  modalidadServicio: any;
  tipoServicio: any;
  sujetoSancionable: any;
  tipoPersonaNatural: any;


  ngOnInit(): void {
    this.http.getMotivoInvestigacion().subscribe((res) => {
      console.log(res);
    });

    console.log('Motivo de investigacion: ', this.motivoInvestigacion);

  }



}
