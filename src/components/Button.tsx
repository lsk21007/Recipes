import React from 'react'
import styled from 'styled-components'


interface prop {
    content: string;
}

const Wrapper = styled.div`
    button{
        height:30px;
        border-width:1px;
        border-radius:5px;
        border-color:grey;
        background-color:white;
    }
    button .text{
        margin-left:10px;
        margin-right:10px;
    }
    button:hover{
        background-color:black;
        color:white
    }
    .text{
        max-width:300px;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis; 
    }
`

const Button: React.FC<prop> = ({ content }) => {
    return (
        <Wrapper>
            <button>
                <div className="text">
                    {content}
                </div>
            </button>
        </Wrapper>
    )
}

export default Button