const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');
const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';


function renderCurrencies(data) {
    const valutes = data.response.Valute;
    
    itemsContainer.innerHTML = '';

    for (const key in valutes) {
        const currency = valutes[key];
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        itemElement.innerHTML = `
            <div class="item__code">${currency.CharCode}</div>
            <div class="item__value">${currency.Value}</div>
            <div class="item__currency">руб.</div>
        `;

        itemsContainer.appendChild(itemElement);
    }
}


async function loadCurrencyData() {
    const cachedData = localStorage.getItem('currency_cache');
    if (cachedData) {
        renderCurrencies(JSON.parse(cachedData));
        loader.classList.remove('loader_active');
    }

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const data = await response.json();

        localStorage.setItem('currency_cache', JSON.stringify(data));

        renderCurrencies(data);

    } catch (error) {
        console.error('Не удалось загрузить курсы валют:', error);
    } finally {
        loader.classList.remove('loader_active');
    }
}


loadCurrencyData();