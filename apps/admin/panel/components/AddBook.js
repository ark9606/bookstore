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

    this.state = {
      title: '', 
      id_author: 1, 
      id_genre: 1,

      input_image: {
        file: null,
        url: null,
      },

      input_date: moment(),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  initialize(){

    this.setState({
      title: '', 
      id_author: 1, 
      id_genre: 1,

      input_image: {
        file: null,
        url: null,
      },
      input_date: moment(),
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


  handleDateChange(date) {
    this.setState({
      input_date: date
    });
  }


  onSubmit(e){
    e.preventDefault();
    const { onAdd } = this.props;
    const { title,
      id_author, id_genre,
      input_image,
      input_date} = this.state;


      onAdd({ title,
              id_author,
              id_genre,
              image: input_image.file,
              pubdate: input_date.format('YYYY-MM-DD')
            });

    this.initialize();
    this.form.reset();
    if(input_image.url)
      URL.revokeObjectURL(input_image.url);
  }


  render() {
    const { title, id_author, id_genre, input_image, input_date } = this.state;

    const { genres, authors } = this.props;

    return(
      <li class="list-group-item">
        <form method="post" ref={r => {this.form = r;}} onSubmit={(e) => this.onSubmit(e)} className="row d-flex align-items-center">
            <div className='col-10 d-flex align-items-center'>


              <div className="col col-8 d-flex align-items-center">
                <div className='d-flex flex-column align-items-center'>
                  <img style={{width: '50px', height: '75px', marginRight: '10px'}} src={input_image.url ? input_image.url : ''}/> <br/>
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
                

            </div>

            <button type="submit" class='btn btn-primary col-2'>Add</button>   
        </form>
      </li>
    )
  }
}