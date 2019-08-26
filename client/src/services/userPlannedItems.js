const userPlannedItems = [
  {
    _id: 101,
    menuItemId: 2,
    name: "Cheeseburger",
    location: "TuesdayLunch"
  },
  {
    _id: 102,
    menuItemId: 2,
    name: "Cheeseburger",
    location: "WednesdayLunch"
  },
  {
    _id: 103,
    menuItemId: 4,
    name: "Mediterranean Bowl",
    location: "FridayDinner"
  }
];

export function getPlannedItems(){
    return userPlannedItems;
}
