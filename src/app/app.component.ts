import { Component } from '@angular/core';
import {Tarea} from './Tarea';
import {TareaService} from './services/tarea-service.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tareas: Tarea[];
  textoTarea: string;
  filtroActivo = 'TODAS';

  constructor (private tareaService: TareaService) {}

  ngOnInit() {
    this.obtenerTareas();
  }

  agregarTarea() {
    if (this.textoTarea.length === 0) {
      alert('Ingresa una tarea valida!');
    } else {
      const tarea: Tarea = new Tarea();
      tarea.estado = 'POR COMPLETAR';
      tarea.texto = this.textoTarea;
      this.tareaService.guardarTarea(tarea).subscribe( (data: any) => {
        console.log(JSON.stringify(data));
        this.textoTarea = '';
        this.filtrar(this.filtroActivo);
      });
    }
  }

  cambiarEstadoTarea(tarea) {
    this.tareaService.actualizarTarea(tarea).subscribe( (data: any) => {
      console.log(JSON.stringify(data));
      this.filtrar(this.filtroActivo);
    });
  }

  eliminarTarea(tarea) {
    this.tareaService.eliminarTarea(tarea).subscribe((data: any) => {
      console.log(JSON.stringify(data));
      this.filtrar(this.filtroActivo);
    });
  }

  filtrarCompletadas() {
    this.tareas = this.tareas.filter( tarea => tarea.estado === 'COMPLETADA');
  }

  obtenerTareas() {
    this.tareaService.obtenerTareasTodas().subscribe( (data: Tarea[]) => {
      this.tareas = data;
    });
  }

  obtenerTareasCompletadas() {
    this.tareaService.obtenerTareasCompletadas().subscribe( (data: Tarea[]) => {
      this.tareas = data;
    });
  }

  obtenerTareasPorCompletar() {
    this.tareaService.obtenerTarasPorCompletar().subscribe( (data: Tarea[]) => {
      this.tareas = data;
    });
  }

  filtrar(filtro) {
    this.filtroActivo = filtro;
    if(filtro === 'TODAS') {
      this.obtenerTareas();
    } else if(filtro === 'POR COMPLETAR') {
      this.obtenerTareasPorCompletar();
    } else {
      this.obtenerTareasCompletadas();
    }
  }
}
