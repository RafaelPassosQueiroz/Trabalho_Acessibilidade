package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Cartao;
import com.FunkoPop.MarketPlace.repository.CartaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartaoService {

    @Autowired
    private CartaoRepository cartaoRepository;

    public Cartao saveCard(Cartao cartao){
        return cartaoRepository.save(cartao);
    }

    public List<Cartao> findAllCard(){
        return cartaoRepository.findAll();
    }

    public Optional<Cartao> findCardById(Long id){
        return cartaoRepository.findById(id);
    }

    public void deleteCard(Cartao cartao){
        cartaoRepository.delete(cartao);
    }

    public void deleteCardById(Long id){
        cartaoRepository.deleteById(id);
    }

    public void deleteAllCard(){
        cartaoRepository.deleteAll();
    }
}