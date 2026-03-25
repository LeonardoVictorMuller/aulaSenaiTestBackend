# Plano de testes para o backend de trunfo

- 0. O que é um plano de teste?
    
    Plano de testes é um **documento que organiza o que será testado, como será testado e o que se espera como resultado**.
    
    Um plano de testes funciona como um **roteiro de conferência** de um sistema. Em vez de sair testando “de qualquer jeito”, a gente define antes quais partes serão verificadas, quais entradas serão usadas, quais passos devem ser executados e qual resultado seria considerado correto. Isso ajuda a testar com mais organização, repetir o teste depois e identificar com clareza o que está funcionando e o que está com problema.
    
    Uma definição mais formal seria:
    
    > **Plano de testes é o documento que descreve os objetivos, o escopo, os casos de teste, os procedimentos e os resultados esperados para verificar se um sistema atende ao que foi proposto.**
    > 
    
    Se tá complexo, pode também resumir  em linguagem bem simples:
    
    > **Plano de testes é o planejamento dos testes de um sistema. (kkkkkkkkkkkkkkkkk)**
    > 
    
    Ou ainda:
    
    > **É a lista organizada do que eu vou testar, de que jeito vou testar e do que deve acontecer se estiver certo.**
    > 
    
    Um exemplo bem fácil:
    
    se eu tenho uma API com rota `/dinos/:id`, o plano de testes pode dizer:
    
    - o que testar: busca de dino por id;
    - como testar: enviar um id existente e um inexistente;
    - resultado esperado:
        - com id existente, retorna `200`;
        - com id inexistente, retorna `404`.
    
    Assim você  percebe que testar não é só “clicar e ver no que dá”, mas verificar de forma planejada se o sistema se comporta como deveria.
    
    Uma formulação didática boa como mais uma alternativa é:
    
    > **Plano de testes é o mapa dos testes. Ele diz o que será verificado, quais passos devem ser feitos e qual resultado é esperado.**
    > 

# Checklist formal de testes — API `dino`

## 1. Identificação

**Sistema testado:** API backend de dinos

**Tecnologia:** Node.js, Express, PostgreSQL

**Base de dados:** `trunfo-dino`

**Tabela principal:** `dino`

**Objetivo geral:** validar o funcionamento das rotas da API e sua integração com o banco de dados PostgreSQL.

---

## 2. Objetivo dos testes

Verificar se a API:

- responde corretamente às requisições HTTP;
- acessa corretamente a tabela `dino`;
- persiste alterações no banco;
- retorna os códigos HTTP esperados;
- trata entradas inválidas;
- trata recursos inexistentes;
- lida com erros internos sem interromper o funcionamento do servidor.

---

## 3. Escopo

Estão no escopo os testes das rotas:

- `GET /dinos`
- `GET /dinos/random/:n`
- `GET /dinos/top/fama/:n`
- `GET /dinos/:id`
- `POST /dinos`
- `PUT /dinos/:id`
- `DELETE /dinos/:id`

---

## 4. Pré-condições

Antes de executar os testes, garantir que:

- o servidor esteja rodando na porta `3000`;
- o PostgreSQL esteja ativo;
- o banco `trunfo-dino` exista;
- a tabela `dino` exista;
- a conexão configurada no `Pool` esteja funcional;
- existam registros previamente cadastrados para testes de leitura, ordenação, atualização e remoção.

### Sugestão de massa de dados mínima

Usar ao menos 3 registros conhecidos, por exemplo:

- Dino A com `fama = 10`
- Dino B com `fama = 80`
- Dino C com `fama = 50`

Além disso:

- conhecer ao menos 1 `id` existente;
- reservar 1 `id` inexistente, por exemplo `999999`.

---

## 5. Critérios de aceitação

Um teste será considerado **aprovado** quando:

- o status HTTP retornado estiver correto;
- o formato da resposta estiver correto;
- o conteúdo retornado corresponder ao esperado;
- a alteração no banco realmente acontecer quando aplicável;
- a API não travar ou encerrar indevidamente.

---

## 6. Checklist formal de testes

