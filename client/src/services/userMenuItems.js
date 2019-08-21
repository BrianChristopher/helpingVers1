const userMenuItems = [
    {
        _id: 1,
        userId: 42,
        name: "Spagetti and Meatballs",
        categories: ["entree", "Italian", "Lunch & Dinner"],
        ingredients: ["Spaghetti Noodles", "Marinara Sauce", "Meatballs"]
    },
    {
        _id: 2,
        userId: 42,
        name: "Cheeseburger",
        categories: ["entree", "American", "Lunch & Dinner"],
        ingredients: ["Beef Patty", "Cheese", "Bun"]
    },
    {
        _id: 3,
        userId: 42,
        name: "Eggs & Bacon",
        categories: ["entree", "Breakfast"],
        ingredients: ["Eggs", "Bacon", "Butter"]
    },
    {
        _id: 4,
        userId: 42,
        name: "Mediterranean Bowl",
        categories: ["entree", "Mediterranean", "Lunch & Dinner"],
        ingredients: ["Hummus", "Tabouleh", "Feta Cheese"]
    },
    {
        _id: 5,
        userId: 42,
        name: "Overnight Berry Oats",
        categories: ["entree", "Breakfast"],
        ingredients: ["Oatmeal", "Milk", "Chia Seeds", "Blueberries", "Almond Extract"]
    }
]

export function getUserMenuItems(){
    return userMenuItems;
}