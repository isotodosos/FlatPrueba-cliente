import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// action de redux
import { crearNuevoProductoAction } from '../actions/productoAction';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaAction';

const NuevoProducto = ({history}) => {  //history es una prop que tienen los componentes que estan en el routing en react-router-dom

    // creo el state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);
    const [descripcion, guardarDescripcion] = useState('');
    
    //utiliza useDispatch y te crea una funcion
    const dispatch = useDispatch();
    
    // acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);


    //manda llamar el action de productoAction
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

    const submitNuevoProducto = e => {
        e.preventDefault()

        //validar formulario
        if(nombre.trim() === '' || precio <= 0 || descripcion.trim() ===''){ //el precio no lleva trim pq no es un método para numeros

            const alerta = {
                msg : 'Ambos campos son obligatorios',
                clases : 'alert alert-danger text-center text-uppercase p-3'
            }
            dispatch(mostrarAlerta(alerta))

            setTimeout(() => {
                dispatch(ocultarAlertaAction())
            }, 3000);
            return;
        }
        //comprobar errores

        //crea el nuevo producto
        agregarProducto({
            nombre,
            precio,
            descripcion
        })

        // limpiamos
        guardarNombre('');
        guardarPrecio(0);
        guardarDescripcion('');

        //redireccionamos al principal
        history.push('/');
    }

    return(
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weigth-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}
                        <form
                            onSubmit = {submitNuevoProducto}
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
                                    value={nombre}
                                    onChange={ e=> guardarNombre(e.target.value)}
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
                                    value={precio}
                                    onChange={ e=> guardarPrecio(Number(e.target.value))}
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
                                    value={descripcion}
                                    onChange={ e=> guardarDescripcion(e.target.value)}
                                />
                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary font-weigth-bold text-uppercase d-block w-100"
                            >Agregar</button>

                            {cargando ? <p>Cargando....</p> : null}
                            {error ? <p className='alert alert-danger p-2 mt-4 text-center'>Hubo un error</p> : null}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NuevoProducto;