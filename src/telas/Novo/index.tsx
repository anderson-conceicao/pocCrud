
import React, { useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RootStackParamList } from '../../types/rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ContatoContext } from '../../componentes/ContatoContext';

interface IFormInput {
  nome: string;
  email: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'novo'>;

const Novo: React.FC<Props> = ({ route, navigation }) => {
  const { addContato } = useContext(ContatoContext);

  const {
    register,
    handleSubmit,
    setValue,
    reset,  
    formState: { errors },
  } = useForm<IFormInput>();


  useEffect(() => {
    register('nome', { required: 'Nome é obrigatório' });
    register('email', {
      required: 'Email é obrigatório',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'email inválido',
      },
    });
  }, [register]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    await addContato({ nome: data.nome, email: data.email, id: 0 });
  
    reset(); 
    navigation.navigate('listar'); 

  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue('nome', text)}
        />
        {errors.nome && <Text>{errors.nome.message}</Text>}
      </View>

      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue('email', text)}
        />
        {errors.email && <Text>{errors.email.message}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Novo;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
