import React from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { useState, useContext } from 'react';
import UsersContext from '../context/UserContext';

const UserForm = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params || {});
  const { dispatch } = useContext(UsersContext);
  return (
    <View style={styles.form}>
      <Text>Nome</Text>
      <TextInput
        onChangeText={name => setUser({ ...user, name })}
        placeholder="Informe o nome"
        value={user.name}
        style={styles.input}
      />
      <Text>Email</Text>
      <TextInput
        onChangeText={email => setUser({ ...user, email })}
        placeholder="Informe o email"
        value={user.email}
        style={styles.input}
      />
      <Text>URL do Avatar</Text>
      <TextInput
        onChangeText={avatarURL => setUser({ ...user, avatarURL })}
        placeholder="Informe a URL do Avatar"
        value={user.avatarURL}
        style={styles.input}
      />
      <Button title="Salvar" onPress={() => {
        dispatch({
          type: user.id ? 'updateUser' : 'createUser',
          payload: user,
        })
        navigation.goBack()
      }} />
    </View>
  );
}
export default UserForm;

const styles = StyleSheet.create({
  form: {
    padding: 12
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  }
})