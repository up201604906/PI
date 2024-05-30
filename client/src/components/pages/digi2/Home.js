import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import slide1 from '../../../images/slides/slide1.jpg';
import slide2 from '../../../images/slides/slide2.jpg';
import slide3 from '../../../images/slides/slide3.jpg';
import slide4 from '../../../images/slides/slide4.jpg';

import artur from '../../../images/team/artur.jpg';
import santos_bruno from '../../../images/team/santos-bruno.png';
import gomes_diogo from '../../../images/team/gomes-diogo.png';
import rocha_diogo from '../../../images/team/rocha-diogo.png';
import pereira_eliseu from '../../../images/team/pereira-eliseu.png';
import goncalves_gil from '../../../images/team/goncalves-gil.png';
import pinto_joana from '../../../images/team/pinto-joana.png';
import pimentel_joao from '../../../images/team/pimentel-joao.png';
import joao_pinheiro from '../../../images/team/jmotp.png';
import conego_leonor from '../../../images/team/conego-leonor.png';
import rocha_lucas from '../../../images/team/rocha-lucas.png';
import portela_luis from '../../../images/team/portela-luis.png';
import guimaraes_melissa from '../../../images/team/guimaraes-melissa.png';
import barros_pedro from '../../../images/team/barros-pedro.png';
import silva_ricardo from '../../../images/team/silva-ricardo.png';
import pinto_rui from '../../../images/team/pinto-rui.png';
import pinto_vitor from '../../../images/team/pinto-vitor.png';
import work from '../../../images/work.jpg';

import funding from '../../../images/funding.png';
import hosts from '../../../images/hosts.jpg';

import awl from '../../../images/partners/awl.jpg';
import critical from '../../../images/partners/critical.png';
import electrolux from '../../../images/partners/electrolux.jpg';
import eit from '../../../images/partners/eit.jpg';
import fiat from '../../../images/partners/fiat.png';
import ford from '../../../images/partners/ford.png';
import hwh from '../../../images/partners/hwh.png';
import kuka from '../../../images/partners/kuka.png';
import mtc from '../../../images/partners/mtc.jpg';
import nottingham from '../../../images/partners/nottingham.png';
import psa from '../../../images/partners/psa.png';
import siemens from '../../../images/partners/siemens.jpg';
import {Link} from "react-router-dom";


