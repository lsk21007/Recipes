import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ArticlesDB from '../assets/ArticlesDB'

const Wrapper = styled.div`
    img{
        width:100%;
        height:600px;
        object-fit: cover;
        object-position: 50% 60%;
    }
    h1{
        position:absolute;
        font-size:80px;
        top:200px;
        color:white;
        left:20px;
        text-shadow:2px 2px 5px black;
        width:85%;
    }
    a{
        text-decoration:none;
        height:10px;
        position:relative;  //important
    }
    @media screen and (max-width: 1325px) {
        h1{
            font-size:60px;
            top:220px;
        }
    }
    @media screen and (max-width: 980px) {
        h1{
            font-size:40px;
            top:250px;
        }
    }
    @media screen and (max-width: 670px) {
        img{
            width:100%;
            height:250px;
            object-fit: cover;
        }
        h1{
            top: 95px;
            left:10px;
            font-size:25px; 
        }
    }
`

const Section: React.FC = () => {
    const num = Math.floor(Math.random() * 9);
    return (
        <Wrapper>
            <Link to={`/recipes/${ArticlesDB[num].name}`}>
                <img src={`${ArticlesDB[num].url}?auto=compress&cs=tinysrgb&w=1500`} alt='add it later' />
                <h1>{ArticlesDB[num].title}</h1>
            </Link>
        </Wrapper>
    )
}

export default Section