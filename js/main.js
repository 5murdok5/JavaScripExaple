'use strict';
import Producto from "./Producto.js";

var oArrayProductos,oProducto,tblProductos,btnGuardar,btnEliminar,txtPrecio,txtProducto,banderaEsEdicion,oModelProductos;

OnInit();

function OnInit(){
    oArrayProductos = "";
    oProducto = new Producto();
    tblProductos = document.getElementById('tblProductos');
    btnGuardar = document.getElementById("btnGuardar");
    btnEliminar = document.getElementById("btnEliminar");
    txtPrecio = document.getElementById("txtPrecio");
    txtPrecio.value = "";
    txtProducto = document.getElementById("txtProducto");
    txtProducto.value = "";
    banderaEsEdicion = false;
    oModelProductos = {
        "cat_prec_id": null,
        "nombre": null,
        "precio":null
    }
    oProducto.obtenerProductos().then((response) => {
        response.cat_precios.forEach(elem => {
            oArrayProductos += `<tr data-producto='${JSON.stringify(elem)}'><td>${elem.nombre}</td><td>${elem.precio}</td></tr>`;
        });      
        tblProductos.innerHTML = oArrayProductos;    
    }).catch(error => {
    
    });
}

tblProductos.addEventListener("click", function(e){
    e = e || window.event;
    var data = [];
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    let productoSeleccionado = JSON.parse(target.dataset.producto);
    oModelProductos = productoSeleccionado;
    txtPrecio.value = oModelProductos.precio;
    txtProducto.value = oModelProductos.nombre;
    banderaEsEdicion = true;
});

btnGuardar.addEventListener("click", function(evet){
    event.preventDefault();
    if(txtProducto.value && txtPrecio.value){
        if(!banderaEsEdicion){
            // insert
            let producto = {
                "cat_prec_id": null,
                "nombre": txtProducto.value,
                "precio": txtPrecio.value
            }
            oProducto.agregarProducto(producto).then((response) => {
                response.cat_precios.forEach(elem => {
                    oArrayProductos += `<tr data-producto='${JSON.stringify(elem)}'><td>${elem.nombre}</td><td>${elem.precio}</td></tr>`;
                });      
                tblProductos.innerHTML = oArrayProductos;    
            }).catch(error => {
            
            });        
        }else{
            //update
            let producto = {
                "cat_prec_id": oModelProductos.cat_prec_id,
                "nombre": txtProducto.value,
                "precio": txtPrecio.value
            }        
            oProducto.editarProducto(producto).then((response) => {
                response.cat_precios.forEach(elem => {
                    oArrayProductos += `<tr data-producto='${JSON.stringify(elem)}'><td>${elem.nombre}</td><td>${elem.precio}</td></tr>`;
                });      
                tblProductos.innerHTML = oArrayProductos;    
            }).catch(error => {
            
            });
        }
        OnInit();
    }
});

btnEliminar.addEventListener("click", function(evet){
    event.preventDefault();
    if(oModelProductos.cat_prec_id){
        if(confirm(`¿Desea eliminar el producto: ${txtProducto.value} ?`)){

        }
        oProducto.eliminarProducto(oModelProductos.cat_prec_id).then((response) => {
            response.cat_precios.forEach(elem => {
                oArrayProductos += `<tr data-producto='${JSON.stringify(elem)}'><td>${elem.nombre}</td><td>${elem.precio}</td></tr>`;
            });      
            tblProductos.innerHTML = oArrayProductos;    
        }).catch(error => {
        
        });
       
        OnInit();
    }
});