export default function Home() {

    const [projects, setAllProjects] = useState([]);

    useEffect(() => {
        fetchAllProjects();
    }, []);

    function fetchAllProjects() {
        fetch('http://localhost:4000/projects')
            .then(response => response.json())
            .then(data => {
                // Shuffle array
                for (let i = data.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [data[i], data[j]] = [data[j], data[i]];
                }
                // Set the first 6 elements
                setAllProjects(data.slice(0, 6));
            })
            .catch(error => console.error(error));

    }

    function getRandomIcon() {
        const icons = ["cpu", "laptop", "pc-display", "display", "window-fullscreen"]

        return "bi bi-" + icons[Math.floor(Math.random() * icons.length)];
    }

    const slides = [
        {
            image: slide1,
            title: <>Welcome to the <span>Digital and Intelligent Industry Lab</span></>,
            text: "We focus our work on advanced systems and control concepts, tools and technologies for a wide range of areas encompassing cyber-physical systems, collaborative robotics, machine learning and human-machine interaction with high societal impact.",
            button: null
        },
        {
            image: slide2,
            title: <>Summer <span>Jobs</span></>,
            text: "Did you know DIGI2 has open vacancies for 2021 Summer Jobs? Please check out our offers in the Job page.",
            button: {link: '/jobs', text: 'Read More'}
        },
        {
            image: slide3,
            title: <>Research <span>Opportunities</span></>,
            text: "We are always seeking for creative and disruptive researchers to enroll our poll of R&D projects ranging from cyber-physical systems to artificial intelligence. Will be you the next DIGI2 bright talent? Check our open positions in the Job page.",
            button: {link: '/jobs', text: 'Read More'}
        },
        {
            image: slide4,
            title: <>EIT Manufacturing <span>Doctoral School</span></>,
            text: "The Doctoral School: Turn your thesis into a startup.",
            button: {link: '/eitds', text: 'Read More'}
        },
    ];

    const features = [
        {
            icon: "bi-card-checklist",
            title: "Vision and Motivation",
            text: "We keep our team motivated by defining ambitious goals for their research and apply all the achievements in real-world use cases."
        },
        {
            icon: "bi-bar-chart",
            title: "Research Thrusts",
            text: "Did you know that DIGI2 has current more than 10 active researchers and is hosted in the SYSTEC research unit @ FEUP?"
        },
        {
            icon: "bi-binoculars",
            title: "Key Partners",
            text: "From Academia to Industry, we are always seeking for new partnerships in National and European R&D projects. Some of them are Ford UK, Kuka, PSA Groupe and University of Nottingham."
        },
    ]

    const teamMembers = [
        {
            imgSrc: artur,
            name: "Artur Freitas",
            role: "Researcher",
            areas: "Artificial Intelligence, Zero-shot Learning, Transfer Learning",
            linkedin: "https://www.linkedin.com/in/arturfreitasgoncalves/"
        },
        {
            imgSrc: santos_bruno,
            name: "Bruno Santos",
            role: "Researcher",
            areas: "Collaborative Robotics, Computer Vision, Machine Learning",
            linkedin: "https://www.linkedin.com/in/brunomsantos203/"
        },
        {
            imgSrc: gomes_diogo,
            name: "Diogo Gomes",
            role: "Researcher",
            areas: "Robotics, Development of Autonomous Systems",
            linkedin: "https://www.linkedin.com/in/diogo-gomes-618999244"
        },
        {
            imgSrc: rocha_diogo,
            name: "Diogo Rocha",
            role: "Researcher",
            areas: "Artificial Intelligence, Production Systems, Digitalization",
            linkedin: "http://www.linkedin.com/in/diomrocha"
        },
        {
            imgSrc: pereira_eliseu,
            name: "Eliseu Pereira",
            role: "Researcher",
            areas: "Cyber-Physical Systems, Machine Learning, Data Analytics",
            linkedin: "https://www.linkedin.com/in/eliseu-pereira/",
            researchGate: "https://www.researchgate.net/profile/Eliseu-Pereira-2"
        },
        {
            imgSrc: goncalves_gil,
            name: "Gil Gonçalves",
            role: "Coordinator",
            areas: "Cyber-Physical Systems, Distributed Control Systems, Systems of Systems",
            linkedin: "https://www.linkedin.com/in/gilmgoncalves/"
        },
        {
            imgSrc: pinto_joana,
            name: "Joana Miranda",
            role: "Researcher",
            areas: "Innovation Management, Entrepreneurship, Education 4.0",
            linkedin: "https://www.linkedin.com/in/joanamirandapinto/"
        },
        {
            imgSrc: pimentel_joao,
            name: "João Pimentel",
            role: "Researcher",
            areas: "Cyber-Physical Systems, Zero Defect Manufacturing, Machine Learning",
        },
        {
            imgSrc: joao_pinheiro,
            name: "João Pinheiro",
            role: "Researcher",
            areas: "Embedded and Distributed Systems, Sensor and Automation Systems, Real-time systems",
            linkedin: "https://www.linkedin.com/in/jmotp/"
        },
        {
            imgSrc: conego_leonor,
            name: "Leonor Cónego",
            role: "Researcher",
            areas: "Gamification, Meaningful Learning Environments, Education 4.0",
            linkedin: "https://www.linkedin.com/in/leonorconego/"
        },
        {
            imgSrc: rocha_lucas,
            name: "Lucas Rocha",
            role: "Researcher",
            areas: "Digital Twins, Extended Reality, Human-Computer Interaction",
            linkedin: "https://www.linkedin.com/in/lucas-jos%C3%A9-rocha-6b3023172/"
        },
        {
            imgSrc: portela_luis,
            name: "Luís Portela",
            role: "Researcher",
            areas: "Collaborative Robotics, Computer Vision, Machine Learning"
        },
        {
            imgSrc: guimaraes_melissa,
            name: "Melissa Guimaraes",
            role: "Researcher",
            areas: "Digital Storytelling and Interactive Narratives",
            linkedin: "https://www.linkedin.com/in/cidreira"
        },
        {
            imgSrc: barros_pedro,
            name: "Pedro Barros",
            role: "Researcher",
            areas: "Augmented Reality, Industry 4.0, Human-Computer Interaction",
            linkedin: "https://www.linkedin.com/in/pedroleitebarros/"
        },
        {
            imgSrc: silva_ricardo,
            name: "Ricardo Silva",
            role: "Researcher",
            areas: "Distributed Control Systems, Digitalization, Sensor Network",
            linkedin: "https://www.linkedin.com/in/rjsrps/"
        },
        {
            imgSrc: pinto_rui,
            name: "Rui Pinto",
            role: "Researcher",
            areas: "Artificial Immune Systems, Cyber-Physical Systems, Edge Computing",
            linkedin: "https://www.linkedin.com/in/rui-pinto/",
            personalPage: "http://web.fe.up.pt/~rpinto/",
            researchGate: "https://www.researchgate.net/profile/Rui-Pinto-16"
        },
        {
            imgSrc: pinto_vitor,
            name: "Vítor Pinto",
            role: "Researcher",
            areas: "Cyber-Physical Systems, Mobile Robotics and Manipulation, Embedded Systems",
            linkedin: "https://www.linkedin.com/in/v%C3%ADtor-pinto-78135583/"
        }
    ];

    const partners = [awl, critical, electrolux, eit, fiat, ford, hwh, kuka, mtc, nottingham, psa, siemens];


    function slider() {
        return (
            <section id="hero">
                <div className="hero-container">
                    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">

                        <ol className="carousel-indicators">
                            {slides.map((_, index) => (
                                <li key={index} data-bs-target="#heroCarousel" data-bs-slide-to={index}
                                    className={index === 0 ? 'active' : ''}></li>
                            ))}
                        </ol>

                        <div className="carousel-inner" role="listbox">
                            {slides.map((slide, index) => (
                                <div key={index} className={"carousel-item " + (index === 0 ? "active" : "")} style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: "white",
                                    backgroundPosition: "center"
                                }}>
                                    <div className="carousel-container">
                                        <div className="carousel-content">
                                            <h2 className="animate__animated animate__fadeInDown">{slide.title}</h2>
                                            <p className="animate__animated animate__fadeInUp fw-bold">{slide.text}</p>
                                            {slide.button ? <a href={slide.button.link}
                                                               className="btn-get-started animate__animated animate__fadeInUp text-decoration-none fw-bold">{slide.button.text}</a> : null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a className="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
                        </a>

                        <a className="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
                        </a>

                    </div>
                </div>
            </section>
        );
    }

    function featured() {
        return (
            <section id="featured" className="featured mb-5 mt-0">
                <div className="container">

                    <div className="row">
                        {features.map((feature, index) => (
                            <div key={index} className={"col-lg-3"}>
                                <div className="icon-box">
                                    <i className={"bi " + feature.icon}></i>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.text}</p>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-3 mt-4 mt-lg-0">
                            <a href="https://github.com/DIGI2-FEUP" target="_blank"
                               className={"text-decoration-none text-black"}>
                                <div className="icon-box">
                                    <i className="bi bi-github"></i>
                                    <h3>GitHub</h3>
                                    <p>Did you know our research is in GitHub as well? We push all our projects to
                                        become open source and help the community to evolve and progress.</p>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </section>
        )
    }

    function about() {
        return (
            <section id="about" className="about">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-6">
                            <img src={work} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 content">
                            <h3>Impulse the European Industry towards smart manufacturing systems</h3>
                            <p className="fst-italic">
                                The Digital and Intelligent Industry Lab is part of the Research Center for Systems and
                                Technologies (SYSTEC), Faculty of Engineering of the University of Porto (FEUP).
                            </p>
                            <p className="fst-italic">
                                The Digital and Intelligent Industry Lab develops R&D activities:
                            </p>
                            <ul>
                                <li><i className="bi bi-check-circle"></i> Cyber-Physical Production Systems and
                                    Industrial Internet of Things
                                </li>
                                <li><i className="bi bi-check-circle"></i> Distributed and Reconfigurable Control
                                    Systems
                                </li>
                                <li><i className="bi bi-check-circle"></i> Industrial Artificial Intelligence</li>
                                <li><i className="bi bi-check-circle"></i> Advanced / Collaborative Robotics</li>
                            </ul>
                            <p>
                                The Digital and Intelligent Industry Lab mission is the scientific and technical
                                research, development, advanced education and training, dissemination and sustainable
                                technology transfer.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        )
    }

    function services() {
        return (
            <section id="services" className="services d-flex flex-column">
                <div className="container">
                    <div className="section-title">
                        <h2>Research Projects</h2>
                    </div>

                    <div className="row">
                        {projects.map((project, index) => (
                            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" key={index}>
                                <div className="icon-box">
                                    <div className={"icon mb-4"}>
                                        {project.imgSrc ?
                                            <img src={project.imgSrc} alt={project.imgAlt} className="img-fluid"
                                                 style={{maxHeight: project.imgStyle}}/>
                                            : <i className={getRandomIcon()}></i>}
                                    </div>
                                    <h4><a className={"text-decoration-none truncate-title mb-4"}
                                           href={project.link || "#"} target="_blank"
                                           rel="noopener noreferrer">{project.acronym}</a></h4>
                                    <p className={"truncate-description mb-5 fs-5 lh-sm"}>{project.description}</p>
                                    <a href={"/projects/" + project.id} className={"text-decoration-none text-black-50"}
                                       target="_blank" rel="noopener noreferrer">Details →</a>
                                    {project.videoSrc &&
                                        <iframe height="200" src={project.videoSrc} title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen></iframe>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Link to={"http://localhost:3000/projects"} className={"btn btn-primary"}> See More</Link>

            </section>
        );
    }

    function team() {
        return (
            <section id="team" className="team">
                <div className="container">
                    <div className="section-title">
                        <h2>Team</h2>
                    </div>
                    <div className="row">
                        {teamMembers.map((member, index) => (
                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch" key={index}>
                                <div className="member">
                                    <img src={member.imgSrc} alt={member.name}/>
                                    <h4>{member.name}</h4>
                                    <span>{member.role}</span>
                                    <p><b>Research Areas</b>: {member.areas}</p>
                                    <div className="social">
                                        {member.linkedin &&
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i
                                                className="bi bi-linkedin"></i></a>}
                                        {member.researchGate &&
                                            <a href={member.researchGate} target="_blank" rel="noopener noreferrer"><i
                                                className="bi bi-book"></i></a>}
                                        {member.personalPage &&
                                            <a href={member.personalPage} target="_blank" rel="noopener noreferrer"><i
                                                className="bi bi-person"></i></a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    function clients() {
        return (
            <section id="clients" className="clients">
                <div className="container">

                    <div className="section-title">
                        <h2>Partners</h2>
                        <p>Throughout the years a large networks of professional and research partnership has been made which mirrors all the excellence progress and achievements of DIGI2</p>
                    </div>

                    <div className="clients-slider swiper-container">
                        <div className="swiper-wrapper align-items-center">
                            {partners.map((partner, index) => (
                                <div className="swiper-slide"><img src={partner} className={"img-fluid"} alt={""}/></div>
                            ))}
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>

                </div>
            </section>
        );
    }
    
    function our_hosts(){
        return (
            <section id="hosts" className="clients">
                <div className="container">

                    <div className="section-title">
                        <h2>Hosts</h2>
                        <img src={hosts} alt="" style={{width:'50%'}}/>
                    </div>

                </div>
            </section>
        )
    }
    
    function our_funding (){
        return (
            <section id="clients" className="clients">
                <div className="container">

                    <div className="section-title">
                        <h2>Funding</h2>
                        <img src={funding} alt="" style={{width:'70%'}}/>
                    </div>

                </div>
            </section>
        )
    }


    return (
        <div className={"d-flex flex-column"}>
            {slider()}
            {featured()}
            {about()}
            {services()}
            {team()}
            {clients()}
            {our_hosts()}
            {our_funding()}
        </div>
    );
}
