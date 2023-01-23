import React, { useEffect, useState } from 'react'
import Wanted from '../assets/svg/wanted.svg'
import "./Banner.css"

const Banner: React.FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth))
        return window.removeEventListener('resize', () => setWidth(window.innerWidth))
    }, [width])

    return (
        <div onClick={() => window.location.assign('https://lsk21007.github.io/Portfolio/')}>
            <div className='container banner-top'>
                <div className="banner-title banner-center">
                    "Better Call Liu"
                </div>
                <div className='banner-center'>
                    <div className='banner-middle' style={{ position: 'absolute' }}>
                        Shukun Liu
                    </div>
                </div>
                <div className='banner-center' style={{ marginTop: '12px', color: 'black', fontWeight: 'bold' }}>
                    Front-End Developer
                </div>
                {width > 767 && <img src={Wanted} className="banner-back" style={{ top: '5px' }}></img>}
            </div>
            <div className='container banner-bottom banner-center'>
                Click To Read My CV
            </div>
        </div>
    )
}

export default Banner