import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter,} from 'reactstrap';
import swal from 'sweetalert'
const data = []
class App extends React.Component{
  state={
    data: data,
    form:{
      id:'',
      producto:'',
      precio:'',
      cantidad:''

    },
    modalInsertar: false,

    modalEditar: false,

  };

handleChange=e=>{
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value,
    }
  });
}

mostrarModalInsertar=()=>{
  this.setState({modalInsertar: true});
}
ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}
mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form:registro});
}
ocultarModalEditar=()=>{
  this.setState({modalEditar: false});
}

insertar=()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});

swal({
  title: "Bien hecho",
  text: "Producto agregado exitosamente",
  icon: "success",
});
}
editar=(dato)=>{
   var contador=0;
  var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id)
      {lista[contador].producto=dato.producto;
        lista[contador].precio=dato.precio;
        lista[contador].cantidad=dato.cantidad;}
        contador++;
    });
    this.setState({data:lista, modalEditar: false});

    swal({
      title: "Bien hecho",
      text: "Producto editado",
      icon: "success",
    });
  }

  eliminar=(dato)=>{
    swal({
      title: "¿Eliminar producto?",
      text: "Esta por eliminar un producto, no podra ser recuperado después de eliminado",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        var contador=0;
        var lista= this.state.data;
        lista.map((registro)=>{
          if(registro.id==dato.id){lista.splice(contador, 1);}
          contador++;
        });
        this.setState({data:lista});
        swal("Producto eliminado", {
          icon: "success",
        });
      } else {
        swal("No se eliminó el producto");
      }
    });

  }
  render(){
    return(
    <>
    <Container>
      <br/>

    <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Agregar producto</Button>
    <br/><br/>

<Table>
  <thead><tr><th>Id</th>
  <th>Producto</th>
  <th>Precio</th>
  <th>Cantidad</th>
  <th>Acciones</th></tr></thead>
  <tbody>
    {this.state.data.map((elemento)=>(
      <tr>
        <td>{elemento.id}</td>
        <td>{elemento.producto}</td>
        <td>{elemento.precio}</td>
        <td>{elemento.cantidad}</td>
        <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
        <Button color="danger"onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
        </tr>
    ))}
  </tbody>
</Table>
    </Container>
    <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>
        <div>
          <h3>Insertar producto</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>Id:</label>
          <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
        </FormGroup>

        <FormGroup>
          <label>Producto:</label>
          <input className="form-control" name="producto" type="text" onChange={this.handleChange}/>
        </FormGroup>

        <FormGroup>
          <label>Precio:</label>
          <input className="form-control" name="precio" type="text" onChange={this.handleChange}/>
        </FormGroup>

        <FormGroup>
          <label>Cantidad:</label>
          <input className="form-control" name="cantidad" type="text" onChange={this.handleChange}/>
        </FormGroup>
       </ModalBody>

       <ModalFooter>
         <Button color="success" onClick={()=>this.insertar()}>Insertar</Button>
         <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
       </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>
        <div>
          <h3>Editar producto</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>Id:</label>
          <input className="form-control" readOnly type="text"
          value= {this.state.form.id}/>
        </FormGroup>

        <FormGroup>
          <label>Producto:</label>
          <input className="form-control" name="producto" type="text" onChange={this.handleChange} 
          value= {this.state.form.producto}/>
        </FormGroup>

        <FormGroup>
          <label>Precio:</label>
          <input className="form-control" name="precio" type="text" onChange={this.handleChange}
          value= {this.state.form.precio}/>
        </FormGroup>

        <FormGroup>
          <label>Cantidad:</label>
          <input className="form-control" name="cantidad" type="text" onChange={this.handleChange}
          value= {this.state.form.cantidad}/>
        </FormGroup>
       </ModalBody>

       <ModalFooter>
         <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
         <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
       </ModalFooter>
    </Modal>
    
     </>
    );
  }
}

export default App;
