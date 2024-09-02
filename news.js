document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'fc4c3c5e54b94f12a0cd2127fe772053'; // Reemplaza con tu API Key de NewsAPI
    const apiUrl = `https://newsapi.org/v2/everything?q=eSports&language=es&sortBy=publishedAt&pageSize=3&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');

                    newsItem.innerHTML = `
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Leer más</a>
                    `;

                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p>No se encontraron noticias recientes.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener las noticias:', error);
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '<p>Hubo un error al cargar las noticias. Por favor, intenta más tarde.</p>';
        });
});