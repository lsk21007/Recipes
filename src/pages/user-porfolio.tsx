import React from 'react'
import loginType from '../typings/UserToken';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import person from "../assets/svg/person.svg"
import "./user-porfolio.css"

interface props {
    login: loginType
}

const Wrapper = styled.div`

`
const User: React.FC<props> = ({ login }) => {

    return (<Wrapper>
        <Container>
            <div id='user-porfolio-center' style={{ margin: '30px 0 40px' }}>
                <div>
                    <img className='user-porfolio-photo' src={person} alt={login.username} />
                    <div className='user-porfolio-text'>
                        {login.username}
                    </div>
                    <div id='user-porfolio-center'>
                        <div className="user-porfolio-post">Recipes: 0  |  Following: {login.follow === undefined ? 0 : login.follow.length}</div>
                    </div>
                </div>
                <div id='user-porfolio-center' className="user-porfolio-info"></div>
            </div>
            <div id='user-porfolio-center'>
                <div>
                    <h2 className="user-porfolio-recipes">
                        Recipes
                    </h2>
                    <div id='user-porfolio-center' style={{ height: '350px', alignItems: 'center' }} className="user-porfolio-recipe">
                        Empty
                    </div>
                </div>
            </div>
        </Container>
    </Wrapper>
    )
}

export default User