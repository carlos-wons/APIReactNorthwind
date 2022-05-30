import { Component, useEffect, useState } from "react";
import {
    Button, Form, Navbar, Input, Card, CardBody, CardTitle, CardSubtitle,
    CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Table, Col, Row
} from "reactstrap";
import {
    BsPlusLg, BsSearch, BsBasketFill, BsBoxSeam,
    BsListStars, BsInboxesFill, BsTable, BsPencilFill, BsFillTrashFill
} from "react-icons/bs";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/transactions.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import authService from './api-authorization/AuthorizeService';


export class Warehouse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            accion: 0,
            id: 0,
            description: "",
            address: "",
            company: 1,
            warehouseE: {},
            isUserValid: false,
            isGerente: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        authService.getUser().then(
            (u) => {
                const valo = authService.isValidUser(u);
                const role = authService.isGerente(u);
                this.setState({ isGerente: role });
                this.setState({ isUserValid: valo });
            }
        );

        authService.getAccessToken().then(
            (token) => {
                const options = {
                    method: "GET",
                    headers: {
                        headers: !token ? {} : {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                };
                fetch('/api/warehouses').then((response) => {
                    return response.json();
                }).then((dataApi) => {
                    this.setState({ data: dataApi })
                }).catch(function (error) {
                    console.log(error);
                });
            }
        )
    }

    handleClick() {
        const warehouse = {
            warehouseId: this.state.id,
            description: this.state.description,
            address: this.state.address,
            companyId: 1
        };

        console.log(warehouse);

        switch (this.state.accion) {
            case 1:
                this.create(warehouse);
                break;

            case 2:
                this.edit(warehouse);
                break;

            case 3:
                warehouse.companyId = this.state.company;
                this.delete(warehouse);
                break;
        }

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    mitoggle = () => {
        this.setState({
            accion: 0,
            id: 0,
            description: "",
            address: "",
            warehouseE: {}
        });
    }

    mostrarModalAgregar = () => {
        this.setState({
            accion: 1
        });
    };

    create = (warehouse) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(warehouse)
        };

        fetch('/api/warehouses', options)
            .then(
                (response) => { return response.status; }
            ).then(
                (code) => {
                    if (code == 201) {
                        console.log(code);

                        const warehouses = Array.from(this.state.data);
                        warehouses.push({
                            warehouseId: warehouse.warehouseId,
                            description: warehouse.description,
                            address: warehouse.address
                        });
                        this.componentDidMount();
                        this.mitoggle();
                    }
                }
            );
    }

    editar = (item) => {

        fetch('/api/warehouses/' + item.warehouseId)
            .then(response => { return response.json() })
            .then(o => {
                console.log("primer fetch " + o);
                this.setState({
                    accion: 2,
                    id: o.warehouseId,
                    description: o.description,
                    address: o.address,
                    company: o.companyId,
                    warehouseE: o
                });
            });
    }

    edit = (warehouse) => {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(warehouse)
        };

        fetch('/api/warehouses/' + warehouse.warehouseId, options)
            .then(
                (response) => { return response.status; }
            ).then(
                (code) => {
                    if (code == 204) {
                        console.log(code);
                        const warehouses = Array.from(this.state.data);
                        warehouses.push({ warehouse });
                        this.componentDidMount();
                        this.mitoggle();
                    }
                }
            );
    }

    eliminar = (item) => {

        fetch('/api/warehouses/' + item.warehouseId)
            .then(response => { return response.json() })
            .then(o => {
                console.log(o);
                this.setState({
                    accion: 3,
                    id: o.warehouseId,
                    description: o.description,
                    address: o.address,
                    company: o.companyId,
                    warehouseE: o
                });
            });
    }

    delete = (warehouse) => {
        const options = {
            method: "DELETE"
        };

        fetch('/api/warehouses/' + warehouse.warehouseId, options)
            .then(
                (response) => { return response.status; }
            ).then(
                (code) => {
                    if (code == 204 || code == 200) {
                        console.log(code);
                        const warehouses = Array.from(this.state.data);
                        warehouses.pop({ warehouse });
                        this.componentDidMount();
                        this.mitoggle();
                    }
                }
            );
    }

    render() {
        return (
            <div>
                <div className="d-flex">
                    <div className="sidebar-container sidebar-color d-none d-md-block">
                        <div className="menu">
                            <a href="/suppliers" className="d-block p-3 text-white"><BsBasketFill className="me-2 lead" /> Proveedores</a>
                            <a href="/warehouses" className="d-block p-3 text-white selected"><BsInboxesFill className="me-2 lead" /> Almacenes</a>
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
                                            <h1 className="fw-bold mb-0 text-dark">Tabla almacenes:</h1>
                                        </div>
                                    </div>
                                </div>                             
                            
                            <div>
                                <div className="py-3 my-5 bg-light mx-5 px-3">
                                    {
                                        this.state.isUserValid &&
                                        <div>
                                            <Button color="secondary" onClick={() => this.mostrarModalAgregar()}><BsPlusLg /> Agregar </Button>
                                        </div>
                                    }
                                    <Table className="dt-responsive nowrap align-middle px-2">
                                        <thead>
                                            <tr>
                                                <th>Clave</th>
                                                <th>Descripción</th>
                                                <th>Dirección</th>
                                                {
                                                    this.state.isUserValid &&
                                                    <th className="text-center">Operacion</th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map(warehouses =>
                                                    <tr key={warehouses.warehouseId}>
                                                        <th scope="row">{warehouses.warehouseId}</th>
                                                        <td>{warehouses.description}</td>
                                                        <td>{warehouses.address}</td>
                                                        {
                                                            this.state.isUserValid &&
                                                            <td className="text-center">
                                                                <div className="d-flex flex-row justify-content-center">
                                                                    <Button type="button" onClick={() => this.editar(warehouses)} className="btn btn-secondary">
                                                                        <BsPencilFill /></Button>
                                                                    {
                                                                        !this.state.isGerente &&
                                                                        <Button type="button" onClick={() => this.eliminar(warehouses)} className="btn btn-danger">
                                                                            <BsFillTrashFill /></Button>
                                                                    }
                                                                </div>
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                                <div>
                                    <Modal
                                        isOpen={this.state.accion > 0 && this.state.accion < 3 && true}
                                        toggle={this.mitoggle}
                                        className={this.props.className}
                                        centered
                                    >
                                        <ModalHeader toggle={this.mitoggle} className="text-dark" close={<Button onClick={this.mitoggle} className="btn-close"></Button>}>Almacen</ModalHeader>
                                        <ModalBody className="text-dark">
                                            <Form>
                                                <FormGroup>
                                                    <label for="almacenId">ID del almacen</label>
                                                    <input id="almacenId" name="alamacenId" type="text" className="form-control mb-3" placeholder="" disabled="true" value={this.state.id} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <label for="description">Descripción del almacen</label>
                                                    <input type="description" name="description" className="form-control mb-3" onChange={this.handleChange} value={this.state.description} placeholder="Empresa-X" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <label for="address">Dirección del almacen</label>
                                                    <input type="address" name="address" className="form-control mb-3" onChange={this.handleChange} value={this.state.address} placeholder="Juan López Zavala" />
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.handleClick}>Agregar</Button>
                                            <Button color="warning" onClick={this.mitoggle}>Cancelar</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Modal
                                        isOpen={this.state.accion == 3 && true}
                                        centered
                                        className={this.props.className}
                                        toggle={this.mitoggle}>
                                        <ModalHeader className="text-dark" close={<Button onClick={this.mitoggle} className="btn-close"></Button>}>
                                            Eliminar
                                        </ModalHeader>
                                        <ModalBody className="text-dark">
                                            ¿Desea elimninar?
                                            <Row>
                                                <Col md={2}>
                                                    <FormGroup>
                                                        <label for="elimination">ID</label>
                                                        <input id="elimination" name="elimination" type="text" className="form-control mb-3" placeholder="" disabled="true" value={this.state.id} />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={10}>
                                                    <FormGroup>
                                                        <label for="movimiento">Descripción</label>
                                                        <input id="movimiento" name="movimiento" type="text" className="form-control mb-3" placeholder="" disabled="true" value={this.state.description} />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                color="danger"
                                                onClick={this.handleClick}
                                            >
                                                Eliminar
                                            </Button>
                                            {' '}
                                            <Button onClick={this.mitoggle}>
                                                Cancelar
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
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