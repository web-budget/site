# site

Site público do [webBudget](https://webbudget.com.br), em HTML e CSS puros, sem etapa de build.

## Estrutura

Tudo o que vai ao ar fica em `public/`:

- `index.html` e as demais páginas;
- `styles.css`: tokens do Caderno verde (claro e escuro), fontes e estilos base;
- `theme.js`: botão de tema, com a escolha salva em `localStorage` (chave `webbudget.site.theme`);
- `home.js`: botão "Copiar e-mail" da página inicial;
- `assets/og-image.png`: imagem de compartilhamento (1200×630), gerada de `tools/og-image.html`;
- `assets/fonts/`: IBM Plex Sans e IBM Plex Mono em `woff2`, com a licença OFL;
- `favicon.svg` e `apple-touch-icon.png`: a marca do webBudget.

O site não usa analytics, cookies nem serviços de terceiros: fontes, marca e scripts saem do próprio domínio.

## Abrir localmente

Qualquer servidor estático servindo a pasta `public/` serve. Por exemplo:

```sh
python -m http.server 8000 --directory public
```

Depois é só abrir http://localhost:8000.

## Deploy

O workflow [`pages.yml`](.github/workflows/pages.yml) publica a pasta `public/` no GitHub Pages a cada push na `main`, ou manualmente por `workflow_dispatch`. Em outras branches ele não roda.

O domínio webbudget.com.br e o HTTPS obrigatório estão configurados nas configurações do Pages do repositório.

## Tokens e marca

Os tokens de cor, raio e tipografia vêm do `client/src/assets/theme.css` do monorepo do webBudget, com os mesmos nomes, e a marca vem de `client/src/assets/brand/mark.svg`. Mudanças no visual do app devem ser refletidas aqui.

## Licença

O código do site segue a licença do repositório ([LICENSE](LICENSE)). As fontes IBM Plex seguem a SIL Open Font License 1.1 (`public/assets/fonts/OFL.txt`).

## Imagem de compartilhamento

`public/assets/og-image.png` é gerada de `tools/og-image.html`, que usa os tokens e as fontes de `public/`. Para regerar, com o Chrome instalado:

```sh
chrome --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=3000 --screenshot=public/assets/og-image.png tools/og-image.html
```
