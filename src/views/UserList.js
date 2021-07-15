import React, { useContext } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import UsersContext from '../context/UserContext';


const UserList = ({ navigation }) => {
  const { state, dispatch } = useContext(UsersContext);

  const confirmDelete = (user) => {
    Alert.alert('Excluir', 'Você tem certeza que deseja excluir?', [
      {
        text: 'Tenho',
        onPress: () => dispatch({
          type: 'deleteUser',
          payload: user
        })
      },
      {
        text: 'Melhor não'
      }
    ])
  }

  const getUserItem = ({ item: user }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate('UserForm')}

      >
        <Avatar source={{ uri: user.avatarURL }} />
        <ListItem.Content>
          <ListItem.Title>
            {user.name} - {user.id}
          </ListItem.Title>
          <ListItem.Subtitle>
            {user.email}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Button
          onPress={() => navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="#2f2" />}
        />
        <Button
          onPress={() => confirmDelete(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="#f22" />}
        />
      </ListItem>
    )
  }

  return (
    <View>
      <FlatList data={state.users} keyExtractor={user => user.id} renderItem={getUserItem} />
    </View>
  );
}
export default UserList;