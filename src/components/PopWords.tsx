import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import More from './More'
import burger from '../assets/svg/burger.svg'
import pizza from '../assets/svg/pizza.svg'
import salad from '../assets/svg/salad.svg'
import rice from '../assets/svg/rice.svg'
import noodle from '../assets/svg/noodle.svg'
import pasta from '../assets/svg/pasta.svg'
import dumpling from '../assets/svg/dumpling.svg'
import potato from '../assets/svg/potato.svg'
import beef from '../assets/svg/beef.svg'
import lamb from '../assets/svg/lamb.svg'
import pork from '../assets/svg/pork.svg'
import chicken from '../assets/svg/chicken.svg'

const arr: string[] = [burger, pizza, salad, rice, noodle, pasta, dumpling, potato, beef, lamb, pork, chicken]

const Wrapper = styled.div`
.grey{
    background-color:#F1F1F1;
    display:flex;
}
a{
    text-decoration:none
}
button{
    margin:10px;
}
img{
    width:80px;
    height:80px;
}
.text{
    font-size:15px;
    color:black;
    display:flex;
    justify-content:center;
}
.container{
    display:flex;
    justify-content:center;
}
.more{
    position:absolute;
    right:0;
    top:30%;
    font-weight:bold;
}
@media screen and (max-width:768px){
    .head{
      margin    :4%;
      display:flex;
      justify-content:center;
    }
    h2{
      font-size:20px;
      position:relative;
      margin:0
    }
  }
//   @media screen and (max-width:390px){
//     .grey{
//         width:95%
//     }
//   }
`

const Category: string[] = ['burger', 'pizza', 'salad', 'rice', 'noodle', 'pasta', 'dumpling', 'potato', 'beef', 'lamb', 'pork', 'chicken']

const PopWords: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [category, setCategory] = useState<string[]>(Category)
    const getWidth = () => {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        if (width > 1400) {
            setCategory(Category)
        } else if (width < 1400) {
            setCategory(() => Category.slice(0, 8))
        }
        window.addEventListener('resize', getWidth);
        return () => window.removeEventListener('resize', getWidth)
    }, [width])

    return (
        <Wrapper>
            <div className='head' style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <h2>
                    Popular Ingredients
                </h2>
                <More></More>
            </div>
            <div className="grey">
                <Container style={{ marginBottom: '20px' }}>
                    <Row xs={2} sm={4} lg={4} xxl={6}>
                        {category.map((i, index) => {
                            return <Col style={{ marginTop: '20px' }} key={index} className='col'>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Link to={`/search/${i}`}><img src={arr[index]} alt={i}></img></Link>
                                </div>
                                <Link to={`/search/${i}`}><div className='text'>{i}</div></Link>
                            </Col>
                        })}
                    </Row>
                </Container>
            </div>
        </Wrapper >
    )
}

export default PopWords