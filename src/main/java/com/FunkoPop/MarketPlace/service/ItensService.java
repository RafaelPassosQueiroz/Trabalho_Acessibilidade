package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Favorito;
import com.FunkoPop.MarketPlace.entity.Itens;
import com.FunkoPop.MarketPlace.repository.FavoritoRepository;
import com.FunkoPop.MarketPlace.repository.ItensRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItensService {


    @Autowired
    private ItensRepository itensRepository;

    public Itens saveItens(Itens itens) {
        return itensRepository.save(itens);
    }

    public List<Itens> findAllItens(){
        return itensRepository.findAll();
    }

    public Optional<Itens> findItensById(int id){
        return itensRepository.findById(id);
    }

    public void deleteItens(Itens itens){
        itensRepository.delete(itens);
    }

    public void deleteItensById(int id){
        itensRepository.deleteById(id);
    }

    public void deleteAllItens(){
        itensRepository.deleteAll();
    }



}
