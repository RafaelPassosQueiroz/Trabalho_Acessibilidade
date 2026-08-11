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

    public Cliente saveCustomer(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public List<Cliente> findAllCustomer(){
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findCustomerById(Long id){
        return clienteRepository.findById(id);
    }

    public void deleteCustomer(Cliente cliente){
        clienteRepository.delete(cliente);
    }

    public void deleteCustomerById(Long id){
        clienteRepository.deleteById(id);
    }

    public void deleteAllCustomer(){
        clienteRepository.deleteAll();
    }
}