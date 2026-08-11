package com.FunkoPop.MarketPlace.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FavoriteRequestDTO {

    private Long clienteId;
    private Long produtoId;
    private LocalDate dataAdicao;

}