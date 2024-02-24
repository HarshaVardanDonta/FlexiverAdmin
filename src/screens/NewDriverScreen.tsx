import './NewDriverScreen.css';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import DriverDetails from '../Model/DriverDetailsModel';
import { Typography } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { ButtonGroup } from 'react-bootstrap';


const supabase = createClient('https://tnfeykqptcbbabeuwwxn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZmV5a3FwdGNiYmFiZXV3d3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MDYxMTYsImV4cCI6MjAyMzM4MjExNn0.Y5FPy2jo_vo1ZjRFn9LkAyPMyItAKid_VSqkEkuHeqU')


export default function NewDriverScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [drivers, setDrivers] = useState<DriverDetails[]>([]);
    async function fetchDrivers() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('DriverDetails')
                .select('*')
            if (data !== null) {
                data.forEach((driver) => {
                    const driverDetails = new DriverDetails();
                    driverDetails.fromJson(driver);
                    setDrivers([...drivers, driverDetails]);
                });
                console.log(drivers);
            }
            if (error) {
                console.error('Error fetching drivers', error);
            } else {
                setDrivers(data);
            }
        } catch (error) {
            console.error('Error fetching drivers', error);
        } finally {
            setLoading(false);
        }
    }

    const init = useEffect(() => {
        fetchDrivers();
    }, []);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            {
                loading ?
                    <div className='loading'>
                        <div className='loadingAnimation'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>'
                        </div>
                        Fetching Drivers...
                    </div>
                    :
                    error ?
                        <div>
                            Error fetching drivers
                        </div>
                        :
                        drivers.length === 0 ?
                            <div>
                                No drivers found
                            </div>
                            :
                            <div>
                                <h1>Drivers</h1>
                                <div className='driversContainer'>
                                    {drivers.map((driver, driverIndex) => {
                                        return (
                                            <div className='driverCard' key={driverIndex}
                                                style={{
                                                    backgroundColor: driver.isVerified === true ? 'green' : driver.rejectionReason !== null ? 'red' : 'white',
                                                    color: driver.isVerified === true ? 'white' : driver.rejectionReason !== null ? 'white' : 'black',
                                                }}
                                            >
                                                <div>
                                                    Name: {driver.firstName} {driver.lastName}
                                                </div>
                                                Email: {driver.email}<br />
                                                Mobile: {driver.mobileNo}<br />
                                                AbnNo: {driver.aBNNo}<br />
                                                SubUrb: {driver.subUrb}<br />
                                                City: {driver.city}<br />
                                                Availability: {driver.availability}<br />
                                                canYouLiftAndGroove: {driver.canYouLiftAndGroove}<br />
                                                FlexerTale: {driver.flexerTale}<br />
                                                FlexerStyle: {driver.flexerStyle}<br />
                                                LastDanceMove:{driver.lastDanceMove}<br />
                                                VehicleType: {driver.vehicleType}<br />
                                                VehicleModel: {driver.vehicleModel}<br />
                                                VehicleMake: {driver.vehicleMake}<br />
                                                VehicleYear: {driver.vehicleYear}<br />
                                                <br />
                                                <div className='driverCardButtonContainer'>
                                                    <Button sx={
                                                        {
                                                            backgroundColor: 'green',
                                                        }
                                                    }
                                                        onClick={async () => {
                                                            if (driver.isVerified === true) return alert('Driver already verified');
                                                            const data = await supabase.from('DriverDetails').update(
                                                                {
                                                                    isVerified: true,
                                                                    rejectionReason: null,
                                                                }
                                                            ).eq('id', driver.id);
                                                            console.log(data);
                                                            if (data.status === 204) {
                                                                alert('Driver Verified');
                                                            } else {
                                                                alert('Error Verifying Driver');
                                                            }
                                                            setLoading(true);
                                                            fetchDrivers();
                                                        }}
                                                        variant="contained" color="primary">Accept</Button>
                                                    <div>
                                                        <Dropdown as={ButtonGroup}>
                                                            <Button style={
                                                                {
                                                                    backgroundColor: 'red',
                                                                    borderColor: 'red',
                                                                    color: 'white',
                                                                }
                                                            }>
                                                                REJECT
                                                            </Button>
                                                            <Dropdown.Toggle
                                                                style={
                                                                    {
                                                                        backgroundColor: 'red',
                                                                        borderColor: 'red',
                                                                    }
                                                                }
                                                                id="Reject-drop">

                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu style={
                                                                {
                                                                    backgroundColor: 'red',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                }
                                                            }>
                                                                {
                                                                    ['reason1', 'reason2', 'reason3', 'reason4', 'reason5'].map((reason, index) => {
                                                                        return (
                                                                            <Dropdown.Item
                                                                                style={
                                                                                    {
                                                                                        backgroundColor: 'red',
                                                                                        color: 'white',
                                                                                        padding: '10px',
                                                                                    }
                                                                                }
                                                                                key={index}
                                                                                onClick={async () => {
                                                                                    if (driver.rejectionReason !== null) {
                                                                                        alert('Driver already rejected');
                                                                                    } else {
                                                                                        const data = await supabase.from('DriverDetails').update(
                                                                                            {
                                                                                                isVerified: false,
                                                                                                rejectionReason: reason,
                                                                                            }
                                                                                        ).eq('id', driver.id);
                                                                                        console.log(data);
                                                                                        if (data.status === 204) {
                                                                                            alert('Driver Rejected');
                                                                                        } else {
                                                                                            alert('Error Rejecting Driver');
                                                                                        }
                                                                                        setLoading(true);
                                                                                        fetchDrivers();
                                                                                    }

                                                                                }}>{reason}</Dropdown.Item>
                                                                        );
                                                                    })
                                                                }
                                                            </Dropdown.Menu>
                                                        </Dropdown>

                                                    </div>
                                                </div>


                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
            }
        </>
    );
}