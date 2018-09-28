/**
 * Author: Arkady Zelensky
 */

const Sequelize = require('sequelize');
const db = require('../config/db');

const sequelize = new Sequelize(db.name, db.user, db.password, db.config);
const Book = sequelize.import('../models/Book');
const Genre = sequelize.import('../models/Genre');
const Author = sequelize.import('../models/Author');

// for getting books with Authors and Genres
Book.belongsTo(Genre, {foreignKey: 'id_genre'});
Book.belongsTo(Author, {foreignKey: 'id_author'});

const Op = Sequelize.Op;

const SELECT_COUNT = 5;
const SELECT_PAGE = 1;

// Select books
exports.getBooks = (req, res) => { 
  console.log(req.query);

  const data = {
    status: false,
  };

  // condition: by title, author, genre
  let conditionPromise = new Promise((res, rej) => {res();});

  const { query: { 
      query, from, to, 
      count, page 
    } 
  } = req;

  if('query' in req.query) {
    
    const filterPromises = [];

    // Promise for select genres
    filterPromises.push(new Promise((resolve, reject) => {
      Genre.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`,
          }
        }
      })
      .then(genres => {
        resolve({genres});
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })  
    }));

    // Promise for select authors
    filterPromises.push(new Promise((resolve, reject) => {
      Author.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`,
          }
        }
      })
      .then(authors => {
        resolve({authors});
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })  
    }));

    // Promise for getting genres & authors IDs
    conditionPromise = new Promise((resolve, reject) => {

      Promise.all(filterPromises)
      .then(items => {

        // getting genres and authors IDs
        let authorsIDs = items.filter( e => e.authors)[0].authors;
        authorsIDs = authorsIDs.length > 0 ? authorsIDs.map( e => e.id) : [];
  
        let genresIDs = items.filter( e => e.genres)[0].genres;
        genresIDs = genresIDs.length > 0 ? genresIDs.map( e => e.id) : [];  
  
        // console.log(authorsIDs);
        // console.log(genresIDs);
  
        const condition = {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${query}%`,
              }
            },
            {
              id_author: {
                [Op.in] : authorsIDs
              }
            },
            {
              id_genre: {
                [Op.in] : genresIDs
              }
            }
          ]
        };
  
        resolve(condition);  
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  // Make condition for select books
  conditionPromise
  .then(cond => {
    // console.log(">> Condition: ")
    // console.log(cond)
    let condition = cond;

    if('from' in req.query && 'to' in req.query){

      condition = {
        ...condition,        
        [Op.and]: {
          pubdate:{
            [Op.between]: [from, to],
          }
        }
      }
    }

    // console.log(">> Condition 2: ")
    // console.log(condition)

    const limit = count ? parseInt(count) : SELECT_COUNT;
    const offset = page ? (parseInt(page) - 1) * limit : SELECT_PAGE - 1;

    Book.findAndCountAll({
      where: condition,
      include: [ Author, Genre ],
      limit,
      offset,
    })
    .then(result => {
      data.status = true;
      data.data = {
        items: result.rows,
        pages: Math.ceil(result.count / limit),
      };
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.send(data);
    })
  })
}

