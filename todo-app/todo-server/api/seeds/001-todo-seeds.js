/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    {message: 'Walk the dogs!'},
    {message: 'Update address'},
    {message: 'Wash clothes'},
    {message: "Call your mom"}
  ]);
};