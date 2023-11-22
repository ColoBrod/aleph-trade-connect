const inputArray = [
  { id: 1, parentId: 0, name: "Центральный",     type: 3, chatTelegramId: "123" },
  { id: 2, parentId: 0, name: "Северо-Западный", type: 3, chatTelegramId: "123" },
  { id: 3, parentId: 0, name: "Южный",           type: 3, chatTelegramId: "123" },
  { id: 4, parentId: 0, name: "Приволжский",     type: 3, chatTelegramId: "123" },

  { id: 5, parentId: 1, name: "Москвоская область",    type: 2, chatTelegramId: "123" },
  { id: 6, parentId: 1, name: "Белгородская область",  type: 2, chatTelegramId: "123" },
  { id: 7, parentId: 1, name: "Владимирская область",  type: 2, chatTelegramId: "123" },

  { id: 8, parentId: 5, name: "Москва",             type: 1, chatTelegramId: "123" },
  { id: 9, parentId: 5, name: "Химки",              type: 1, chatTelegramId: "123" },
  { id: 10, parentId: 5, name: "Краснознамеснк",    type: 1, chatTelegramId: "123" },
  { id: 11, parentId: 5, name: "Краснозаводск",     type: 1, chatTelegramId: "123" },

  { id: 12, parentId: 6, name: "Белгород",          type: 1, chatTelegramId: "123" },
  { id: 13, parentId: 6, name: "Алексеевка",        type: 1, chatTelegramId: "123" },
  { id: 14, parentId: 6, name: "Валуйки",           type: 1, chatTelegramId: "123" },

  { id: 15, parentId: 7, name: "Владимир",          type: 1, chatTelegramId: "123" },
  { id: 16, parentId: 7, name: "Ростов",            type: 1, chatTelegramId: "123" },
  { id: 17, parentId: 7, name: "Суздаль",           type: 1, chatTelegramId: "123" },
  
  { id: 1001, parentId: 8, name: "Бургер-1337",     type: 0, chatTelegramId: "123",  address: "бульвар Ломоносова, 72" },
  { id: 1002, parentId: 8, name: "Бургер-2665",     type: 0, chatTelegramId: "123",  address: "спуск Гоголя, 71" },
  { id: 1003, parentId: 9, name: "Бургер-3012",     type: 0, chatTelegramId: "123",  address: "въезд Гагарина, 08" },
  { id: 1004, parentId: 9, name: "Бургер-3034",     type: 0, chatTelegramId: "123",  address: "наб. Ленина, 33" },
  { id: 1005, parentId: 10, name: "Бургер-1523",    type: 0, chatTelegramId: "123", address: "бульвар Славы, 60" },
  { id: 1006, parentId: 11, name: "Бургер-1418",    type: 0, chatTelegramId: "123", address: "пл. Гагарина, 23" },
  { id: 1007, parentId: 12, name: "Бургер-1486",    type: 0, chatTelegramId: "123", address: "въезд Бухарестская, 48" },
  { id: 1008, parentId: 13, name: "Бургер-7800",    type: 0, chatTelegramId: "123", address: "спуск Славы, 11" },
  { id: 1009, parentId: 14, name: "Бургер-8432",    type: 0, chatTelegramId: "123", address: "въезд Косиора, 47" },
  { id: 1010, parentId: 15, name: "Бургер-2315",    type: 0, chatTelegramId: "123", address: "пл. Гоголя, 49" },
  { id: 1011, parentId: 16, name: "Бургер-8975",    type: 0, chatTelegramId: "123", address: "пер. Сталина, 41" },
  { id: 1012, parentId: 17, name: "Бургер-4931",    type: 0, chatTelegramId: "123", address: "шоссе Ломоносова, 65" },
  { id: 1013, parentId: 17, name: "Бургер-7896",    type: 0, chatTelegramId: "123", address: "пер. Ленина, 00" },
];

function buildTree(data, parentId = 0) {
  const tree = [];
  data.forEach(item => {
    if (item.parentId === parentId) {
      const children = buildTree(data, item.id);
      const node = {
        value: item.id,
        name: item.name,
        children: children.length > 0 ? children : undefined
      };
      tree.push(node);
    }
  });
  return tree;
}

const tree = buildTree(inputArray);
console.log(JSON.stringify(tree, null, 2));