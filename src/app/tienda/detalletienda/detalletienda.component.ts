import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { Articulo, Articulos, Usuario, Usuariovalid, Venta, VentaResponse } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { KioskoService } from '../../services/kiosko.service';
import { ArrayType } from '@angular/compiler';

declare const $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare interface TableWithCheckboxes {
  id?: number;
  ischecked?: boolean;
  product_name: string;
  type: string;
  quantity: number;
  price: any;
  amount: string;
}

export interface TableData2 {
  headerRow: string[];
  dataRows: TableWithCheckboxes[];
}

@Component({
  selector: 'app-detalletienda',
  templateUrl: './detalletienda.component.html',
  providers: [KioskoService]
})
export class DetalleTiendaComponent implements OnInit, DoCheck {

  public idtienda: String;
  public tableData2: TableData2;


  public ventasRealizadasArticulos: Array<VentaResponse>
  public venta: Venta;


  //Articulo Seleccionado
  public articuloSelecionado: Articulos;
  public articuloSelecionadoTotal: String;
  public cantidadVenta = '1';
  public arraymodificado = [];

  public TotalVentaFinal: any;
  public newArticulo: Articulo;
  public Usuario: Usuariovalid;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _kioskoService: KioskoService
  ) {



    this.Usuario = JSON.parse(localStorage.getItem('identity'));
    console.log(this.Usuario.nombre);

    if (this.Usuario.rol === "ADMIN_ROLE") {
      this.idtienda = this._router.getCurrentNavigation().extras.state.idtienda;

    } else if (this.Usuario.rol === "USER_ROLE") {
      console.log("idtiendda" + this.idtienda);
      this.idtienda = this.Usuario.tienda[0]._id;
      console.log("idtiendda" + this.idtienda);
    }


    this.ventasRealizadasArticulos = [];

    this.venta = new Venta("", "")
    this.articuloSelecionado = new Articulos("", "", "", "", "", "", "", "", "");
    this.newArticulo = new Articulo("", "", "", "", "", "", "", "");

    this.TotalVentaFinal = '0';
  }


  public ngDoCheck() {
    this.ventasRealizadasArticulos = this.arraymodificado;
    console.log(this.arraymodificado);
    console.log(this.ventasRealizadasArticulos);
  }

  public ngOnInit() {
    this.getTiendaId(this.idtienda);

    this.tableData2 = {
      headerRow: ['clave', 'Nombre', 'stock', 'proveedor', 'costoVenta', 'costoCompra', 'seleccionar',],
      dataRows: []
    };


  }


  AgregarAticulos(forn: any) {
    console.log(forn);
    this.newArticulo.tienda = this.idtienda;

    this._kioskoService.AgregarAticulos(this.newArticulo).subscribe(
      resp => {
        if (resp) {
          console.log(resp);

          this.showNotification('top', 'right', 'check', 'success', 'Se agrego el articulo');
          this.getTiendaId(this.idtienda);
        }
      },
      error => {
        console.log(error);
        this.showNotification('top', 'right', 'error_outline', 'danger', 'eliminacion la venta con fallida');

      }
    );
  }


  eliminarVenta(id: String, cantidad: String) {
    this._kioskoService.EliminarVenta(id, cantidad).subscribe(
      resp => {
        if (resp) {
          console.log(resp);

          this.showNotification('top', 'right', 'check', 'success', 'Se elimino la venta con exito');
          this.getTiendaId(this.idtienda);

          this.ventasRealizadasArticulos.map(item => {

            this.arraymodificado = [];

            console.log(this.arraymodificado);

            if (item.articulos._id != id) {
              this.arraymodificado.push(item);
            }

            if (this.ventasRealizadasArticulos.length === 1) {
              this.arraymodificado.pop();
            }



          });

        }
      },
      error => {
        console.log(error);
        this.showNotification('top', 'right', 'error_outline', 'danger', 'eliminacion la venta con fallida');
      }
    );

  }


  seleccionarVenta(articulo: Articulos) {

    this.articuloSelecionado = articulo;

    console.log("articulos :  " + this.articuloSelecionado);
  }

  confirmarArticuloVenta() {

    this.venta.articulos = this.articuloSelecionado._id;
    this.venta.cantidad = this.cantidadVenta;

    this._kioskoService.crearVenta(this.venta).subscribe(
      resp => {
        console.log(resp);
        if (resp) {

          this.ventasRealizadasArticulos.push(resp.venta);
          console.log(this.ventasRealizadasArticulos);
          this.getTiendaId(this.idtienda);

          let totalF = 0;
          this.ventasRealizadasArticulos.map((item) => {
            console.log(item);
            totalF = (parseFloat(item.pTotal.toString())) + totalF
            console.log(totalF);
          });

          this.TotalVentaFinal = totalF



        }
      },
      error => {
        console.log("Error +: " + error.message);
      }
    );

  }



  getTiendaId(id: String) {
    console.log(id);

    this._kioskoService.getTiendaid(id).subscribe(

      resp => {
        console.log(resp);

        console.log(resp.articulos);
        //console.log(resp.tiendas.articulos);

        if (resp) {
          this.tableData2.dataRows = resp.articulos;
          console.log(this.tableData2.dataRows);

        }
      },
      error => {
        console.log("Error +: " + error.message);

      }
    );

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
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss"> '
        + ' <i class="material-icons">close</i>' +
        '</button>' +
        '<i class="material-icons" data-notify="icon">{1}</i> ' +
        '<span data-notify="title"></span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
  }




}
