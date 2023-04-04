import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { cities } from '../JSON/cities'
import { Row, Col, Container, Button, Form, InputGroup } from "react-bootstrap";






export default function MapCities() {
    const [inputCities,setInputCities ] = useState([])
    const currentCities = []

    const [input,setInput] = useState("")

    const onChange = (e) => {
        setInput(e.target.value.toLowerCase())
      };

    const onSubmit = (e) => {
        console.log(input)
        setInputCities(inputCities => [...inputCities,input] );
    }

    useEffect(() => {
        
        cities["features"].map((city) => currentCities.push((city.properties.name.toLowerCase())))
        console.log(currentCities)
    }, [inputCities])




    return (
        <div>
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col lg={4}>
                        <InputGroup style={{ height: 48 }} className="my-5" onChange={onChange}>
                            <Form.Control placeholder="guess cities" />
                            <Button onClick={onSubmit}  className="btn btn-dark">
                                <b>ADD</b>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
            <MapContainer className='map' center={[40, 35]} zoom={6}>


                <GeoJSON data={cities}

                    style={(feature) => {
                        if (inputCities.includes(feature.properties.name.toLowerCase())) {
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
                                opacity: 0.1
                            }
                        }
                    }}
                />

            </MapContainer>
        </div>
    )
}




