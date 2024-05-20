import { useEffect } from "react";
import CatagoresItemsCom from "./CategoresItemsCom";
import FoodItemsCom from "./FoodItemsCom";

interface Props {}

const ItemsList: React.FC<Props> = (props) => {
  useEffect(() => {
    localStorage.removeItem("selectedItems");
  }, []);
  return (
    <div className="mr-4 bg-white rounded-lg p-5 text-black">
      <CatagoresItemsCom />
      <div className="divider"></div>
      <FoodItemsCom />
    </div>
  );
};

export default ItemsList;
