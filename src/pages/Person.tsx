import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Chef from '../assets/Chef'
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import ArticlesDB from '../assets/ArticlesDB';
import Articletype from '../typings/Articletype';

const Wrapper = styled.div`
    #center{
        display:flex;
        justify-content:center;
        color:black;
    }
    .photo{
        border-radius:50%;
        width:300x;
        height:300px
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
const Person: React.FC = () => {
    const [chef, setChef] = useState<{ name: string, photo: string, phrase: string }[]>(Chef);
    const [article, setArticle] = useState<Articletype[]>(ArticlesDB)
    const { name } = useParams();

    useEffect(() => {
        setChef((prev: { name: string, photo: string, phrase: string }[]) => { return prev.filter((i: { name: string, photo: string, phrase: string }) => { return i.name === name }) })
        setArticle((prev: Articletype[]) => { return prev.filter((i: Articletype) => { return i.author === name }) })
    }, [name])


    return (<Wrapper>
        <Container>
            <div id='center' style={{ margin: '30px 0 40px' }}>
                <div>
                    <img className='photo' src={chef[0].photo} alt={chef[0].name} />
                    <div className='text'>
                        {chef[0].name}
                    </div>
                    <div id='center'>
                        <div className="post">Recipes: 1  |  Following: 0</div>
                    </div>
                </div>
                <div id='center' className="info"></div>
            </div>
            <div id='center'>
                <div>
                    <h2 className="recipes">
                        Recipes
                    </h2>
                    {article.length !== 0 ? <div className='recipe-container'>
                        <div className='card'>
                            <Link to={`/recipes/${article[0].name}`}><img className='dish' alt={article[0].name} src={`${article[0].url}?auto=compress&cs=tinysrgb&w=300`}></img></Link>
                            <div>
                                <Link to={`/recipes/${article[0].name}`}><h2 id='center' style={{ margin: '5px 0 0 0' }}>{article[0].name}</h2></Link>
                                <Link to={`/recipes/${article[0].name}`}><p id='center'>{article[0].title}</p></Link>
                            </div>
                        </div></div> :
                        <div id='center' style={{ height: '350px', alignItems: 'center' }} className="recipe">
                            Empty
                        </div>}
                </div>
            </div>
        </Container>
    </Wrapper>
    )
}

export default Person