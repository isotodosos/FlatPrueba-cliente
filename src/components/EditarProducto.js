import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

// action de redux
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoAction';

const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    //nuevo state del producto
    const [producto, guardarProducto] = useState({
        nombre : '',
        precio : '',
        descripcion: ''
    })
    const {nombre, precio, descripcion} = producto;


    //producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar); 
    


    //llenar el state automaticamente
    useEffect(() => {
      
        guardarProducto(productoeditar)      
          

    }, [productoeditar]);

    

    //leer los datos del formulario
    const onChangeFormulario = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    
    
    const submitEditarProducto = (e) => {
        e.preventDefault();

        //validamos

        //ejecutamos el action
        dispatch( editarProductoAction(producto));
        history.push('/');
    }


    return(
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weigth-bold">
                            Editar Producto
                        </h2>
                        <form
                            onSubmit={submitEditarProducto}
                        >

                            <div className="form-group">
                                <label>
                                    Nombre Producto
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="nombre del producto"
                                    name="nombre"
                                    value = {nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Precio Producto
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="precio del producto"
                                    name="precio"
                                    value = {precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Descripción 
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="descripción del producto"
                                    name="descripcion"
                                    value = {descripcion}
                                    onChange={onChangeFormulario}
                                />
                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary font-weigth-bold text-uppercase d-block w-100"                               
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditarProducto;