import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// action de redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoAction';



const Producto = ({producto}) => {

    const { _id, nombre, precio, descripcion} = producto;

    const dispatch = useDispatch();
    const history = useHistory(); // habilitar history para redireccion

    const confirmarEliminarProducto = (id) => {
        // preguntar al usuario
        Swal.fire({
            title :  '¿Estas seguro?',
            text : "¡Si eliminas el producto no lo puedes recuperar!",
            icon: 'warning',
            showCancelButton :true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:'¡Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {

                //pasarlo al action cuando confirma el Swal
                dispatch(borrarProductoAction(id))
                
            }
        })
        
    }

    // funcion que redirige de forma programada. De esta manera, tenemos el producto en activo no solo redireccionamos
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto._id}`);
    }

    return(
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">{precio} €</span></td>
            <td>{descripcion}</td>
            <td className="acciones">

                <button 
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => {redireccionarEdicion(producto)}}
                >Editar</button>

                <button 
                type="button" 
                className="btn btn-danger"
                onClick={()=> confirmarEliminarProducto(_id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}
export default Producto;