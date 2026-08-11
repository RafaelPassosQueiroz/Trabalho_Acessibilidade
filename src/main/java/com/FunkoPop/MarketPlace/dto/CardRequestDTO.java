package com.FunkoPop.MarketPlace.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CardRequestDTO {

    private Long clienteId;
    private String bandeira;
    private String nomeTitular;
    private String numeroMascarado;
    private LocalDate validade;

}