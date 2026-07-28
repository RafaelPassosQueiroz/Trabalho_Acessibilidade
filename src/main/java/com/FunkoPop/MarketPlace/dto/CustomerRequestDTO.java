package com.FunkoPop.MarketPlace.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CustomerRequestDTO {

    private String nome;
    private LocalDate nascimento;
    private String senha;
    private String cpf;
    private String email;
    private String telefone;
    private Boolean ativo;

}