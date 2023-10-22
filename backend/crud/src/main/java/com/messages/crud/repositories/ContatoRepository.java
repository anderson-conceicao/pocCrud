package com.messages.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.messages.crud.model.Contato;
@Repository
public interface ContatoRepository  extends JpaRepository<Contato, Long>{
	
}
