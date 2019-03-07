import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  obtenerTareasTodas() {
    return this.http.get(this.url + '/getTareas?filtro=TODAS');
  }
  obtenerTarasPorCompletar() {
    return this.http.get(this.url + '/getTareas?filtro=POR COMPLETAR');
  }
  obtenerTareasCompletadas() {
    return this.http.get(this.url + '/getTareas?filtro=COMPLETADAS');
  }
  guardarTarea(tarea) {
    return this.http.post(this.url + '/guardarTarea', JSON.stringify(tarea), {headers: { 'Content-Type': 'application/json' }});
  }
  actualizarTarea(tarea) {
    return this.http.put(this.url + '/actualizarTarea', JSON.stringify(tarea), {headers: { 'Content-Type': 'application/json' }});
  }
  eliminarTarea(tarea) {
    return this.http.delete(this.url + '/eliminarTarea?id=' + tarea.id);
  }
}
