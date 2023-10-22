
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Modal, TextInput } from 'react-native';
import { Contato } from '../../types/contato';
import { ContatoContext } from '../../componentes/ContatoContext';



const Lista: React.FC = () => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContato, setSelectedContato] = useState<Contato | null>(null);
  const { contatos, deleteContato, editContato } = useContext(ContatoContext); 

  const renderContato = ({ item }: { item: Contato }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Button title="Editar" onPress={() => { setSelectedContato(item); setModalVisible(true); }} />
      <Button title="Excluir" onPress={() => deleteContato(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatos</Text>
      <FlatList
        data={contatos}
        renderItem={renderContato}
        keyExtractor={(item) => item.id.toString()}
      />

      {selectedContato && (
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Editar Contato</Text>
            <TextInput 
              style={styles.input} 
              defaultValue={selectedContato.nome} 
              onChangeText={(text) => setSelectedContato({ ...selectedContato, nome: text })}
            />
            <TextInput 
              style={styles.input} 
              defaultValue={selectedContato.email} 
              onChangeText={(text) => setSelectedContato({ ...selectedContato, email: text })}
            />
            <Button 
              title="Salvar" 
              onPress={() => {
                if (selectedContato) {
                  editContato(selectedContato);
                  setModalVisible(false); 
                }
              }} 
            />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </Modal>
      )}
    
    </View>
  );
};

export default Lista;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'grey',
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});
