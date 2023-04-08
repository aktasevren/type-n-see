import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { cities } from '../JSON/cities'
import { Row, Col, Container, Button, Form, InputGroup } from "react-bootstrap";
import alertify from "alertifyjs";
import { useStopwatch } from 'react-timer-hook';




export default function MapCities() {
    const [inputCities, setInputCities] = useState([])
    const currentCities = []
    const [sayac, setSayac] = useState(0)

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });




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
        console.log(inputCities)

        if (sayac == 0) {
            start()
        }
        setSayac(sayac + 1)
        if (input === "" || input === "null") {
            alertify.alert("Error", "Please type something!", function () {
            });
        } else if (inputCities.length === 81) {
            alertify.alert("CONGRATULATIONS", "", function () {
            });
            pause()
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
            if (currentCities.includes(str2) && inputCities.includes(str2) === false) {
                setInputCities(inputCities => [...inputCities, str2]);
            } else if (inputCities.includes(str2)) {
                alertify.alert("ERROR", `You already added ${str2}`, function () {
                });
            }
            else {
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
                    <h2 className='mt-2'>Türkiye'nin İlleri</h2>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg={4}>
                        <InputGroup style={{ height: 48 }} className="my-2" onChange={onChange} onKeyDown={handleKeyDown}>
                            <Form.Control value={input} />
                            <Button onClick={onSubmit} className="btn btn-dark">
                                <b>ADD</b>
                            </Button>
                        </InputGroup>
                    </Col>
                    </Row>
                <Row className="d-flex justify-content-center" >
                    <Col lg={4}>
                        <div className="mb-2">
                            <h2><b>{inputCities.length + "/" + cities["features"].length}</b></h2>
                            <div style={{ fontSize: '48px' }}>
                                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            
                            {/* <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={reset}>Reset</button> */}
                        </div>
                    </Col>
                </Row>
            </Container>


            <MapContainer className='map' center={[39, 35]} zoom={6} scrollWheelZoom={false} zoomControl={false} dragging={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />

                <GeoJSON data={cities}


                    style={(feature) => {
                        if (inputCities.includes(feature.properties.name)) {
                            return {
                                color: 'green',
                                fillOpacity: 0.7,

                            }
                        } else {
                            return {
                                color: 'grey',
                                opacity: 1,
                            }
                        }
                    }}
                />

            </MapContainer>
        </div>
    )
}




