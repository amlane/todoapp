exports.up = function(knex, Promise) {
  return knex.schema.createTable("tasks", tasks => {
    tasks.increments();

    tasks.string("task", 128).notNullable();

    tasks.boolean("completed").defaultTo(false);

    tasks
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};
