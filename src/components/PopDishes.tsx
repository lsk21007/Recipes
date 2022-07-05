import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import More from './More';
import DishesDB from '../assets/DishesDB';
import Articletype from '../typings/Articletype';

const Wrapper = styled.div`
h2{
  margin-top:2%;
}
.dish{
  display:flex;
  margin-bottom:20px;
  padding-left:0;
}
.text-container{
  margin-left:10px;
  display:block;
  margin-top:5px;
}
#text{
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  color:black;
  width:300px;
}
.content{
  // white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  color:black;
  height:40px;
}
img{
  border-radius:10px;
  width:120px;
  height:100px;
  object-fit: cover;
}
.title{
  font-size:20px;
  font-weight:bold;
  margin-bottom:5px;
}
a{
  text-decoration:none;
}
.head{
  display:flex;
  align-items:center;
  position:relative;
}
.more{
  text-decoration:none;
  position:absolute;
  right:0;
  top:40%;
  font-weight:bold;
}
@media screen and (max-width:1400px){
  #text{
    width:230px
  }
}
@media screen and (max-width:1200px){
  #text{
    width:150px
  }
}
@media screen and (max-width:992px){
  #text{
    width:200px
  }
  .more{
    top:0;
  }
  .head{
    position:relative;
  }
}
@media screen and (max-width:768px){
  #text{
    width:130px
  }
  .head{
    margin:4%;
    display:flex;
    justify-content:center;
  }
  h2{
    font-size:20px;
    position:relative;
    margin:0
  }
}
@media screen and (max-width:576px){
  #text{
    width:220px
  }
}
`

const PopDishes: React.FC = () => {

  return (
    <Wrapper>
      <div className='head'>
        <h2>
          Everyone's Dishes
        </h2>
        <More></More>
      </div>
      <Container>
        <Row xs={1} sm={2}>
          {DishesDB.map((i: Articletype, index: number) => {
            return <div key={index} className="dish">
              <Link to={`/recipes/${i.name}`}><img src={i.url} alt={i.title} /></Link>
              <div className="text-container" >
                <Link to={`/recipes/${i.name}`}><div id='text' className="title">{i.title}</div></Link>
                <Link to={`/recipes/${i.name}`}><div className='content' style={{ height: '20px' }}>{i.content}</div></Link>
              </div>
            </div>
          })}
        </Row>
      </Container>
    </Wrapper>
  )
}

export default PopDishes