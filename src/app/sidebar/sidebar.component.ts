import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { Usuario } from '../models/usuario';


declare const $: any;

//Metadata
export interface RouteInfoAdmin {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

//Metadata
export interface RouteInfoUser {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items ADMIN
export const ROUTESADMIN: RouteInfoAdmin[] = [
    {
      
        path: '/',
        title: 'tiendas',
        type: 'sub',
        icontype: 'paid',
        collapse: 'tiendas',
        children: [
            { path: 'tienda', title: 'Ventas', ab: 'V' }

        ]
    },
    {
        path: '../inventario',
        title: 'inventario',
        type: 'link',
        icontype: 'inventory'
    },
    {
        path: '../ventas',
        title: 'ventas',
        type: 'link',
        icontype: 'paid'
    }/* ,
    {
        path: '../compras',
        title: 'compras',
        type: 'link',
        icontype: 'shopping_cart'
    } */
];

//Menu Items Usuario
export const ROUTESUSUARIO: RouteInfoUser[] = [
    {
        path: '../tienda/detalletienda',
        title: 'tiendas',
        type: 'link',
        icontype: 'paid'
    },
];



@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {


    public nombreUsuario: String;

    constructor(
        private _router: Router
    ) {
        this.nombreUsuario = "";
    }

    public menuItems: any[];

    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        let Usuario: Usuario;

        Usuario = JSON.parse(localStorage.getItem('identity'));
        console.log(Usuario.nombre);

        this.nombreUsuario = Usuario.nombre;
        console.log(this.nombreUsuario);

        if (Usuario.rol === "ADMIN_ROLE") {

            this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
            if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
                const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
                this.ps = new PerfectScrollbar(elemSidebar);
            }

        }

        if (Usuario.rol === "USER_ROLE") {

            this.menuItems = ROUTESUSUARIO.filter(menuItem => menuItem);
            if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
                const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
                this.ps = new PerfectScrollbar(elemSidebar);
            }
        }

    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    cerrasesion() {
        localStorage.clear();
        this._router.navigate(['/pages/login'])
    }
}
