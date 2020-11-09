// import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';
import MainButtons from '../components/MainButtons';
import Typing from 'react-typing-animation';

const AnimatedTypingComponent = () => (
  <Typing>
     <Typing speed={500} />
    <span><h1>Welcome to Rate my Course</h1></span>
    <Typing.Speed ms={50} />
    <span><h2>An anonymous platform for students to inform other students before hand about a class they are going to take</h2></span>
  </Typing>
);

export default function Home() {
  return (
    <Layout>
      <AnimatedTypingComponent />
      <MainButtons />
    </Layout>

  )
}
