const collapseBtn = document.querySelector('#btn-collapse');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const htmlElement = document.querySelector('html');

const theme = localStorage.getItem('theme')
if (theme == null){
    document.getElementById('toggle-light-theme').style.display = 'none';
}else{
    htmlElement.setAttribute('data-bs-theme', theme);
    if(theme == 'dark'){
        document.getElementById('toggle-dark-theme').style.display = 'none';
    }else{
        document.getElementById('toggle-light-theme').style.display = 'none';
    }
}

feather.replace();

collapseBtn.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    content.classList.toggle('open');
});

function toggleTheme(mode, attrName) {
    const darkToogle = document.getElementById('toggle-dark-theme');
    const lightToogle = document.getElementById('toggle-light-theme');
    if(attrName == 'toggle-dark-theme'){
        darkToogle.style.display = 'none';
        lightToogle.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }else{
        darkToogle.style.display = 'block';
        lightToogle.style.display = 'none';
        localStorage.setItem('theme', 'light');
    }
    htmlElement.setAttribute('data-bs-theme', mode);
}

function decode_image(image_base64){
    const base64String = "data:image/jpeg;base64,"+image_base64
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    const imgElement = document.createElement('img');
    
    imgElement.className = 'w-100 rounded-1';
    imgElement.src = imageUrl;
    imgElement.style.aspectRatio = '1/1'

    const divCol = document.createElement('div');
    divCol.className = 'col-3 col-md-2 col-xxl-2 mb-2 mb-md-3';
    divCol.appendChild(imgElement);

    document.getElementById('previewImage').appendChild(divCol);
}