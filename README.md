# Pesquisa de Acessibilidade Digital, Ferramentas de Teste e Diagnóstico

## Sobre esta pesquisa

Esta pesquisa investiga como falhas de acessibilidade são identificadas e medidas em sites reais, e por que elas continuam existindo mesmo quando as ferramentas para detectá-las já estão disponíveis a qualquer desenvolvedor.

---

## O que descobrimos

Existe um número que muda a forma como você enxerga a internet: **1,3 bilhão de pessoas** vivem com alguma forma de deficiência no mundo. Isso representa 16% da população global, o maior grupo minoritário do planeta. O Censo 2022 do IBGE mapeou que **18,6 milhões de pessoas** se encontram nessa condição no Brasil, cerca de 8,9% da população, com a deficiência visual sendo a mais prevalente.

São números grandes o suficiente para justificar, por si sós, que qualquer produto digital seja construído pensando em acessibilidade. E ainda assim, quando olhamos para a realidade da web, o cenário é outro.

De acordo com o **WebAIM Million Report de fevereiro de 2026**, pesquisa que analisa os um milhão de sites mais acessados do mundo —, **95,9% deles apresentam falhas detectáveis de acessibilidade**. Isso não é uma exceção. É a regra. A grande maioria dos sites que você usa hoje provavelmente exclui, em alguma medida, uma parte significativa das pessoas que tentam acessá-lo.

Esse cenário é ainda mais difícil de justificar no Brasil, onde a **Lei Brasileira de Inclusão (Lei 13.146/2015)** torna a acessibilidade digital uma obrigação legal. Sites de órgãos públicos, por exemplo, devem seguir obrigatoriamente o padrão **e-MAG**. A lei existe. Os dados existem. E as falhas continuam existindo.

Por que isso acontece? Os principais fatores que encontramos ao longo desta pesquisa são:

- **Acessibilidade raramente é prioridade no ciclo de desenvolvimento.** Ela costuma ser tratada como um ajuste de última hora, quando é tratada. As equipes não são treinadas para pensar nisso desde o início do projeto. *(WebAIM Million Report, 2026)*

- **As ferramentas automatizadas detectam apenas parte do problema.** Plataformas como o Lighthouse e o WAVE são capazes de identificar entre 30% e 40% das falhas reais de acessibilidade. O restante só é detectável com navegação manual e uso de tecnologias assistivas, como leitores de tela. *(Deque Systems / documentação axe-core)*

- **A métrica de "score" cria uma falsa sensação de segurança.** Um site pode ter pontuação razoável em ferramentas automáticas e ainda assim ser inacessível na prática. A análise crítica de um ser humano é insubstituível, a nota gerada por ferramentas como o Lighthouse é apenas o ponto de partida, não a conclusão. *(Google Lighthouse Accessibility Docs)*

- **O impacto da exclusão digital ainda não é tratado como problema de negócio.** Empresas não associam acessibilidade a crescimento de mercado, apesar de pessoas com deficiência e seus círculos de convivência representarem uma fatia expressiva do poder de compra global. *(WebAIM Million Report, 2026)*

É dentro desse contexto que esta pesquisa se aprofunda: como as falhas são medidas, quais ferramentas existem para isso, o que elas conseguem, e o que não conseguem, detectar, e o que um desenvolvedor pode fazer, concretamente, para mudar esse quadro.

---

## Ferramentas e Relatório de Acessibilidade

Para medir acessibilidade de forma consistente, não existe uma única ferramenta que resolva tudo. O processo ideal combina **análise automatizada**, capaz de mapear erros técnicos de forma rápida e padronizada, com **avaliação humana**, que contextualiza esses erros e identifica problemas que nenhum algoritmo consegue capturar sozinho. Essa combinação é ideal devido a análise crítica que apenas o ser humano pode fazer diante de tantos scores distintos entre as plataformas, e às vezes até errôneos. Para analisar esses resultados, nós selecionamos as duas principais ferramentas que utilizamos nesta pesquisa , que foram o **WAVE** e o **Google Lighthouse**, cada uma com abordagens distintas e complementares; que além de tudo nos mostrarão a importância da conclusão humana.

### WAVE, Web Accessibility Evaluation Tool

