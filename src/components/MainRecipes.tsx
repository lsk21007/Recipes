import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ArticlesDB from '../assets/ArticlesDB'
import Articletype from '../typings/Articletype'
import More from './More'
import "./MainRecipes.css"

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
        <>
            <div className='container'>
                <div className='main-recipes-title'>
                    <h2 className='main-recipes-h2'>Today's Recommendations</h2>
                    <More></More>
                </div>
            </div>
            <Container>
                <Row xs={2} lg={3} xxl={4}>
                    {recipe.map((i,index) => {
                        return <Col key={index} className='col'>
                            <Card className='main-recipes-card'>
                                <Link to={`/recipes/${i.name}`}><Card.Img className='main-recipes-img' variant="top" src={`${i.url}?auto=compress&cs=tinysrgb&w=500`} /></Link>
                                <Card.Body>
                                    <Link to={`/recipes/${i.name}`}><Card.Title className='main-recipes-text'>{i.title}</Card.Title></Link>
                                    <Link to={`/chef/${i.author}`}><Card.Text className='main-recipes-text'>
                                        {`by: ${i.author}`}
                                    </Card.Text></Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>
        </ >
    )
}

export default MainRecipes