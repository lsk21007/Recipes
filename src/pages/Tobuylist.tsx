import React, { useEffect, useReducer, useState } from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import BACK from '../assets/svg/BACK.svg'
import DELETE from '../assets/svg/DELETE.svg'
import CLICK from '../assets/svg/CLICK.svg'
import loginType from '../typings/UserToken';
import Banner from '../components/Banner';
import axios from 'axios'

const Wrapper = styled.div`
  #center{
    display:flex;
    justify-content:center;
    align-items:center
  }
  .area{
    margin:40px;
  }
  input{
    width:500px;
    height:40px;
    padding:3px;
    border-radius:5px;
    margin:10px;
  }
  .button{
    background-color:black;
    border-radius:5px;
    height:40px;
    color:white;
    width:80px;
  }
  .button:hover{
    font-weight:bold
  }
  p{
    margin:0;
  }
  img{
    width:30px
  }
  #box{
    padding:5px;
    margin-bottom:0;
  }
  .nav{
    border:none;
    font-weight:bold;
    margin:8px 5px 8px 5px;
    padding:1px 10px 1px 10px;
    font-size:20px;
    // background-color:grey
  }
  hr{
    margin:0 0 5px 0
  }
  h4{
    margin-right:10%;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
  }
  @media screen and (max-width:768px){
    input{
      width:300px
    }
  }
  @media screen and (max-width:519px){
    input{
      width:200px;
    }
    .nav{
      font-size:10px;
      margin:5px 5px 5px 5px;
    }
  }
`
interface listType {
  todolist: { todo: string, id: string }[];
  todolist2: { todo: string, id: string }[];
  modelOpen: boolean;
  content: string
}

interface props {
  login: loginType;
  setLogin: React.Dispatch<React.SetStateAction<loginType>>
}

const list: listType = {
  todolist: [],
  todolist2: [],
  modelOpen: false,
  content: ''
}

const reducer = (state: listType, action: { type: string, id?: string, info?: { todo: string, id: string } }): any => {
  switch (action.type) {
    case 'ADD':
      return { todolist: [...state.todolist, action.info], todolist2: state.todolist2, modelOpen: true, content: '* Add item successfully' };
    case 'EMPTY':
      return { todolist: state.todolist, todolist2: state.todolist2, modelOpen: true, content: '* The input box is empty' };
    case 'CLOSE':
      return { todolist: state.todolist, todolist2: state.todolist2, modelOpen: false, content: '* The input box is empty' };
    case 'FINISH':
      const removeItem = state.todolist.filter((i: { todo: string, id: string }) => { return i.id !== action.id });
      const addItem = state.todolist.find((i: { todo: string, id: string }) => { return i.id === action.id });
      return { todolist: removeItem, todolist2: [...state.todolist2, addItem], modelOpen: true, content: '* Gotcha' };
    case 'BACK':
      const removeItem2 = state.todolist2.filter((i: { todo: string, id: string }) => { return i.id !== action.id });
      const addItem2 = state.todolist2.find((i: { todo: string, id: string }) => { return i.id === action.id });
      return { todolist: [...state.todolist, addItem2], todolist2: removeItem2, modelOpen: true, content: '* Gotcha' };
    case 'DELETE':
      const delete1 = state.todolist.filter((i: { todo: string, id: string }) => { return i.id !== action.id });
      const delete2 = state.todolist2.filter((i: { todo: string, id: string }) => { return i.id !== action.id });
      return { todolist: delete1, todolist2: delete2, modelOpen: true, content: '* Delete item successfully' };
  }
}

