/**
 * Author: Arkady Zelensky
 */

import * as ACTION from './constants';

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// Process books
export function getBooks() {

  return dispatch => {
      fetch(`/admin/books`, {
        method: 'get',
        credentials: 'include',
        headers: myHeaders
      })
      .then(res => res.json())
      .then(res => {
        if(res.status){
          dispatch(setBooks(res.data));
        }
      })
    
  }
}
export function deleteBook(value) {

  return dispatch => {
      fetch(`/admin/books/delete`, {
        method: 'post',
        credentials: 'include',
        headers: myHeaders,
        body: JSON.stringify(value)
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(deleteOneBook(value.id));
          return;
        }
        alert(res.error);
      })
    
  }
}
export function editBook(value, callback) {

  let formData = new FormData();

  for(let key in value){
    formData.append(key, value[key]);
  }

  return dispatch => {
      fetch(`/admin/books/edit?id=${value.id}`, {
        method: 'post',
        credentials: 'include',
        body: formData
      })
      .then(res => res.json())
      .then(res => {

        if(res.status){
          dispatch(editOneBook(res.data));
          callback();
          return;
        }
        alert(res.error);
      })
    
  }
}
export function addBook(value) {

  let formData = new FormData();

  for(let key in value){
    formData.append(key, value[key]);
  }

  return dispatch => {
      fetch(`/admin/books/add`, {
        method: 'post',
        credentials: 'include',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(addNewBook(res.data));
          return;
        }
        alert(res.error);
      })
      .catch(err => {
        console.log(err);
      })
    
  }
}

// Process genres
export function getGenres() {

  return dispatch => {
      fetch(`/admin/genres`, {
        method: 'get',
        credentials: 'include',
        headers: myHeaders
      })
      .then(res => res.json())
      .then(res => {
        if(res.status){
          dispatch(setGenres(res.data));
        }
      })
    
  }
}
export function addGenre(value) {

  return dispatch => {
      fetch(`/admin/genres/add`, {
        method: 'post',
        credentials: 'include',
        headers: myHeaders,
        body: JSON.stringify({value})
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(addNewGenre(res.data));
          return;
        }
        alert(res.error);
      })
    
  }
}
export function deleteGenre(value) {

  return dispatch => {
      fetch(`/admin/genres/delete`, {
        method: 'post',
        credentials: 'include',
        headers: myHeaders,
        body: JSON.stringify(value)
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(deleteOneGenre(value.id));
          return;
        }
        alert(res.error);
      })
    
  }
}
export function editGenre(value) {

  return dispatch => {
      fetch(`/admin/genres/edit`, {
        method: 'post',
        credentials: 'include',
        headers: myHeaders,
        body: JSON.stringify(value)
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(editOneGenre(value));
          return;
        }
        alert(res.error);
      })
    
  }
}

// Process authors
export function getAuthors() {

  return dispatch => {
      fetch(`/admin/authors`, {
        method: 'get',
        credentials: 'include',
        headers: myHeaders
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(setAuthors(res.data));
        }
      })
    
  }
}
export function addAuthor(value) {

  return dispatch => {
      fetch(`/admin/authors/add`, {
        method: 'post',
        credentials: 'include',
        headers: myHeaders,
        body: JSON.stringify({value})
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(addNewAuthor(res.data));
          return;
        }
        alert(res.error);
      })
    
  }
}
export function deleteAuthor(value) {

  return dispatch => {
      fetch(`/admin/authors/delete`, {
        method: 'post',
        credentials: 'include',
        headers: myHeaders,
        body: JSON.stringify(value)
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(deleteOneAuthor(value.id));
          return;
        }
        alert(res.error);
      })
    
  }
}
export function editAuthor(value) {

  return dispatch => {
      fetch(`/admin/authors/edit`, {
        method: 'post',
        credentials: 'include',
        headers: myHeaders,
        body: JSON.stringify(value)
      })
      .then(res => res.json())
      .then(res => {
        if(res.status) {
          dispatch(editOneAuthor(value));
          return;
        }
        alert(res.error);
      })
    
  }
}

export function setPage(page) {
  return {
      type: ACTION.SET_PAGE,
      payload: page
  };
}

function setGenres(items) {
  return {
      type: ACTION.SET_GENRES,
      payload: items
  };
}
function addNewGenre(data) {
  return {
      type: ACTION.ADD_NEW_GENRE,
      payload: data
  };
}
function deleteOneGenre(id) {
  return {
      type: ACTION.DELETE_ONE_GENRE,
      payload: id
  };
}
function editOneGenre(data) {
  return {
      type: ACTION.EDIT_ONE_GENRE,
      payload: data
  };
}

function setAuthors(items) {
  return {
      type: ACTION.SET_AUTHORS,
      payload: items
  };
}
function addNewAuthor(data) {
  return {
      type: ACTION.ADD_NEW_AUTHOR,
      payload: data
  };
}
function deleteOneAuthor(id) {
  return {
      type: ACTION.DELETE_ONE_AUTHOR,
      payload: id
  };
}
function editOneAuthor(data) {
  return {
      type: ACTION.EDIT_ONE_AUTHOR,
      payload: data
  };
}

function setBooks(items) {
  return {
      type: ACTION.SET_BOOKS,
      payload: items
  };
}
function deleteOneBook(id) {
  return {
      type: ACTION.DELETE_ONE_BOOK,
      payload: id
  };
}
function editOneBook(data) {
  return {
      type: ACTION.EDIT_ONE_BOOK,
      payload: data
  };
}
function addNewBook(data) {
  return {
      type: ACTION.ADD_NEW_BOOK,
      payload: data
  };
}

