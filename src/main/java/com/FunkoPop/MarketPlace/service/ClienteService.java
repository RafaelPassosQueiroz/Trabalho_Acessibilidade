package com.FunkoPop.MarketPlace.service;


import com.FunkoPop.MarketPlace.entity.Cliente;
import com.FunkoPop.MarketPlace.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente saveClient(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public List<Cliente> findAllClient(){
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findClientById(int id){
        return clienteRepository.findById(id);
    }

    public void deleteClient(Cliente cliente){
        clienteRepository.delete(cliente);
    }

    public void deleteClientById(int id){
        clienteRepository.deleteById(id);
    }

    public void deleteAllClient(){
        clienteRepository.deleteAll();
    }





}