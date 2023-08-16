import { Button } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/cartSlice";

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="py-4 font-bold tracking-wide text-center text-white bg-blue-600">
        Sepetteki Ürünler
      </h2>
      <ul className="flex flex-col px-2 py-2 overflow-y-auto cart-items gap-y-3">
        {cart.cartItems.map((item) => (
          <li className="flex justify-between cart-item" key={item._id}>
            <div className="flex items-center">
              <img
                src={item.img}
                alt=""
                className="object-cover w-16 h-16"
                onClick={() => dispatch(deleteProduct(item))}
              />
              <div className="flex flex-col ml-2">
                <b>{item.title}</b>
                <span>
                  {item.price}₺ x {item.quantity}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<PlusCircleOutlined />}
              />
              <span className="font-bold">{item.quantity}</span>
              <Button
                type="primary"
                size="small"
                className="w-full flex items-center justify-center !rounded-full"
                icon={<MinusCircleOutlined />}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto cart-totals">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100}₺
            </span>
          </div>
        </div>
        <div className="mt-4 border-b">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2) > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="px-2 py-4">
          <Button type="primary" size="large" className="w-full">
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            size="large"
            className="flex items-center justify-center w-full mt-2"
            icon={<ClearOutlined />}
            danger>
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
