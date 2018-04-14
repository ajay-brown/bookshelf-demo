const knex = require('./db/knex');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3003;
const Users = require('./db/models/users');
const Tasks = require('./db/models/tasks');

// Users.fetchAll().then(data => {
//   console.log('data', data);
// });

// Users.where({ user_id: 1 }) //to fetch all users...
//   .fetch()
//   .then(data => {
//     console.log('data', data);
//   });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('sanity check');
});

//get all users
app.get('/api/users', (req, res) => {
  Users.fetchAll()
    .then(users => {
      res.json(users.serialize());
    })
    .catch(err => {
      res.json(err);
    });
});

//get all tasks by user_id
app.get('/api/users/:user_id/tasks', (req, res) => {
  const { user_id } = req.params;
  Tasks.where({ user_id })
    .fetchAll()
    .then(tasks => {
      res.json(tasks.serialize());
    })
    .catch(err => {
      res.json(err);
    });
});

//create task by user-_id
app.post('/api/users/:user_id/tasks/new', (req, res) => {
  const { user_id } = req.params; //destructure
  const payload = {
    name: req.body.name
  };
  Tasks.forge(payload)
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//update tasks by task id
app.put('/api/tasks/:task_id/edit', (req, res) => {
  const { task_id } = req.params;
  const payload = {
    name: req.body.name,
    is_complete: req.body.is_complete
  };
  Tasks.where({ task_id })
    .fetch()
    .then(task => {
      return task.save(payload);
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//delete task by user_id
app.delete('/api/tasks/:task_id/delete', (req, res) => {
  const { task_id } = req.params;
  Tasks.where({ task_id })
    .destroy()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server Listening on PORT :${PORT}`);
});
