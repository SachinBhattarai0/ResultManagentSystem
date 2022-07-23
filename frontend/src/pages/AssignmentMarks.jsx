import React from "react";
import NavBarContainer from "../components/NavBarContainer/NavBarContainer";

const AssignmentMarks = () => {
  return (
    <NavBarContainer>
      <div className="px-3 py-5 flex-1 flex items-start justify-center">
        <table border={"1"} className="flex-1 bg-white rounded-md">
          <tbody>
            <tr>
              <th
                rowSpan={2}
                className="p-2 border border-b-2 border-slate-300"
              >
                RollNo
              </th>
              <th
                rowSpan={2}
                className="p-2 border border-b-2 border-slate-300"
              >
                Name
              </th>
              <th className="p-2 border border-slate-300" colSpan={2}>
                Marks
              </th>
            </tr>
            <tr>
              <th className="p-2 border border-b-2 border-slate-300">Th</th>
              <th className="p-2 border border-b-2 border-slate-300">Pr</th>
            </tr>

            <tr>
              <td className="p-2 border border-slate-300 text-center">1</td>
              <td className="p-2 border border-slate-300 text-center">
                Suban Choudhary
              </td>
              <td className="p-2 border border-slate-300 text-center">
                <input
                  type="number"
                  className="w-20 outline-none border border-gray-200 p-1 focus:border-bluish rounded"
                />
              </td>
              <td className="p-2 border border-slate-300 text-center">
                <input
                  type="number"
                  className="w-20 outline-none border border-gray-200 p-1 focus:border-bluish rounded"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </NavBarContainer>
  );
};

export default AssignmentMarks;
