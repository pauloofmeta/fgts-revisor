# Cálculo de Revisão do FGTS com INPC

Esta é uma aplicação em NodeJS que calcula a revisão do FGTS utilizando o índice INPC. A aplicação é capaz de importar um extrato em PDF do FGTS da Caixa Econômica Federal e extrair os dados necessários para realizar o cálculo automaticamente.

## Instalação

Para instalar e configurar o projeto, siga os seguintes passos:

1. Clone este repositório para a sua máquina local.
2. Instale as dependências usando o comando `npm install`.

## Uso

Para usar a aplicação, siga os seguintes passos:

1. Execute o comando `npm dev` para iniciar a aplicação em um ambiente local de desenvolvimento ou `npm build` seguido de `npm start` para iniciar a aplicação em um ambiente de produção.
2. A aplicação irá iniciar uma API REST que possui um endpoint POST para realizar o upload do extrato. O endpoint é: `http://localhost/api/extract`
3. Envie uma solicitação POST para o endpoint `http://localhost/api/extract` com o arquivo PDF do extrato do FGTS como stream.
4. Após enviar a solicitação POST para o endpoint `http://localhost/api/extract`, o resultado será retornado na resposta da requisição.

## Contribuição

Contribuições são bem-vindas e encorajadas! Para contribuir com este projeto, siga os seguintes passos:

1. Fork este repositório.
2. Crie uma nova branch para a sua contribuição.
3. Faça as mudanças desejadas e adicione testes, se necessário.
4. Envie um pull request para a branch principal.

## Créditos

Este projeto foi desenvolvido por Paulo Henrique Sousa da Silva. 

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Para entrar em contato, envie um e-mail para pauloofmeta@gmail.com.
