/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex("review").del();
  await knex("restaurant_info").del();
  // Insert seed entries
  await knex("restaurant_info").insert([
    {
      id: 1,
      name: "MMタイ",
      address: "神奈川県横浜市西区みなとみらい４丁目６−２",
      type_1: "エスニック",
      type_2: "タイ",
      type_3: "",
      budget: 1000,
      reg_horiday: "1",
      payment: 111,
      num_seat: 20,
      close_flg: false,
      registrate_date: new Date(),
    },
    {
      id: 2,
      name: "ガスト みなとみらい店",
      address: "神奈川県横浜市西区みなとみらい４丁目４−５",
      type_1: "ファミレス",
      type_2: "洋食",
      type_3: "",
      budget: 800,
      reg_horiday: "1",
      payment: 111,
      num_seat: 40,
      close_flg: false,
      registrate_date: new Date(),
    },
    {
      id: 3,
      name: "バーミヤン みなとみらい店",
      address: "神奈川県横浜市西区みなとみらい４丁目６−２",
      type_1: "エスニック",
      type_2: "タイ",
      type_3: "",
      budget: 1000,
      reg_horiday: "1",
      payment: 111,
      num_seat: 20,
      close_flg: false,
      registrate_date: new Date(),
    },
    {
      id: 4,
      name: "アンパンマンレストラン",
      address: "神奈川県横浜市西区みなとみらい４丁目６−２",
      type_1: "エスニック",
      type_2: "タイ",
      type_3: "",
      budget: 1000,
      reg_horiday: "1",
      payment: 111,
      num_seat: 20,
      close_flg: false,
      registrate_date: new Date(),
    },
    {
      id: 5,
      name: "ビストロチャイナ「ENCORE」",
      address: "神奈川県横浜市西区みなとみらい４丁目６−２",
      type_1: "エスニック",
      type_2: "タイ",
      type_3: "",
      budget: 1000,
      reg_horiday: "1",
      payment: 111,
      num_seat: 20,
      close_flg: false,
      registrate_date: new Date(),
    },
  ]);
};
