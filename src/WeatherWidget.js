import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    font-family: Arial, sans-serif;
    background-color: #f0f8ff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    margin: 10px;
    padding: 5px;
    font-size: 16px;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.p`
    color: red;
`;

const Result = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const WeatherWidget = () => {
    const [cidade, setCidade] = useState('');
    const [clima, setClima] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [iconeClima, setIconeClima] = useState(null);
    const [erro, setErro] = useState('');

    const apiKey = '4c78917d2b9c3068294a113e7a1d11c7';
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

    const handleBuscar = async () => {
        if (cidade.trim() !== '') {
            try {
                const response = await axios.get(`${baseUrl}?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`);
                const weatherData = response.data.weather[0];
                setClima(weatherData.description);
                setTemperatura(response.data.main.temp);
                setIconeClima(getWeatherIcon(weatherData.main));
                setErro('');
            } catch (error) {
                setErro('Não foi possível obter os dados climáticos.');
            }
        } else {
            setErro('Por favor, insira o nome de uma cidade.');
        }
    };

    const getWeatherIcon = (main) => {
        switch (main.toLowerCase()) {
            case 'clear':
                return <WiDaySunny size={50} />;
            case 'clouds':
                return <WiCloud size={50} />;
            case 'rain':
                return <WiRain size={50} />;
            case 'snow':
                return <WiSnow size={50} />;
            case 'thunderstorm':
                return <WiThunderstorm size={50} />;
            case 'fog':
            case 'mist':
            case 'haze':
                return <WiFog size={50} />;
            default:
                return <WiDaySunny size={50} />;
        }
    };

    return (
        <Container>
            <h1>Widget do Tempo</h1>
            <Input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Digite o nome da cidade"
            />
            <Button onClick={handleBuscar}>Buscar</Button>
            {erro && <ErrorMessage>{erro}</ErrorMessage>}
            {clima && (
                <Result>
                    {iconeClima}
                    <p>Clima: {clima}</p>
                    <p>Temperatura: {temperatura} °C</p>
                </Result>
            )}
        </Container>
    );
};

export default WeatherWidget;
