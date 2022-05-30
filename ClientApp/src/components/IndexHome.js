import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { LoginMenu } from './api-authorization/LoginMenu';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/NavMenu.css';
import '../css/style.css';
import Worktable from '../Images/caracteristicas.png';
import Design from '../Images/slide01.png';
import Slpash from '../Images/grafico.png';
import Splash2 from '../Images/mundo.png'
import authService from './api-authorization/AuthorizeService';

export class IndexHome extends Component {

    constructor(props) {
        super(props);
        this.state = { isUserValid: false }
    }

    componentDidMount() {
        authService.getUser().then(
            (u) => {
                console.log(u);
                const valo = authService.isAdmin(u);
                console.log(valo);
                this.setState({ isUserValid: valo });
                console.log(valo);
            }

        );
    }

    render() {
        return (
            
            
            <div>
                <div className="col-12 col-lg-6" data-aos="zoom-in-left">
                                    <img src={Design} className="" height="700"
                                        loading="lazy" />
                                </div>
                <div className="startView">
                    
                </div>
   

                <div id="caracteristicas">
                    <div className="container px-4 pt-5" id="hanging-icons">
                        <h2 className="display-5 pb-1" color='#011939'>Caracteristicas</h2>
                        <div className="row g-4  row-cols-1 row-cols-lg-3 text-dark">
                            <div className=" col d-flex align-items-start">
                                <div className="icon-square text-dark flex-shrink-0 me-3">
                                    <h2><i className="fa-solid fa-rotate" color='#0055FF'></i></h2>
                                </div>                                
                            </div>
                            <div className="col d-flex align-items-start">
                                <div className="icon-square text-dark flex-shrink-0 me-3">
                                    <h2><i className="fa-solid fa-boxes-stacked" color='#0055FF'></i></h2>
                                </div>                           
                            </div>
                            <div className="col d-flex align-items-start">
                                <div className="icon-square text-dark flex-shrink-0 me-3">
                                    <h2><i className="fa-solid fa-arrow-trend-up" color='#0055FF'></i></h2>
                                </div>                             
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" data-aos="fade-up">
                            <img src={Worktable} className="d-block mx-sm-auto img-fluid" alt="" width="75%" />
                        </div>
                    </div>

                    <div id="caracteristicas2" className="overflow-hidden">
                        <div className="d-flex flex-equal flex-column flex-md-row w-100 ">
                            <div className="text-center text-dark pt-3 pt-md-5 px-3 px-md-5 overflow-hidden" data-aos="fade-down-right"
                                id='back-gradient'>
                                <div className="my-3 p-3">
                                    <h2 className="display-5 fw-bold">Unifique todo su inventario</h2>
                                    <p className="lead">Sincroniza tus pedidos de todos tus canales de venta, incluyendo Shopify,
                                        Amazon,
                                        eBay y más de 21 integraciones.</p>
                                </div>
                                <div className=" mx-3 pb-5">
                                    <img src={Slpash} className="d-block mx-sm-auto img-fluid" alt=""
                                        width="100%" id='img_unsplash' />
                                </div>
                            </div>
                            <div className="text-center text-white pt-3 pt-md-5 px-3 px-md-5 overflow-hidden backgroud-gradient"
                                data-aos="fade-down-left">
                                <div className="my-3 py-3">
                                    <h2 className="display-5 fw-bold">Cumpla con todos los pedidos</h2>
                                    <p className="lead">Acelere sus pedidos con escáneres digitales de picking optimizados, cuadros de
                                        mando
                                        y automatizaciones inteligentes.</p>
                                </div>
                                <div className=" mx-3 pb-5">
                                    <img src={Splash2} className="d-block mx-sm-auto img-fluid img_unsplash"
                                        alt="" width="100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}