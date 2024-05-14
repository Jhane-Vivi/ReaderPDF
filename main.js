document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    
    var reader = new FileReader();
    reader.onload = function() {
        var typedarray = new Uint8Array(reader.result);
        
        // Carrega o PDF
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            // Extrai o texto de todas as páginas
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function(page) {
                page.getTextContent().then(function(textContent) {
                    var text = '';
                    textContent.items.forEach(function(item) {
                        text += item.str + ' ';
                    });
                    console.log(text);
                    // Aqui você pode manipular o texto extraído como quiser
                    document.getElementById("texto").innerHTML=text
                });
            });
        });
    };
    reader.readAsArrayBuffer(file);
});
