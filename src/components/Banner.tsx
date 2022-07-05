import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Wanted from '../assets/svg/wanted.svg'

const Wrapper = styled.div`
    .center{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .title{
        font-size:40px;
        font-weight:bold;
        text-shadow: 2px 2px grey;
    }
    .middle{
        font-size: 25px;
        font-weight:bold;
        -webkit-text-stroke: 1px #C70039
    }
    .top{
        background-color:#FFC300;
        color:#ECECEC;
        height:100px;
        margin-top:15px;
        position:relative;
        border-style:solid solid none solid;
        border-color:black;
        cursor:pointer
    }
    .bottom{
        background-color:#C70039;
        font-size: 20px;
        height:30px;
        color:#ECECEC;
        font-weight:bold;
        border-style:none solid solid solid;
        border-color:black;
        cursor:pointer;
    }
    .back{
        position:absolute;
        right:40px;
        width:80px;
        margin:5px
    }
`

const Banner: React.FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth))
        return window.removeEventListener('resize', () => setWidth(window.innerWidth))
    }, [width])

    return (
        <Wrapper onClick={() => window.location.assign('https://lsk21007.github.io/Portfolio/')}>
            <div className='container top'>
                <div className="title center">
                    "Better Call Liu"
                </div>
                <div className='center'>
                    <div className='middle' style={{ position: 'absolute' }}>
                        Shukun Liu
                    </div>
                </div>
                <div className='center' style={{ marginTop: '12px', color: 'black', fontWeight: 'bold' }}>
                    Front-End Developer
                </div>
                {width > 767 && <img src={Wanted} className="back" style={{ top: '5px' }}></img>}
            </div>
            <div className='container bottom center'>
                Click To Read My CV
            </div>
        </Wrapper>
    )
}

export default Banner