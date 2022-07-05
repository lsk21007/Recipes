import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ArticlesDB from '../assets/ArticlesDB'
import Articletype from '../typings/Articletype'
import More from './More'

const Wrapper = styled.div`
.col{
    display:flex;
    justify-content:center;
}
.title{
    position:relative;
}
.more{
    position:absolute;
    top:35%;
    right:20px;
    font-weight:bold;
}
a{
    text-decoration:none;
}
.img{
    height:180px;
    width:286px;
    object-fit: cover;
}
.text{
    color:black;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
}
.text:hover{
    color:grey;
}
@media screen and (max-width:768px){
    .col{
        padding:2px
    }
    h2{
        font-size:20px;
        position:relative;
        display:flex;
        justify-content:center;
        margin:2%;
    }
    .more{
        top:0
    }
    .img{
        max-width:100%;
    }
    .text{
        font-size:80%
    }
    .card{
        margin-bottom:5px;
    }
}
@media screen and (min-width:500px){
    h2{
        margin:1%;
    }
    .card{
        width:18rem;
        box-shadow:3px 3px 5px #C5C5C5;
        margin-bottom:10px
    }
}
`

const MainRecipes: React.FC = () => {
    const [recipe, setRecipe] = useState<Articletype[]>(ArticlesDB)
    const [width, setWidth] = useState<number>(window.innerWidth);
    const getWidth = (): void => {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', getWidth)
        return () => window.removeEventListener('resize', getWidth)
    }, [width])

    useEffect(() => {
        if (width > 1400) {
            setRecipe((prev) => prev.slice(0, 8))
        }
        else if (width < 1400 && width > 992) {
            setRecipe(ArticlesDB)
        } else {
            setRecipe((prev) => prev.slice(0, 8))
        }
    }, [width])

    return (
        <Wrapper>
            <div className='container'>
                <div className='title'>
                    <h2>Today's Recommendations</h2>
                    <More></More>
                </div>
            </div>
            <Container>
                <Row xs={2} lg={3} xxl={4}>
                    {recipe.map((i,index) => {
                        return <Col key={index} className='col'>
                            <Card className='card'>
                                <Link to={`/recipes/${i.name}`}><Card.Img className='img' variant="top" src={`${i.url}?auto=compress&cs=tinysrgb&w=500`} /></Link>
                                <Card.Body>
                                    <Link to={`/recipes/${i.name}`}><Card.Title className='text'>{i.title}</Card.Title></Link>
                                    <Link to={`/chef/${i.author}`}><Card.Text className='text'>
                                        {`by: ${i.author}`}
                                    </Card.Text></Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>
        </Wrapper >
    )
}

export default MainRecipes