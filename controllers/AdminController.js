/**
 * Author: Arkady Zelensky
 */

const formidable = require('formidable');
const Sequelize = require('sequelize');
const db = require('../config/db');
const AuthController = require('./AuthController');
const randomstring = require("randomstring");
const fs = require('fs');

const sequelize = new Sequelize(db.name, db.user, db.password, db.config);

const Genre = sequelize.import('../models/Genre');
const Author = sequelize.import('../models/Author');
const Book = sequelize.import('../models/Book');

// for getting books with Authors and Genres
Book.belongsTo(Genre, { foreignKey: 'id_genre' });
Book.belongsTo(Author, { foreignKey: 'id_author' });

const BOOK_NO_PHOTO = '/images/books/no_photo.jpg';

exports.getSigninPage = (req, res, next) => { 

  const data = {
    title: 'Admin | Sign In',
    isSigned: AuthController.isAdminSigned(req),

  };
  res.render('admin/auth', data);
}
exports.postSignin = (req, res, next) => {

  const data = {
    status: req.user ? true : false
  };

  if(!req.user) {
    data.error = req.flash('message')[0];
  } else {
    data.data = { redirect: '/admin'}
  }
  
  res.send(data);
}
exports.getSignout = (req, res, next) => { 
  req.logout();
  res.redirect('/');
}
exports.getAdminPage = (req, res, next) => { 

  const data = {
    title: 'Admin',
    isSigned: AuthController.isAdminSigned(req),
  };
  res.render('admin/index', data);
}

// Process GENRES
exports.getGenres = (req, res, next) => { 
  const data = {
    status: false,
    data: []
  };
  Genre.findAll()
  .then(items => {
    data.status = true;
    data.data = items;
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })
}
exports.addGenre = (req, res, next) => { 
  const data = {
    status: false,
    data: []
  };

  const { value } = req.body;

  Genre.findOrCreate({
    where:{
      name: value
    }
  })
  .spread((item, created) => {
    data.status = created;
    data.data = item;
    if(!created){
      data.error = 'An item with this name already exists';
    }
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })
}
exports.deleteGenre = (req, res, next) => { 
  const data = {
    status: false
  };

  const { id } = req.body;

  Genre.destroy({ where:{ id } })
  .then( deleted => {
    console.log('deleted ');
    console.log(deleted);
    data.status = true;
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })
}
exports.editGenre = (req, res, next) => { 
  const data = {
    status: false
  };

  const { id, value } = req.body;

  Genre.update({name: value}, { where:{ id } })
  .then( updated => {
    console.log('updated ');
    console.log(updated);
    data.status = true;
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })
}

// Process AUTHORS
exports.getAuthors = (req, res, next) => { 
  const data = {
    status: false,
    data: []
  };
  Author.findAll()
  .then(items => {
    data.status = true;
    data.data = items;
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })

}
exports.addAuthor = (req, res, next) => { 
  const data = {
    status: false,
    data: []
  };

  const { value } = req.body;

  Author.findOrCreate({
    where:{
      name: value
    }
  })
  .spread((item, created) => {
    data.status = created;
    data.data = item;
    if(!created){
      data.error = 'An item with this name already exists';
    }
    res.send(data);
  })
  .catch(err => {
    data.error = err;
    res.send(data);
  })
}
exports.deleteAuthor = (req, res, next) => { 
  const data = {
    status: false
  };

  const { id } = req.body;

  Author.destroy({ where:{ id } })
  .then( deleted => {
    console.log('deleted ');
    console.log(deleted);
    data.status = true;
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })
}
exports.editAuthor = (req, res, next) => { 
  const data = {
    status: false
  };

  const { id, value } = req.body;

  Author.update({name: value}, { where:{ id } })
  .then( updated => {
    console.log('updated ');
    console.log(updated);
    data.status = true;
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })
}

