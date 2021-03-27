import React from 'react'
import styled from 'styled-components'
import {Avatar} from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { HelpOutline, SearchOutlined } from '@material-ui/icons';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './firebase'

export default function Header() {
    const [user,loading] = useAuthState(auth)

    return (
        <HeaderContainer>
            <Headerleft>
              <HeaderAvatar
              src={user.photoURL}
              alt={user?.displayName}
              onClick={()=>auth.signOut()}/>
              <AccessTimeIcon
              
              />
            </Headerleft>
            <HeaderSearch>
             <SearchOutlined/>
               <input
               placeholder="Search"
               />
             </HeaderSearch>
            <HeaderRight>
                <HelpOutline/>
            </HeaderRight>
        </HeaderContainer>
    )
}


const HeaderContainer= styled.div`
display:flex;
position:fixed;
width:100%;
align-items:center;
justify-content:space-between;
padding:5px 0;
background-color:var(--slack-color);
color:white;
border:none;
`
const Headerleft = styled.div`
flex : 0.3;
display:flex;
align-items:center;
margin-left:20px;

>.MuiSvgIcon-root {
    margin-left:auto;
    margin-right:auto;
}

`;
const HeaderAvatar = styled(Avatar)`
cursor: pointer;
:hover{
    opacity:0.8;
}
`
const HeaderSearch = styled.div`
flex:0.4;
opacity:1;
border-radius:6px;
background-color:#421f44;
text-align:center;
display:flex;
padding: 0 50px;
color:gray;
border:1px gray solid;
align-items: center;


>input{
    background-color:transparent;
    border:none;
    text-align:center;
    min-width:30vw;
    outline:0;
    color:white;


}
`
const HeaderRight= styled.div`
display:flex;
flex:0.3;
align-items:flex-end;
>.MuiSvgIcon-root{
    margin-left:auto;
    margin-right:20px;
    }

`



