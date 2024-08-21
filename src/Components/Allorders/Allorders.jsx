import { memo, useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";

function Allorders() {
  const { deleteAll } = useContext(CartContext);
  useEffect(() => {
    deleteAll();
  }, []);
  return <div>Allorders</div>;
}

export default memo(Allorders);
