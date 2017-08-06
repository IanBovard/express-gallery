Express Gallery
===============

Express, Sequelize, HTML5, stored on PostgreSQL

Use the Express, Sequelize, and *almost* any other library or templating engines you want to fulfill the requirements.
recommended: Handbars and SASS.
helpful: Livereload, Gulp for watching compiling SASS

---

Create a multi-user Gallery.
Any user should be able to access these routes:

- `GET /` to view a list of gallery photos // /index
- `GET /gallery/:id` to see a single gallery photo // /picture
  - each gallery photo should include a link to delete this gallery photo
  - each gallery photo should include a link to edit this gallery photo
- `GET /gallery/new` to see a "new photo" form // /new
  - the form fields are:
    - `author` : Text
    - `link` : Text (the image url)
    - `description` : TextArea
- `POST /gallery` to create a new gallery photo i /new
- `GET /gallery/:id/edit` to see a form to *edit* a gallery photo identified by the `:id` param
  - the form fields are:
    - `author` : Text
    - `link` : Text (the image url)
    - `description` : TextArea
- `PUT /gallery/:id` updates a single gallery photo identified by the `:id` param
- `DELETE /gallery/:id` to delete a single gallery photo identified by the `:id` param

---

The layout of the app must match the layouts included in `/layouts`.
Match the layout as close as you can, using free and open fonts and graphics.

---

#### Responsive Layout

- does not have tablet layout
- uses a background image that is not included, you will have to find something similar (subtlepatterns.com)

#### Stretch Goals

Once you have finished with all of the requirements outlined above, you are encouraged to work on these additional stretch goals to improve the quality and usablity of your application.

