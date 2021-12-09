import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/models/usuario';
import { KioskoService } from 'src/app/services/kiosko.service';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    providers: [KioskoService]
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    //variables
    public usuarioLogin: UsuarioLogin

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _kioskoService: KioskoService,
        private element: ElementRef
    ) {

        this.usuarioLogin = new UsuarioLogin("", "");

        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);


        if (localStorage.getItem('token') != null) {
            this._router.navigate(['./inventario']);
        }

    }


    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }



    //Login
    LoginSubmit(form: any) {
        console.log(form);
        console.log(this.usuarioLogin)
        this._kioskoService.LoginUsuario(this.usuarioLogin).subscribe(
            resp => {

                //console.log(resp);

                if (resp.usuario && resp.token) {

                    localStorage.setItem('identity', JSON.stringify(resp.usuario));
                    
                    localStorage.setItem('token', JSON.stringify(resp.token));

                    localStorage.setItem('role', JSON.stringify(resp.usuario.rol));

                    localStorage.setItem('tienda', JSON.stringify(resp.usuario.tienda));


                    if(resp.usuario.rol === "ADMIN_ROLE"){
                        this._router.navigate(['./tienda']);
                        console.log("Admin role");

                    
                        
                    }

                    if(resp.usuario.rol === "USER_ROLE"){
                        this._router.navigate(['./tienda/detalletienda']);
                        console.log("USER_ROLE role");
                    
                    }

                    

                } else {
                    this.showNotification('top', 'right', 'error_outline', 'danger', 'Usuario o Password no son correctos');
                }


            },
            error => {
                //console.log(error.msg);

                this.showNotification('top', 'right', 'error_outline', 'danger', 'Usuario o Password no son correctos');

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
