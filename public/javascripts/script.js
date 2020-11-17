document.addEventListener('DOMContentLoaded', () => {


  const form = document.querySelector('form');

  const formEvent = form.addEventListener('submit', async event => {
    event.preventDefault();

    const title = document.querySelector('#new-todos__title').value;
    const userId = document.querySelector('#new-todos__userId').value;

    const todo = {
      title,
      userId
    };

    const addedTodo = await addTodo(todo);
    addTodosToDOM(addedTodo);
  });

  export const addTodo = async todo => {
  // module.exports let addTodo = async todo => {
    try {
      const res = await axios.post(`/create`, todo);
      // const addedTodo = res.data;

      // console.log(`Added a new Todo!`, addedTodo);
      console.log(`Added a new Todo!`);

    } catch (e) {
      console.error(e);
    }
  };







  console.log('script js on Public running');

}, false);
