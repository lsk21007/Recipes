import React from 'react'
import MainRecipes from '../components/MainRecipes'
import Section from '../components/Section'
import PopArea from '../components/PopArea'
import Banner from '../components/Banner'

const Home: React.FC = () => {
  return (
    <div>
      <Section />
      <MainRecipes></MainRecipes>
      <Banner />
      <PopArea></PopArea>
    </div>
  )
}

export default Home