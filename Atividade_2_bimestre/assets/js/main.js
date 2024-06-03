const vermais = document.getElementById('ver_catalogo');
const vercatalogo = document.getElementById('catalogo');


vermais.addEventListener('click', function mostraCatalogo(){
    document.getElementById('carouselExample').style.display='none';
    document.getElementById('catalog-title').innerHTML='Catálogo Completo';
    vermais.style.display='none';
    document.getElementById('catalogo_completo').style.display='flex';    
});

vercatalogo.addEventListener('click', function mostraCatalogo(){
    document.getElementById('carouselExample').style.display='none';
    document.getElementById('catalog-title').innerHTML='Catálogo Completo';
    vermais.style.display='none';
    document.getElementById('catalogo_completo').style.display='flex';    
});
