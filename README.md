# InMoov Hand Control Website

Este é um site interativo para controle de uma mão robótica em tempo real e aprendizado da linguagem de sinais.

## Funcionalidades

- Controle em tempo real da mão robótica
- Aprendizado do alfabeto em língua gestual portuguesa
- Interface interativa e responsiva
- Visualização 3D da mão robótica

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Three.js para visualização 3D
- Express.js para servidor local

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/cauatavares-afk/inmoov-site-.git
cd inmoov-site
```

2. Instale as dependências:
```bash
npm install
```

3. Para desenvolvimento local:
```bash
npm start
```

O site estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
inmoov-site/
├── css/
│   ├── style.css
│   └── controle.css
├── js/
│   ├── main.js
│   ├── three-setup.js
│   └── controle.js
├── models/
│   └── mano_hand_cyborg.glb
├── images/
│   └── thumbnails/
├── index.html
├── controlo.html
├── alfabeto.html
├── sobre.html
├── server.js
└── package.json
```

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 