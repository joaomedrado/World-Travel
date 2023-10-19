
class CriaElementosDom {
    constructor(tagElemento, atributosElemento, noPaiElemento, tipoEvento, funcaoEvento, funcaoEvento2, elementoTeste) {
        this.tagElemento = tagElemento;
        this.atributosElemento = atributosElemento;
        this.noPaiElemento = noPaiElemento
        this.constroiElemento = this.metodoConstrucaoElemento();
        this.tipoEvento = tipoEvento
        this.funcaoEvento = funcaoEvento
        this.funcaoEvento2 = funcaoEvento2
        this.metodoRenderizarElemento()
        this.metodoFuncoesEvento()
        this.metodoFuncoesEvento2()

    }

    metodoConstrucaoElemento() {
        const elemento = document.createElement(this.tagElemento);
        Object.assign(elemento, this.atributosElemento);
        return elemento;
    }

    metodoRenderizarElemento() {
        const noPaiElemento = this.noPaiElemento;

        if (noPaiElemento) {
            noPaiElemento.append(this.constroiElemento);
        } else {
            console.error(`Elemento pai com o ID '${noPaiElemento}' não encontrado.`);
        }
    }
    criarNodoComClasse(outraClasse) {
        if (outraClasse instanceof CriaElementosDom) {
            this.constroiElemento.appendChild(outraClasse.constroiElemento);
        } else {
            console.error("Classe inválida. Deve ser uma instância de CriaElementosDom.");
        }
    }

    metodoFuncoesEvento() {
        this.constroiElemento.addEventListener(this.tipoEvento, this.funcaoEvento)
    }
    metodoFuncoesEvento2() {
        this.funcaoEvento2
    }


}


async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ocorreu um erro na requisição da API:", error);
        return [];
    }
}



