"use client";

import Sidebar from "../../components/Sidebar";
import PersonalInfo from "../../components/PersonalInfo";
import BillingPlan from "../../components/BillingPlan";
import Addons from "../../components/Addons";
import Review from "../../components/Review";
import Success from "../../components/Success";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { AnimatePresence } from "framer-motion";
import { UserFormSchema, UserDetails } from "../../types";
import { useRef, useState } from "react";
import { FormItems } from "../../types";

export default function Home() {
  const {
    nextStep,
    isLastStep,
    gotoForm,
    isFirstStep,
    isSuccess,
    currentStepIndex,
    previousStep,
    status,
  } = useMultistepForm(4);

  const InitialValues: FormItems = {
    planSelected: "arcade",
    yearly: false,
    addOns: [
      {
        id: 1,
        checked: true,
        title: "Online Service",
        subtitle: "Access to multiple games",
        price: 1,
      },
      {
        id: 2,
        checked: false,
        title: "Large storage",
        subtitle: "Extra 1TB of cloud save",
        price: 2,
      },
      {
        id: 3,
        checked: false,
        title: "Customizable Profile",
        subtitle: "Custom theme on your profile",
        price: 2,
      },
    ],
  };

  const [formData, setFormData] = useState(InitialValues);

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const nameErr = useRef<HTMLSpanElement>(null);
  const emailErr = useRef<HTMLSpanElement>(null);
  const phoneErr = useRef<HTMLSpanElement>(null);

  const validateUserForm = (data: UserDetails) => {
    const parsedValues = UserFormSchema.safeParse(data);
    if (!parsedValues.success) {
      const formatted = parsedValues.error.format();
      if (nameErr?.current !== null) {
        nameErr.current.textContent =
          formatted.userName?._errors?.toString() || "";
      }
      if (emailErr?.current !== null) {
        emailErr.current.textContent =
          formatted.userEmail?._errors?.toString() || "";
      }
      if (phoneErr?.current !== null) {
        phoneErr.current.textContent =
          formatted.userPhone?._errors?.toString() || "";
      }
      return formatted;
    }

    return parsedValues.data;
  };

  const updateFormData = (updateField: Partial<FormItems>) => {
    setFormData({ ...formData, ...updateField });
  };

  const handleFormData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const addUserInfo = validateUserForm({
      userName: name.current?.value || "",
      userEmail: email.current?.value || "",
      userPhone: phone.current?.value || "",
    });

    if (
      currentStepIndex === 0 &&
      typeof addUserInfo.userName === "string" &&
      typeof addUserInfo.userEmail === "string" &&
      typeof addUserInfo.userPhone === "string"
    ) {
      nextStep();
    } else if (currentStepIndex > 0) {
      nextStep();
    }
  };

  return (
    <main className="h-screen md:grid md:place-items-center md:bg-lighter-blue">
      <div
        className="min-h-screen w-full overflow-hidden bg-magnolia md:mx-auto md:flex md:h-auto md:min-h-[515px] md:w-[768px] md:max-w-[1024px] md:rounded-2xl md:bg-white md:p-2 lg:w-auto"
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <Sidebar currentStepIndex={currentStepIndex} />
        <div className="-mt-[85px] px-4 pb-10 md:-mt-[0px] md:pb-0">
          <section className="overflow-hidden rounded-xl bg-white px-6 py-8 md:h-[500px] md:px-6 lg:w-[550px] lg:px-14">
            {isSuccess ? (
              <AnimatePresence mode="wait">
                <Success gotoForm={gotoForm} />
              </AnimatePresence>
            ) : (
              <form onSubmit={handleFormData}>
                <AnimatePresence mode="wait" custom={status}>
                  {currentStepIndex === 0 && (
                    <PersonalInfo
                      key={"step1"}
                      status={status}
                      name={name}
                      email={email}
                      phone={phone}
                      nameErr={nameErr}
                      emailErr={emailErr}
                      phoneErr={phoneErr}
                    />
                  )}
                  {currentStepIndex === 1 && (
                    <BillingPlan
                      key={"step2"}
                      status={status}
                      {...formData}
                      updateForm={updateFormData}
                    />
                  )}
                  {currentStepIndex === 2 && (
                    <Addons
                      key={"step3"}
                      status={status}
                      {...formData}
                      updateForm={updateFormData}
                    />
                  )}
                  {currentStepIndex === 3 && (
                    <Review
                      gotoForm={gotoForm}
                      key={"step4"}
                      status={status}
                      {...formData}
                    />
                  )}
                </AnimatePresence>
                <div className="mt-10 flex items-center justify-between">
                  {isSuccess ? (
                    ""
                  ) : (
                    <>
                      <button
                        type="button"
                        className="font-semibold text-cool-gray"
                        onClick={previousStep}
                      >
                        {isFirstStep ? "" : "Go Back"}
                      </button>
                      <button
                        type="submit"
                        className="grid h-[45px] min-w-[110px] place-items-center rounded bg-marine-blue font-semibold text-white"
                      >
                        {isLastStep ? "Confirm" : "Next Step"}
                      </button>
                    </>
                  )}
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
      <p className="hidden text-center lg:absolute lg:bottom-4 lg:block">
        Design from{" "}
        <a
          href="https://www.frontendmentor.io/"
          className="text-blue-800 underline"
        >
          FrontendMentor
        </a>{" "}
        & Developed by{" "}
        <a
          href="https://github.com/SammieKei40"
          className="text-blue-800 underline"
        >
          Samuel Shodipo
        </a>
      </p>
    </main>
  );
}

<div className="flex items-center gap-5 p-3">
  <h2 className="text-3xl font-bold underline">Table</h2>
  <div className="grow p-5">
    <div className=" w-[30rem]">
      <div className="grid grid-cols-1 gap-3">
        <Table data={data} columns={columns} itemsPerPage={100} link={"/details"} loading={false} showCheckbox={false} />
      </div>
    </div>
  </div>
</div>


import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  columns: { value: string; text: string }[];
  link?: string;
  itemsPerPage: number;
  loading: boolean;
  showCheckbox?: boolean;
  icon?: React.ElementType
}
const Table: React.FC<TableProps> = ({
  data,
  columns,
  itemsPerPage,
  showCheckbox,
  link
}) => {
  //   const history = useHistory();

  const [page] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // const totalPages = Math.ceil(data?.length / itemsPerPage);

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex);
  const remainingItems = data?.slice(page * itemsPerPage);

  // const handlePageClick = ({ selected }) => {
  //     setPage(selected);
  // };

  // const goToPage = (newPage: number) => {
  //     if (newPage >= 1 && newPage <= totalPages) {
  //         setPage(newPage);
  //     }
  // };

  const handleSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selected => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const selectAllItems = () => {
    if (data) { // Check if data is not undefined
      if (selectAll) {
        setSelectedItems([]);
      } else {
        setSelectedItems([...data]);
      }
      setSelectAll(!selectAll);
    }
  };



  //   const handleLinkClick = (linkItem: any) => {
  //     if (linkItem.action) {
  //       linkItem.action();
  //     } else {
  //       history.push(linkItem.to);
  //     }
  //   };


  return (


    <table className="">
      <thead className="text-black  px-3 rounded-lg">
        <tr className="bg-[#FFF9E3]">
          {showCheckbox && (
            <th scope="col" className="p-4">
              <span className="flex items-center">
                <input
                  type="checkbox"
                  className="w-6 h-6 cursor-pointer text-blue bg-white border-gray rounded hover:border-blue focus:ring-2"
                  checked={selectAll}
                  onChange={selectAllItems}
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </span>
            </th>
          )}
          {columns.map((column) => (
            <th key={column.value} scope="col" className="p-3 whitespace-nowrap text-center">
              {column.text}
            </th>
          ))}
          <th scope="col" className="p-3 text-center">
            Views
          </th>
        </tr>
      </thead>
      <tbody>
        {paginatedData?.map((item, index) => (

          <tr key={item.id} className="bg-white border-b ">
            {showCheckbox && (
              <td className="w-4 p-2">
                <span className="flex items-center">
                  <input
                    id={`checkbox-table-search-${index}`}
                    type="checkbox"
                    className="w-6 h-6 cursor-pointer text-blue bg-white border-gray rounded hover:border-blue focus:ring-2"
                    checked={selectedItems.includes(item)}
                    onChange={() => handleSelection(item)}
                  />
                  <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                    checkbox
                  </label>
                </span>
              </td>
            )}
            {columns.map((column) => (
              <td
                key={column.value}
                className="text-black leading-tight p-3 text-center font-medium text-md whitespace-nowrap"
              >
                {column.value === 'active' ? (
                  item[column.value] === 'true' ? (
                    <span className="text-green-500">Successful</span>
                  ) : item[column.value] === 'false' ? (
                    <span className="text-red">Failed</span>
                  ) : (
                    <span className="text-black">Pending</span>
                  )
                ) : (
                  item[column.value]
                )}

              </td>

            ))}
            <td className="relative text-center p-3 text-md cursor-pointer  text-black">
              <Link to={link || ''} className="border p-2 bg-[#FFFDF6]">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot className="text-black bg-white border-t  shadow-lg">
        <tr>
          {remainingItems && remainingItems.length > 0 && (
            <td colSpan={columns.length} className="p-3 uppercase text-sm text-gray-500">
              Total {remainingItems.length}
            </td>
          )}




        </tr>
      </tfoot>
    </table>

  );
};

export default Table;
