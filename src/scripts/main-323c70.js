var is_mobile = outerWidth < 768;
window.embedded = is_mobile;

if(!is_mobile){
    window.addEventListener('load', function(){
        openModal();
    })
}