O WAVE é uma ferramenta desenvolvida pela WebAIM que analisa páginas web diretamente no navegador, destacando visualmente os erros e alertas de acessibilidade encontrados no HTML. Ao contrário de ferramentas que apenas geram relatórios em texto, o WAVE sobrepõe ícones coloridos sobre a página real, tornando imediata a identificação de onde cada problema está localizado.

O que o WAVE avalia:

- Presença e qualidade de textos alternativos em imagens (`alt`)
- Contraste entre texto e plano de fundo
- Estrutura de cabeçalhos (`h1`, `h2`, `h3`...)
- Uso de atributos ARIA e se estão corretamente referenciados
- Elementos de formulário sem rótulos associados
- Links sem descrição compreensível

**Relatório WAVE, Banco Original**

A análise do site do Banco Original pelo WAVE retornou um **AIM Score de 1,9/10**, evidenciando um nível crítico de não conformidade com as diretrizes de acessibilidade. Os principais erros encontrados foram:

**Contraste insuficiente ("Very low contrast 1:1")**
Ocorre quando a cor do texto e a cor do plano de fundo possuem luminância muito semelhante, tornando o conteúdo ilegível, especialmente para pessoas com baixa visão ou daltonismo. As diretrizes WCAG exigem uma taxa mínima de contraste de **4,5:1** para textos normais. A correção é feita via CSS, ajustando as variáveis de cor do projeto e validando o resultado com ferramentas como o Colour Contrast Analyser.

```css
/* Exemplo de correção */
color: #1a1a1a;        /* texto escuro */
background-color: #ffffff; /* fundo branco, contraste 21:1 ✓ */
```

**Texto alternativo ausente ("Missing alternative text")**
Imagens sem o atributo `alt` são completamente invisíveis para leitores de tela, o usuário com deficiência visual simplesmente não tem acesso àquela informação. A solução é simples: adicionar descrições significativas no atributo `alt` de cada `<img>`, ou `alt=""` quando a imagem for puramente decorativa.

```html
<!-- Errado -->
<img src="cartao-credito.png">

<!-- Correto -->
<img src="cartao-credito.png" alt="Cartão de crédito Banco Original Mastercard Platinum">

<!-- Imagem decorativa -->
<img src="divisor.png" alt="">
```

**Referências ARIA quebradas**
Atributos como `aria-labelledby` e `aria-describedby` apontavam para IDs que não existiam no DOM, tornando os elementos incompreensíveis para tecnologias assistivas. A correção exige garantir que todo ID referenciado exista de fato na página e esteja associado ao elemento correto.

```html
<!-- Errado: o ID não existe -->
<input aria-labelledby="campo-nome">

<!-- Correto -->
<label id="campo-nome">Nome completo</label>
<input aria-labelledby="campo-nome">
```

**Hierarquia de cabeçalhos pulada**
Foram identificados saltos de `h1` direto para `h3`, quebrando a hierarquia semântica da página. Isso prejudica a navegação de usuários que usam leitores de tela para "escanear" o conteúdo pelos títulos. O correto é seguir uma progressão lógica e contínua: `h1` → `h2` → `h3`.

---

### Google Lighthouse

O Lighthouse é uma ferramenta desenvolvida pelo Google, integrada ao DevTools do Chrome, que avalia páginas web em cinco dimensões: **Desempenho**, **Acessibilidade**, **Melhores Práticas**, **SEO** e **PWA**. Diferentemente do WAVE, que foca exclusivamente em acessibilidade e exibe os problemas visualmente sobre a página, o Lighthouse gera um relatório estruturado com pontuações de 0 a 100 em cada categoria, o que facilita o acompanhamento da evolução do site ao longo do tempo.

A pontuação segue a seguinte escala:

| Faixa | Cor | Significado |
|---|---|---|
| 0 – 49 | 🔴 Vermelho | Crítico |
| 50 – 89 | 🟠 Laranja | Precisa de melhorias |
| 90 – 100 | 🟢 Verde | Bom |

O que o Lighthouse avalia dentro de **Acessibilidade**:

- Contraste de cores entre texto e fundo
- Uso correto e semântico de atributos ARIA
- Presença de `alt` em imagens
- Navegabilidade via teclado (ordem de foco, elementos focáveis)
- Estrutura semântica do HTML (cabeçalhos, landmarks, listas)
- Rótulos em campos de formulário

