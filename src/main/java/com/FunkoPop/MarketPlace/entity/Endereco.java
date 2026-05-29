package com.FunkoPop.MarketPlace.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="endereco")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Cliente idCliente;

    private String cep;
    private String estado;
    private String cidade;
    private String rua;
    private int numero;
    private String complemento;
    private String logradouro;


}
