import React, { ReactNode, createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Contato } from '../../types/contato';

interface ContatoContextProps {
    contatos: Contato[];
    addContato: (contato: Contato) => Promise<void>;
    editContato: (contato: Contato) => Promise<void>;
    deleteContato: (id: number) => Promise<void>;
  }
  
  interface ContatoProviderProps {
    children: ReactNode;
  }
  
  const ContatoContext = createContext<ContatoContextProps>({} as ContatoContextProps);
  
const ContatoProvider: React.FC<ContatoProviderProps> = ({ children }) => {
  const [contatos, setContatos] = useState<Contato[]>([]);

  const fetchContatos = async () => {
    try {
      const response = await axios.get('http://192.168.68.113:8080/contatos');
      setContatos(response.data);
    } catch (error) {
      console.error('Houve um erro ao obter os contatos!', error);
    }
  };

  useEffect(() => {
    
    fetchContatos();
  }, []);

  const addContato = async (contato: Contato) => {
    try {
      await axios.post('http://192.168.68.113:8080/contatos', contato);
      fetchContatos();
    } catch (error) {
      console.error('Erro ao adicionar contato', error);
    }
  };

  const editContato = async (contato: Contato) => {
    try {
      await axios.put(`http://192.168.68.113:8080/contatos/${contato.id}`, contato);
      fetchContatos();
    } catch (error) {
      console.error('Erro ao editar contato', error);
    }
  };

  const deleteContato = async (id: number) => {
    try {
      await axios.delete(`http://192.168.68.113:8080/contatos/${id}`);
      fetchContatos();
    } catch (error) {
      console.error('Erro ao deletar contato', error);
    }
  };

  return (
    <ContatoContext.Provider
      value={{
        contatos,
        addContato,
        editContato,
        deleteContato,
      }}
    >
      {children}
    </ContatoContext.Provider>
  );
};

export { ContatoContext, ContatoProvider };
