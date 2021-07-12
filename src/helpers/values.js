export const values = {
  stops: [
    {id: 0, key: "stops-all", value: "Все"},
    {id: 1, key: "stops-0", value: "Без пересадок"},
    {id: 2, key: "stops-1", value: "1 пересадка"},
    {id: 3, key: "stops-2", value: "2 пересадки"},
    {id: 4, key: "stops-3", value: "3 пересадки"},
  ],
  sortConditions: [
    {key: 1, value: "самый дешевый"},
    {key: 2, value: "самый быстрый"},
    {key: 3, value: "оптимальный"},
  ]
}

export const stopsCount = (stops) => {
  switch (stops.length) {
    case 1: {
      return '1 пересадка';
    }
    case 2: {
      return '2 пересадки';
    }
    case 3: {
      return '3 пересадки';
    }
    // если пересадок станет 4, кажется это будет неправильный вывод
    default: {
      return 'Без пересадок';
    }
  }
}