import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  div{
    font-size:70px
  }
  @media screen and (max-width:840px){
    div{
      font-size:40px
    }
  }
  @media screen and (max-width:470px){
    div{
      font-size:30px
    }
  }
`

const Error: React.FC = () => {
  return (
    <Wrapper>
      <div style={{ height: '87vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>404 | Recipe Not Found</div>
    </Wrapper>
  )
}

export default Error