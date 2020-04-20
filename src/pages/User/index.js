/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

export default function User({ route, navigation }) {
    const [stars, setStars] = useState([]);

    const { avatar, bio, login, name } = route.params.user;

    navigation.setOptions({
        title: login,
    });

    const setResponse = async () => {
        const response = await api.get(`/users/${login}/starred`);

        setStars(response.data);
    };

    useEffect(() => {
        setResponse();
    }, []);
    return (
        <Container>
            <Header>
                <Avatar source={{ uri: avatar }} />
                <Name> {name} </Name>
                <Bio> {bio} </Bio>
            </Header>

            <Stars
                data={stars}
                keyExtractor={(star) => String(star.id)}
                renderItem={({ item }) => (
                    <Starred>
                        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                        <Info>
                            <Title> {item.name} </Title>
                            <Author> {item.owner.login} </Author>
                        </Info>
                    </Starred>
                )}
            />
        </Container>
    );
}
