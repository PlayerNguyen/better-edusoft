import React, { useEffect, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import IconInput from "../Input/IconInput";
import { AiFillIdcard, AiOutlineKey } from "react-icons/ai";
import Button from "../Button/Button";

export default function SignIn() {
  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const handleChangeStudentId = (e) => {
    setStudentId(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = (v: boolean) => {
    setRemember(v);
  };

  const handleLogin = () => {
    window.api.edusoft
      .signIn(studentId, password)
      .then(() => {
        if (remember) {
          
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="p-12 flex flex-col min-h-[100vh] bg-neutral-300 dark:bg-neutral-800 place-items-center justify-center shadow-md">
      {/* Sign in Form */}
      <form className="w-2/4 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 rounded-md px-6 py-4 flex flex-col gap-4">
        <div>
          <h1 className="font-bold text-3xl">Better Edusoft</h1>
          <h2 className="text-1xl text-neutral-500 dark:text-neutral-600">
            Sign in
          </h2>
        </div>
        <div className="flex flex-col">
          {/* <label htmlFor="">Student Id</label> */}
          {/* <Input placeholder="abc" type="text" id="id" /> */}
          <IconInput
            iconComponent={<AiFillIdcard />}
            placeholder="ITITIU20000"
            value={studentId}
            onChange={handleChangeStudentId}
          />
        </div>
        <div className="flex flex-col">
          {/* <label htmlFor="">Password</label> */}
          {/* <Input placeholder="abc" type="password" id="password" /> */}
          <IconInput
            iconComponent={<AiOutlineKey />}
            type="password"
            placeholder="Edusoft Password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <Checkbox
            onChecked={handleTogglePassword}
            label={"Remember password"}
          />
        </div>
        <div>
          <Button context={<>Sign in</>} onClick={handleLogin} />
        </div>
      </form>
    </div>
  );
}
