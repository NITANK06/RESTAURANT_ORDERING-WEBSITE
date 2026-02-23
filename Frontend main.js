import { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/foods")
      .then(res => setFoods(res.data));
  }, []);

  return  (
    <div>
      <h2>Menu</h2>
      {foods.map(food => (
        <div key={food._id}>
          <h3>{food.name}</h3>
          <p>₹{food.price}</p>
        </div>
      ))}
    </div>
  );

}
