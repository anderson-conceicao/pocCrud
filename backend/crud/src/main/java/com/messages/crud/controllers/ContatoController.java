package com.messages.crud.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import com.messages.crud.model.dto.ContatoDTO;
import com.messages.crud.services.ContatoService;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    @Autowired
    private ContatoService contatoService;

    @GetMapping
    public ResponseEntity<List<ContatoDTO>> listarTodos() {
        return ResponseEntity.ok(contatoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContatoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(contatoService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ContatoDTO> criar(@RequestBody ContatoDTO contatoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contatoService.save(contatoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContatoDTO> atualizar(@PathVariable Long id, @RequestBody ContatoDTO contatoDTO) {
        return ResponseEntity.ok(contatoService.update(id, contatoDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        contatoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

