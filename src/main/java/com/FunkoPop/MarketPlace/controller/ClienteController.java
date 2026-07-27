package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Cliente;
import com.FunkoPop.MarketPlace.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class ClienteController {

    @Autowired
    private ClienteService customerService;

    @PostMapping
    public Cliente save(@RequestBody Cliente customer){
        return customerService.saveCustomer(customer);
    }

    @GetMapping
    public List<Cliente> findAll(){
        return customerService.findAllCustomer();
    }

    @GetMapping("/{id}")
    public Cliente findById(@PathVariable Long id){
        return customerService.findCustomerById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        customerService.deleteCustomerById(id);
    }

}