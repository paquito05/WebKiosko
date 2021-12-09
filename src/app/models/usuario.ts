export class Usuariovalid {
    constructor(
        public _id: String,
        public nombre: String,
        public correo: String,
        public password: String,
        public google: boolean,
        public tienda: [Tienda],
        public rol: String,
        public estado: boolean
    ) { }
}

export class Usuario {
    constructor(
        public _id: String,
        public nombre: String,
        public correo: String,
        public password: String,
        public google: boolean,
        public tienda: [String],
        public rol: String,
        public estado: boolean
    ) { }
}

export class UsuarioLogin {
    constructor(
        public correo: String,
        public password: String,
    ) { }
}

export class Venta {
    constructor(

        public articulos: String,
        public cantidad: String,
    ) { }
}

export class VentaResponse {
    constructor(

        public articulos: Articulos,
        public cantidad: String,
        public pTotal: String,
        public estado: String
    ) { }
}


export class Articulos {
    constructor(
        public _id: String,
        public clave: String,
        public cantidad: String,
        public costoVenta: String,
        public costoCompra: String,
        public proveedor: String,
        public perecedero: String,
        public descripcion: String,
        public estado: String,
    ) { }
}

export class Tienda {
    constructor(
        public _id: String,
        //public articulos: [String],
        public ubicacion: String,
        public nombre: String,
    ) { }
}

export class Articulo {
    constructor(

        public clave: String,
        public cantidad: String,
        public costoVenta: String,
        public tienda: String,
        public costoCompra: String,
        public perecedero: String,
        public descripcion: String,
        public proveedor: String

    ) { }
}