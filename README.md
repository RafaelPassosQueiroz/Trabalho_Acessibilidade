# Projeto de Pesquisa - Acessibilidade
# Projeto de Pesquisa - Acessibilidade

## Sobre esta pesquisa
Esta pesquisa investiga a acessibilidade em sites e sistemas web, tendo como foco a análise do site do banco Original. A partir do uso das ferramentas WAVE e Lighthouse, busca-se responder em que medida a plataforma atende às diretrizes de acessibilidade e quais são os principais obstáculos enfrentados por usuários com diferentes necessidades.

## O que descobrimos
### Principais Achados
- Sites do grupo J&F e da JBS apresentam muitos problemas de acessibilidade, como baixo contraste e falta de `alt` em imagens (Fonte: WAVE).
- Foram encontrados erros estruturais (headings e ARIA), dificultando navegação por leitores de tela (Fonte: Lighthouse).
- A pontuação de acessibilidade geral foi baixa, indicando não conformidade com boas práticas (Fonte: Lighthouse).
- Testes com VoiceOver mostraram dificuldades reais para usuários com deficiência visual.
- Muitos problemas poderiam ser evitados com práticas básicas e testes contínuos (Fonte: WAVE).

## Relatório WAVE - Banco Original
O relatório do WAVE evidencia diversos problemas de acessibilidade, com destaque para erros de contraste e ausência de textos alternativos.

O erro de **“Very low contrast (1:1)”** ocorre quando a cor do texto e do fundo possuem luminância muito semelhante, dificultando ou impossibilitando a leitura, especialmente para usuários com deficiência visual. Tecnicamente, isso viola as diretrizes da WCAG, que exigem uma taxa mínima de contraste de 4.5:1 para textos normais.

A correção consiste em ajustar as cores via CSS, utilizando combinações com maior contraste (por exemplo, texto claro sobre fundo escuro ou vice-versa), podendo validar com ferramentas como contrast checkers.

Outro erro crítico é o **“Missing alternative text”**, que indica que imagens não possuem o atributo `alt`. Isso impede que leitores de tela interpretem o conteúdo visual. A solução é adicionar descrições significativas no atributo `alt` das tags `<img>`, ou `alt=""` quando a imagem for apenas decorativa.

Também foram identificados problemas de **referências ARIA quebradas**, que ocorrem quando atributos como `aria-labelledby` ou `aria-describedby` apontam para IDs inexistentes. A correção exige garantir que todos os IDs referenciados existam no DOM e estejam corretamente associados.

Além disso, há alertas como **níveis de heading pulados**, prejudicando a hierarquia semântica da página. O ideal é seguir uma ordem lógica (`h1` → `h2` → `h3`...).

No geral, esses erros reduzem o AIM Score (1.9/10) e impactam diretamente a usabilidade e acessibilidade, sendo corrigidos com boas práticas de HTML semântico, CSS acessível e validação contínua.

## Relatório Lighthouse - Banco Original
O Lighthouse é uma ferramenta do Google que avalia o aplicativo em duas partes:

### 1. Experiência do usuário (Core Web Vitals)
O Core Web Vitals é um conjunto de métricas que avaliam a experiência do usuário em um site. Ele tem grande importância na análise do Lighthouse, pois considera dados reais de uso para prever a qualidade da navegação.

### 2. Diagnóstico de desempenho
As principais categorias avaliadas são:

1. **Desempenho**
   - First Contentful Paint (FCP)
   - Total Blocking Time (TBT)
   - Speed Index

2. **Acessibilidade**
   - Contraste de cores
   - Uso correto de ARIA
   - Navegação por teclado

3. **Melhores práticas**
   - Segurança (HTTPS, proteção contra XSS, CSP)
   - Código limpo e atualizado
   - Uso correto de APIs

4. **SEO**
   - Estrutura do conteúdo
   - Indexação (robots.txt)
   - Uso de HTML semântico

5. **PWA (Progressive Web App)**
   Avalia se o site se comporta como um aplicativo instalável e confiável.

### Avaliação
- 0 a 49 (vermelho): ruim  
- 50 a 89 (laranja): precisa de melhorias  
- 90 a 100 (verde): bom  

### Como melhorar
O Lighthouse fornece métricas detalhadas que permitem ao desenvolvedor identificar problemas e otimizar o site com base nos resultados apresentados.