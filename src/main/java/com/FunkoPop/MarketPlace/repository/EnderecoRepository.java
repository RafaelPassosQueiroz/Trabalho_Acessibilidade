package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    Endereco findEnderecoById(Long id);

}