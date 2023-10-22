package com.messages.crud.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import com.messages.crud.model.Contato;
import com.messages.crud.model.dto.ContatoDTO;
import com.messages.crud.repositories.ContatoRepository;
import java.util.stream.Collectors;
@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    public List<ContatoDTO> getAll() {
        return contatoRepository.findAll().stream()
            .map(contato -> new ContatoDTO(
                contato.getId(),
                contato.getNome(),
                contato.getEmail()
                ))
            .collect(Collectors.toList());
    }

    public ContatoDTO getById(Long id) {
        Contato contato = contatoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
        return new ContatoDTO(contato.getId(), contato.getNome(), contato.getEmail());
    }

    public ContatoDTO save(ContatoDTO contatoDTO) {
        Contato contato = new Contato();
        BeanUtils.copyProperties(contatoDTO, contato);
        contato = contatoRepository.save(contato);
        return new ContatoDTO(contato.getId(), contato.getNome(), contato.getEmail());
    }

    public ContatoDTO update(Long id, ContatoDTO contatoDTO) {
        if (!contatoRepository.existsById(id)) {
            throw new RuntimeException("Contato não encontrado");
        }

        Contato contato = new Contato();
        BeanUtils.copyProperties(contatoDTO, contato);
        contato.setId(id); 
        contato = contatoRepository.save(contato);
        return new ContatoDTO(contato.getId(), contato.getNome(), contato.getEmail());
    }

    public void delete(Long id) {
        if (!contatoRepository.existsById(id)) {
            throw new RuntimeException("Contato não encontrado");
        }
        contatoRepository.deleteById(id);
    }
}