| ID | Requisito / Objetivo | Rota | Pré-condição | Entrada / Dados de teste | Passos de execução | Resultado esperado | Status 
(✅/❌/⚠️) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT01 | Validar listagem geral de dinos | `GET /dinos` | Tabela `dino` com registros | Nenhuma | Enviar requisição GET para `/dinos` | Retornar status `200` | ✅ |
| CT02 | Validar formato da listagem | `GET /dinos` | Tabela com registros | Nenhuma | Executar `GET /dinos` | Resposta deve ser um array JSON | ✅ |
| CT03 | Validar conteúdo da listagem | `GET /dinos` | Tabela com registros conhecidos | Nenhuma | Executar `GET /dinos` | Array deve conter registros existentes no banco | ✅ |
| CT04 | Validar busca por id existente | `GET /dinos/:id` | Existe um id válido | `id` existente | Enviar `GET /dinos/{id}` | Retornar status `200` | ✅ |
| CT05 | Validar formato da busca por id | `GET /dinos/:id` | Existe um id válido | `id` existente | Executar `GET /dinos/{id}` | Resposta deve ser um objeto JSON | ✅ |
| CT06 | Validar conteúdo da busca por id | `GET /dinos/:id` | Existe um id válido e conhecido | `id` existente | Executar `GET /dinos/{id}` | Objeto retornado deve corresponder ao registro do banco | ✅ |
| CT07 | Validar busca por id inexistente | `GET /dinos/:id` | API em funcionamento | `id = 999999` ou equivalente inexistente | Executar `GET /dinos/999999` | Retornar status `404` e mensagem de erro | ✅ |
| CT08 | Validar busca aleatória com parâmetro válido | `GET /dinos/random/:n` | Tabela com pelo menos 3 registros | `n = 3` | Executar `GET /dinos/random/3` | Retornar status `200` | ✅ |
| CT09 | Validar quantidade retornada na busca aleatória | `GET /dinos/random/:n` | Tabela com vários registros | `n = 3` | Executar `GET /dinos/random/3` | Retornar array com no máximo 3 objetos | ✅ |
| CT10 | Validar tipo da resposta na busca aleatória | `GET /dinos/random/:n` | API em funcionamento | `n = 2` | Executar `GET /dinos/random/2` | Resposta deve ser array JSON | ✅ |
| CT11 | Validar rejeição de `n = 0` | `GET /dinos/random/:n` | API em funcionamento | `n = 0` | Executar `GET /dinos/random/0` | Retornar status `400` | ✅ |
| CT12 | Validar rejeição de `n` negativo | `GET /dinos/random/:n` | API em funcionamento | `n = -1` | Executar `GET /dinos/random/-1` | Retornar status `400` | ✅ |
| CT13 | Validar rejeição de `n` não numérico | `GET /dinos/random/:n` | API em funcionamento | `n = abc` | Executar `GET /dinos/random/abc` | Retornar status `400` | ✅ |
| CT14 | Validar top fama com parâmetro válido | `GET /dinos/top/fama/:n` | Existem dinos com fama variada | `n = 3` | Executar `GET /dinos/top/fama/3` | Retornar status `200` | ✅ |
| CT15 | Validar formato do top fama | `GET /dinos/top/fama/:n` | Existem dinos com fama variada | `n = 3` | Executar `GET /dinos/top/fama/3` | Resposta deve ser array JSON | ✅ |
| CT16 | Validar ordenação por fama | `GET /dinos/top/fama/:n` | Há registros com fama diferente | `n = 3` | Executar `GET /dinos/top/fama/3` | Lista deve vir ordenada por `fama` em ordem decrescente | ✅ |
| CT17 | Validar rejeição de `n = 0` em top fama | `GET /dinos/top/fama/:n` | API em funcionamento | `n = 0` | Executar `GET /dinos/top/fama/0` | Retornar status `400` | ✅ |
| CT18 | Validar rejeição de `n` negativo em top fama | `GET /dinos/top/fama/:n` | API em funcionamento | `n = -2` | Executar `GET /dinos/top/fama/-2` | Retornar status `400` | ✅ |
| CT19 | Validar rejeição de `n` não numérico em top fama | `GET /dinos/top/fama/:n` | API em funcionamento | `n = abc` | Executar `GET /dinos/top/fama/abc` | Retornar status `400` | ✅ |
| CT20 | Validar criação de dino com payload válido | `POST /dinos` | Banco acessível | Body completo e válido | Enviar requisição POST com JSON válido | Retornar status `201` | ✅ |
| CT21 | Validar formato da resposta na criação | `POST /dinos` | Banco acessível | Body completo e válido | Executar `POST /dinos` | Resposta deve ser um objeto JSON com os dados criados | ✅ |
| CT22 | Validar persistência após criação | `POST /dinos` | Banco acessível | Body completo e válido | Criar dino e consultar no banco ou por GET | Registro deve existir na tabela após o POST | ✅ |
| CT23 | Validar criação com body vazio | `POST /dinos` | API em funcionamento | `{}` | Enviar `POST /dinos` com body vazio | Sistema deve rejeitar a entrada; idealmente retornar `400` | ❌ |
| CT24 | Validar criação com campos faltando | `POST /dinos` | API em funcionamento | JSON sem alguns campos obrigatórios | Enviar `POST /dinos` incompleto | Sistema deve rejeitar a entrada; idealmente retornar `400` | ❌ |
| CT25 | Validar criação com tipos inválidos | `POST /dinos` | API em funcionamento | Campos numéricos enviados como texto inválido | Enviar `POST /dinos` com tipos incorretos | Sistema deve rejeitar a entrada; idealmente retornar `400` | ❌ |
| CT26 | Validar atualização de dino existente | `PUT /dinos/:id` | Existe um id válido | `id` existente + body válido | Executar `PUT /dinos/{id}` | Retornar status `200` | ✅ |
| CT27 | Validar retorno da atualização | `PUT /dinos/:id` | Existe um id válido | `id` existente + body válido | Executar `PUT /dinos/{id}` | Resposta deve conter o registro atualizado | ✅ |
| CT28 | Validar persistência da atualização | `PUT /dinos/:id` | Existe um id válido | Alterar um ou mais campos | Executar `PUT` e consultar banco | Alterações devem estar gravadas na tabela | ✅ |
| CT29 | Validar atualização de id inexistente | `PUT /dinos/:id` | API em funcionamento | `id` inexistente + body válido | Executar `PUT /dinos/999999` | Retornar status `404` | ✅ |
| CT30 | Validar atualização com body vazio | `PUT /dinos/:id` | Existe um id válido | `{}` | Executar `PUT /dinos/{id}` com body vazio | Sistema deve rejeitar a entrada; idealmente retornar `400` | ❌ |
| CT31 | Validar atualização com tipos inválidos | `PUT /dinos/:id` | Existe um id válido | Campos numéricos inválidos | Executar `PUT /dinos/{id}` com body inconsistente | Sistema deve rejeitar a entrada; idealmente retornar `400` | ❌ |
| CT32 | Validar exclusão de dino existente | `DELETE /dinos/:id` | Existe um id válido | `id` existente | Executar `DELETE /dinos/{id}` | Retornar status `200` | ✅ |
| CT33 | Validar mensagem de exclusão | `DELETE /dinos/:id` | Existe um id válido | `id` existente | Executar `DELETE /dinos/{id}` | Retornar mensagem de sucesso | ✅ |
| CT34 | Validar remoção efetiva no banco | `DELETE /dinos/:id` | Existe um id válido | `id` existente | Executar `DELETE` e depois consultar o id | Registro não deve mais existir | ✅ |
| CT35 | Validar exclusão de id inexistente | `DELETE /dinos/:id` | API em funcionamento | `id` inexistente | Executar `DELETE /dinos/999999` | Retornar status `404` | ✅ |
| CT36 | Validar tratamento de falha no banco em leitura | `GET /dinos` | Desconectar banco ou invalidar conexão | Nenhuma | Executar `GET /dinos` com banco indisponível | Retornar status `500` e mensagem de erro | ✅ |
| CT37 | Validar tratamento de falha no banco em criação | `POST /dinos` | Banco indisponível | Body válido | Executar `POST /dinos` | Retornar status `500` | ✅ |
| CT38 | Validar tratamento de falha no banco em atualização | `PUT /dinos/:id` | Banco indisponível | `id` válido + body válido | Executar `PUT /dinos/{id}` | Retornar status `500` | ✅ |
| CT39 | Validar tratamento de falha no banco em exclusão | `DELETE /dinos/:id` | Banco indisponível | `id` válido | Executar `DELETE /dinos/{id}` | Retornar status `500` | ✅ |
| CT40 | Validar robustez da API após erro | Qualquer rota | Gerar erro proposital em uma requisição anterior | Requisição válida após erro | Executar uma requisição válida depois de uma inválida | API deve continuar operacional | ❌ |

