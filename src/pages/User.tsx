import React from 'react'
import loginType from '../typings/UserToken';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import person from "../assets/svg/person.svg"

interface props {
    login: loginType
}

const Wrapper = styled.div`
    #center{
        display:flex;
        justify-content:center;
        color:black;
    }
    .photo{
        border-radius:50%;
        width:300x;
        height:300px;
        background-color:white;
    }
    .info{
        position:absolute;
        width:800px;
        height:28%;
        border:3px solid;
        margin-top:150px;
        z-index: -1;
    }
    .text{
        display:flex;
        justify-content:center;
        padding:10px 10px 0 10px;
        font-size:40px;
        font-weight:bold
    }
    .recipes{
        width:800px;
        font-size:30px;
        font-weight:bold;
        margin-bottom:20px
    }
    .card{
        width:300px;
        margin-bottom:30px
    }
    a{
        text-decoration:none
    }
    .dish{
        width:299px;
        height:200px;
        object-fit: cover;
    }
    @media screen and (max-width:992px){
        .info{
            width:400px
        }
        .recipes{
            width:400px
        }
    }
    @media screen and (max-width:576px){
        .info{
            width:350px;
            height:170px
        }
        .recipes{
            width:350px
        }
        .recipe-container{
            display:flex;
            justify-content:center;
            margin-bottom:40px
        }
        .photo{
            width:200px;
            height:200px;
        }
    }
`
const User: React.FC<props> = ({ login }) => {

    return (<Wrapper>
        <Container>
            <div id='center' style={{ margin: '30px 0 40px' }}>
                <div>
                    <img className='photo' src={person} alt={login.username} />
                    <div className='text'>
                        {login.username}
                    </div>
                    <div id='center'>
                        <div className="post">Recipes: 0  |  Following: {login.follow === undefined ? 0 : login.follow.length}</div>
                    </div>
                </div>
                <div id='center' className="info"></div>
            </div>
            <div id='center'>
                <div>
                    <h2 className="recipes">
                        Recipes
                    </h2>
                    <div id='center' style={{ height: '350px', alignItems: 'center' }} className="recipe">
                        Empty
                    </div>
                </div>
            </div>
        </Container>
    </Wrapper>
    )
}

export default User