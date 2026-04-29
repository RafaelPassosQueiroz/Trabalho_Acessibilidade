# Projeto de Pesquisa - Acessibilidade
=======
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

O lighthouse é uma ferramenta do google que avalia o aplicativo em duas partes: 
- A experiência do usuário (Core Web Vitals):
    O Core Web Vitals é um conjunto de métricas que avaliam a experiência do usuário quanto a seu site. Ele possui muito ênfase na avaliação do lighthouse, porque no "laboratório", que é a avaliação do lighthouse, o aplicativo faz um experimento prevendo uma avaliação geral do seu site, e nada mais plausível usando avaliações de usuários reais a outras páginas. Ela não pode ser aplicada sempre porque exige tempo e várias resposta de usuários o que impediria de avaliar todos os sites

- E o principal, diagnósticos de problemas de desempenho em que as principais categorias estão logo abaixo:
1. O desempenho do app: Essa categoria mede quão rápido e eficiente o seu site carrega e responde. Exemplos
	1. First Contentful Paint - Quando o primeiro conteúdo aparece
	2. Total Blocking Time - Tempo que o site fica travado
	3. Speed Index - Velocidade geral de renderização
2. Acessibilidade: Avalia se seu site pode ser usado por todas as pessoas. Exemplos: 
	1. Contraste de cores
	2. Uso correto de ARIA (um conjunto de atributos especiais para melhorar a acessibilidade)
	3. Navegação por teclado
3. Melhores práticas: Aqui ele verifica se o site segue boas práticas modernas de desenvolvimento, incluindo. Exemplos:
	1. Segurança (HTTPS, proteção contra XSS, CSP, etc.)
	2. Código limpo e atualizadao
	3. Uso correto de APIs do navegador
4. SEO: Essa categoria avalia se seu site está preparado para ser encontrado no Google e outros buscadores. Ele basicamente avalia se seu site pode aparecer bem nos resultados de busca. Exemplos:
	1. Estrutura do conteúdo
	2. Se o site pode ser indexado (robots.txt)
	3. Uso de tags HTML corretas
5. Caso você teste no page speed insights ele terá também PWA: Isso significa progressive web app, que são os sites desenvolvidos com tecnologia WEB (HTML, CSS, JS ) que avalia se seu site realmente se comporta como um “app instalável” e confiável, não só um site comum. 

Avaliação:
- 0 a 49 (vermelho): ruim
- 50 a 89 (laranja): precisa de melhorias
- 90 a 100 (verde): bom

Como melhorar sua avaliação:
    O lighthouse devolve a avaliação das métricas mais importantes das categorias, e é a partir dessas devoluções que você, como desenvolvedor , analisa e otimiza no seu site.



