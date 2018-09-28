/**
 * Author: Arkady Zelensky
 */

import * as ACTION from './constants';

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// Select books from DB by: 
// query - title, author, genre
// from, to - pubdate period
// count - how many items display on page
// page - page number 
export function getBooks({ query, from, to, count, page }) {

  const q = query && query.length > 0 ? `query=${query}&` : '';
  const f = from ? `from=${from}&` : '';
  const t = to ? `to=${to}&` : '';

  const c = count ? `count=${parseInt(count)}&` : '';
  const p = page ? `page=${parseInt(page)}&` : '';

  return dispatch => {
      fetch(`/books?${q}${f}${t}${c}${p}`, {
        method: 'get',
        credentials: 'include',
        headers: myHeaders
      })
      .then(res => res.json())
      .then(res => {
        // console.log(">>RES ");
        // console.log(res);

        if(res.status) {
          dispatch(setBooks(res.data.items));
          dispatch(setPages(res.data.pages));
          dispatch(setActivePage(parseInt(page)));
        }
      })
    
  }
}

function setBooks(books) {
  return {
      type: ACTION.SET_BOOKS,
      payload: books
  };
}

function setPages(pages) {
  return {
      type: ACTION.SET_PAGES,
      payload: pages
  };
}

function setActivePage(num) {
  return {
      type: ACTION.SET_ACTIVE_PAGE,
      payload: num
  };
}