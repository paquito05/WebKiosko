import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { KioskoService } from '../services/kiosko.service';
import { ActivatedRoute, Router } from '@angular/router';

declare const $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  providers: [KioskoService]
})

export class InventarioComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }


  public dataTable: DataTable;
  public comprasGlobalTiendas = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _kioskoService: KioskoService
  ) {

  }

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this.getCompras();

    //DATATABLE.Net


  }

  ngAfterViewInit() {
    $('#comprasdatatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });


    const table = $('#comprasdatatables').DataTable();

    // Edit record
    table.on('click', '.edit', function (e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
      e.preventDefault();

    });

    // Delete a record
    table.on('click', '.remove', function (e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function (e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }


  getCompras() {
    this._kioskoService.getCompras().subscribe(
      resp => {

        console.log(resp);
        this.comprasGlobalTiendas = resp.articulos;
        this.dataTable = {
          headerRow: ['Clave', 'Articulo', 'Cantidad', 'Tienda', 'Proveedor'],
          footerRow: ['Clave', 'Articulo', 'Cantidad', 'Tienda', 'Proveedor'],

          dataRows: this.comprasGlobalTiendas
        };


      },
      error => {

      }
    )
  }
}



