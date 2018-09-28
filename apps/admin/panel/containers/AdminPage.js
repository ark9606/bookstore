/**
 * Author: Arkady Zelensky
 */

import React from "react";
import {connect} from "react-redux";
import BaseTool from "../components/BaseTool";
import Item from "../components/Item";
import BookItem from "../components/BookItem";
import AddItem from "../components/AddItem";
import AddBook from "../components/AddBook";

import { setPage, 
  getGenres, addGenre, deleteGenre, editGenre,
  getBooks, addBook, deleteBook, editBook,
  getAuthors, addAuthor,  deleteAuthor, editAuthor } from "../actions";


const NavItem = ({onClick, title, active}) => (
  <li class="nav-item">
    <button type="button" class={`btn btn-${active ? 'primary' : 'link'}`} onClick={() => onClick()}>{title}</button>
  </li>
)

class App extends React.Component {

  componentDidMount() {
    const {
      getGenres, 
      getAuthors, 
      getBooks, 
    } = this.props;

    getGenres();
    getAuthors();
    getBooks();
  }



  handleChange(e, name) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked: target.value;

    this.setState({[name]: value})
  }

  handleDateChange(date, type) {
    this.setState({
      [type]: date
    });
  }



  onClickPage(number){
    this.props.setPage(number);
  }

  render() {
    const { page, genres, authors, books,
      addGenre, deleteGenre, editGenre,
      addAuthor, deleteAuthor, editAuthor,
      addBook, deleteBook, editBook
    } = this.props;

    return (
        <div className="container">

          <ul class="nav nav-pills">
            <NavItem title='Genres' active={page === 1} onClick={() => this.onClickPage(1)}/>
            <NavItem title='Authors' active={page === 2} onClick={() => this.onClickPage(2)}/>
            <NavItem title='Books' active={page === 3} onClick={() => this.onClickPage(3)}/>
          </ul>
          <br/>

          <div className="container">
            {page === 1 && <BaseTool title='Genres' data={genres} 
                                     renderAddItem={() => <AddItem onAdd={addGenre}/>}
                                     renderItem={({name, id}) => <Item text={name}  id={id} deleteItem={deleteGenre} editItem={editGenre}/>} />}

            {page === 2 && <BaseTool title='Authors' data={authors}   
                                     renderAddItem={() => <AddItem onAdd={addAuthor}/>}                                   
                                     renderItem={({name, id}) => <Item text={name}  id={id} deleteItem={deleteAuthor} editItem={editAuthor}/>} />}
                              
            {page === 3 && <BaseTool title='Books' 
                                     renderAddItem={() => <AddBook onAdd={addBook} genres={genres} authors={authors}/>}
                                     renderItem={(props) => <BookItem {...props}  deleteItem={deleteBook} genres={genres} authors={authors} editItem={editBook}/>}
                                     data={books}
                                     deleteItem={(val) => { deleteBook(val)} }
                                     editItem={(val, c) => { editBook(val, c)} } />}
          </div>


        </div>
    );
  }
}

const mapStateToProps = ({pages, genres, authors, books}) => {
  return {
      page: pages.page,
      genres,
      authors,
      books
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPage: (params) => {
            dispatch(setPage(params));
        },

        getGenres: () => {
          dispatch(getGenres());
        },
        addGenre: (val) => {
          dispatch(addGenre(val));
        },
        deleteGenre: (val) => {
          dispatch(deleteGenre(val));
        },
        editGenre: (val) => {
          dispatch(editGenre(val));
        },

        getAuthors: () => {
          dispatch(getAuthors());
        },
        addAuthor: (val) => {
          dispatch(addAuthor(val));
        },
        deleteAuthor: (val) => {
          dispatch(deleteAuthor(val));
        },
        editAuthor: (val) => {
          dispatch(editAuthor(val));
        },

        getBooks: () => {
          dispatch(getBooks());
        },
        addBook: (val) => {
          dispatch(addBook(val));
        },
        deleteBook: (val) => {
          dispatch(deleteBook(val));
        },
        editBook: (val, c) => {
          dispatch(editBook(val, c));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);