/**
 * Author: Arkady Zelensky
 */

import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { TextInput, SubmitButton, Label, Checkbox } from "../../components";
import Book from "../components/Book";
import PageButton from "../components/PageButton";
import Select from "../components/Select";

import { getBooks } from "../actions";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      dateEnabled: false,
      from: moment(),
      to: moment(),

      count: 5,
      page: props.pages.active
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks(){
    const { getBooks } = this.props;
    const { query, from, to, dateEnabled, count, page } = this.state;

    const params = {
      count,
      page
    };

    if(query && query.length > 0){
      params.query = query;
    }

    if(dateEnabled) {
      params.from = from.format('YYYY-MM-DD');
      params.to = to.format('YYYY-MM-DD');
    }

    getBooks(params);
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

  onSubmit(e){
    e.preventDefault();
    this.fetchBooks();
  }

  onClickPage(number){
    this.setState({ page: number}, () => {
      this.fetchBooks();
    });
  }

  onChangeCount(e) {
    this.setState({ count: e.target.value}, () => {
      this.fetchBooks();
    });
  }

  get navBar() {
    const { pages } = this.props;

    const pagesContent = [];

    for (let i = 1; i <= pages.count; i++) {
      pagesContent.push(<PageButton active={ i === pages.active} 
                                    handleClick={() => this.onClickPage(i)} 
                                    value={i} />);      
    }

    return (
      <nav className="d-flex flex-column-reverse">
        <ul className="pagination" style={{marginBottom: 0}}>
          {
            pagesContent
          }
        </ul>
      </nav>)
  }

  get DisplaySelect() {
    return  <Select items={[5, 10, 15, 20]} id='count' 
                    handleClick={e => this.onChangeCount(e)}/>
  }

  render() {
    const { books } = this.props;
    const { from, to, dateEnabled } = this.state;

    return (
        <div className="container">
          <form method="post" ref={r => {this.form = r;}} onSubmit={(e) => this.onSubmit(e)} className="container shadow-sm p-3 mb-5 bg-white rounded">
            <div className="row form-group align-items-center">  
                <Label forInput='query' width={3} title="Genre, author, or book's title"/>
                <TextInput name='query' onInput={this.handleChange} type='text' min={1} required={false}/>
                <SubmitButton title="Search"/>
            </div>

            <div className="form-group">
              <Checkbox title='Date' onChange={this.handleChange} name='dateEnabled' checked={dateEnabled}/>

              { dateEnabled &&
                <div className="d-flex align-items-end form-group">
                  <label className='mr-1'> 
                    <span>From</span>
                    <DatePicker selected={from} onChange={(e) => this.handleDateChange(e, 'from')}/> 
                  </label>

                  <label className='mr-1'> 
                    <span>To</span>
                    <DatePicker selected={to} onChange={(e) => this.handleDateChange(e, 'to')}/>
                  </label>
                </div>
              }
            </div>

            <div className="row form-group">
              <div className='col-lg-2 col-sm-3'>
                <Label forInput='count' width={3} title="Display"/>
                { this.DisplaySelect }
              </div>

              { this.navBar }
            </div>         

          </form>
          <div className='row'>
            {
              books.map( e => <Book {...e}/>)
            }
          </div>

        </div>
    );
  }
}

const mapStateToProps = ({books, pages}) => {
  return {
      books: books.items,
      pages,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBooks: (params) => {
            dispatch(getBooks(params));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);