'use strict';
import Servicio from "./Servicio.js";
export default class Producto extends Servicio{
    constructor(){
        super();
    }
    obtenerProductos(){
        var myRequest = new Request(`https://www.desarrollohidrocalido.com/ejemplos/AngularJs-Slim-PHP/model/modulos/modulo1/cat_precios`, {method: 'GET', body: null});
        return new Promise(function(resolve, reject) {
            this.http(myRequest).then((response) => {
                 resolve(response);
             }).catch(error => {
                reject(error);
             });    
        }.bind(this));
    }

    eliminarProducto(_idProducto){
        var myRequest = new Request(`https://www.desarrollohidrocalido.com/ejemplos/AngularJs-Slim-PHP/model/modulos/modulo1/cat_precios/${_idProducto}`, {method: 'DELETE', body: null});
        return new Promise(function(resolve, reject) {
            this.http(myRequest).then((response) => {
                 resolve(response);
             }).catch(error => {
                reject(error);
             });    
        }.bind(this));
    }

    editarProducto(_producto){
        var myRequest = new Request(`https://www.desarrollohidrocalido.com/ejemplos/AngularJs-Slim-PHP/model/modulos/modulo1/cat_precios/${_producto.cat_prec_id}`, {method: 'PUT', body: JSON.stringify(_producto)});
        return new Promise(function(resolve, reject) {
            this.http(myRequest).then((response) => {
                 resolve(response);
             }).catch(error => {
                reject(error);
             });    
        }.bind(this));
    }

    agregarProducto(_producto){
        var myRequest = new Request(`https://www.desarrollohidrocalido.com/ejemplos/AngularJs-Slim-PHP/model/modulos/modulo1/cat_precios`, {method: 'POST', body: JSON.stringify(_producto)});
        return new Promise(function(resolve, reject) {
            this.http(myRequest).then((response) => {
                 resolve(response);
             }).catch(error => {
                reject(error);
             });    
        }.bind(this));
    }


}