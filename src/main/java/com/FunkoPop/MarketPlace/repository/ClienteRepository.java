package com.FunkoPop.MarketPlace.repository;


import com.FunkoPop.MarketPlace.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {


    Cliente findClienteByIdIs(Long id);


}
