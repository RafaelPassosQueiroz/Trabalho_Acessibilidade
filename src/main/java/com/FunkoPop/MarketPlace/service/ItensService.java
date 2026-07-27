package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Itens;
import com.FunkoPop.MarketPlace.repository.ItensRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItensService {

    @Autowired
    private ItensRepository itensRepository;

    public Itens saveItem(Itens item){
        return itensRepository.save(item);
    }

    public List<Itens> findAllItem(){
        return itensRepository.findAll();
    }

    public Optional<Itens> findItemById(Long id){
        return itensRepository.findById(id);
    }

    public void deleteItem(Itens item){
        itensRepository.delete(item);
    }

    public void deleteItemById(Long id){
        itensRepository.deleteById(id);
    }

    public void deleteAllItem(){
        itensRepository.deleteAll();
    }
}