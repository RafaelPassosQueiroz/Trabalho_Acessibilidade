# Projeto de Pesquisa - Acessibilidade

### Lighthouse
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

Links:
https://neilpatel.com/br/blog/google-lighthouse/
>https://www.youtube.com/watch?v=4PIFK_aTHys
>https://www.youtube.com/watch?v=9kzHrOpyElI
>https://developer.chrome.com/docs/lighthouse/performance/performance-scoring?utm_source=lighthouse&utm_medium=lr&hl=pt-br
>https://developers.google.com/search/docs/appearance/core-web-vitals?hl=pt-br#:~:text=O%20Core%20Web%20Vitals%20%C3%A9%20um%20conjunto,interatividade%20e%20%C3%A0%20estabilidade%20visual%20da%20p%C3%A1gina.
>https://developer.mozilla.org/pt-BR/docs/Web/Accessibility/ARIA