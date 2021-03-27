import React from 'react';
//import { Counter } from './features/counter/Counter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Header';
import styled from 'styled-components'
import Sidebar from './Sidebar'
import Chat from './Chat';
import {selectRoomId} from './features/appSlice'
import {useSelector} from 'react-redux'
import Message from './Message'
import { auth } from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import Login from './Login'
import Spinner from 'react-spinkit'





function App() {
  const [user,loading] = useAuthState(auth)
  const roomId =   useSelector(selectRoomId)
  if(loading){
    return(
      <AppLoading>
      <AppLoadingContents>
        <img
        src="http://jitsi.org/wp-content/uploads/2017/01/slack-logo.png"
        alt=""/>
        <Spinner
        name="ball-spin-fade-loader"
        color='purple'
        fadeIn="none"
        />


      </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="app">
    <Router>
      {!user ? (<Login/>) :(
        <>
         <Header/>
         <AppBody>
         <Sidebar/>
        
         <Switch>
             <Route path exact ="/">
               <Chat/>
              
             </Route>
            
           </Switch>
           
           </AppBody>
   
          
      
        
       </>

      )} 
    
    
     
    </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
display:flex;
height:100vh;


`
const AppLoading = styled.div`
display:grid;
place-items:center;
height:100vh;
width:100%100vh;


`
const AppLoadingContents = styled.div`
text-align:center;
padding-bottom:100px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

>img{
  height:100px;
  padding:20px;
}
`