let divAtivada = null  // Variável global para rastrear se a cidade está ativa no modal
function ativarModal(elementoAcionado, cidade) {
    const corpoModal = document.querySelector(`.modal-body`)

    if (divAtivada === elementoAcionado) {   // Verificação se a cidade já está presente no modal 
        return
    } else { // Se a cidade não estiver presente ele cria os elementos abaixo
        corpoModal.innerHTML = ``
        const alinhaElementos = new CriaElementosDom(`div`, { id: `idAlinhaElementos`, classList: `alinhaElementos ` }, corpoModal)
        const corpoFilhoPrincipal = new CriaElementosDom(`div`, { id: `idCorpoFilhoPrincipal`, classList: `estiloCorpoFilhoPrincipal  ` }, alinhaElementos.constroiElemento)
        const subDivAlinhamentoFilhoPrincipal1 = new CriaElementosDom(`div`, { id: `idSubDivAlinhamentoFilhoPrincipal1 `, classList: `estiloSubDivAlinhamentoFilhoPrincipal1` }, corpoFilhoPrincipal.constroiElemento)
        const alinhaIformacoesDiaVoo = new CriaElementosDom(`div`, { id: `idAlinhaIformacoesDiaVoo`, classList: `estiloAlinhaIformacoesDiaVoo` }, subDivAlinhamentoFilhoPrincipal1.constroiElemento)
        const paragrafoInformacoesIda = new CriaElementosDom(`p`, { classList: `paragrafoModal`, innerHTML: `<span class="coresDiferentes">Ida</span>` }, alinhaIformacoesDiaVoo.constroiElemento)
        const paragrafoInformacoesIda2 = new CriaElementosDom(`p`, { classList: `paragrafoModal`, innerText: `${cidade.diaVoo} de ${cidade.mesVoo}` }, alinhaIformacoesDiaVoo.constroiElemento)
        const paragrafoInformacoesIda3 = new CriaElementosDom(`p`, { classList: `paragrafoModal`, innerText: `Classe Economica` }, alinhaIformacoesDiaVoo.constroiElemento)

        const subDivAlinhamentoFilhoPrincipal2 = new CriaElementosDom(`div`, { id: `idSubDivAlinhamentoFilhoPrincipal2`, classList: `estiloSubDivAlinhamentoFilhoPrincipal2` }, corpoFilhoPrincipal.constroiElemento)
        const paragrafoInformacoesHoraPartida = new CriaElementosDom(`p`, { innerHTML: `<span class= "coresDiferentes">GRU</span> ${cidade.horaIda}`, classList: `estiloParagrafoInformacoesHora` }, subDivAlinhamentoFilhoPrincipal2.constroiElemento)

        const divAlinhaElementosTempoDeViagem = new CriaElementosDom(`div`, { id: `idDivAlinhaElementosTempoDeViagem`, classList: `estiloDivAlinhaElementosTempoDeViagem` }, subDivAlinhamentoFilhoPrincipal2.constroiElemento)
        const paragrafoTotalHoraVoo = new CriaElementosDom(`p`, { innerText: `Total: ${cidade.totalHoraVoo}`, classList: `paragrafoModalVooDireto1` }, divAlinhaElementosTempoDeViagem.constroiElemento)
        const paragrafoVooDireto = new CriaElementosDom(`p`, { innerText: `Voo direto`, classList: `paragrafoModalVooDireto` }, divAlinhaElementosTempoDeViagem.constroiElemento)

        const paragrafoInformacoesHoraChegada = new CriaElementosDom(`p`, { innerHTML: `${cidade.horaChegada} <span class="coresDiferentes">${cidade.siglaAeroporto}</span>`, classList: `estiloParagrafoInformacoesHora` }, subDivAlinhamentoFilhoPrincipal2.constroiElemento)

        const corpoFilhoSubSessao = new CriaElementosDom(`div`, { id: `idCorpoFilhoSubSessao`, classList: `estiloCorpoFilhoSubSessao` }, alinhaElementos.constroiElemento)
        const alinhaInformacoesValorTotal = new CriaElementosDom(`div`, { classList: `estiloAlinhaInformacoesValorTotal` }, corpoFilhoSubSessao.constroiElemento)
        const paragrafoValorTotal = new CriaElementosDom(`p`, { innerHTML: `Total / R$ <span class="coresDiferentes">${(cidade.preco + cidade.taxaEmbarque) + cidade.taxaServico}</span>`, classList: `paragrafoValorTotal` }, alinhaInformacoesValorTotal.constroiElemento)

        const alinhaInformacoesPrecosViagemPessoa = new CriaElementosDom(`div`, { classList: `estiloAlinhaInformacoesTaxa` }, corpoFilhoSubSessao.constroiElemento)
        const paragrafoValorPassagemPessoa = new CriaElementosDom(`p`, { innerText: `1 adulto`, classList: `paragrafoValorTotal2` }, alinhaInformacoesPrecosViagemPessoa.constroiElemento)
        const paragrafoValorPassagemPessoaValor = new CriaElementosDom(`p`, { innerText: `R$ ${cidade.preco}`, classList: `paragrafoValorTotal2` }, alinhaInformacoesPrecosViagemPessoa.constroiElemento)

        const alinhaInformacoesTaxaEmbarque = new CriaElementosDom(`div`, { classList: `estiloAlinhaInformacoesTaxa` }, corpoFilhoSubSessao.constroiElemento)
        const paragrafoTaxaEmbarque = new CriaElementosDom(`p`, { innerText: `Taxas de embarque`, classList: `paragrafoValorTotal2` }, alinhaInformacoesTaxaEmbarque.constroiElemento)
        const paragrafoTaxaEmbarqueValor = new CriaElementosDom(`p`, { innerText: `R$ ${cidade.taxaEmbarque}`, classList: `paragrafoValorTotal2` }, alinhaInformacoesTaxaEmbarque.constroiElemento)

        const alinhaInformacoesTaxaServico = new CriaElementosDom(`div`, { classList: `estiloAlinhaInformacoesTaxa` }, corpoFilhoSubSessao.constroiElemento)
        const paragrafoTaxaServico = new CriaElementosDom(`p`, { innerText: `Taxas de serviço`, classList: `paragrafoValorTotal2` }, alinhaInformacoesTaxaServico.constroiElemento)
        const paragrafoTaxaServicoValor = new CriaElementosDom(`p`, { innerText: `R$ ${cidade.taxaServico}`, classList: `paragrafoValorTotal2` }, alinhaInformacoesTaxaServico.constroiElemento)


        const alinhaBotao = new CriaElementosDom(`div`, { id: `idAlinhaBotao`, classList: `alinhaBotao` }, corpoFilhoSubSessao.constroiElemento)
        const botaoComprar = new CriaElementosDom(`button`, { innerText: `Comprar`, id: `idBotaoComprar`, classList: `botaoComprar` }, alinhaBotao.constroiElemento, `click`, () => criarDivPagamento())
        let botaoNaoRepetir = false;
        let divPagamentoPai = null;
        let botaoConfirmarNaoRepetir = null

        function criarDivPagamento() {
            if (!botaoNaoRepetir) {
                divPagamentoPai = new CriaElementosDom(`div`, { id: `idDivPagamentoPai`, classList: `divPagamentoPai` }, corpoModal)
                divPagamentoPai.constroiElemento.classList.remove('hidden');
                divPagamentoPai.constroiElemento.classList.add('mostrar');
                const alinhaDadosPrincipais = new CriaElementosDom(`div`, { id: `idAlinhaDadosPrincipais`, classList: `alinhaDadosPrincipais` }, divPagamentoPai.constroiElemento)
                const tituloPagamento = new CriaElementosDom(`h2`, { innerText: `Preencha os campos !!`, classList: `h2tituloPagamento` }, alinhaDadosPrincipais.constroiElemento)

                const inputNome = new CriaElementosDom(`input`, { placeholder: `Nome`, classList: `form-control inputs `, type: `text`, name: `inputName`, id: `idName`, require: true }, alinhaDadosPrincipais.constroiElemento)
                const inputEmail = new CriaElementosDom(`input`, { placeholder: `Email`, classList: `form-control  inputs `, type: `email`, name: `inputEmail`, id: `idEmail`, require: true }, alinhaDadosPrincipais.constroiElemento)
                const inputCpf = new CriaElementosDom(`input`, { placeholder: `CPF`, classList: `form-control  inputs `, type: `text`, name: `inputCpf`, id: `idCpf`, require: true }, alinhaDadosPrincipais.constroiElemento)

                const alinhaBagagem = new CriaElementosDom(`div`, { id: `idAlinhaBagagem`, classList: `alinhaBagagem` }, divPagamentoPai.constroiElemento)
                const iconBagem = new CriaElementosDom(`div`, {
                    innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-luggage" viewBox="0 0 16 16">
                <path d="M2.5 1a.5.5 0 0 0-.5.5V5h-.5A1.5 1.5 0 0 0 0 6.5v7a1.5 1.5 0 0 0 1 1.415v.335a.75.75 0 0 0 1.5 0V15H4v-1H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V7h1v-.5A1.5 1.5 0 0 0 6.5 5H6V1.5a.5.5 0 0 0-.5-.5h-3ZM5 5H3V2h2v3Z"/>
                <path d="M3 7.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0v-5ZM11 6a1.5 1.5 0 0 1 1.5 1.5V8h2A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 14.5v-5A1.5 1.5 0 0 1 6.5 8h2v-.5A1.5 1.5 0 0 1 10 6h1ZM9.5 7.5V8h2v-.5A.5.5 0 0 0 11 7h-1a.5.5 0 0 0-.5.5ZM6 9.5v5a.5.5 0 0 0 .5.5H7V9h-.5a.5.5 0 0 0-.5.5Zm7 5.5V9H8v6h5Zm1.5 0a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5H14v6h.5Z"/>
              </svg>`, classList: `iconBagagem`
                }, alinhaBagagem.constroiElemento)
                const inputBagagem = new CriaElementosDom(`input`, { placeholder: `Bagagem`, classList: `form-control  inputs `, type: `number`, name: `inputBagagem`, id: `idBagagem`, require: true }, alinhaBagagem.constroiElemento)

                const corpoModalFooter = document.querySelector(`.modal-footer`)
                const buttonConfirmar = new CriaElementosDom(`button`, { innerText: `Confirmar`, data: `modal`, type: `button`, id: `idBotaoConfirmar`, classList: `btn btn-success mostrarAlert ` }, corpoModalFooter, `click`, () => requisiçãoPost())
                botaoNaoRepetir = true;

                function destruirDivPagamento() {
                    if (divPagamentoPai) {
                        divPagamentoPai.constroiElemento.remove();

                        divPagamentoPai = null;
                        botaoNaoRepetir = false; // Permite a criação novamente quando o botão "Comprar" for clicado
                    }
                    if (buttonConfirmar) {
                        buttonConfirmar.constroiElemento.remove()
                        botaoConfirmarNaoRepetir = false
                    }
                }

                const botaoComprar2 = document.getElementById('idBotaoComprar');
                botaoComprar2.addEventListener('click', criarDivPagamento);

                const botaoFecharModal = document.getElementById('btnClose');
                botaoFecharModal.addEventListener('click', () => {
                    destruirDivPagamento();
                });
                const botaoCancelarModal = document.getElementById(`idBtnClose`)
                botaoCancelarModal.addEventListener(`click`, () => {
                    destruirDivPagamento()
                })


            }



            async function requisiçãoPost() {
                let inputNome = document.getElementById(`idName`).value
                let emailCliente = document.getElementById(`idEmail`).value
                let cpfCliente = document.getElementById(`idCpf`).value
                const dados = {
                    nomeCliente: inputNome,
                    emailCliente: emailCliente,
                    cpfCliente: cpfCliente,
                    destino: cidade.nome,
                    dataVoo: cidade.diaVoo + cidade.mesVoo + cidade.anoVoo,
                    horaIda: cidade.horaIda,
                    horaChegada: cidade.horaChegada
                }

                const response = await fetch("http://localhost:3000/Compras", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados)
                })

                const formateJson = await response.json()

                ativarAlert()

            }
           function ativarAlert(){
            Swal.fire( {
                title:`
                Compra realizada com sucesso!`,
                text: `
                Clique no botao para fechar o modal!`,
                background: 'white',
                confirmButtonColor: '#DAA520'
                
            } 
              )
            }
          
        }


        divAtivada = elementoAcionado
    }

    // Ativação do modal ao clicar no elemento filho
    const modal = document.getElementById(elementoAcionado)
    modal.setAttribute(`data-bs-toggle`, `modal`)
    modal.setAttribute(`data-bs-target`, `#exampleModal`)

}

async function createCarouselPacotes() {
    const carrosselPai = document.getElementById("idCarrosselPai");
    const carroselPai2 = document.getElementById("idCarrosselPai22")
    const data = await fetchData("http://localhost:3000/cidadesPacotes");
    const data2 = await fetchData("http://localhost:3000/cidadesPacotes2")
    const carrosselItem = document.getElementById(`carroselItem1`)
    const carrosselItemDesative = document.getElementById(`carrosselItemDesative1`)


    data.forEach((cidade, index) => {

        if (index === 0) {
            carrosselItem.classList.add("active");
            carrosselItemDesative.classList.remove("active")
        }
        const carroselFilho = new CriaElementosDom("div", { id: cidade.id, classList: "d-block carroselFilho" }, carrosselPai, "click", () => ativarModal(carroselFilho.atributosElemento.id, cidade));
        carroselFilho.metodoFuncoesEvento()

        const elementosServicosEspecializadoFlex = new CriaElementosDom("div", { classList: "elementosServicosEspecializadoFlex" }, carroselFilho.constroiElemento);

        const elementoImagemPacotes = new CriaElementosDom("div", { classList: "elementoImagemPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const imagemPacotes = new CriaElementosDom("img", { classList: "imagemPacotes", src: cidade.imagemCidade }, elementoImagemPacotes.constroiElemento);

        const informacoesPacotes = new CriaElementosDom("div", { classList: "informacoesPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const alinhamentoInformacoesHoteis = new CriaElementosDom("div", { classList: "alinhamentoInformacoesHoteis" }, informacoesPacotes.constroiElemento);

        const tituloCidadeHoteis = new CriaElementosDom("h5", { classList: "tituloCidadeHoteis", innerText: cidade.nome }, alinhamentoInformacoesHoteis.constroiElemento);

        const alinhamentoParagrafoImagem = new CriaElementosDom("div", { classList: `alinhamentoParagrafoImagem` }, alinhamentoInformacoesHoteis.constroiElemento)

        const imagemIcon = new CriaElementosDom("img", { src: cidade.imagemIconAviao, classList: "iconAviao" }, alinhamentoParagrafoImagem.constroiElemento)

        const paragrafoCidadePacotes = new CriaElementosDom("p", { classList: "paragrafoCidadePacotes", innerText: `${cidade.diaVoo} ${cidade.mesVoo} ${cidade.anoVoo}` }, alinhamentoParagrafoImagem.constroiElemento);

        const divAlinhamentoFlexInformacoes2 = new CriaElementosDom("div", { classList: "divAlinhamentoFlexInformacoes2" }, informacoesPacotes.constroiElemento);

        const paragrafoCidadeHoteis = new CriaElementosDom("p", {
            classList: "paragrafoCidadeHoteis", innerHTML: `Pacotes <br> a partir de</p>
        <p class="paragrafoCidadeHoteis">R$ <span class="coresParagrafoDiferentes">${cidade.preco}</span></p>`
        }, divAlinhamentoFlexInformacoes2.constroiElemento);




    });

    data2.forEach((cidade, index) => {

        if (index === 0) {
            carrosselItemDesative.classList.add("active")
            carrosselItem.classList.remove("active");

        }

        const carroselFilho = new CriaElementosDom("div", { id: cidade.id, classList: "d-block carroselFilho2" }, carroselPai2, "click", () => ativarModal(carroselFilho.atributosElemento.id, cidade));
        carroselFilho.metodoFuncoesEvento()
        carroselFilho.metodoFuncoesEvento2()
        const elementosServicosEspecializadoFlex = new CriaElementosDom("div", { classList: "elementosServicosEspecializadoFlex" }, carroselFilho.constroiElemento);

        const elementoImagemPacotes = new CriaElementosDom("div", { classList: "elementoImagemPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const imagemPacotes = new CriaElementosDom("img", { classList: "imagemPacotes", src: cidade.imagemCidade }, elementoImagemPacotes.constroiElemento);

        const informacoesPacotes = new CriaElementosDom("div", { classList: "informacoesPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const alinhamentoInformacoesHoteis = new CriaElementosDom("div", { classList: "alinhamentoInformacoesHoteis" }, informacoesPacotes.constroiElemento);

        const tituloCidadeHoteis = new CriaElementosDom("h5", { classList: "tituloCidadeHoteis", innerText: cidade.nome }, alinhamentoInformacoesHoteis.constroiElemento);

        const alinhamentoParagrafoImagem = new CriaElementosDom("div", { classList: `alinhamentoParagrafoImagem` }, alinhamentoInformacoesHoteis.constroiElemento)

        const imagemIcon = new CriaElementosDom("img", { src: cidade.imagemIconAviao, classList: "iconAviao" }, alinhamentoParagrafoImagem.constroiElemento)

        const paragrafoCidadePacotes = new CriaElementosDom("p", { classList: "paragrafoCidadePacotes", innerText: `${cidade.diaVoo} ${cidade.mesVoo} ${cidade.anoVoo}` }, alinhamentoParagrafoImagem.constroiElemento);

        const divAlinhamentoFlexInformacoes2 = new CriaElementosDom("div", { classList: "divAlinhamentoFlexInformacoes2" }, informacoesPacotes.constroiElemento);

        const paragrafoCidadeHoteis = new CriaElementosDom("p", {
            classList: "paragrafoCidadeHoteis", innerHTML: `Pacotes <br> a partir de</p>
        <p class="paragrafoCidadeHoteis">R$ <span class="coresParagrafoDiferentes">${cidade.preco}</span></p>`
        }, divAlinhamentoFlexInformacoes2.constroiElemento);
    })



}
createCarouselPacotes()




async function createCarouselPassagens() {
    const carrosselPai = document.getElementById("idCarrosselPaiPassagens");
    const carroselPai2 = document.getElementById("idCarrosselPaiPassagens2")
    const carroselPai3 = document.getElementById("idCarrosselPaiPassagens3")
    const carrosselItem = document.getElementById(`carroselItemPassagens`)
    const carrosselItemDesative = document.getElementById(`carrosselItemDesativePassagens`)
    const carrosselItemDesative2 = document.getElementById(`carrosselItemDesativePassagens2`)
    const data = await fetchData("  http://localhost:3000/cidadesPassagens");
    const data2 = await fetchData("  http://localhost:3000/cidadesPassagens2")
    const data3 = await fetchData("  http://localhost:3000/cidadesPassagens3")
    data.forEach((cidade, index) => {

        if (index === 0) {
            carrosselItem.classList.add("active");
            carrosselItemDesative.classList.remove("active")
        }

        const carroselFilho = new CriaElementosDom("div", { id: cidade.id, classList: "d-block carroselFilho" }, carrosselPai, "click", () => ativarModal(carroselFilho.atributosElemento.id, cidade));
        carroselFilho.metodoFuncoesEvento()
        carroselFilho.metodoFuncoesEvento2()
        const elementosServicosEspecializadoFlex = new CriaElementosDom("div", { classList: "elementosServicosEspecializadoFlex" }, carroselFilho.constroiElemento);

        const elementoImagemPacotes = new CriaElementosDom("div", { classList: "elementoImagemPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const imagemPacotes = new CriaElementosDom("img", { classList: "imagemPacotes", src: cidade.imagemCidade }, elementoImagemPacotes.constroiElemento);

        const informacoesPacotes = new CriaElementosDom("div", { classList: "informacoesPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const alinhamentoInformacoesHoteis = new CriaElementosDom("div", { classList: "alinhamentoInformacoesHoteis" }, informacoesPacotes.constroiElemento);

        const tituloCidadeHoteis = new CriaElementosDom("h5", { classList: "tituloCidadeHoteis", innerText: cidade.nome }, alinhamentoInformacoesHoteis.constroiElemento);

        const alinhamentoParagrafoImagem = new CriaElementosDom("div", { classList: `alinhamentoParagrafoImagem` }, alinhamentoInformacoesHoteis.constroiElemento)

        const imagemIcon = new CriaElementosDom("img", { src: cidade.imagemIconAviao, classList: "iconAviao" }, alinhamentoParagrafoImagem.constroiElemento)

        const paragrafoCidadePacotes = new CriaElementosDom("p", { classList: "paragrafoCidadePacotes", innerText: `${cidade.diaVoo} ${cidade.mesVoo} ${cidade.anoVoo}` }, alinhamentoParagrafoImagem.constroiElemento);

        const divAlinhamentoFlexInformacoes2 = new CriaElementosDom("div", { classList: "divAlinhamentoFlexInformacoes2" }, informacoesPacotes.constroiElemento);

        const paragrafoCidadeHoteis = new CriaElementosDom("p", {
            classList: "paragrafoCidadeHoteis", innerHTML: `Passagens <br> a partir de</p>
        <p class="paragrafoCidadeHoteis">R$ <span class="coresParagrafoDiferentes">${cidade.preco}</span></p>`
        }, divAlinhamentoFlexInformacoes2.constroiElemento);
    });

    data2.forEach((cidade, index) => {

        if (index === 0) {
            carrosselItemDesative.classList.add("active")
            carrosselItem.classList.remove("active");

        }

        const carroselFilho = new CriaElementosDom("div", { id: cidade.id, classList: "d-block carroselFilho2" }, carroselPai2, "click", () => ativarModal(carroselFilho.atributosElemento.id, cidade));
        carroselFilho.metodoFuncoesEvento()
        carroselFilho.metodoFuncoesEvento2()
        const elementosServicosEspecializadoFlex = new CriaElementosDom("div", { classList: "elementosServicosEspecializadoFlex" }, carroselFilho.constroiElemento);

        const elementoImagemPacotes = new CriaElementosDom("div", { classList: "elementoImagemPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const imagemPacotes = new CriaElementosDom("img", { classList: "imagemPacotes", src: cidade.imagemCidade }, elementoImagemPacotes.constroiElemento);

        const informacoesPacotes = new CriaElementosDom("div", { classList: "informacoesPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const alinhamentoInformacoesHoteis = new CriaElementosDom("div", { classList: "alinhamentoInformacoesHoteis" }, informacoesPacotes.constroiElemento);

        const tituloCidadeHoteis = new CriaElementosDom("h5", { classList: "tituloCidadeHoteis", innerText: cidade.nome }, alinhamentoInformacoesHoteis.constroiElemento);

        const alinhamentoParagrafoImagem = new CriaElementosDom("div", { classList: `alinhamentoParagrafoImagem` }, alinhamentoInformacoesHoteis.constroiElemento)

        const imagemIcon = new CriaElementosDom("img", { src: cidade.imagemIconAviao, classList: "iconAviao" }, alinhamentoParagrafoImagem.constroiElemento)

        const paragrafoCidadePacotes = new CriaElementosDom("p", { classList: "paragrafoCidadePacotes", innerText: `${cidade.diaVoo} ${cidade.mesVoo} ${cidade.anoVoo}` }, alinhamentoParagrafoImagem.constroiElemento);

        const divAlinhamentoFlexInformacoes2 = new CriaElementosDom("div", { classList: "divAlinhamentoFlexInformacoes2" }, informacoesPacotes.constroiElemento);

        const paragrafoCidadeHoteis = new CriaElementosDom("p", {
            classList: "paragrafoCidadeHoteis", innerHTML: `Passagens <br> a partir de</p>
        <p class="paragrafoCidadeHoteis">R$ <span class="coresParagrafoDiferentes">${cidade.preco}</span></p>`
        }, divAlinhamentoFlexInformacoes2.constroiElemento);
    })


    data3.forEach((cidade, index) => {

        if (index === 0) {
            carrosselItemDesative2.classList.add("active")
            carrosselItemDesative.classList.remove("active")
            carrosselItem.classList.remove("active");

        }

        const carroselFilho = new CriaElementosDom("div", { id: cidade.id, classList: "d-block carroselFilho2" }, carroselPai3, "click", () => ativarModal(carroselFilho.atributosElemento.id, cidade));
        carroselFilho.metodoFuncoesEvento()
        carroselFilho.metodoFuncoesEvento2()
        const elementosServicosEspecializadoFlex = new CriaElementosDom("div", { classList: "elementosServicosEspecializadoFlex" }, carroselFilho.constroiElemento);

        const elementoImagemPacotes = new CriaElementosDom("div", { classList: "elementoImagemPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const imagemPacotes = new CriaElementosDom("img", { classList: "imagemPacotes", src: cidade.imagemCidade }, elementoImagemPacotes.constroiElemento);

        const informacoesPacotes = new CriaElementosDom("div", { classList: "informacoesPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const alinhamentoInformacoesHoteis = new CriaElementosDom("div", { classList: "alinhamentoInformacoesHoteis" }, informacoesPacotes.constroiElemento);

        const tituloCidadeHoteis = new CriaElementosDom("h5", { classList: "tituloCidadeHoteis", innerText: cidade.nome }, alinhamentoInformacoesHoteis.constroiElemento);

        const alinhamentoParagrafoImagem = new CriaElementosDom("div", { classList: `alinhamentoParagrafoImagem` }, alinhamentoInformacoesHoteis.constroiElemento)

        const imagemIcon = new CriaElementosDom("img", { src: cidade.imagemIconAviao, classList: "iconAviao" }, alinhamentoParagrafoImagem.constroiElemento)

        const paragrafoCidadePacotes = new CriaElementosDom("p", { classList: "paragrafoCidadePacotes", innerText: `${cidade.diaVoo} ${cidade.mesVoo} ${cidade.anoVoo}` }, alinhamentoParagrafoImagem.constroiElemento);

        const divAlinhamentoFlexInformacoes2 = new CriaElementosDom("div", { classList: "divAlinhamentoFlexInformacoes2" }, informacoesPacotes.constroiElemento);

        const paragrafoCidadeHoteis = new CriaElementosDom("p", {
            classList: "paragrafoCidadeHoteis", innerHTML: `Passagens <br> a partir de</p>
        <p class="paragrafoCidadeHoteis">R$ <span class="coresParagrafoDiferentes">${cidade.preco}</span></p>`
        }, divAlinhamentoFlexInformacoes2.constroiElemento);
    })

}
createCarouselPassagens()


async function createCarouselHoteis() {
    const carrosselPai = document.getElementById("idCarrosselPaiHoteis");
    const carroselPai2 = document.getElementById("idCarrosselPaiHoteis2")
    const carroselPai3 = document.getElementById("idCarrosselPaiHoteis3")
    const carrosselItem = document.getElementById(`carroselItemHoteis`)
    const carrosselItemDesative = document.getElementById(`carrosselItemDesativeHoteis`)
    const carrosselItemDesative2 = document.getElementById(`carrosselItemDesativeHoteis2`)
    const data = await fetchData("http://localhost:3000/cidadesHoteis");
    const data2 = await fetchData("http://localhost:3000/cidadesHoteis2")
    const data3 = await fetchData("http://localhost:3000/cidadesHoteis3")
    data.forEach((cidade, index) => {

        if (index === 0) {
            carrosselItem.classList.add("active");
            carrosselItemDesative.classList.remove("active")
        }

        const carroselFilho = new CriaElementosDom("div", { id: cidade.id, classList: "d-block carroselFilho" }, carrosselPai, "click", () => ativarModal(carroselFilho.atributosElemento.id));
        carroselFilho.metodoFuncoesEvento()
        const elementosServicosEspecializadoFlex = new CriaElementosDom("div", { classList: "elementosServicosEspecializadoFlex" }, carroselFilho.constroiElemento);

        const elementoImagemPacotes = new CriaElementosDom("div", { classList: "elementoImagemPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const imagemPacotes = new CriaElementosDom("img", { classList: "imagemPacotes", src: cidade.imagemHotel }, elementoImagemPacotes.constroiElemento);

        const informacoesPacotes = new CriaElementosDom("div", { classList: "informacoesPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const alinhamentoInformacoesHoteis = new CriaElementosDom("div", { classList: "alinhamentoInformacoesHoteis" }, informacoesPacotes.constroiElemento);

        const tituloCidadeHoteis = new CriaElementosDom("h5", { classList: "tituloCidadeHoteis", innerText: cidade.nome }, alinhamentoInformacoesHoteis.constroiElemento);

        const alinhamentoParagrafoImagem = new CriaElementosDom("div", { classList: `alinhamentoParagrafoImagem` }, alinhamentoInformacoesHoteis.constroiElemento)

        const paragrafoCidadePacotes = new CriaElementosDom("p", { classList: "paragrafoDescricaoHoteis", innerText: `${cidade.descricao}` }, alinhamentoParagrafoImagem.constroiElemento);

        const divAlinhamentoFlexInformacoes2 = new CriaElementosDom("div", { classList: "divAlinhamentoFlexInformacoes2" }, informacoesPacotes.constroiElemento);

        const paragrafoCidadeHoteis = new CriaElementosDom("p", {
            classList: "paragrafoCidadeHoteis", innerHTML: `Diárias <br> a partir de</p>
        <p class="paragrafoCidadeHoteis">R$ <span class="coresParagrafoDiferentes">${cidade.preco}</span></p>`
        }, divAlinhamentoFlexInformacoes2.constroiElemento);
    });

    data2.forEach((cidade, index) => {

        if (index === 0) {
            carrosselItemDesative.classList.add("active")
            carrosselItem.classList.remove("active");

        }

        const carroselFilho = new CriaElementosDom("div", { id: cidade.id, classList: "d-block carroselFilho2" }, carroselPai2, "click", () => ativarModal(carroselFilho.atributosElemento.id));
        carroselFilho.metodoFuncoesEvento()

        const elementosServicosEspecializadoFlex = new CriaElementosDom("div", { classList: "elementosServicosEspecializadoFlex" }, carroselFilho.constroiElemento);

        const elementoImagemPacotes = new CriaElementosDom("div", { classList: "elementoImagemPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const imagemPacotes = new CriaElementosDom("img", { classList: "imagemPacotes", src: cidade.imagemHotel }, elementoImagemPacotes.constroiElemento);

        const informacoesPacotes = new CriaElementosDom("div", { classList: "informacoesPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const alinhamentoInformacoesHoteis = new CriaElementosDom("div", { classList: "alinhamentoInformacoesHoteis" }, informacoesPacotes.constroiElemento);

        const tituloCidadeHoteis = new CriaElementosDom("h5", { classList: "tituloCidadeHoteis", innerText: cidade.nome }, alinhamentoInformacoesHoteis.constroiElemento);

        const alinhamentoParagrafoImagem = new CriaElementosDom("div", { classList: `alinhamentoParagrafoImagem` }, alinhamentoInformacoesHoteis.constroiElemento)

        const paragrafoCidadePacotes = new CriaElementosDom("p", { classList: "paragrafoDescricaoHoteis", innerText: `${cidade.descricao}` }, alinhamentoParagrafoImagem.constroiElemento);

        const divAlinhamentoFlexInformacoes2 = new CriaElementosDom("div", { classList: "divAlinhamentoFlexInformacoes2" }, informacoesPacotes.constroiElemento);

        const paragrafoCidadeHoteis = new CriaElementosDom("p", {
            classList: "paragrafoCidadeHoteis", innerHTML: `Diárias <br> a partir de</p>
        <p class="paragrafoCidadeHoteis">R$ <span class="coresParagrafoDiferentes">${cidade.preco}</span></p>`
        }, divAlinhamentoFlexInformacoes2.constroiElemento);
    })


    data3.forEach((cidade, index) => {

        if (index === 0) {
            carrosselItemDesative2.classList.add("active")
            carrosselItemDesative.classList.remove("active")
            carrosselItem.classList.remove("active");

        }

        const carroselFilho = new CriaElementosDom("div", { id: cidade.id, classList: "d-block carroselFilho2" }, carroselPai3, "click", () => ativarModal(carroselFilho.atributosElemento.id));
        carroselFilho.metodoFuncoesEvento()
        const elementosServicosEspecializadoFlex = new CriaElementosDom("div", { classList: "elementosServicosEspecializadoFlex" }, carroselFilho.constroiElemento);

        const elementoImagemPacotes = new CriaElementosDom("div", { classList: "elementoImagemPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const imagemPacotes = new CriaElementosDom("img", { classList: "imagemPacotes", src: cidade.imagemHotel }, elementoImagemPacotes.constroiElemento);

        const informacoesPacotes = new CriaElementosDom("div", { classList: "informacoesPacotes" }, elementosServicosEspecializadoFlex.constroiElemento);

        const alinhamentoInformacoesHoteis = new CriaElementosDom("div", { classList: "alinhamentoInformacoesHoteis" }, informacoesPacotes.constroiElemento);

        const tituloCidadeHoteis = new CriaElementosDom("h5", { classList: "tituloCidadeHoteis", innerText: cidade.nome }, alinhamentoInformacoesHoteis.constroiElemento);

        const alinhamentoParagrafoImagem = new CriaElementosDom("div", { classList: `alinhamentoParagrafoImagem` }, alinhamentoInformacoesHoteis.constroiElemento)

        const paragrafoCidadePacotes = new CriaElementosDom("p", { classList: "paragrafoDescricaoHoteis", innerText: `${cidade.descricao}` }, alinhamentoParagrafoImagem.constroiElemento);

        const divAlinhamentoFlexInformacoes2 = new CriaElementosDom("div", { classList: "divAlinhamentoFlexInformacoes2" }, informacoesPacotes.constroiElemento);

        const paragrafoCidadeHoteis = new CriaElementosDom("p", {
            classList: "paragrafoCidadeHoteis", innerHTML: `Diárias <br> a partir de</p>
        <p class="paragrafoCidadeHoteis">R$ <span class="coresParagrafoDiferentes">${cidade.preco}</span></p>`
        }, divAlinhamentoFlexInformacoes2.constroiElemento);
    })

}
createCarouselHoteis()

const meuCheckbox = document.getElementById('idModalLight');

meuCheckbox.addEventListener('change', function () {
    if (this.checked) {
        addModalLightClassToElements();
    } else {
        removeModalLightClassToElements();
    }
});

function addModalLightClassToElements() {
    const divOndas = document.querySelectorAll('.estiloDivOndas');
    const alinhaDivOndas2 = document.querySelectorAll('.estiloAlinhaDIvOndas2');
    const divOndas2 = document.querySelectorAll(`.estiloDivOndas2`);
    const footer = document.querySelectorAll(`.footer`);
    const videoBlack = document.getElementById(`video-bg`)
    const blend = document.querySelectorAll(`.blend`)
    const carroselFilho = document.querySelectorAll(`.carroselFilho`)
    const carroselFilho2 = document.querySelectorAll(`.carroselFilho2`)
    const divMenuCabecalho = document.querySelectorAll(`.divMenuCabecalho`)

    divMenuCabecalho.forEach((element) => {
        if (element.classList) {
            element.classList.remove('divMenuCabecalho');
            element.classList.add('divMenuCabecalhoLigth');
        }
    });

    carroselFilho2.forEach((element) => {
        if (element.classList) {
            element.classList.remove('carroselFilho2');
            element.classList.add('carroselFilhoLight');
        }
    });

    carroselFilho.forEach((element) => {
        if (element.classList) {
            element.classList.remove('carroselFilho');
            element.classList.add('carroselFilhoLight');
        }
    });
    blend.forEach((element) => {
        if (element.classList) {
            element.classList.remove('blend');
            element.classList.add('modalLightBlend');
        }
    });

    // Adicione a classe modalLight aos elementos e remova as classes originais
    videoBlack.src = `./videoMarAzul2.mp4`
    videoBlack.classList.add(`estiloVideo`)
    videoBlack.style.transform = `rotate(0deg)`
    divOndas.forEach((element) => {
        if (element.classList) {
            element.classList.remove('estiloDivOndas');
            element.classList.add('modalLight');
        }
    });

    divOndas2.forEach((element) => {
        if (element.classList) {
            element.classList.remove('estiloDivOndas2');
            element.classList.add('modalLight2');
        }
    });

    footer.forEach((element) => {
        if (element.classList) {
            element.classList.remove('footer');
            element.classList.add('modalLight2Footer');
        }
    });

    alinhaDivOndas2.forEach((element) => {
        if (element.classList) {
            element.classList.remove('estiloAlinhaDIvOndas2');
            element.classList.add('modalLight2estiloAlinhaDIvOndas2');
        }
    });
}

function removeModalLightClassToElements() {
    const divOndas = document.querySelectorAll('.modalLight');
    const alinhaDivOndas2 = document.querySelectorAll('.modalLight2estiloAlinhaDIvOndas2');
    const divOndas2 = document.querySelectorAll(`.modalLight2`);
    const footer = document.querySelectorAll(`.modalLight2Footer`);
    const videoBlack = document.getElementById(`video-bg`)
    const blend = document.querySelectorAll(`.modalLightBlend`)
    const carroselFilho = document.querySelectorAll(`.carroselFilhoLight`)
    const carroselFilho2 = document.querySelectorAll(`.carroselFilhoLight`)
    const divMenuCabecalho = document.querySelectorAll(`.divMenuCabecalhoLigth`)

    divMenuCabecalho.forEach((element) => {
        if (element.classList) {
            element.classList.remove('divMenuCabecalhoLigth');
            element.classList.add('divMenuCabecalho');
        }
    });
    videoBlack.src = `https://tactusmarketing.com/wp-content/uploads/tactus-waves-hero.mp4`
    videoBlack.style.transform = `rotate(180deg)`

    blend.forEach((element) => {
        if (element.classList) {
            element.classList.remove('modalLightBlend');
            element.classList.add('blend');
        }
    });
    carroselFilho.forEach((element) => {
        if (element.classList) {
            element.classList.remove('carroselFilhoLight');
            element.classList.add('carroselFilho');
        }
    });
    carroselFilho2.forEach((element) => {
        if (element.classList) {
            element.classList.remove('carroselFilhoLight');
            element.classList.add('carroselFilho2');
        }
    });


    divOndas.forEach((element) => {
        if (element.classList) {
            element.classList.remove('modalLight');
            element.classList.add('estiloDivOndas');
        }
    });

    divOndas2.forEach((element) => {
        if (element.classList) {
            element.classList.remove('modalLight2');
            element.classList.add('estiloDivOndas2');
        }
    });

    footer.forEach((element) => {
        if (element.classList) {
            element.classList.remove('modalLight2Footer');
            element.classList.add('footer');
        }
    });

    alinhaDivOndas2.forEach((element) => {
        if (element.classList) {
            element.classList.remove('modalLight2estiloAlinhaDIvOndas2');
            element.classList.add('estiloAlinhaDIvOndas2');
        }
    });
}
