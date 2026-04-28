# Projeto de Pesquisa - Acessibilidade

# Sobre esta pesquisa

Esta pesquisa investiga a acessibilidade em sites e sistemas web, tendo como foco a análise do site do banco Original. A partir 
do uso das ferramentas WAVE e Lighthouse, busca-se responder em que medida a plataforma atende às diretrizes de acessibilidade e 
quais são os principais obstáculos enfrentados por usuários com diferentes necessidades.


# O que descobrimos
## O que descobrimos (Principais Achados)

* A análise revelou que grande parte dos sites do grupo J&F e da JBS apresenta falhas recorrentes de acessibilidade, como baixo contraste de cores e ausência de textos alternativos em imagens, comprometendo a experiência de usuários com deficiência visual (Fonte: WAVE).
* Foi identificado um alto número de erros estruturais, incluindo problemas de hierarquia de headings e uso inadequado de atributos ARIA, o que dificulta a navegação por leitores de tela (Fonte: Lighthouse).
* A pontuação geral de acessibilidade dos sites analisados foi baixa, indicando que as plataformas não seguem adequadamente as diretrizes recomendadas pelas WCAG (Fonte: Lighthouse).
* Durante a pesquisa, foram exploradas ferramentas assistivas como o VoiceOver, evidenciando na prática as dificuldades enfrentadas por usuários que dependem de leitores de tela para navegação.
* Observou-se que muitos dos problemas encontrados poderiam ser corrigidos com boas práticas simples de desenvolvimento, como uso correto de HTML semântico, descrição adequada de imagens e ajustes de contraste, reforçando a importância de testes contínuos com ferramentas como o WAVE e o Lighthouse.




# Relatório WAVE - Banco Original
O relatório do WAVE evidencia diversos problemas de acessibilidade, com destaque para erros de contraste e ausência de textos alternativos. O erro de **“Very low contrast (1:1)”** ocorre quando a cor do texto e do fundo possuem luminância muito semelhante, dificultando ou impossibilitando a leitura, especialmente para usuários com deficiência visual. Tecnicamente, isso viola as diretrizes da WCAG, que exigem uma taxa mínima de contraste de 4.5:1 para textos normais. A correção consiste em ajustar as cores via CSS, utilizando combinações com maior contraste (por exemplo, texto claro sobre fundo escuro ou vice-versa), podendo validar com ferramentas como contrast checkers.

Outro erro crítico é o **“Missing alternative text”**, que indica que imagens não possuem o atributo `alt`. Isso impede que leitores de tela interpretem o conteúdo visual. A solução é adicionar descrições significativas no atributo `alt` das tags `<img>`, ou `alt=` quando a imagem for apenas decorativa.

Também foram identificados problemas de **referências ARIA quebradas**, que ocorrem quando atributos como `aria-labelledby` ou `aria-describedby` apontam para IDs inexistentes. A correção exige garantir que todos os IDs referenciados existam no DOM e estejam corretamente associados.

Além disso, há alertas como **níveis de heading pulados**, prejudicando a hierarquia semântica da página. O ideal é seguir uma ordem lógica (`h1` → `h2` → `h3`...). No geral, esses erros reduzem o AIM Score (1.9/10) e impactam diretamente a usabilidade e acessibilidade, sendo corrigidos com boas práticas de HTML semântico, CSS acessível e validação contínua.
