import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
.text{
    color:white;
    height:50px;
    display:flex;
    align-items:center;
    justify-content:center
}
`

const Footer:React.FC = () => {

    return (
        <Wrapper className='top' style={{backgroundColor:'#242424'}}>
            <div className='text'>Lawrence's Project | 2022</div>
        </Wrapper>
    )
}

export default Footer