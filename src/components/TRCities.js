import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet'
import { Row, Col, Container, Button, Form, InputGroup } from "react-bootstrap";
import { useStopwatch } from 'react-timer-hook';
import alertify from "alertifyjs";
import { cities } from '../JSON/cities'


export default function TRCities() {

    const { seconds, minutes, hours, start, pause, } = useStopwatch({ autoStart: false });
    const currentCities = []

    const [listCity, setListcity] = useState([])

    const [enteredCities, setEnteredCities] = useState(['Kırklareli', 'Tekirdağ', 'İstanbul', 'Kocaeli', 'Bolu', 'Düzce', 'Sakarya', 'Amasya', 'Giresun', 'Trabzon', 'Rize', 'Ordu', 'Artvin', 'Iğdır', 'Kars', 'Ardahan', 'Samsun', 'Kastamonu', 'Sinop', 'Zonguldak', 'Konya', 'Ankara', 'Eskişehir', 'Kütahya', 'Antalya', 'Denizli', 'Isparta', 'Diyarbakır', 'Afyon', 'Kilis', 'Hatay', 'Bitlis', 'Batman', 'Elazığ', 'Gümüşhane', 'Çanakkale', 'Balıkesir', 'Yalova', 'İzmir', 'Muğla', 'Aydın', 'Erzincan', 'Erzurum', 'Bayburt', 'Bartın', 'Karabük', 'Çankırı', 'Çorum', 'Kırşehir', 'Kayseri', 'Yozgat', 'Malatya', 'Mersin', 'Adana', 'Niğde', 'Nevşehir', 'Aksaray', 'Kırıkkale', 'Tunceli', 'Tokat', 'Sivas', 'Kahramanmaraş', 'Gaziantep', 'Şanlıurfa', 'Mardin', 'Siirt', 'Şırnak', 'Hakkari', 'Van', 'Bingöl', 'Muş', 'Ağrı', 'Adıyaman', 'Osmaniye', 'Karaman', 'Burdur', 'Manisa', 'Bursa', 'Bilecik', 'Uşak'])

    const [counter, setCounter] = useState(0)
    const [inputValue, setInputValue] = useState("")


    useEffect(() => {
        cities["features"].map((city) => setListcity(listCity => [...listCity,city.properties.name]))

        
    }, [])
    

    useEffect(() => {

        cities["features"].map((city) => currentCities.push((city.properties.name)))
        

    }, [enteredCities, currentCities,])


    const onChange = (e) => {
        setInputValue(e.target.value)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSubmit()
        }
    };

    const onSubmit = (e) => {
        if (counter == 0) {
            start()
        }
        setCounter(counter + 1)
        if (inputValue === "" || inputValue === "null") {
            alertify.alert("Error", "Please type something!", function () {
            });
        }
        else {
            if (inputValue[0] === "i") {
                var str2 = "İ" + inputValue.slice(1)
            } else if (inputValue[0] === "ö") {
                var str2 = "Ö" + inputValue.slice(1)
            } else if (inputValue[0] === "ü") {
                var str2 = "Ü" + inputValue.slice(1)
            } else if (inputValue[0] === "ı") {
                var str2 = "I" + inputValue.slice(1)
            } else {
                var str2 = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
            }
            if (currentCities.includes(str2) && enteredCities.includes(str2) === false) {
                setEnteredCities(enteredCities => [...enteredCities, str2]);
                console.log(enteredCities.length)
                if(enteredCities.length == 80){
                    alertify.alert("CONGRATULATIONS", `You finished in ${hours}:${minutes}:${seconds}`, function () {
                    });
                    pause()
                }
            } else if (enteredCities.includes(str2)) {
                alertify.alert("ERROR", `You already added ${str2}`, function () {
                });
            }
            else {
                console.log("HATA")
            }
        }
        setInputValue("")


    }


    return (
        <div>
            <Row className="d-flex">
                <h4 className='m-3'>Türkiye'nin İlleri</h4>
            </Row>
            <Row className="m-1">
                <Col lg={4}>
                    <InputGroup style={{ height: 32 }} className="" onChange={onChange} onKeyDown={handleKeyDown}>
                        <Form.Control value={inputValue} />
                        <Button onClick={onSubmit} className="btn btn-dark me-3">
                            <b>EKLE</b>
                        </Button>
                        <h4><b>{enteredCities.length + "/" + cities["features"].length} -- <span style={{ color: "red" }}>
                            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></span></b></h4>

                    </InputGroup>
                </Col>
            </Row>
            <Row className="d-flex" >
                <div className="m-3">
                </div>
            </Row>


            <MapContainer className='map' center={[39, 35]} zoom={6} scrollWheelZoom={false} zoomControl={false} dragging={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />
                <GeoJSON data={cities}
                    style={(feature, layer) => {

                        if (enteredCities.includes(feature.properties.name)) {
                            return {
                                color: 'green',
                                fillOpacity: 0.8,

                            }
                        } else {
                            return {
                                color: '#989898',
                                fillOpacity: 0.7,
                            }
                        }
                    }}
                />
            </MapContainer>
            <div className='wrapper mt-2'>
                {listCity.map((sCity) =>
                    (<div style={{visibility: enteredCities.includes(sCity) ? "visible" : "hidden",color: enteredCities.includes(sCity) ? "green" : "red",
                    fontWeight: enteredCities.includes(sCity) ? "bold" : "red"}}>{sCity}</div>))
                }
            </div>
        </div>
    )
}




