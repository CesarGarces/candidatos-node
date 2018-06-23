import React, { Component } from 'react';

class App extends Component {
    constructor(){
        super();
        this.state = {
            nombre: '',
            apellido: '',
            documento: '',
            fecha: '',
            bloqueo: '',
            candidatos: [],
            check: '',
            _id: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.addCandidato = this.addCandidato.bind(this);
    }
    addCandidato(e) {
        e.preventDefault();
        if(this.state._id) {
          fetch(`/api/candidatos/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
              nombre: this.state.nombre,
              apellido: this.state.apellido,
              documento: this.state.documento,
              fecha: this.state.fecha,
              bloqueo: this.state.bloqueo
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              window.M.toast({html: 'Candidato Actualizado'});
              this.setState({_id: '', nombre: '', apellido: '', documento: '', fecha: '', bloqueo: ''});
              this.fetchcandidatos();
            });
        } else {
          fetch('/api/candidatos', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              window.M.toast({html: 'Candidato Guardado'});
              this.setState({nombre: '', apellido: '', documento: '', fecha: '', bloqueo: ''});
              this.fetchcandidatos();
            })
            .catch(err => console.error(err));
        }
    
      }
    fetchcandidatos(){
        fetch('/api/candidatos')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({candidatos: data});
        });
    }
    

    deleteCandidato(id){
        
            fetch(`/api/candidatos/${id}`)
              .then(res => res.json())
              .then(data => {
                console.log(data.bloqueo);
                if(data.bloqueo == "true"){
                    window.M.toast({html: 'no se puede eliminar esta bloqueado'});
                
                }
                if(data.bloqueo == "false"){
                    fetch(`/api/candidatos/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Acept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => console.log(data));
                    M.toast({html: 'Candidato Eliminado'});
                    this.fetchcandidatos();
                
                }
              });
                 
        
    }
    editCandidato(id) {
        fetch(`/api/candidatos/${id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({
              nombre: data.nombre,
              apellido: data.apellido,
              documento: data.documento,
              fecha: data.fecha,
              bloqueo: data.bloqueo,
              _id: data._id
            });
          });
      }
    
      componentDidMount() {
        this.fetchcandidatos();
      }
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    checkItem(){
        
        this.setState({
            check:!this.state.check,
            bloqueo: !this.state.check
        })
    }
    
        
    
    render() {
        return (
            <div>
                {/* navigation */}
                <nav className="light-blue darken-1">
                    <div className="container">
                        <a href="/" className="brand-logo">Candidatos</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addCandidato}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="nombre" onChange={this.handleChange} type="text" placeholder="Nombre" value={this.state.nombre}/>
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea onChange={this.handleChange} name="apellido" placeholder="Apellido" className="materialize-textarea" value={this.state.apellido}></textarea>
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea onChange={this.handleChange} name="documento" placeholder="Documento" className="materialize-textarea" value={this.state.documento}></textarea>
                                            </div>
                                            <div className="input-field col s12">
                                                <input placeholder="DD/MM/AAAA" type="text" onChange={this.handleChange} name="fecha" className="datepicker" value={this.state.fecha}/>
                                            </div>
                                            <div className="input-field col s12">
                                            <p>
                                                <label>
                                                <input type="checkbox" value={this.state.check} onChange={() => this.checkItem()}/>
                                                <span>Bloqueo</span>
                                                </label>
                                            </p>
                                            </div>
                                        </div>
                                        <button type="submit" className="waves-effect waves-light btn light-blue darken-1">Submit
    <i className="material-icons right">send</i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Documento</th>
                                        <th>Fecha</th>
                                        <th>Bloqueado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                       this.state.candidatos.map(candidato => {
                                            return (
                                                <tr key={candidato._id}>
                                                    <td>{candidato.nombre}</td>
                                                    <td>{candidato.apellido}</td>
                                                    <td>{candidato.documento}</td>
                                                    <td>{candidato.fecha}</td>
                                                    <td>{candidato.bloqueo}</td>
                                                    <td>
                                                        <button onClick={() => this.editCandidato(candidato._id)} className="waves-effect waves-light btn-small #ffc107 amber" style={{margin: '4px'}}><i className="material-icons">edit</i></button>
                                                        <button onClick={() => this.deleteCandidato(candidato._id)} className="waves-effect waves-light btn-small #e64a19 deep-orange darken-2"><i className="material-icons">delete</i></button>
                                                    </td>
                                                </tr>
                                            )
                                       })
                                   } 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default App;
