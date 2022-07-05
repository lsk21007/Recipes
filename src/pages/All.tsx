import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  .top{
    display:flex;
    justify-content:center;
    margin:20px;
  }
  #center{
    display:flex;
    justify-content:center;
    margin-top:20px
  }
  .container{
    margin:0;
    max-width:1990px;
  }
  .title{
    font-size:20px;;
    font-weight:bold;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
  }
  .content{
    // white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
    height:50px;
  }
  img{
    width:100%;
    height:180px;
    object-fit: cover;
  }
  .dish{
    margin-bottom:10px
  }
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
    font-weight:bold
}
#center{
  display:flex;
  justify-content:center;
  margin-top:20px
}
a{
  text-decoration:none
}
`

const All: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [Api, setApi] = useState<any>('loading');

  useEffect(() => {
    window.addEventListener('resize', () => { setWidth(window.innerWidth) })
    return window.removeEventListener('resize', () => { setWidth(window.innerWidth) })
  }, [width])

  useEffect(() => {
    const getApi = async () => {
      const data = await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=all&app_id=006d11be&app_key=aaa1a3965137ad834716ac628a6e6a31%09&random=true');
      const res = await data.json();
      setApi(res.hits.slice(0, 18));
    }
    window.scrollTo(0, 0);
    getApi();
  }, []);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div>
      {Api === 'loading' ? <div style={{ width: '100%', height: '810px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img style={{ width: '300px', height: '150px', objectFit: 'cover' }} src='https://www.gurujitips.in/wp-content/uploads/2017/06/reduce-bounce-rate-loading-gif.gif' alt='loading'></img></div> : <Wrapper>
        <h2 id='center'>All Recipes</h2>
        <div className="top">
          <Container className='container'>
            <Row xs={2} md={4} xxl={6}>
              {width > 1399 ? Api.map((i: any, index: number) => {
                return <div key={index} className="dish">
                  <Link to={`/recipes/${i.recipe.label}`}><img src={i.recipe.image} alt={i.recipe.label}></img></Link>
                  <div className="text-container">
                    <Link to={`/recipes/${i.recipe.label}`}><div style={{ color: 'black' }} className="title">{i.recipe.label}</div></Link>
                    <Link to={`/recipes/${i.recipe.label}`}><div style={{ color: 'black' }} className='content'>{i.recipe.ingredientLines[0]}</div></Link>
                  </div>
                </div>
              }) : Api.slice(0, 16).map((i: any, index: number) => {
                return <div key={index} className="dish">
                  <img src={i.recipe.image} alt={i.recipe.label}></img>
                  <div className="text-container">
                    <div className="title">{i.recipe.label}</div>
                  </div>
                </div>
              })}
            </Row>
            <div id='center' style={{ margin: 0 }}>
              <button onClick={refreshPage}>
                <div className="text">
                  REFRESH
                </div>
              </button>
            </div>
          </Container>
        </div>
      </Wrapper>}
    </div>

  )
}

export default All