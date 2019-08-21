const userPlannedItems = [
  {
    _id: 1,
    menuItemId: 2,
    name: "Cheeseburger",
    location: "TuesdayLunch"
  },
  {
    _id: 2,
    menuItemId: 2,
    name: "Cheeseburger",
    location: "WednesdayLunch"
  },
  {
    _id: 3,
    menuItemId: 4,
    name: "Mediterranean Bowl",
    location: "FridayDinner"
  }
];

export function getPlannedItems(){
    return userPlannedItems;
}
