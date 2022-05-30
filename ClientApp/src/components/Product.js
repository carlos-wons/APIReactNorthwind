import { Component } from "react";
import {
    Button, Form, Navbar, Input, Card, CardBody, CardTitle, CardSubtitle,
    CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Col, Row, InputGroupText, InputGroup,
} from "reactstrap";
import {
    BsPlusLg, BsSearch, BsBasketFill, BsBoxSeam,
    BsListStars, BsInboxesFill, BsTable, BsPencilFill, 
} from "react-icons/bs";
import { MdImageNotSupported } from "react-icons/md";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/transactions.css';
import authService from './api-authorization/AuthorizeService';

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false, data: [], isUserValid: false, isGerente: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        fetch('/api/products').then((response) => {
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
                            <a href="/suppliers" className="d-block p-3 text-white"><BsBasketFill className="me-2 lead" /> Proveedores</a>
                            <a href="/warehouses" className="d-block p-3 text-white"><BsInboxesFill className="me-2 lead" /> Almacenes</a>
                            <a href="/movements" className="d-block p-3 text-white"><BsTable className="me-2 lead" /> Movimientos</a>
                            <a href="/products" className="d-block p-3 text-white selected"><BsBoxSeam className="me-2 lead" /> Productos</a>
                            <a href="/categorys" className="d-block p-3 text-white"><BsListStars className="me-2 lead" /> Categorias</a>
                        </div>
                    </div>
                    <div className=" w-100">
                        <div className="content">
                            <section className="py-5 px-3" style={{ backgroundColor: "#d3e0ef" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-9">
                                            <h1 className="fw-bold mb-0 text-dark">Tabla productos:</h1>                               
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
                                            <ModalHeader toggle={this.toggle} className="text-dark" close={<Button onClick={this.toggle} className="btn-close"></Button>}>Agregar Producto</ModalHeader>
                                            <ModalBody className="text-dark">
                                                <Form>
                                                    <FormGroup>
                                                        <label for="txt-company">ID del producto</label>
                                                        <input type="text" className="form-control mb-3" placeholder="" disabled="true" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label for="txt-company">Nombre del producto</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Emperador" />
                                                    </FormGroup>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <label for="txt-address">Proovedor</label>
                                                                <input type="text" className="form-control mb-3" placeholder="" />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <label for="txt-city">Categoria</label>
                                                                <input type="text" className="form-control mb-3" placeholder="" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <label for="txt-cp">Cantidad por unidad</label>
                                                                <input type="text" className="form-control mb-3" placeholder="" />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <label for="txt-country">Precio neto</label>
                                                                <InputGroup>
                                                                    <InputGroupText>$</InputGroupText>
                                                                    <Input type="text" />
                                                                </InputGroup>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <FormGroup>
                                                        <label for="txt-phone">Imagen</label>
                                                        <Input type="file" className="form-control mb-3" placeholder="" />
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="secondary" onClick={this.toggle}>Agregar</Button>
                                                <Button color="warning" onClick={this.toggle}>Cancelar</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                    <table id="example" className="table dt-responsive nowrap align-middle px-2">
                                        <thead>
                                            <tr>
                                                <th>Clave</th>
                                                <th>Nombre del producto</th>
                                                <th>Proveedor</th>
                                                <th>Categoria</th>
                                                <th>Cantidad por unidad</th>
                                                <th>Precio</th>
                                                <th className="text-center">Imagen</th>
                                                {
                                                    this.state.isUserValid &&
                                                    <th className="text-center">Operacion</th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map(products =>
                                                    <tr key={products.productId}>
                                                        <th scope="row">{products.productId}</th>
                                                        <td>{products.productName}</td>
                                                        <td>{products.supplierId}</td>
                                                        <td>{products.categoryId}</td>
                                                        <td>{products.quantityPerUnit}</td>
                                                        <td>{products.unitPrice}</td>
                                                        <td><div className="text-center"><MdImageNotSupported /></div></td>
                                                        {
                                                            this.state.isUserValid &&
                                                            <td className="text-center"><button type="button" className="btn btn-secondary">
                                                                <BsPencilFill /></button></td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
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