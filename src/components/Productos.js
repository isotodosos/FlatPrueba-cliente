import React, {Fragment, useEffect} from 'react';
import Producto from './Producto';

// action de redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoAction';


const Productos = () => {

    //utiliza useDispatch y te crea una funcion
    const dispatch = useDispatch();

    // acceder al state del store
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    useEffect(() => {
       const consultar = () => dispatch( obtenerProductosAction())
       consultar()
    }, [dispatch])

    return(
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {error ? <p className="font-weight-bold alert alert-danger mt-4 text-center">Hubo un error</p> : null}
            {cargando ? <p className="text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Acciones</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {productos && productos.length>0
                    ?
                        productos.map((producto, i) => (
                            <Producto
                            key={producto._id}
                            producto={producto}
                            />
                            
                        ))
                    :
                        <tr>
                            <td colSpan="4">No hay productos</td>
                        </tr>
                    } 
                </tbody>
            </table>
        </Fragment>
    )
}
export default Productos;