Uma particularidade importante do Lighthouse é que ele também considera dados reais de uso por meio dos **Core Web Vitals**, métricas que avaliam a experiência concreta de navegação, como o tempo até o primeiro conteúdo aparecer na tela (FCP) e o tempo em que a página fica bloqueada para interação (TBT). Isso torna sua análise mais próxima do que o usuário real experimenta.

**Relatório Lighthouse, Banco Original**

A análise do Banco Original pelo Lighthouse retornou pontuação crítica na categoria de acessibilidade, consistente com os problemas já identificados pelo WAVE. Os principais diagnósticos apontados foram:

- **Contraste insuficiente** entre elementos de texto e plano de fundo, em múltiplos componentes da interface.
- **Atributos ARIA mal utilizados**, elementos com roles e propriedades ARIA incorretos ou sem correspondência no DOM.
- **Imagens sem texto alternativo**, mesma falha identificada pelo WAVE, confirmando a consistência do problema.
- **Campos de formulário sem label associado**, impedindo que leitores de tela identifiquem o propósito de cada campo ao usuário.

O ponto mais importante a se entender sobre o Lighthouse é o seguinte: **uma pontuação razoável não significa um site acessível**. A ferramenta cobre uma fração dos critérios WCAG. Problemas como fluxo de foco confuso, linguagem inacessível, ou interações que só funcionam com mouse não aparecem no score, e só um ser humano navegando pelo site consegue identificá-los.

> **Nota sobre a média do grupo J&F:** a análise das principais empresas da Holding J&F resultou em uma média de acessibilidade de **3,85/10** segundo o Lighthouse, confirmando que o problema não é isolado ao Banco Original, mas sistêmico dentro do grupo.

---

### Como as ferramentas se complementam

|              Critério               |       WAVE        |        Lighthouse        |
|-------------------------------------|-------------------|--------------------------|
| Visualização dos erros na página    |  Sim, sobrepostos | Não, apenas no relatório |
| Pontuação numérica por categoria    |  Não              |  Sim (0–100)             |
| Análise de desempenho e SEO         |  Não              |  Sim                     |
| Facilidade para iniciantes          |  Alta             |  Média                   |
| Profundidade técnica do diagnóstico |  Média            |  Alta                    |
| Cobertura de critérios WCAG         | ~30–40%           | ~30–40%                  |

Nenhuma das duas ferramentas, isoladamente, é suficiente. Foi possível ver que diferentes plataformas tiveram avalaiações completamente diferentes quanto a acessibilidade do site. Por isso, o processo ideal é: **WAVE para identificação visual rápida** → **Lighthouse para análise estruturada e acompanhamento**, e por fim → **revisão humana com leitor de tela** para capturar o que nenhuma automação alcança, e fundamental para julgar qual dos resultados é conviniente, e relevante para a avaliação final.

---

## Como isso afeta o nosso trabalho como desenvolvedores

Conhecer os dados e as ferramentas é o primeiro passo. O segundo, e mais importante, é mudar o que você escreve no código. Abaixo estão três práticas concretas que qualquer desenvolvedor pode adotar a partir de agora.

### 1. Escreva HTML semântico desde o início

A maioria dos erros encontrados no Banco Original, hierarquia de cabeçalhos quebrada, imagens sem `alt`, campos sem label, são problemas de HTML mal escrito, não de design complexo. A correção começa antes de qualquer ferramenta: na hora de estruturar o código.

```html
<!-- Errado: div genérica sem semântica -->
<div class="titulo">Abra sua conta</div>
<div class="campo"><input type="text"></div>

<!-- Correto: elementos semânticos com associações corretas -->
<h1>Abra sua conta</h1>
<label for="nome">Nome completo</label>
<input type="text" id="nome" name="nome">
```

### 2. Use atributos ARIA com responsabilidade

ARIA (Accessible Rich Internet Applications) existe para complementar o HTML quando ele não é suficiente para descrever um componente, não para substituí-lo. O erro mais comum é usar ARIA onde um elemento HTML nativo já resolveria, ou referenciar IDs que não existem no DOM.

```html
<!-- Errado: ARIA desnecessário e potencialmente confuso -->
<div role="button" aria-label="Enviar">Enviar</div>

<!-- Correto: elemento nativo que já é acessível por padrão -->
<button type="submit">Enviar</button>

<!-- Quando ARIA é necessário: componente customizado -->
<div role="dialog" aria-labelledby="titulo-modal" aria-modal="true">
  <h2 id="titulo-modal">Confirmar transferência</h2>
  ...
</div>
```

