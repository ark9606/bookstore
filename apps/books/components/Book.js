/**
 * Author: Arkady Zelensky
 */

import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

const Book = ({ title, image, pubdate, genre, author }) => (
  <div className="col-sm-4" style={{marginBottom: '20px'}}>
    <div className="card" >

      <div className='card-body d-flex align-items-center'>
  
        <img className='card-img' src={image} style={{maxHeight: '75px', maxWidth: '50px', marginRight: '20px'}} alt={title}/>

        <div className=''>
          <h6 className="card-title">{title}</h6>
          <p className="card-text">
            {author.name}<br/>
            {genre.name}<br/>
            <small className="text-muted">{moment(pubdate).format('Do MMM  YYYY')}</small>
          </p>
        </div>
      </div>


    </div>
  </div>
);

Book.propTypes = {
  title: PropTypes.string.isRequired, 
  image: PropTypes.string.isRequired, 
  pubdate: PropTypes.string.isRequired, 
  genre: PropTypes.string.isRequired, 
  author: PropTypes.string.isRequired
};

export default Book;