exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user').insert([
        { email: 'rowValue1@gmail.com', password: 'password' },
        { email: 'rowValue2@gmail.com', password: 'password1' },
        { email: 'rowValue3@gmail.com', password: 'password2' }
      ]);
    })
    .then(() => {
      return knex('task')
        .del()
        .then(() => {
          return knex('task').insert([
            { name: 'User1', user_id: 1 },
            { name: 'User1Task2', use\dtr_id: 1 },
            { name: 'User3', user_id: 3 }
          ]);
        });
    });
};
//cascade deleting for seeds?
