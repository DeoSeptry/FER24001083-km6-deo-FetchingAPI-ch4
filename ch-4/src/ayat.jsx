import axios from "axios";
import Navbar from "./komponen/navbar";
import React, { useEffect, useState } from "react";

export default function ayat() {
  const [nomor, setNomor] = useState("1");
  const [editAyah, setEditAyah] = useState([]);

  const Ayah = async () => {
    try {
      const response = await axios.get(
        `http://api.alquran.cloud/v1/ayah/${nomor}/ar.alafasy`
      );
      console.log("cek", response.data);
      setEditAyah(response.data.data);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  useEffect(() => {
    Ayah();
  }, [nomor]);

  console.log("ayat", editAyah);
  console.log("cek nmr", nomor);

  return (
    <div className="">
      <Navbar />
      <div className="mx-96 text-gray-200 mt-10">
        <div className=" flex justify-center">
          <p className="  text-3xl font-semibold py-6 px-10 bg-blue-500 mt-7 rounded-2xl w-96">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>

        <div className="flex flex-col items-stretch mt-10 gap-5 bg-gray-800   rounded-xl pb-10 py-5 px-5">
          <div className="flex justify-between items-center pb-5 border-b-2 border-gray-600">
            <p className="text-l">
              surat {editAyah?.surah?.englishName}, ayat{" "}
              {editAyah?.numberInSurah} {"( "}
              {editAyah?.surah?.number} : {editAyah?.numberInSurah} {")"}
            </p>
            <div className="">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="max-w-md mx-auto"
              >
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="number"
                    className="block w-full h-12 p-4 ps-10 text-sm text-gray-200 border border-gray-600 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cari no ayat al-quran"
                    value={nomor}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue >= 6237 || inputValue < 0) {
                        alert(
                          "Astaghfirullah, sini tak kasih paham wahai pendosaa..wahai orang yang beriman, menurut riwayat Hafs dari Imam `Asim bahwasanya Ayat Alquran itu berjumlah 6.236."
                        );
                        setNomor("1");
                      } else {
                        setNomor(inputValue);
                      }
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className=" text-2xl text-center">{editAyah?.text}</div>
        </div>
      </div>
    </div>
  );
}
