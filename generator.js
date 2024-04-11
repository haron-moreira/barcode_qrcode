const fs = require('fs');
const bwipjs = require('bwip-js');
const qr = require('qrcode');


const lista = [
    {"codigo": "1234567890", "valor": "http://localhost/"},
    {"codigo": "1234567891", "valor": "http://localhost/"}
]


function gerar_cod_barra(iccid) {
    // Parâmetros para gerar o código de barras
    const codigoDeBarras = iccid; // Seu código de barras
    const formato = 'code128'; // Formato do código de barras
    const largura = 100; // Largura da barra (em pixels)
    const altura = 20; // Altura da barra (em pixels)

    // Opções adicionais (opcional)
    const options = {
        includetext: true, // Incluir texto no código de barras
        textxalign: 'center', // Alinhamento horizontal do texto
        textsize: 9 // Tamanho do texto
    };

    // Gerar o código de barras
    bwipjs.toBuffer({
        bcid: formato,
        text: codigoDeBarras,
        scale: 2, // Fator de escala (tamanho da imagem)
        height: altura,
        width: largura,
        includetext: options.includetext,
        textxalign: options.textxalign,
        textsize: options.textsize
    }, function (err, png) {
        if (err) {
            console.error(err);
        } else {
            // Salvar a imagem em um arquivo
            fs.writeFile(`barcodes/barcode_${iccid}.png`, png, 'binary', function(err) {
                if(err) {
                    console.error('Erro ao salvar a imagem:', err);
                } else {
                    console.log('Código de barras salvo com sucesso.');
                }
            });
        }
    });

}


function gerar_qrcode(iccid, code) {
    // Dados que serão codificados no QR code
    const dados = code;

    // Gerar o QR code
    qr.toFile(`qrcodes/qrcode_${iccid}.png`, dados, function (err) {
        if (err) {
            console.error('Erro ao gerar o QR code:', err);
        } else {
            console.log('QR code gerado com sucesso.');
        }
    });

}


lista.forEach((item) => {
    gerar_cod_barra(item.codigo);
    gerar_qrcode(item.codigo, item.valor)
}) 
