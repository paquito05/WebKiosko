import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Articulo, Tienda, UsuarioLogin, Venta } from "../models/usuario";


@Injectable()
export class KioskoService {
    private BaseUrl = "http://localhost:8080/api"
    public cargando: boolean = false;

    constructor(private _http: HttpClient) { }




    LoginUsuario(usuario: UsuarioLogin): Observable<any> {

        if (this.cargando) {
            return of([]);
        }

        let body = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        this.cargando = true;
        return this._http.post(`${this.BaseUrl}/auth/login`, body, { headers: headers });
    }

    getTiendaid(id: String): Observable<any> {
        console.log(id);

        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        console.log(token);


        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);

        //console.log(`${this.BaseUrl}/articulos/` + id);

        this.cargando = true;

        return this._http.get(`${this.BaseUrl}/articulos/${id}`, { headers: headers });
    }

    crearVenta(venta: Venta): Observable<any> {

        let body = JSON.stringify(venta);

        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        console.log(token);

        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);

        return this._http.post(`${this.BaseUrl}/ventas`, body, { headers: headers });
    }


    EliminarVenta(id: String, cantidad: String): Observable<any> {
        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        console.log(token);

        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);

        return this._http.delete(`${this.BaseUrl}/ventas/${id}/${cantidad}`, { headers: headers });
    }

    getVentas(): Observable<any> {
        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);

        return this._http.get(`${this.BaseUrl}/ventas`, { headers: headers });
    }

    getInventario(): Observable<any> {
        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);

        return this._http.get(`${this.BaseUrl}/servidores`, { headers: headers });
    }

    getCompras(): Observable<any> {
        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);

        return this._http.get(`${this.BaseUrl}/articulos`, { headers: headers });
    }



    crearUnTienda(tienda: Tienda): Observable<any> {
        console.log(tienda);
        let body = JSON.stringify(tienda);
        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);

        return this._http.post(`${this.BaseUrl}/tiendas`, body, { headers: headers });
    }

    crearUsuarioTienda(Usuario: any): Observable<any> {

        let body = JSON.stringify(Usuario);

        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(`${this.BaseUrl}/usuarios`, body, { headers: headers });
    }


    buscarProveedor(rfc: String): Observable<any> {

        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);
        return this._http.get(`${this.BaseUrl}/proveedores/${rfc}`, { headers: headers });
    }


    AgregarAticulos(articulo: Articulo): Observable<any> {

        console.log(articulo);
        let body = JSON.stringify(articulo);

        let token = localStorage.getItem('token').replace(/['"]+/g, '');
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('x-token', token);

        return this._http.post(`${this.BaseUrl}/articulos`, body, { headers: headers });
    }




}