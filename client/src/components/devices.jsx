import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDevice } from '../redux/actions/playerActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop } from '@fortawesome/free-solid-svg-icons'
const axios = require('axios');
const Devices = () => {
    const dispatch = useDispatch();
    const currentDevice = useSelector(state => state.player.device)
    const [devices, setDevices] = useState([])

    const toggleMenu = (e) => {
        (!document.getElementById('myDropdown').classList.contains('show')) ? document.getElementById('myDropdown').classList.add('show') : document.getElementById('myDropdown').classList.remove('show')
    }
    useEffect(() => {
        (async () => {
            try {
                const devices = await axios.get('/devices')
                setDevices(devices.data)
            } catch (e) {
                console.error(e)
            }
        })();
    }, [])

    useEffect(() => {
        console.log(currentDevice)
    }, [currentDevice])
    return (
        <div className="player_primary__right">
            <button className="player_primayer__shuffle dropbtn" onClick={(toggleMenu)}>
                <FontAwesomeIcon icon={faDesktop} size="1x" />
            </button>
            <div id="myDropdown" className="dropdown-content">
                <div className="dropdown-content__current-device">
                    <FontAwesomeIcon icon={faDesktop} size="2x" />
                    <div className="dropdown-content__current-device__details">
                        <h3>Current Device</h3>
                        {devices.length > 0 ? (currentDevice != "" ? <p className="dropdown-content__current-device__details--current_device">{currentDevice.device}</p> : null) : null}
                    </div>
                </div>
                <p>Select Another Device</p>
                {devices.map(e => {
                    return (
                        <div className="dropdown-content__deviceList" onClick={() => dispatch(setDevice({ device: e.name, id: e.id }))}>
                            <FontAwesomeIcon icon={faDesktop} size="1x" />
                            <span key={e.id}>{e.name}</span>
                        </div>
                    )
                })}
            </div>
        </div >


    )
}

export default Devices