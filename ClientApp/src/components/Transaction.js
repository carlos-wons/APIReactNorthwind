import { Component } from "react";
import {
    Button, Form, Navbar, Input, Card, CardBody, CardTitle, CardSubtitle,
    CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Table
} from "reactstrap";
import {
    BsPlusLg, BsSearch, BsBasketFill, BsBoxSeam,
    BsListStars, BsInboxesFill, BsTable, BsPencilFill
} from "react-icons/bs";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/transactions.css';
import authService from './api-authorization/AuthorizeService';

export class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false, data: [], isUserValid: false, isGerente: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        fetch('/api/suppliers').then((response) => {
            return response.json();
        }).then((dataApi) => {
            this.setState({ data: dataApi })
        }).catch(function (error) {
            console.log(error);
        })

        authService.getUser().then(
            (u) => {
                const valo = authService.isValidUser(u);
                const role = authService.isGerente(u);
                this.setState({ isGerente: role });
                this.setState({ isUserValid: valo });
            }
        );
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex">
                    <div className="sidebar-container sidebar-color d-none d-md-block">
                        <div className="menu">
                            <a href="/suppliers" className="d-block p-3 text-white selected"><BsBasketFill className="me-2 lead" /> Proveedores</a>
                            <a href="/warehouses" className="d-block p-3 text-white"><BsInboxesFill className="me-2 lead" /> Almacenes</a>
                            <a href="/movements" className="d-block p-3 text-white"><BsTable className="me-2 lead" /> Movimientos</a>
                            <a href="/products" className="d-block p-3 text-white"><BsBoxSeam className="me-2 lead" /> Productos</a>
                            <a href="/categorys" className="d-block p-3 text-white"><BsListStars className="me-2 lead" /> Categorias</a>
                        </div>
                    </div>
                    <div className=" w-100">
                        <div className="content">
                            <section className="py-5 px-3" style={{ backgroundColor: "#d3e0ef" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-9">
                                            <h1 className="fw-bold mb-0 text-dark">Tabla proveedor:</h1>
                                        </div>
                                    </div>
                                </div>
                            
                            <div>
                                <div className="py-3 my-5 bg-light mx-5 px-3">
                                    {
                                        this.state.isUserValid &&
                                        <div>
                                            <Button color="secondary" onClick={this.toggle}><BsPlusLg /> Agregar </Button>
                                        </div>
                                    }

                                    <div>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
                                            <ModalHeader toggle={this.toggle} className="text-dark" close={<Button onClick={this.toggle} className="btn-close"></Button>}>Agregar Proveedor</ModalHeader>
                                            <ModalBody className="text-dark">
                                                <Form>
                                                    <FormGroup>
                                                        <label for="txt-company">ID de la compañia</label>
                                                        <input type="text" className="form-control mb-3" placeholder="" disabled="true" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label for="txt-company">Nombre de la compañia</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Empresa-X" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-company">Nombre del proovedor</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Juan López Zavala" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-address">Direccion del proovedor</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Prolongacion Emiliano Zapata 654" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-city">Ciudad</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Morelia" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-cp">Codigo postal</label>
                                                        <input type="text" className="form-control mb-3" placeholder="384571" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-country">Pais</label>
                                                        <input type="text" className="form-control mb-3" placeholder="México" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-phone">Telefono de contacto</label>
                                                        <input type="tel" className="form-control mb-3" placeholder="XXX-XXX-XX-XX" />
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="secondary" onClick={this.toggle}>Agregar</Button>
                                                <Button color="warning" onClick={this.toggle}>Cancelar</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                    <Table id="example" className="table dt-responsive nowrap align-middle px-2">
                                        <thead>
                                            <tr>
                                                <th>Clave</th>
                                                <th>Compañia</th>
                                                <th>Contacto</th>
                                                <th>Dirección</th>
                                                <th>Ciudad</th>
                                                <th>C.P.</th>
                                                <th>Pais</th>
                                                <th>Telefono</th>
                                                {
                                                    this.state.isUserValid &&
                                                    <th className="text-center">Operacion</th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map(suppliers =>
                                                    //console.log(suppliers);
                                                    <tr key={suppliers.supplierId}>
                                                        <th scope="row">{suppliers.supplierId}</th>
                                                        <td>{suppliers.companyName}</td>
                                                        <td>{suppliers.contactName}</td>
                                                        <td>{suppliers.address}</td>
                                                        <td>{suppliers.city}</td>
                                                        <td>{suppliers.postalCode}</td>
                                                        <td>{suppliers.country}</td>
                                                        <td>{suppliers.phone}</td>
                                                        {this.state.isUserValid &&
                                                            <td className="text-center"><Button type="button" onClick={this.toggle} className="btn btn-secondary">
                                                                <BsPencilFill /></Button>
                                                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
                                                                    <ModalHeader toggle={this.toggle} className="text-dark" close={<Button onClick={this.toggle} className="btn-close"></Button>}>Agregar Proveedor</ModalHeader>
                                                                    <ModalBody className="text-dark">
                                                                        <Form>
                                                                            <FormGroup>
                                                                                <label for="txt-company">ID de la compañia</label>
                                                                                <input type="text" className="form-control mb-3" placeholder="" disabled="true" />
                                                                            </FormGroup>
                                                                            <FormGroup>
                                                                                <label for="txt-company">Nombre de la compañia</label>
                                                                                <input type="text" className="form-control mb-3" placeholder="Empresa-X" />
                                                                            </FormGroup>

                                                                            <FormGroup>
                                                                                <label for="txt-company">Nombre del proovedor</label>
                                                                                <input type="text" className="form-control mb-3" placeholder="Juan López Zavala" />
                                                                            </FormGroup>

                                                                            <FormGroup>
                                                                                <label for="txt-address">Direccion del proovedor</label>
                                                                                <input type="text" className="form-control mb-3" placeholder="Prolongacion Emiliano Zapata 654" />
                                                                            </FormGroup>

                                                                            <FormGroup>
                                                                                <label for="txt-city">Ciudad</label>
                                                                                <input type="text" className="form-control mb-3" placeholder="Morelia" />
                                                                            </FormGroup>

                                                                            <FormGroup>
                                                                                <label for="txt-cp">Codigo postal</label>
                                                                                <input type="text" className="form-control mb-3" placeholder="384571" />
                                                                            </FormGroup>

                                                                            <FormGroup>
                                                                                <label for="txt-country">Pais</label>
                                                                                <input type="text" className="form-control mb-3" placeholder="México" />
                                                                            </FormGroup>

                                                                            <FormGroup>
                                                                                <label for="txt-phone">Telefono de contacto</label>
                                                                                <input type="tel" className="form-control mb-3" placeholder="XXX-XXX-XX-XX" />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="secondary" onClick={this.toggle}>Agregar</Button>
                                                                        <Button color="warning" onClick={this.toggle}>Cancelar</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}