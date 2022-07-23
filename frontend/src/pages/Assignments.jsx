import React, { useEffect } from "react";
import NavBarContainer from "../components/NavBarContainer/NavBarContainer";
import { useUserInfo } from "../context/UserInfoProvider";
import Button from "../components/form/Button";
import { Link } from "react-router-dom";

const Assignments = () => {
  const { userState } = useUserInfo();

  useEffect(() => {
    //fetch user assignments
  });

  return (
    <NavBarContainer>
      <div className="px-3 py-5 bg-gray-100 flex-1 flex items-start justify-center">
        <table border={"1"} className="flex-1 bg-white rounded-md">
          <tbody>
            <tr>
              <th className="p-2 border border-b-2 border-slate-300">#</th>
              <th className="p-2 border border-b-2 border-slate-300">Exam</th>
              <th className="p-2 border border-b-2 border-slate-300">Class</th>
              <th className="p-2 border border-b-2 border-slate-300">
                Subject
              </th>
              <th className="p-2 border border-b-2 border-slate-300">Action</th>
            </tr>

            <tr>
              <td className="p-2 border border-slate-300 text-center">1</td>
              <td className="p-2 border border-slate-300 text-center">
                2022-09-15
              </td>
              <td className="p-2 border border-slate-300 text-center">Nine</td>
              <td className="p-2 border border-slate-300 text-center">
                English
              </td>
              <td className="p-2 border border-slate-300 text-center">
                <Link to="/assignments/thisisid/">
                  <Button sm>View</Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </NavBarContainer>
  );
};

export default Assignments;
