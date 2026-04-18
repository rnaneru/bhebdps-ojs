const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);

    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            progress.value = event.loaded / event.total;
        }
    };

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert('Файл успешно загружен!');
        } else {
            console.error(`Ошибка сервера: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        console.error('Произошла сетевая ошибка при попытке загрузки.');
    };

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
});