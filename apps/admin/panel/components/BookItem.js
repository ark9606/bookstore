/**
 * Author: Arkady Zelensky
 */

import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class Item extends Component {
  constructor(props) {
    super(props);

    const {
      title, pubdate, image, genre, 
      author, id_author, id_genre
    } = props;

    this.state = {
      title, pubdate, image, genre,
      author, id_author, id_genre,

      input_image: {
        file: null,
        url: null,
      },

      input_date: moment(pubdate),

      state: 'show'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  initialize() {
    const {
      title, pubdate, image, genre, 
      author, id_author, id_genre
    } = this.props;

    this.setState({
      title, pubdate, image, genre,
      author, id_author, id_genre,
      state: 'show', 

      input_image: {
        file: null,
        url: null,
      },
      input_date: moment(pubdate),
    })
  }



  handleChange(e) {
    const name = e.target.name;
    const type = e.target.type;
    const value = type === 'file' ? 
      {
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0]
      } : e.target.value;


    this.setState({[name]: value})
  }


  onClickEdit(){
    this.setState({state: 'edit'});
  }

  onClickDelete(){
    if(!confirm(`Delete item ${this.state.title}?`)){
      return;
    }

    const { deleteItem, id } = this.props;
    deleteItem({id});
  }

  handleDateChange(date) {
    this.setState({
      input_date: date
    });
  }

  onClickSave(){
    const { editItem, id } = this.props;
    const { title, image,
      id_author, id_genre,
      input_image,
      input_date} = this.state;


    editItem({id,
              title,
              id_author,
              id_genre,
              image: input_image.file,
              pubdate: input_date.format('YYYY-MM-DD')
            }, () => {
              this.initialize();
              if(input_image.url) {
                URL.revokeObjectURL(input_image.url);
              }
            });
  }

  onClickCancel(){
    const {input_image } = this.state;

    if(input_image.url)
      URL.revokeObjectURL(input_image.url);

    this.initialize();
  }

  render(){
    const { title, state, pubdate, image, genre, author, id_author, id_genre, input_image, input_date } = this.state;
    const { genres, authors } = this.props;

    return(
      <li class="list-group-item">
        <form method="post" ref={r => {this.form = r;}} className="row">
            <div className='col-10 d-flex align-items-center'>

                  {
                    state === 'edit' &&
                    <div className="col col-8 d-flex align-items-center">
                      <div className='d-flex flex-column align-items-center'>
                        <img style={{width: '50px', height: '75px', marginRight: '10px'}} src={input_image.url ? input_image.url : image} alt={title}/> <br/>
                        <input type="file" class="form-control-file" name="input_image" onChange={this.handleChange}/>
                      </div>
                      <div>
                        <input type='text' id='title' name='title'
                            className="form-control" required maxLength={45}
                            value={title}
                            minLength={4} placeholder='Title'
                            onChange={this.handleChange}/> <br/> 

                        <select value={id_genre} name='id_genre' class="form-control form-control-sm" onChange={this.handleChange}>
                          {
                            genres.map(e => <option value={e.id} selected={e.id === id_genre}>{e.name}</option>)
                          } 
                        </select> <br/> 

                        <select value={id_author} name='id_author' class="form-control form-control-sm" onChange={this.handleChange}>
                          {
                            authors.map(e => <option value={e.id} selected={e.id === id_author}>{e.name}</option>)
                          } 
                        </select> <br/>

                        <DatePicker selected={input_date} onChange={(e) => this.handleDateChange(e)}/>

                      </div>

                    </div>

                  }

                  {
                    state === 'show' && 
                    <div className="col col-8 d-flex align-items-center">
                        <img style={{width: '50px', height: '75px', marginRight: '10px'}} src={image} alt={title}/>

                        <div>
                          <p>
                            {title} <br/> 
                            {genre.name} <br/> 
                            {author.name} <br/>
                            <small class="text-muted">{pubdate}</small>
                          </p>
                        </div>                     
                      
                    </div>

                  }                

            </div>

            {
              state === 'show' ? 
              <button type="button" class='btn btn-link col-1' onClick={() => this.onClickEdit()}>Edit</button> :
              <button type="button" class='btn btn-link col-1' onClick={() => this.onClickSave()}>Save</button> 
            }  
            {
              state === 'show' ?
              <button type="button" class='btn btn-link col-1' onClick={() => this.onClickDelete()}>Delete</button> :
              <button type="button" class='btn btn-link col-1' onClick={() => this.onClickCancel()}>Cancel</button>   
            }
        </form>
      </li>
    )
  }
}