const Tobuylist: React.FC<props> = ({ login, setLogin }) => {
  const [input, setInput] = useState<string>('');
  const [open, setOpen] = useState<boolean[]>([true, false]);
  const [all, setAll] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, list);

  const handleOpen = (e: any) => {
    let key = e.target.name;
    if (key === '1') {
      setOpen([true, false])
    } else if (key === '2') {
      setOpen([false, true])
    } else {
      setOpen([true, true])
    }
  }

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      const id = new Date().getTime().toString();
      const info = { todo: input, id: id }
      dispatch({ type: 'ADD', info: info })
    } else {
      dispatch({ type: 'EMPTY' })
    }
    setInput('')
  }

  useEffect(() => {
    const turnOn = async () => {
      state.todolist = await login.TODO
      state.todolist2 = await login.DONE
      await setAll(true)
    }
    turnOn()
  }, []);

  useEffect(() => {
    if (login.username !== '' && (state.todolist.length !== 0 || state.todolist2.length !== 0)) {
      axios.post('https://recipeweb-api.herokuapp.com/tobuylist', { TODO: state.todolist, DONE: state.todolist2, username: login.username }).then((res) => setLogin((prev) => { return { ...prev, TODO: res.data.TODO, DONE: res.data.DONE } }))
    }
  }, [state, login.username, setLogin])

  useEffect(() => {
    if (state?.modelOpen) {
      setTimeout(() => {
        dispatch({ type: 'CLOSE' })
      }, 1000);
    }
  }, [state?.modelOpen])


  return (<Wrapper>
    <Banner/>
    <Container style={{ height: '770px' }}>
      <div id="center" style={{ margin: '40px 20px', backgroundColor: '#F1F1F1' }}>
        <div className="area">
          <div id='center'>
            <h2 style={{ fontWeight: 'bold' }}>ToBuyList</h2>
          </div>
          {login.status === "none" && <div id='center'>
            <p>Login to save your to buy list.</p>
          </div>}
          <div id='center'>
            <input onChange={(e) => setInput(e.target.value)} value={input}></input>
            <button className='button' onClick={handleClick} style={{ marginRight: '10px' }}>Submit</button>
          </div>
          <div id='center'>
            {state?.modelOpen && <p>{state?.content}</p>}
          </div>
        </div>
      </div>
      <div style={{ margin: '40px 20px', backgroundColor: '#F1F1F1' }}>
        <div style={{ display: 'flex', justifyContent: 'right', marginRight: '2%' }}>
          <button onClick={handleOpen} name='1' className='nav' style={{ backgroundColor: open[0] && !open[1] ? 'grey' : '#F1F1F1' }} > TODO</button>
          <button onClick={handleOpen} name='2' className='nav' style={{ backgroundColor: !open[0] && open[1] ? 'grey' : '#F1F1F1' }}>DONE</button>
          <button onClick={handleOpen} name='3' className='nav' style={{ backgroundColor: open[0] && open[1] ? 'grey' : '#F1F1F1' }}>ALL</button>
        </div>
        {all && <span>
          {open[0] && <div>{state?.todolist.map((i: { todo: string, id: string }, index: number) => {
            return <div key={index}>
              <hr></hr>
              <div id='center' style={{ position: 'relative', paddingBottom: '5px', justifyContent: 'left' }}>
                <img onClick={() => { dispatch({ type: 'FINISH', id: i.id }) }} style={{ marginLeft: '2%' }} id='box' src={CLICK} alt='click'></img>
                <h4 style={{ marginLeft: '2%' }} id='box'>{i.todo}</h4>
                <img onClick={() => { dispatch({ type: 'DELETE', id: i.id }) }} style={{ right: '2%', position: 'absolute' }} id='box' src={DELETE} alt='delete'></img>
              </div>
            </div>
          })}</div>}
          {open[1] && <div>{state?.todolist2.map((i: { todo: string, id: string }, index: number) => {
            return <div key={index}>
              <hr></hr>
              <div id='center' style={{ position: 'relative', paddingBottom: '5px', justifyContent: 'left' }}>
                <img onClick={() => { dispatch({ type: 'BACK', id: i.id }) }} style={{ marginLeft: '2%' }} id='box' src={BACK} alt='back'></img>
                <h4 style={{ marginLeft: '2%', textDecoration: 'line-through' }} id='box'>{i.todo}</h4>
                <img onClick={() => { dispatch({ type: 'DELETE', id: i.id }) }} style={{ right: '2%', position: 'absolute' }} id='box' src={DELETE} alt='delete'></img>
              </div>
            </div>
          })}</div>}
        </span>}
      </div>
    </Container>
  </Wrapper >
  )
}

export default Tobuylist