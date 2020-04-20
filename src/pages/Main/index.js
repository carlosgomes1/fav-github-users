/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
    RemoveItemButton,
} from './styles';

export default function Main(props) {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [loading, setLoading] = useState(false);

    const loadUsers = async () => {
        const usersStorage = await AsyncStorage.getItem('users');

        if (usersStorage) {
            setUsers(JSON.parse(usersStorage));
        }
    };

    const removeItemStorage = async (userList) => {
        setUsers(
            users.filter((user) => {
                return user !== userList;
            })
        );
    };

    const handleNavigate = (user) => {
        const { navigation } = props;

        navigation.navigate('User', { user });
    };

    useEffect(() => {
        loadUsers();
    }, []);
    useEffect(() => {
        AsyncStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const handleAddUser = async () => {
        setLoading(true);

        try {
            const response = await api.get(`/users/${newUser}`);
            const data = {
                name: response.data.name,
                login: response.data.login,
                bio: response.data.bio,
                avatar: response.data.avatar_url,
            };

            setUsers([...users, data]);
            setNewUser('');

            Keyboard.dismiss();
        } catch (error) {
            // eslint-disable-next-line no-undef
            alert('Usuário inválido');
        }

        setLoading(false);
    };

    return (
        <Container>
            <Form>
                <Input
                    autocorect={false}
                    autoCapitalize="none"
                    placeholder="Adicionar usuário"
                    value={newUser}
                    onChangeText={(text) => setNewUser(text)}
                    returnKeyType="send"
                    onSubmitEditing={handleAddUser}
                />
                <SubmitButton loading={loading} onPress={handleAddUser}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Icon name="add" size={20} color="#FFF" />
                    )}
                </SubmitButton>
            </Form>

            <List
                data={users}
                keyExtractor={(user) => user.login}
                renderItem={({ item }) => (
                    <User>
                        <RemoveItemButton
                            onPress={() => removeItemStorage(item)}
                        >
                            <Icon
                                name="delete"
                                color="red"
                                size={28}
                                style={{
                                    justifyContent: 'flex-start',
                                    alignSelf: 'flex-end',
                                }}
                            />
                        </RemoveItemButton>

                        <Avatar source={{ uri: item.avatar }} />
                        <Name> {item.name} </Name>
                        <Bio> {item.bio} </Bio>

                        <ProfileButton onPress={() => handleNavigate(item)}>
                            <ProfileButtonText> Ver perfil </ProfileButtonText>
                        </ProfileButton>
                    </User>
                )}
            />
        </Container>
    );
}