// Process BOOKS
exports.getBooks = (req, res, next) => { 
  const data = {
    status: false,
    data: []
  };
  
  Book.findAll({
    include: [ Author, Genre ],
  })
  .then(items => {
    data.status = true;
    data.data = items;
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })
}
exports.deleteBook = (req, res, next) => { 
  const data = {
    status: false
  };

  const { id } = req.body;

  // change book path
  const ind = __dirname.lastIndexOf('\\');
  const filePath = __dirname.substring(0, ind);

  Book.findById(id)
  .then(book => {
    const fileToDelete = filePath + '/public' + book.image;

    return new Promise((resolve, reject) => {

      if(book.image === BOOK_NO_PHOTO){
        resolve();
      }
      fs.unlink(fileToDelete, (err) => {
        if(err){
          reject(err);
        }
        resolve();
      })

    })  
  })
  .then(() => Book.destroy({ where:{ id } }))  
  .then(() => {
    data.status = true;
    res.send(data);
  })
  .catch( err => {
    data.error = err;
    res.send(data);
  })
}
exports.editBook = (req, res, next) => { 
  const data = {
    status: false
  };

  const form = new formidable.IncomingForm();

  // path to image for DB
  let imagePath = '';

  let bookId = req.query.id;

  form.on('fileBegin', (name, file) =>{
    // rename book
    const indexOfDot = file.name.lastIndexOf('.');
    const ext = file.name.substring(indexOfDot + 1);
    file.name = `${randomstring.generate(8)}.${ext}`;

    // change book path
    const ind = __dirname.lastIndexOf('\\');
    const filePath = __dirname.substring(0, ind);
    imagePath = '/images/books/' + file.name;
    file.path = filePath + '/public' + imagePath;
  });  



  new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if(err) {
        res.send(data);
        reject(err);
      }
      resolve(fields);      
    });
  })
  .then(formData => {
    const {
      title, pubdate, id, 
      id_author, id_genre, 
    } = formData;

    const props = {title, pubdate, id_author, id_genre};

    if(imagePath.length > 0){
      props.image = imagePath;
    }

    return Book.update(props, { where:{ id }})
  })
  .then( () => {    
    return Book.findAll({include: [ Author, Genre ], where:{ id: bookId}});
  })
  .then(book => {
    
    data.status = true;
    data.data = book[0];
    res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.send(data);
  })
}
exports.addBook = (req, res, next) => { 
  const data = {
    status: false
  };

  const form = new formidable.IncomingForm();

  // path to image for DB
  let imagePath = '';

  form.on('fileBegin', (name, file) =>{
    // rename book
    const indexOfDot = file.name.lastIndexOf('.');
    const ext = file.name.substring(indexOfDot + 1);
    file.name = `${randomstring.generate(8)}.${ext}`;

    // change book path
    const ind = __dirname.lastIndexOf('\\');
    const filePath = __dirname.substring(0, ind);
    imagePath = '/images/books/' + file.name;
    file.path = filePath + '/public' + imagePath;
  });  



  new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if(err) {
        res.send(data);
        reject(err);
      }
      resolve(fields);      
    });
  })
  .then(formData => {
    const {
      title, pubdate,
      id_author, id_genre, 
    } = formData;
    const props = {title, pubdate, id_author, id_genre};

    if(imagePath.length > 0){
      props.image = imagePath;
    }
    else{
      props.image = BOOK_NO_PHOTO;
    }

    // return Book.create({ where: props, defaults: props, include: [ Author, Genre ]})
    return Book.create(props)
  })
  .then(book => Book.findAll({ where: book.id, include: [Author, Genre]}))
  .then(books => {    

    console.log('>> book: ');
    console.log(books);
    data.status = true;
    data.data = books[0];
    res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.send(data);
  })
}

exports.isSignedIn = function (req, res, next) {
  if (AuthController.isAdminSigned(req))
    return next();
  res.redirect('/admin/auth');
};