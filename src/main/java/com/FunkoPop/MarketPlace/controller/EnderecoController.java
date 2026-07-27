package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Endereco;
import com.FunkoPop.MarketPlace.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
public class EnderecoController {

    @Autowired
    private EnderecoService addressService;

    @PostMapping
    public Endereco save(@RequestBody Endereco address){
        return addressService.saveAddress(address);
    }

    @GetMapping
    public List<Endereco> findAll(){
        return addressService.findAllAddress();
    }

    @GetMapping("/{id}")
    public Endereco findById(@PathVariable Long id){
        return addressService.findAddressById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        addressService.deleteAddressById(id);
    }

}