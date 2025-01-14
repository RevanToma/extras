// 6. Todos (5p)

// Skapa en lista med TODOs som hämtas från: https://jsonplaceholder.typicode.com/todos
// Listan ska placeras i div-elementet med id todos på index.html

// Visa de första 10 TODOs i listan.
// För varje TODO ska följande visas:
// Titeln på TODO:n
// Om den är klar eller inte "completed" eller "not completed"
// Markera TODOs som är klara genom att visa dem med en grön textfärg.

const url = 'https://jsonplaceholder.typicode.com/todos';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Something went wrong!');
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

const renderTodos = async () => {
  const data = await fetchData(url),
    first10Todos = data.slice(0, 10),
    todosDiv = document.getElementById('todos'),
    ul = document.createElement('ul');

  first10Todos.forEach((element) => {
    const li = document.createElement('li');
    li.textContent = element.title;
    if (element.completed) {
      li.style.color = 'green';
      li.textContent = `${element.title} - completed`;
    }
    ul.appendChild(li);
  });

  todosDiv.append(ul);
};

renderTodos();
