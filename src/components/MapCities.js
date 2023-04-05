import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { cities } from '../JSON/cities'
import { Row, Col, Container, Button, Form, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alertify from "alertifyjs";




export default function MapCities() {
    const [inputCities, setInputCities] = useState([])
    const currentCities = []

    const [input, setInput] = useState("")

    const onChange = (e) => {
        setInput(e.target.value)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
          onSubmit()
        }
      };

    const onSubmit = (e) => {
        e.preventDefault();
        if (input === "" || input === "null") {
            alertify.alert("Error", "Please type something!", function () {
            });
        }
        else {
            if (input[0] === "i") {
                var str2 = "İ" + input.slice(1)
            } else if (input[0] === "ö") {
                var str2 = "Ö" + input.slice(1)
            } else if (input[0] === "ü") {
                var str2 = "Ü" + input.slice(1)
            } else if (input[0] === "ı") {
                var str2 = "I" + input.slice(1)
            } else {
                var str2 = input.charAt(0).toUpperCase() + input.slice(1)
            }
            if (currentCities.includes(str2)) {
                setInputCities(inputCities => [...inputCities, str2]);
            } else {
                console.log("HATA")
            }
        }
        setInput("")
    }

    useEffect(() => {
        cities["features"].map((city) => currentCities.push((city.properties.name)))

    }, [inputCities, currentCities])



    return (
        <div>

            <Container>
                <Row className="d-flex justify-content-center">
                    <Col lg={4}>
                        <InputGroup  style={{ height: 48 }} className="my-5" onChange={onChange} onKeyDown={handleKeyDown}>
                            <Form.Control value={input}  />
                            <Button onClick={onSubmit} className="btn btn-dark">
                                <b>ADD</b>
                            </Button>

                        </InputGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center" >
                    <Col lg={4}>
                        <div className="mb-5">
                            <h2><b>{inputCities.length + "/" + cities["features"].length}</b></h2>
                        </div>
                    </Col>
                </Row>
            </Container>


            <MapContainer className='map' center={[39, 35]} zoom={6} scrollWheelZoom={false} zoomControl={false} dragging={false} >


                <GeoJSON data={cities}


                    style={(feature) => {
                        if (inputCities.includes(feature.properties.name)) {
                            return {
                                stroke: true,
                                color: 'green',
                                fill: true,
                                opacity: 1
                            }
                        } else {
                            return {
                                stroke: true,
                                color: 'red',
                                fill: true,
                                opacity: 0.3
                            }
                        }
                    }}
                />

            </MapContainer>
        </div>
    )
}




