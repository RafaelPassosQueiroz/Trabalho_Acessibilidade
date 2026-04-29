# Projeto de Pesquisa - Acessibilidade

# Sobre esta pesquisa

Esta pesquisa investiga a acessibilidade em sites e sistemas web, tendo como foco a análise do site do banco Original. A partir 
do uso das ferramentas WAVE e Lighthouse, busca-se responder em que medida a plataforma atende às diretrizes de acessibilidade e 
quais são os principais obstáculos enfrentados por usuários com diferentes necessidades.


# O que descobrimos
## O que descobrimos (Principais Achados)
- Sites do grupo J&F e da JBS apresentam muitos problemas de acessibilidade, como baixo contraste e falta de alt em imagens (Fonte: WAVE).
- Foram encontrados erros estruturais (headings e ARIA), dificultando navegação por leitores de tela (Fonte: Lighthouse).
- A pontuação de acessibilidade geral foi baixa, indicando não conformidade com boas práticas (Fonte: Lighthouse).
- Testes com VoiceOver mostraram dificuldades reais para usuários com deficiência visual.
- Muitos problemas poderiam ser evitados com práticas básicas e testes contínuos (Fonte: WAVE).




## Relatório WAVE - Banco Original
O relatório do WAVE evidencia diversos problemas de acessibilidade, com destaque para erros de contraste e ausência de textos alternativos. O erro de **“Very low contrast (1:1)”** ocorre quando a cor do texto e do fundo possuem luminância muito semelhante, dificultando ou impossibilitando a leitura, especialmente para usuários com deficiência visual. Tecnicamente, isso viola as diretrizes da WCAG, que exigem uma taxa mínima de contraste de 4.5:1 para textos normais. A correção consiste em ajustar as cores via CSS, utilizando combinações com maior contraste (por exemplo, texto claro sobre fundo escuro ou vice-versa), podendo validar com ferramentas como contrast checkers.

Outro erro crítico é o **“Missing alternative text”**, que indica que imagens não possuem o atributo `alt`. Isso impede que leitores de tela interpretem o conteúdo visual. A solução é adicionar descrições significativas no atributo `alt` das tags `<img>`, ou `alt=` quando a imagem for apenas decorativa.

Também foram identificados problemas de **referências ARIA quebradas**, que ocorrem quando atributos como `aria-labelledby` ou `aria-describedby` apontam para IDs inexistentes. A correção exige garantir que todos os IDs referenciados existam no DOM e estejam corretamente associados.

Além disso, há alertas como **níveis de heading pulados**, prejudicando a hierarquia semântica da página. O ideal é seguir uma ordem lógica (`h1` → `h2` → `h3`...). No geral, esses erros reduzem o AIM Score (1.9/10) e impactam diretamente a usabilidade e acessibilidade, sendo corrigidos com boas práticas de HTML semântico, CSS acessível e validação contínua.


## Relatório LightHouse - Banco Original

Parte do Edu



## Principais fontes usadas

- WebAIM. WebAIM Million Report. 2024. https://webaim.org/projects/million/
- Deque Systems. axe-core Documentation. s.d. https://github.com/dequelabs/axe-core
- Google. Lighthouse: Accessibility Audit Documentation. s.d. https://developer.chrome.com/docs/lighthouse/accessibility/
- NV Access. NVDA Screen Reader. s.d. https://www.nvaccess.org/
- Banco Original. Landing Page Banco Original. s.d. https://www.original.com.br/