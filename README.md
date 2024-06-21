#Digi2 Website Revamp

# Digi2 Research Lab
Digi2 focuses their work on advanced systems and control concepts, tools and technologies for a wide range of areas encompassing cyber-physical systems, collaborative robotics, machine learning and human-machine interaction with high societal impact.

Digi2 seeks creative and disruptive researchers to enroll their poll of R&D projects ranging from cyber-physical systems to artificial intelligence.


# Project Components
- [ER: Requirements Specifications](docs/er.md)
- [EBD: Database Specification Component](docs/ebd.md)
- [EAP: Architecture Specification and Prototype](docs/eap.md)
- [RES: Resources](docs/resouces.md)

# How to Run
In order to run the website, you need Docker installed and running, and then you can run : 

```bash
 docker-compose up --build
```
or
```bash
 docker compose up --build 
```

Unit and Integration tests
```bash
 docker-compose up --build test
```


- The website will be acessible in `http://localhost:80/` 
- The React App will be acessible in `http://localhost:3000/`
- The Express server will be exposed in `http://localhost:4000/`




## Notes - Development
- Any changes in the `digi2-website`,`backend` and `client` directories will be reflected in real time if the containers are running. 
- Connection between static website and React app is WIP


# Team
- Carlos Madaleno, up201604906@edu.fe.up.pt
- Diana Martins, up202108815@edu.fe.up.pt
- Ntsay Zacarias, up202008863@edu.fe.up.pt
- Rui Soares, up202103631@edu.fe.up.pt

#### Digi2 Revamp, 16/02/24
