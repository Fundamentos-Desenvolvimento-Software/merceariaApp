const estoque = {
  "Churrasco": {
    "qtde": 10,
    "preco": 30.00
  },
  "Bauru": {
    "qtde": 15,
    "preco": 18.00
  },
  "Empada": {
    "qtde": 20,
    "preco": 15.00
  },
  "Cachorro-quente": {
    "qtde": 25,
    "preco": 12.50
  }
};

function validarCamposObrigatorios(produto, quantidade, preco, data){
  //RN.01 - Validação de Campos Obrigatórios
  return produto && quantidade != null && preco != null && data;
}

function validarQuantidadeProdutos(quantidade){
  //RN.02 - Validação de Quantidade de Produtos
  return quantidade > 0;
}

function validarPrecoUnitario(preco){
  //RN.03 - Validação de Preço Unitário
  return preco > 0;
}

function obterDataTransacao(){
  //RN.04 - Registro de Data da Transação  
  return new Date().toLocaleString();
}

function gerarNumeroTransacao(){
  //RN.05 - Geração de Número de Transação Único
  return Math.floor(Math.random() * 10000000);
}

function registrarHistorico(mensagem){
  //RN.06 - Histórico de Alterações
  const historicoVendas = document.getElementById("historicoVendas");
  const li = document.createElement("li");
  li.textContent = mensagem;
  historicoVendas.appendChild(li);
}

function atualizarEstoque(produto, quantidade){
  //RN.07 - Atualização Automática do Estoque
  estoque[produto].qtde = estoque[produto].qtde - quantidade;
}

function validarEstoque(produto, quantidade){

  if(estoque[produto] != null){
    if(estoque[produto].qtde >= quantidade){
       return true;   
    }    
  }
  return false;
}

function registrarVenda(produto, quantidade, preco){
  
  let data = obterDataTransacao();
  let numeroTransacao = gerarNumeroTransacao();

  let validaCampos = validarCamposObrigatorios(produto, quantidade, preco, data);
  let validaQuantidade = validarQuantidadeProdutos(quantidade);
  let validaPreco = validarPrecoUnitario(preco);
  let validaEstoque = validarEstoque(produto, quantidade);
  
  if(validaCampos){
    if(validaQuantidade){
      if(validaPreco){
        if(validaEstoque){
          
          atualizarEstoque(produto, quantidade);

          return "["+numeroTransacao+"] Venda registrada com sucesso: " + produto + ", " + quantidade + " unidades, R$" + preco + " por unidade, em " + data;
        } else {
          return "Problemas na quantidade produtos no estoque!";
        }        
      } else {
        return "Problemas na validação do preço unitário!";
      }
    } else {
      return "Problemas na validação da quantidade produtos!";
    }
  } else {
    return "Problemas na validação dos campos obrigatórios!";
  }
}

function vender(){
  const produto = document.getElementById("produto").value;
  const quantidade = document.getElementById("quantidade").value;
  const preco = document.getElementById("preco").value;

  let mensagem = registrarVenda(produto, quantidade, preco);

  registrarHistorico(mensagem);
}