### 3. Integre testes de acessibilidade no seu fluxo de desenvolvimento

Não deixe a acessibilidade para o final do projeto. Ferramentas como o **axe DevTools** (extensão do Chrome) e o **Lighthouse** podem ser rodadas a qualquer momento durante o desenvolvimento, e quanto mais cedo um erro é encontrado, mais barato é corrigi-lo.

Um fluxo mínimo recomendado:

```
1. Durante o desenvolvimento  → axe DevTools no navegador (erros em tempo real)
2. Antes de cada PR/commit    → Lighthouse via CLI ou DevTools
3. Em staging                 → Navegação manual com leitor de tela (NVDA ou VoiceOver)
4. Em produção                → Monitoramento periódico com WAVE
```

Rodar o Lighthouse via terminal, por exemplo, é simples e pode ser integrado a pipelines de CI:

```bash
npx lighthouse https://www.bancoriginal.com.br --only-categories=accessibility --output=html --output-path=./relatorio.html
```

A regra prática é clara: **se você não testa com quem usa tecnologia assistiva, você não sabe se o seu produto funciona para todo mundo.**

# Como Acessibilidade Afeta o Nosso Trabalho como Desenvolvedores

Depois de entender como ferramentas como Lighthouse, axe e NVDA detectam falhas , e principalmente o que **não** detectam, fica claro: acessibilidade não é checklist de fim de sprint. É base do front-end.

---

## Prática 1: Usar Elementos Semânticos de Verdade

**Problema:** Elementos genéricos quebram navegação por teclado e leitores de tela.

**Impacto:** Sem semântica, o usuário perde a estrutura inteira da interface.

```html
<!-- Inacessível -->
<div class="btn-enviar" onclick="enviarFormulario()">Enviar</div>

<!-- Semântico e acessível nativamente -->
<button type="button" class="btn-enviar" onclick="enviarFormulario()">Enviar</button>
```

---

## Prática 2: Garantir Foco Visível

**Problema:** Remover `outline` sem substituir torna a navegação por teclado cega.

**Impacto:** O usuário não sabe onde está na interface sem o mouse.

```css
/* ❌ Nunca só isso */
button { outline: none; }

/* Estilo de foco para teclado */
button:focus-visible {
  outline: 2px solid #FBBF24;
  outline-offset: 2px;
}
```

---

## Prática 3: Dar Contexto para Elementos Interativos

**Problema:** Ferramentas automáticas não detectam botões sem texto descritivo, mas NVDA detecta na hora.

**Impacto:** O usuário ouve só "botão", sem saber a ação.

```html
<!-- Sem contexto -->
<button>
  <img src="icon-close.svg" alt="" />
</button>

<!-- Com aria-label -->
<button aria-label="Fechar modal">
  <img src="icon-close.svg" alt="" aria-hidden="true" />
</button>
```

---

## Prática 4: Integrar Testes no Fluxo de Desenvolvimento

**Problema:** Sem testes automatizados, erros de acessibilidade chegam silenciosamente em produção.

**Impacto:** Regressões invisíveis a cada PR.

```javascript
// Cypress + axe-core
describe('Teste de Acessibilidade da Home', () => {
  it('A página não deve ter violações detectáveis pelo axe', () => {
    cy.visit('http://localhost:3000');
    cy.injectAxe();
    cy.checkA11y();
  });
});
```

> Ferramentas automatizadas cobrem **aproximadamente 30%** dos problemas reais. Complemente com teclado (`Tab`, `Shift+Tab`, `Enter`, `Espaço`) e NVDA.

---

## Resumo

|     O que testar      |           Como testar            |
|-----------------------|----------------------------------|
| Contraste de cor      | Lighthouse ou DevTools           |
| Erros de código       | axe DevTools ou axe-core         |
| Navegação por teclado | Testar usando apenas Tab e Enter |
| Experiência real      | Validar com NVDA                 |

---

## Reflexão Final

Mais de **96% dos sites** têm falhas de acessibilidade. As ferramentas são gratuitas, já estão no navegador e levam segundos para rodar. A questão não é falta de recurso. **É falta de hábito.**