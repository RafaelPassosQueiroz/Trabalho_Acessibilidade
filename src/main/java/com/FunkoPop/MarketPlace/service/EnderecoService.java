package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Endereco;
import com.FunkoPop.MarketPlace.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Endereco saveAddress(Endereco endereco){
        return enderecoRepository.save(endereco);
    }

    public List<Endereco> findAllAddress(){
        return enderecoRepository.findAll();
    }

    public Optional<Endereco> findAddressById(Long id){
        return enderecoRepository.findById(id);
    }

    public void deleteAddress(Endereco endereco){
        enderecoRepository.delete(endereco);
    }

    public void deleteAddressById(Long id){
        enderecoRepository.deleteById(id);
    }

    public void deleteAllAddress(){
        enderecoRepository.deleteAll();
    }
}