- Make friendly error messages for users attempting to login using [connect-flash](https://github.com/jaredhanson/connect-flash).
- Make your site beautiful with SCSS. Note: No external libraries are allowed, be sure to use vanilla SCSS and/or JavaScript to style your application.
- Add intergration tests using Mocha and Chai, and end-to-end tests using SuperTest.
- Create an Admin role, that has elevated privledges. (i.e. Admin can delete users, Admin can edit/delete any post, etc.).
- Get a code review from an instructor or TA :sparkles:

Mongo DEFAULT PORT 27017
MONGO TUTORIAL

1. create collections/index.js
2. move all mongo code into collections/index.js
3. collections/index.js will expose photoMetas
4. gallery route will import photoMetas from collections/index.js
5. gallery post route, check that req.body.meta exists, default to { it works }
6. gallery post route, will save metas photometas.insert(metas)
7. test, create a new Photo, mongo should have new document saved by POST route

test code!!

const photoMetas = require('../collections/index.js');
if( !req.body.meta ) req.body.meta = { meta : "is working" };
photoMetas.getPhotoMetas.insert({ newKey : 'this works'});



more in-depth code!!

/*
 * POST payload
 *
 * {
 *   author,
 *   link,
 *   description,
 *   meta : { ...anything } // store in mongo, photosMeta
 * }
 *
 */
 function loadNewPhoto(req, res) {
  if( !req.body.meta ) req.body.meta = { meta : "is working" };
  let name = req.body.author;
  let url = req.body.link;
  let description = req.body.description;
  req.flash(errorMessages);
  let currUser = getSessionPassportId(req.session);
  if (currUser === false || currUser === undefined) {
    res.render('gallery/login', {
      errorMessage: 'You must log in to perform that operation.'
    });
    return;
  }

let auId;
  Authors.findAll({ where: { name: name } }).then(result => {
    if (result[0] === undefined) {
      Authors.create({ name: name }).then(ret => {
        auId = ret.dataValues.id;
        Photos.create({
          link: url,
          description: description,
          authorId: auId,
          owner: currUser
        }).then(photo => {
          console.log('creted Photo', photo);
          let locals = { link: url, description: description, name: name };
          // save the meta
          // db.photoMetas.insert({
          //   ...meta
          // })
          // meta : { comment : "hello", year : 2017, photoId : 123 }
          req.body.meta.photoId = photo.id;
          photoMetas().insert(req.body.meta);
          res.render('gallery/photo', locals);
        });
      });
    } else {
      auId = result[0].dataValues.id;
      Photos.create({
        link: url,
        description: description,
        authorId: auId,
        owner: currUser
      }).then(photo => {
        console.log('creted Photo', photo);
        let locals = { link: url, description: description, name: name };
        // save the meta
        // db.photoMetas.insert({
        //   ...meta
        // })
        // meta : { comment : "hello", year : 2017, photoId : 123 }
        req.body.meta.photoId = photo.id;
        // save the meta
        photoMetas().insert(req.body.meta);
        res.render('gallery/photo', locals);
      });
    }
  });
}



Creating dynamic fields
1. Create dom elements in gallery/new handlebar/view
    --fields container
    --fields ul list container
    --add_field button
2. Include the script tag for /scripts/metafields.js
3. update gallery POST route
  --remove the initial if(!req.body.meta)
  --wrap the photoMetas().insert in an if(req.body.meta)


Making req.body.meta a nested object!!
<form> name="meta[hello]"

Need to create a dynamic form for the meta object
  dynamic fields
  [__Name__]
  [__link__]
  [__Description__]
  [__+__] --- add new input (dynamic)

          <div class="add_meta_field">
          <ul id="meta_fields"></ul>
          <!--
            FIELDS GO HERE
            <li>
              <input class="meta_key" type="text" name="someKey" placeholder="Attribute">
              <input class="meta_value" type="text" name="meta[someKey]" placeholder="Attribute">
            </li>
          -->
          <button id="add_meta_field_button" type="button" >Add Meta Data</button>
        </div>

        (function(window) {
  const add_meta_field_button = document.getElementById('add_meta_field_button');
  const meta_fields = document.getElementById('meta_fields');

  add_meta_field_button.addEventListener('click', e => {
    // create the dom structure of the fields, dynamically
    let key_val_li = document.createElement('li');

    let meta_key_input = document.createElement('input');
    meta_key_input.className = 'meta_key';
    meta_key_input.type = 'text'; // no name=""
    meta_key_input.placeholder = 'Attribute';

    let meta_value_input = document.createElement('input');
    meta_value_input.className = 'meta_value';
    meta_value_input.type = 'text';
    meta_value_input.placeholder = 'Value';

    meta_key_input.addEventListener('change', e => {
      meta_value_input.name = `meta[${e.target.value}]`;
    });

    key_val_li.appendChild(meta_key_input);
    key_val_li.appendChild(meta_value_input);
    meta_fields.appendChild(key_val_li);
  });

    <li>
      <input class="meta_key" type="text" name="someKey" placeholder="Attribute">
      <input class="meta_value" type="text" name="meta[someKey]" placeholder="Attribute">
    </li>

}(window));


PART 3 of 4   display metas

1. go to gallery GET /gallery/:id route
    - chain after Photos.findById, return photoMetas().findOne( ... )
    - then add meta to locals
2. remove meta._id and meta.photoId
3. render meta locals to views/gallery/photo.hbs using {{#each ... }}

<div class="mainBody">

  <div class="navigation">
    {{>head_buttons}}
  </div>

  <div class="photo_section">
        <div class="hero_image">
          <img class="hero_link" src={{link}}>
          <p class="description">{{description}}</p>
          <p class="name">{{owner}}</p>
          <ul class="meta">
            {{#each meta}}
              <li>
                <b>{{@key}}</b> : {{ this }}
              </li>
            {{/each}}
          </ul>
          {{#if showEditButton}}
            <form class="gallery_edit_form">
              <button class="gallery_edit_button" type="submit" formmethod="get" formaction="/gallery/{{id}}/edit" name="edit">Edit</button>
            </form>
          {{/if}}
        </div>
  </div>