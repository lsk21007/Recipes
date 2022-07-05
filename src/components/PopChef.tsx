import React from 'react'
import Chef from '../assets/Chef'
import Button from './Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
.profile{
    display:flex;
    margin-bottom:18px;
}
.chefPhoto{
    width:60px;
    border-radius:8px;
    margin-right:10px
}
.button{
    margin-left:20px;
    align-items:center;
    display:flex;
}
.text-container{
    width:150px
}
#text{
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
}
.name:hover{
    color:grey;
}
.profile a{
    color:black;
    text-decoration:none
}
.more{
    text-decoration:none;
    position:absolute;
    right:0;
    top:30%;
    font-weight:bold;
}
`

const PopChef: React.FC = () => {
    return (
        <Wrapper>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <h2>Popular Chef</h2>
            </div>
            <div>
                {Chef.map((i, index) => {
                    return <div key={index} className='profile'>
                        <Link to={`/chef/${i.name}`}><img className='chefPhoto' src={i.photo} alt={i.name} /></Link>
                        <div className='text-container'>
                            <Link to={`/chef/${i.name}`}><div id='text' style={{ fontSize: '20px' }} className='name'>{i.name}</div></Link>
                            <div id='text' style={{ fontSize: '15px' }}>{i.phrase}</div>
                        </div>
                        <Link to={`/chef/${i.name}`} className='button'>
                            <Button content='Know more'></Button>
                        </Link>
                    </div>
                })}
            </div>
        </Wrapper >
    )
}

export default PopChef