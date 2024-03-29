import axios from "axios";
import Navbar from "./komponen/navbar";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlay, FaPauseCircle } from "react-icons/fa";

export default function QuranDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  const [arti, setArti] = useState([]);
  const [bahasa, setBahasa] = useState("id.indonesian");
  const [audioStates, setAudioStates] = useState({});
  const [surah, setSurah] = useState([]);
  const [dataNomor, setDataNomor] = useState(location?.state?.number);

  console.log(" sadad", dataNomor);

  const quranDetail = async (nomor) => {
    console.log("numer", location?.state);
    try {
      const response = await axios.get(
        `http://api.alquran.cloud/v1/surah/${dataNomor}/ar.alafasy`
      );
      console.log("cek", response.data.data);
      setDetail(response?.data.data);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };
  //   const quranDetail2 = async (nomor) => {
  //     console.log("numer", nomor);
  //     try {
  //       const response = await axios.get(
  //         `http://api.alquran.cloud/v1/surah/${nomor}/ar.alafasy`
  //       );
  //       console.log("cek", response.data.data);
  //       setDetail(response?.data.data);
  //     } catch (err) {
  //       console.log("error fetching data: ", err);
  //     }
  //   };

  const terjemahan = async () => {
    try {
      const response = await axios.get(
        `http://api.alquran.cloud/v1/surah/${dataNomor}/${bahasa}`
      );
      console.log("arti", response.data);
      setArti(response.data.data);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  const quran = async () => {
    try {
      const response = await axios.get(`http://api.alquran.cloud/v1/surah`);
      console.log("cek", response.data);
      setSurah(response.data.data);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  useEffect(() => {
    quranDetail();
    terjemahan();
    quran();
  }, [bahasa]);

  const stopAudio = (audioUrl) => {
    audioStates[audioUrl].pause();
  };

  useEffect(() => {
    return () => {
      if (Object.keys(audioStates).length !== 0) {
        stopAudio(Object.keys(audioStates)?.[0]);
      }
    };
  }, []);

  const toggleAudio = (audioUrl) => {
    console.log("det", audioStates);

    const audio = new Audio(audioUrl);
    const isPlaying = !!audioStates[audioUrl];
    //kondisi untuk pause jika audio play dan tidak pause
    if (isPlaying && !audioStates[audioUrl].paused) {
      audioStates[audioUrl].pause();
    }
    //jika audio tidak beruputar
    else {
      // Stop semua audio
      Object.values(audioStates).forEach((audio) => audio.pause());
      //play audio
      audio.play();
      audioStates[audioUrl] = audio;
    }

    setAudioStates({ ...audioStates });
  };

  return (
    <div className=" bg-[#0C121F]">
      <Navbar />

      <div className="mx-96 mb-20 mt-10 text-gray-200 mt">
        {/* pilih bahasa terjemahan */}
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setBahasa(e.target.value)}
            value={bahasa}
            className="select-cst bg-gray-800 rounded-xl"
          >
            <option value="en.sarwar">English</option>
            <option value="id.indonesian">Indonesian</option>
          </select>
          <div className="flex flex-col items-center gap-2">
            {/* <div className="font-semibold text-2xl">{detail?.name}</div> */}
            <div className="text-xl font-semibold">{detail?.englishName}</div>
            <div className="text-l">{detail?.englishNameTranslation}</div>
          </div>
          <div className="text-xl">{detail?.name}</div>
        </div>
        <div className=" flex justify-center">
          <p className="  text-3xl font-semibold py-6 px-10 bg-blue-500 mt-7 rounded-2xl w-96">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>
        <div className="flex justify-between gap-3 mt-10 ">
          <div className="flex flex-col gap-4 bg-gray-800 rounded-xl w-[80%]">
            {detail?.ayahs?.map((surat, index) => {
              console.log("auuuu", Object.keys(surat?.audio)[0]);
              return (
                <div
                  key={surat.number}
                  className="border-b-2 border-gray-500 px-4 py-3  "
                >
                  <div className="flex justify-between py-4">
                    <div className="font-semibold text-xl">
                      {surat?.numberInSurah}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-right text-2xl">{surat?.text}</div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 mt-5">
                    <div className="text-justify text-l text-gray-400">
                      {arti?.ayahs[index]?.text}
                    </div>
                    <button
                      onClick={() => toggleAudio(surat?.audio)}
                      className=""
                    >
                      {audioStates[surat.audio] &&
                      !audioStates[surat.audio].paused ? (
                        <FaPauseCircle />
                      ) : (
                        <FaPlay />
                      )}
                    </button>
                  </div>
                  {/* <div className="customAudio">
                    <audio controls>
                      <source
                        src={Object.keys(audioStates)?.[0]}
                        type="audi0/mpeg"
                      />{" "}
                    </audio>
                  </div> */}
                </div>
              );
            })}
          </div>

          <div className=" flex flex-col  gap-1  overflow-y-auto w-[20%]  h-screen rounded-2xl ">
            {surah.map((e) => (
              <div
                className="  py-2 px-2 flex justify-between items-center bg-gray-800 hover:bg-gray-600"
                key={e?.number}
                onClick={() => {
                  setDataNomor(e?.number), quranDetail(), terjemahan();
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl w-5 text-center font-semibold">
                    {e?.number}
                  </div>
                  <div>
                    <div className="font-semibold">{e?.englishName}</div>
                    <div className="text-sm text-gray-400">
                      {e?.revelationType} . {e?.numberOfAyahs} ayat
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
