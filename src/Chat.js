import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {selectRoomId} from './features/appSlice'
import {useSelector} from 'react-redux'
import ChatInput from './ChatInput'
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import { db } from './firebase'
import Message from './Message'
import ScrollIntoView from 'react-scroll-into-view'
import { Button } from '@material-ui/core'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './firebase'
import  './chat.css'
import scrollIntoView from 'scroll-into-view-if-needed'




export default  function Chat() {

    
    const chatRef = useRef(null)
    const roomId  =   useSelector(selectRoomId)
    console.log('roomid',roomId)
    const [messages,setMessages]= useState([])
    const [user,loading] = useAuthState(auth)

     
    const [roomDetails]  = useDocument( roomId && db.collection("rooms").doc(roomId)) 
    const [roomMessages] = useCollection( roomDetails && db.collection("rooms").doc(roomId).collection('messages').orderBy("timestamp",'asc')) 

     console.log('ROOM DETAILS',roomDetails?.data())
     console.log('ROOM messages',roomMessages)
     
     useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
             setMessages(
                 snapshot.docs.map((doc)=>doc.data())))
                 )
        }

       
   }, [roomId])

   const handleClose = event => {
    chatRef.current.scrollIntoView()
    
   };
 

 useEffect(() => {
 }, [])



  
    return (
       
        <ChatContainer>
            {roomDetails && roomMessages && ( 
                 <>


<Header>

    <HeaderLeft>
        <h4>
            <strong>{roomDetails?.data()?.name}</strong>
        </h4>
        <StarBorderOutlined/>
    </HeaderLeft>
    <HeaderRight>
        <p>
            <InfoOutlined/>Details
           
        </p>
    </HeaderRight>

</Header>





<ChatMessage>
   
   {roomMessages?.docs.map(doc=>{
       const {message,timestamp,user,userImage}=doc.data()
         return( 
           <Message
           key= {doc?.id}
           message={message}
           timestamp={timestamp}
           userImage={userImage}
           user= {user}

           
           
           />

         );
       
   })}

     <div id="ddd"
     ref={chatRef}>

     </div>
 
    
</ChatMessage>
<scrollIntoView selector={chatRef} onClick={handleClose}>

<ChatInput
// chatref={chatRef}
channelName={roomDetails?.data()?.name}
channelId={roomId}
chatRef={chatRef}

/>
</scrollIntoView>


</> 

)}
      
        </ChatContainer>
       
    )
}


const ChatMessage = styled.div`
bottom:100px;


`
const ChatBottom = styled.div`
height:20vh;
background-color:#345666
`


const ChatContainer = styled.div`
flex:0.7;
flex-grow:1;
overflow-y:scroll;
margin-bottom:80px;
margin-top:60px;
`

const Header = styled.div`
display:flex;
justify-content:space-between;
padding:20px;
border-bottom:1px solid lightgray;
`
const HeaderLeft = styled.div`
display:flex;
align-items:center;

>h4{
    display:flex;
    text-transform:lowercase;
    margin-right:10px;

}

>h4>.MuiSvgIcon-root{
    margin-left:10px;
    font-size:18px;
}
`
const HeaderRight = styled.div`
>p{
    display:flex;
    align-items:center;
    font-size:14px;
}

>p>.MuiSvgIcon-root{
    margin-right:5px, !important ;
    font-size:16px;
    
}

`