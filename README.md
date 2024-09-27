# Image Resizer

Este projeto redimensiona imagens de uma pasta de entrada para uma pasta de saída usando a biblioteca `sharp`. Ele processa imagens em paralelo para otimizar o tempo de execução, limitando a quantidade de tarefas simultâneas.

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- npm (gerenciador de pacotes que vem com o Node.js)

### Passos para Instalação

1. Clone este repositório para o seu ambiente local:
   ```bash
   git clone https://github.com/ArthurLVVilla/image-resizer.git
   cd image-resizer

2. Instale as dependências necessárias usando o npm:
	```bash
	npm install p-limit sharp fs-extra

### Configuração
>Acesse o arquivo src/image-resize.mjs e altere as variáveis inputDir e outputDir para apontarem para os diretórios de entrada e saída de imagens que você deseja usar.

### Exemplo:

```bash 
const inputDir = '/caminho/para/pasta/de/entrada';
const outputDir = '/caminho/para/pasta/de/saida';
```

### Como Usar
>Após configurar os diretórios de entrada e saída, você pode iniciar o processo de redimensionamento de imagens com o seguinte comando:

```bash
npm start
```

>Isso redimensionará as imagens encontradas no diretório de entrada para 400x400 pixels e as salvará no diretório de saída, mantendo a estrutura de pastas.

### Tecnologias Utilizadas
*	**sharp** - Biblioteca de manipulação de imagens para Node.js.
*	**fs-extra** - Extensão do fs padrão para fornecer métodos adicionais de manipulação de arquivos.
*	**p-limit** - Controlador de concorrência para limitar o número de promessas executadas em paralelo.

### Contribuições
 > Contribuições são sempre bem-vindas! Se você tiver sugestões de melhorias, problemas ou novas funcionalidades, fique à vontade para abrir uma issue ou enviar um pull request.
