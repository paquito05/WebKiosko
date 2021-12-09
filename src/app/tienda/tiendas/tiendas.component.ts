import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../../md/md-chart/md-chart.component';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';

import * as Chartist from 'chartist';
import { Tienda, Usuario } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { KioskoService } from 'src/app/services/kiosko.service';
import { TiendaModule } from '../tienda.module';

declare const $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  providers: [KioskoService]
})

export class TiendasComponent implements OnInit {

  public dataTableArticulos: DataTable;
  public dataTableVentas: DataTable;
  public mostrarnuevoArtivulo: boolean;
  public mostrarnuevoTienda: boolean;
  public Usuario: Usuario;

  public arrayTiendasAdmin: [Tienda]

  public newTienda: Tienda
  public newTiendaUsuario: Usuario

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _kiskoService: KioskoService
  ) {

    this.Usuario = JSON.parse(localStorage.getItem('identity'));

    this.newTienda = new Tienda("", "", "");
    this.newTiendaUsuario = new Usuario("", "", "", "", false, [""], "USER_ROLE", true);

  }


  public ngOnInit() {
    this.mostrarnuevoArtivulo = true;
    this.mostrarnuevoTienda = true;

    if (this.Usuario.rol === "USER_ROLE") {
      this.mostrarnuevoArtivulo = false;
      this.mostrarnuevoTienda = false;
    }

    this.arrayTiendasAdmin = JSON.parse(localStorage.getItem('tienda'));
    console.log(this.arrayTiendasAdmin);

  }

  irdetalleTienda(id: String) {
    console.log(id);
    this._router.navigate(['./tienda/detalletienda'], { state: { idtienda: id } })
  }


  onSubmit(forn: any) {
    console.log(forn);

    this._kiskoService.crearUnTienda(this.newTienda).subscribe(

      resp => {
        console.log(resp);

        if (resp) {

          var tienda = resp.tienda;
          var idTienda = resp.tienda._id;
          this.newTiendaUsuario.tienda = [idTienda];
          this.newTiendaUsuario.nombre = resp.tienda.nombre;

          console.log(resp);
          console.log(idTienda);
          console.log(this.newTiendaUsuario);
          console.log(this.newTienda);



          this._kiskoService.crearUsuarioTienda(this.newTiendaUsuario).subscribe(
            resp => {
              console.log(resp);

              if (resp) {
                this.showNotification('top', 'right', 'check', 'success', 'Se elimino la venta con exito');
                this.arrayTiendasAdmin.push(tienda);
                localStorage.setItem('tienda', JSON.stringify(this.arrayTiendasAdmin));
              }
            },

            error => {
              console.log(error);
              this.showNotification('top', 'right', 'error_outline', 'danger', 'Error al crear la tienda');
            }

          );



          this.showNotification('top', 'right', 'check', 'success', 'Se elimino la venta con exito');

        }

      },
      error => {
        console.log(error);
        this.showNotification('top', 'right', 'error_outline', 'danger', 'Error al crear la tienda');
      }

    )

  }


  showNotification(from: any, align: any, icon: String, color: any, mensaje: String) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    $.notify({
      title: icon,
      message: mensaje
    }, {

      type: color,
      timeOut: 10,
      placement: {
        from: from,
        align: align
      },
      template:
        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">'
        + ' <i class="material-icons">close</i>' +
        '</button>' +
        '<i class="material-icons" data-notify="icon">{1}</i> ' +
        '<span data-notify="title"></span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
  }


}
