import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PopChef from './PopChef'
import PopWords from './PopWords'
import PopDishes from './PopDishes'

const Wrapper = styled.div`
.inside{
    display:flex;
    margin:1.5%;
    position:relative;
    margin-bottom:0px;
    justify-content:center
}
h2{
    margin-bottom:20px
}
.right{
    position:relative;
}
.left{
    margin-right:30px
}
@media screen and (max-width:768px){
    h2{
        margin-bottom:0
    }
}
`

const PopArea: React.FC = () => {

    const [width, setWidth] = useState<number>(window.innerWidth);

    const getWidth = () => {
        setWidth(() => window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', getWidth)
        return () => window.removeEventListener('resize', getWidth)
    })
    return (
        <Wrapper>
            <div className="container">
                <div className="inside">
                    {width > 992 ? <div className='left'>
                        <PopWords />
                        <PopDishes />
                    </div> : <div style={{marginRight:0}}>
                        <PopWords />
                        <PopDishes />
                    </div>}
                    {width > 992 && <div className="right">
                        <PopChef />
                    </div>}
                </div>
            </div>
        </Wrapper >
    )
}

export default PopArea