---

---

## 7. Resumo por categoria

Leitura: CT01 a CT19

Criação: CT20 a CT25

Atualização: CT26 a CT31

Exclusão: CT32 a CT35

Tratamento de erro / robustez: CT36 a CT40

---

## 8. Modelo de fechamento da execução

Ao final, você pode usar este campo de conclusão no documento:

**Resultado geral da execução:**

- Total de testes previstos: 40
- Total aprovados: 40
- Total reprovados: 0
- Total não executados: 0

**Conclusão:**

(x) A API atende satisfatoriamente aos requisitos básicos testados.

( ) A API atende parcialmente aos requisitos básicos testados.

( ) A API não atende aos requisitos básicos testados.

**Principais não conformidades encontradas:**

---

---

---

**Responsável pela execução:** Leonardo Victor

**Data:** 25/ 03/ 2026

# 🦖 Plano de Testes da API Dino

Abaixo estão listados os casos de teste (CT) executados para validar as rotas, a persistência de dados e o tratamento de erros da API.

| ID | Requisito / Objetivo | Rota | Pré-condição | Entrada / Dados | Passos de Execução | Resultado Esperado | Status |
|:---:|:---|:---|:---|:---|:---|:---|:---:|
| **CT01** | Validar listagem geral | `GET /dinos` | Tabela com registros | Nenhuma | Enviar GET para `/dinos` | Retornar status 200 | ✅ |
| **CT02** | Validar formato da listagem | `GET /dinos` | Tabela com registros | Nenhuma | Executar GET `/dinos` | Resposta deve ser um array JSON | ✅ |
| **CT03** | Validar conteúdo da listagem | `GET /dinos` | Tabela com registros conhecidos | Nenhuma | Executar GET `/dinos` | Array deve conter registros do banco | ✅ |
| **CT04** | Validar busca por ID existente | `GET /dinos/:id` | Existe um ID válido | ID existente | Enviar GET `/dinos/{id}` | Retornar status 200 | ✅ |
| **CT05** | Validar formato da busca por ID | `GET /dinos/:id` | Existe um ID válido | ID existente | Executar GET `/dinos/{id}` | Resposta deve ser um objeto JSON | ✅ |
| **CT06** | Validar conteúdo da busca por ID | `GET /dinos/:id` | ID válido e conhecido | ID existente | Executar GET `/dinos/{id}` | Objeto deve corresponder ao banco | ✅ |
| **CT07** | Validar busca por ID inexistente | `GET /dinos/:id` | API em funcionamento | ID = 999999 | Executar GET `/dinos/999999` | Retornar 404 e mensagem de erro | ✅ |
| **CT08** | Busca aleatória (válida) | `GET /dinos/random/:n` | Tabela com min. 3 registros | n = 3 | Executar GET `/dinos/random/3` | Retornar status 200 | ✅ |
| **CT09** | Quantidade busca aleatória | `GET /dinos/random/:n` | Tabela com registros | n = 3 | Executar GET `/dinos/random/3` | Array com no máximo 3 objetos | ✅ |
| **CT10** | Tipo busca aleatória | `GET /dinos/random/:n` | API em funcionamento | n = 2 | Executar GET `/dinos/random/2` | Resposta deve ser array JSON | ✅ |
| **CT11** | Rejeição n = 0 | `GET /dinos/random/:n` | API em funcionamento | n = 0 | Executar GET `/dinos/random/0` | Retornar status 400 | ✅ |
| **CT12** | Rejeição n negativo | `GET /dinos/random/:n` | API em funcionamento | n = -1 | Executar GET `/dinos/random/-1` | Retornar status 400 | ✅ |
| **CT13** | Rejeição n não numérico | `GET /dinos/random/:n` | API em funcionamento | n = abc | Executar GET `/dinos/random/abc` | Retornar status 400 | ✅ |
| **CT14** | Top fama (válido) | `GET /dinos/top/fama/:n`| Dinos com fama variada | n = 3 | Executar GET `/dinos/top/fama/3` | Retornar status 200 | ✅ |
| **CT15** | Formato top fama | `GET /dinos/top/fama/:n`| Dinos com fama variada | n = 3 | Executar GET `/dinos/top/fama/3` | Resposta deve ser array JSON | ✅ |
| **CT16** | Ordenação por fama | `GET /dinos/top/fama/:n`| Registros com fama dif. | n = 3 | Executar GET `/dinos/top/fama/3` | Lista ordenada decrescente por fama | ✅ |
| **CT17** | Rejeição n = 0 (top fama) | `GET /dinos/top/fama/:n`| API em funcionamento | n = 0 | Executar GET `/dinos/top/fama/0` | Retornar status 400 | ✅ |
| **CT18** | Rejeição n negativo (fama) | `GET /dinos/top/fama/:n`| API em funcionamento | n = -2 | Executar GET `/dinos/top/fama/-2` | Retornar status 400 | ✅ |
| **CT19** | Rejeição n não numérico | `GET /dinos/top/fama/:n`| API em funcionamento | n = abc | Executar GET `/dinos/top/fama/abc` | Retornar status 400 | ✅ |
| **CT20** | Criação (payload válido) | `POST /dinos` | Banco acessível | Body completo | Enviar POST com JSON válido | Retornar status 201 | ✅ |
| **CT21** | Formato resposta criação | `POST /dinos` | Banco acessível | Body completo | Executar POST `/dinos` | Resposta deve ser objeto JSON | ✅ |
| **CT22** | Persistência pós-criação | `POST /dinos` | Banco acessível | Body completo | Criar e consultar via GET | Registro deve existir no banco | ✅ |
| **CT23** | Criação com body vazio | `POST /dinos` | API em funcionamento | `{}` | Enviar POST com body vazio | Retornar 400 (Bad Request) | ❌ |
| **CT24** | Criação campos faltando | `POST /dinos` | API em funcionamento | JSON incompleto | Enviar POST sem campos obrigatórios| Retornar 400 (Bad Request) | ❌ |
| **CT25** | Criação tipos inválidos | `POST /dinos` | API em funcionamento | Tipos incorretos | Enviar POST com tipos inválidos | Retornar 400 (Bad Request) | ❌ |
| **CT26** | Atualização existente | `PUT /dinos/:id` | Existe um ID válido | ID + body válido | Executar PUT `/dinos/{id}` | Retornar status 200 | ✅ |
| **CT27** | Retorno da atualização | `PUT /dinos/:id` | Existe um ID válido | ID + body válido | Executar PUT `/dinos/{id}` | Resposta com registro atualizado | ✅ |
| **CT28** | Persistência atualização | `PUT /dinos/:id` | Existe um ID válido | Alterar campos | Executar PUT e consultar banco | Alterações gravadas com sucesso | ✅ |
| **CT29** | Atualização ID inexistente | `PUT /dinos/:id` | API em funcionamento | ID inexistente | Executar PUT `/dinos/999999` | Retornar status 404 | ✅ |
| **CT30** | Atualização body vazio | `PUT /dinos/:id` | Existe um ID válido | `{}` | PUT com body vazio | Retornar 400 (Bad Request) | ❌ |
| **CT31** | Atualização tipos inválidos| `PUT /dinos/:id` | Existe um ID válido | Tipos incorretos | PUT com body inconsistente | Retornar 400 (Bad Request) | ❌ |
| **CT32** | Exclusão existente | `DELETE /dinos/:id` | Existe um ID válido | ID existente | Executar DELETE `/dinos/{id}` | Retornar status 200 | ✅ |
| **CT33** | Mensagem de exclusão | `DELETE /dinos/:id` | Existe um ID válido | ID existente | Executar DELETE `/dinos/{id}` | Retornar mensagem de sucesso | ✅ |
| **CT34** | Remoção efetiva no banco | `DELETE /dinos/:id` | Existe um ID válido | ID existente | DELETE e consultar o ID | Registro não deve mais existir | ✅ |
| **CT35** | Exclusão ID inexistente | `DELETE /dinos/:id` | API em funcionamento | ID inexistente | Executar DELETE `/dinos/999999` | Retornar status 404 | ✅ |
| **CT36** | Falha no banco (Leitura) | `GET /dinos` | Banco indisponível | Nenhuma | Executar GET `/dinos` | Retornar 500 e erro amigável | ✅ |
| **CT37** | Falha no banco (Criação) | `POST /dinos` | Banco indisponível | Body válido | Executar POST `/dinos` | Retornar status 500 | ✅ |
| **CT38** | Falha no banco (Update) | `PUT /dinos/:id` | Banco indisponível | ID + body válidos | Executar PUT `/dinos/{id}` | Retornar status 500 | ✅ |
| **CT39** | Falha no banco (Delete) | `DELETE /dinos/:id` | Banco indisponível | ID válido | Executar DELETE `/dinos/{id}` | Retornar status 500 | ✅ |
| **CT40** | Robustez da API pós-erro | Qualquer rota | Erro prévio gerado | Requisição válida | Executar chamada válida após erro | API deve continuar operacional | ❌ |