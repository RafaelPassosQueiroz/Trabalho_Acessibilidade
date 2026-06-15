package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Categoria;
import com.FunkoPop.MarketPlace.entity.Cliente;
import com.FunkoPop.MarketPlace.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria saveClient(Categoria categoria){
        return categoriaRepository.save(categoria);
    }


    public List<Categoria> findAllClient(){
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> findClientById(int id){
        return categoriaRepository.findById(id);
    }

    public void deleteClient(Categoria categoria){
        categoriaRepository.delete(categoria);
    }

    public void deleteClientById(int id){
        categoriaRepository.deleteById(id);
    }

    public void deleteAllClient(){
        categoriaRepository.deleteAll();
    }



}
