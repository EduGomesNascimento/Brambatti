# Brambatti Odontologia — site institucional

Site estático da clínica Brambatti Odontologia (Portão/RS).

**No ar:** https://brambattiodontologia.com.br (domínio configurado em `CNAME`)

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página inicial |
| `clinica.html` | A clínica |
| `tratamentos.html` | Tratamentos |
| `diferenciais.html` | Diferenciais |
| `equipe.html` | Equipe |
| `avaliacoes.html` | Avaliações de pacientes |
| `insights.html` | Conteúdo e dicas |
| `localizacao.html` | Como chegar |
| `redes.html` | Redes sociais |
| `contato.html` | Contato e agendamento pelo WhatsApp |

Estilos ficam em `css/`, scripts em `js/` e imagens em `assets/`.

## Rodar localmente

É HTML puro, sem build. Basta abrir o `index.html` ou servir a pasta:

```bash
python -m http.server 8000
```

## Publicação

O site é publicado pelo GitHub Pages, com o domínio próprio definido no arquivo `CNAME`.
