package com.FunkoPop.MarketPlace.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequestDTO {

    private Long clienteId;
    private String cep;
    private String estado;
    private String cidade;
    private String rua;
    private int numero;
    private String complemento;
    private String logradouro;

}