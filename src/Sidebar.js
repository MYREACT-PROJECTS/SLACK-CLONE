import { Add, AddIcCallOutlined, AppsOutlined, BookmarkBorderRounded, DraftsOutlined, ExpandLessOutlined, ExpandMoreOutlined, FiberManualRecord, FileCopyOutlined, InboxOutlined, InsertComment, PeopleAltOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import {useCollection} from 'react-firebase-hooks/firestore'
import {db} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from './firebase';




export default function Sidebar() {
    const [user,loading] = useAuthState(auth)

    const [channels,error] = useCollection(db.collection("rooms"))

    return (
        <SidebarContainer>
           <SidebarHeader>
               <SidebarInfo>
                   <h2>{user?.displayName} </h2>
                   <h3>
                       <FiberManualRecord/>
                       AROMA INSIDER
                   </h3>
               </SidebarInfo>
               <CreateIcon/>
           </SidebarHeader>
           <SidebarOption Icon={InsertComment} title="Threads"/>
           <SidebarOption Icon={InboxOutlined} title="Mentions&reactions"/>
           <SidebarOption Icon={DraftsOutlined} title="SavedItmes"/>
           <SidebarOption Icon={BookmarkBorderRounded} title="Channel browser"/>
           <SidebarOption Icon={PeopleAltOutlined} title="People & user groups"/>
           <SidebarOption Icon={AppsOutlined} title="Apps"/>
           <SidebarOption Icon={FileCopyOutlined} title="File browser"/>
           <SidebarOption Icon={ExpandLessOutlined} title="Show Less"/>
           <hr/>
           <SidebarOption Icon={ExpandMoreOutlined} title="Channels" />
           <hr/>
           <SidebarOption Icon={Add} title="Add Channels" addChannelOption />
            {channels?.docs?.map(doc=>(
                <SidebarOption key ={doc?.id} id ={doc?.id}  title={doc.data().name}/>
            ))}

 
        </SidebarContainer>
    )
}


const SidebarContainer= styled.div`
background-color:var(--slack-color);
color:white;
flex:0.3;
border-top:1px solid #49274b;
max-width:260px;
margin-top:50px;
>hr{
    margin-top:10px;
    margin-bottom:10px;
    border:1px solid #49274b;
}
overflow-y: scroll;
::-webkit-scrollbar{
    display: none;
}

`
const SidebarHeader= styled.div`
display:flex;
border-bottom:1px solid #49274b;
padding:13px;

>.MuiSvgIcon-root {
    padding:8px;
    color:#49274b;
    font-size:18px;
    background-color:white;
    border-radius:999px;
}


`
const SidebarInfo= styled.div`
flex:1;
>h2{
    font-size:15px;
    margin-bottom:5px;
    font-weight:900;
}
>h3{
    display:flex;
    font-size:13px;
    font-weight:400;
    align-items:center;
    }
    >h3>.MuiSvgIcon-root {
    font-size:14px;
    color:green;
    margin-top:1px;
    margin-right:2px;   
}
`;
