import React, { useState } from 'react';
import axios from '../../contants/axios';

import Header from '../Header';
import Dropdown from '../Dropdown';

import {
    Container,
    RoomName,
    LastMessage,
    Content,
    Message,
    MessageReciver,
    User,
    TimeStamp,
    FormContainer,
    Form,
    Input,
    Button,
} from './styles';
import { IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function Chat({ messages, user, room }) {
    const [inputMessage, setInputMessage] = useState('');
    const [showDropdown, setShowDropdown] = useState(false)

    const sendMessage = async e => {
        e.preventDefault();

        await axios.post('/api/messages/send', {
            message: inputMessage,
            username: user.username,
            room_id: room._id,
        })

        setInputMessage('');
    };

    return (
        <Container>
            <Header borderBottom>
                <Header.Picture src={room?.image} />
                <Header.Info>
                    <RoomName>{room?.name}</RoomName>
                    <LastMessage>{messages[messages.length - 1]?.message}</LastMessage>
                </Header.Info>
                <Header.Right>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton onClick={_ => setShowDropdown(!showDropdown)}>
                        <MoreVert />
                    </IconButton>
                </Header.Right>
                <Dropdown showDropdown={showDropdown}>
                    Dropdown
                </Dropdown>
            </Header>
            <Content  onClick={_ => setShowDropdown(false)}>
                {messages.map(message => {
                    return (
                        message.room_id === room._id ?
                            message.username === user.username ?
                                <MessageReciver key={`${message.username}-${message.timestamp}`}>
                                    {message.message}
                                    <TimeStamp>{message.timestamp}</TimeStamp>
                                </MessageReciver>
                                :
                                <Message key={`${message.username}-${message.timestamp}`}>
                                    <User>{message.username}</User>
                                    {message.message}
                                    <TimeStamp>{message.timestamp}</TimeStamp>
                                </Message>
                            :
                            null
                    )
                })}
            </Content>
            <FormContainer>
                <InsertEmotionIcon />
                <Form>
                    <Input value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
                    <Button onClick={sendMessage} type="submit">Send a message</Button>
                </Form>
                <MicIcon />
            </FormContainer>
        </Container>
    );
}

export default Chat;
