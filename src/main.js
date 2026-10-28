 async function fetchCourseData() {
  const appContainer = document.getElementById('app');
  
  try {
     
    const response = await fetch('https://typicode.com');
    
      
    if (response.status === 403) {
      appContainer.innerHTML = '<p class="error" id="error-message">Ошибка 403: Доступ к ресурсу ограничен.</p>';
      return;
    }
    
     
    if (!response.ok) {
      appContainer.innerHTML = '<p class="error">Произошла непредвиденная ошибка при загрузке.</p>';
      return;
    }

    const data = await response.json();
    
     
    appContainer.innerHTML = `
      <div class="data-container" id="data-content">
        <p><strong>ID задачи:</strong> ${data.id}</p>
        <p><strong>Название:</strong> <span id="task-title">${data.title}</span></p>
        <p><strong>Статус:</strong> ${data.completed ? 'Выполнено' : 'В процессе'}</p>
      </div>
    `;
  } catch (error) {
    appContainer.innerHTML = '<p class="error">Ошибка подключения к сети.</p>';
  }
}

 
window.addEventListener('DOMContentLoaded', fetchCourseData);
