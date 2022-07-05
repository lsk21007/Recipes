import React, { useEffect, useState } from 'react'   //rafce
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Button from '../components/Button';
import person from '../assets/svg/person.svg'
import { Hit } from '../typings/ApiType';
import Banner from '../components/Banner';

const Wrapper = styled.div`
    .top{
        display: flex;
        justify-content: center;
        flex-flow: wrap;
        margin-top: 30px;
    }
    .title{
        display:flex;
        margin:20px;
        margin-left:0
    }
    .sidebar{
        padding:30px;
        width:20%;
        padding-top:0;
        height:1000px;
    }
    .img{
        width:500px;
        height:350px;
        border-radius:15px;
        object-fit: cover;
    }
    .step{
        width:150px;
        height:100px;
        border-radius:15px;
        object-fit: cover;
        margin-right:10px;
    }
    .small-container{
        width:300px
    }
    .comment{
        width:100%;
        margin:10px 0 10px 0;
    }
    textarea{
        width:80%;
        height:100px;
        padding:8px;
        border-radius:10px 0 0 10px;
    }
    .button{
        width:100px;
        height:100px;
        border-radius:0 10px 10px 0;
        background-color:black;
        color:white;
        font-weight:bold;
        border-color:black
    }
    .button:hover{
        background-color:grey;
        color:black;
    }
    .step-container{
        display: flex;
        justify-content: left;
        margin: 10px 10px 10px 0
    }
    @media screen and (max-width:576px){
        .top{
            margin-top: 20px;
        }
        .img{
            border-radius:0;
            width:100%;
            height:200px;
            object-fit: cover;
        }
        .title{
          font-size:20px;
          display:flex;
          justify-content:center;
          margin-left:20px;
        }
        p{
            width:100%
        }
        .small-container{
            width:200px
        }
        .step{
            width:60%;
            margin-left:0;
        }
        textarea{
            width:80%;
        }
        .step-container{
            margin: 10px
        }
        .comment-container{
            margin: 10px
        }
    }
`

const Recipe: React.FC = () => {
    const { item } = useParams();
    const [recipe, setRecipe] = useState<any>('loading');
    const [recipes, setRecipes] = useState<any>('loading');
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<{ comment: string, time: string }[]>([])
    const [width, setWidth] = useState<number>(window.innerWidth);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    };

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        const time = new Date().toLocaleDateString();
        setComments((prev: { comment: string, time: string }[]) => [...prev, { comment: comment, time: time }]);
        setComment('')
    };


    useEffect(() => {
        const getApi = async () => {
            const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=006d11be&app_key=aaa1a3965137ad834716ac628a6e6a31%09`)
            const res = await data.json()
            setRecipe(res.hits[0].recipe)
            setRecipes(res.hits.slice(0, 10))
        }
        getApi()
    }, [item])

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('resize', () => setWidth(window.innerWidth))
        return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
    }, []);

    return (<div>
        <Banner/>
        {recipe === 'loading' ? <div style={{ width: '100%', height: '810px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img style={{ width: '300px', height: '150px', objectFit: 'cover' }} src='https://www.gurujitips.in/wp-content/uploads/2017/06/reduce-bounce-rate-loading-gif.gif' alt='loading'></img>
        </div> : <Wrapper>
            <div className='top'>
                <div>
                    <img className='img' src={recipe.image} alt={item}></img>
                    <h2 className='title'>{item}</h2>
                    {recipe.ingredients.map((i: { image: string, text: string }, index: number) => {
                        return <div key={index} className='step-container'>
                            <img className='step' src={i.image} alt={i.text}></img>
                            <div className='small-container'>
                                <h5 style={{ marginTop: '5px' }}>Step: {index + 1}</h5>
                                <p>{i.text}</p>
                            </div>
                        </div>
                    })}
                    <div className='comment-container'>
                        <h2 className='comment'>Comment</h2>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <textarea onChange={handleChange} value={comment} placeholder='comment'></textarea>
                            <button onClick={handleClick} className="button">Submit</button>
                        </div>
                        {comments.map((i: { time: string, comment: string }) => {
                            return <div style={{ display: 'flex', marginBottom: '10px' }} key={i.time}>
                                <img style={{ width: '45px', marginRight: '5px' }} src={person} alt='person'></img>
                                <div>
                                    <div>{i.time}</div>
                                    <div style={{ fontWeight: 'bold' }}>{i.comment}</div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                {width > 768 && <div className='sidebar'>
                    <h2>Related Dishes</h2>
                    {recipe === 'loading' ? null : <div>
                        {recipes.map((i: Hit, index: number) => <div key={index} style={{ marginBottom: '20px' }}>
                            <Link to={`/search/${i.recipe.label}`}>
                                <Button content={i.recipe.label}></Button>
                            </Link>
                        </div>
                        )}
                    </div>}
                </div>}
            </div>
        </Wrapper >
        }</div>
    )
}

export default Recipe