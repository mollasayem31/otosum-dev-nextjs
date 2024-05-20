import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/navigation";
import React, {
  useState,
  useRef,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import toast, { Toaster } from "react-hot-toast";
interface IUser {
  businessName: string;
  name: string;
  email: string;
  category: string;
  role: string;
  posPin: number;
}
interface Props {
  setLoad: Dispatch<SetStateAction<boolean | null>>;
}

const PosPinInputCom: NextComponentType<NextPageContext, {}, Props> = ({
  setLoad,
}) => {
  const [value, setValue] = useState<string>("0000"); // Initialize with 4 digits 0
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const handleInputChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValue =
        e.target.value.length === 0 ? "0" : e.target.value.slice(-1); // Only allow one digit
      const newValues = value.split(""); // Convert current value to array
      newValues[index] = newValue; // Update the digit at index
      const updatedValue = newValues.join(""); // Join the array back to string
      setValue(updatedValue);

      // If a character is entered and the index is less than 3 (0-indexed)
      if (
        e.target.value.length === 0 &&
        index < 2 &&
        inputRefs.current[index + 1]
      ) {
        inputRefs.current[index + 1].focus(); // Focus on the next input field
      }
    };

  const [userData, setUserData] = useState<IUser | null>();

  useEffect(() => {
    const userLocalData = localStorage.getItem("user");
    if (userLocalData) {
      setUserData(JSON.parse(userLocalData));
    }
  }, []);

  const handelConfirm = () => {
    if (userData && Number(userData.posPin) === Number(value)) {
      () => localStorage.setItem("posAccess", "access granted");
    }
    setLoad(true);
  };

  return (
    <div className="flex flex-col justify-center items-center py-72">
      <Toaster />
      <div className="flex space-x-3 bg-white p-10 rounded-lg">
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            type="number"
            min={0}
            max={9}
            className="block w-[100px] h-[100px] text-center text-lg bg-black text-white font-extrabold border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
            value={value[index]}
            onChange={handleInputChange(index)}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
          />
        ))}
      </div>
      <button
        onClick={handelConfirm}
        className="btn btn-primary mt-5 border-none text-white bg-gradient-to-r from-[#438FFD] to-[#00FC44]"
      >
        Confirm
      </button>
    </div>
  );
};

export default PosPinInputCom;
