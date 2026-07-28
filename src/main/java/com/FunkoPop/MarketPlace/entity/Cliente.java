package com.FunkoPop.MarketPlace.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name= "senha", nullable = false)
    private String senha;

    @Column(name = "nascimento")
    private LocalDate nascimento;

    @Column(name = "cpf", length = 11)
    private String cpf;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "ativo")
    private Boolean ativo = true;
}