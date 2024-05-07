import React from "react";
import Link from "next/link";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import _, { get, map, result } from "underscore";

const Contest = () => {
  const auth = getAuth(app);
  const [array1, setarray] = useState(["fy"]);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef)
        .then((doc) => doc.data())
        .then(function (result) {
          return result.contest_reminder;
        })
        .then((array) => setarray(array));
    }
  }, [auth.currentUser]);

  useEffect(() => {
    const getContests = async () => {
    try {
      const res = await fetch("https://codeforces.com/api/contest.list?");
      const conts = await res.json();
      setContests(conts.result);
      console.log(conts.result);
  } catch (err) {
    console.log(err);
  }
  }
    getContests();
  }, []);

  const currentUser = auth.currentUser;

  const handleReminder = async (contest_name) => {
    if (!currentUser) {
      alert("User must be logged in to set a reminder for a contest.");
      return;
    }
    console.log(auth.currentUser.uid);
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    const data = docSnap.data();
    const oldarray = data.contest_reminder;
    console.log("oldarray" + oldarray);
    const newarray = _.union(oldarray, [contest_name]);
    console.log(newarray);
    await updateDoc(docRef, {
      contest_reminder: newarray,
    });

    setarray(_.union(array1, [contest_name]));
    fetch("https://emailer-xykq.onrender.com/mail", {
      method: "POST",
      body: JSON.stringify({
        to: auth.currentUser.email,
        subject: "***CONTEST REMINDER***",
        text: `<h1 style='color: black; border: 5px solid blue; letter-spacing: 5px; padding: 10px;'>${contest_name}</h1>`,
        delay: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function formatTime(timestamp) {
  // Create a Date object with the provided timestamp
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Get hours, minutes, and seconds from the Date object
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  // Return the formatted time string
  return `${hours}:${minutes}:${seconds}`;
}

// Example usage with your provided timestamp
const startTime = 1702737300;
const formattedTime = formatTime(startTime);
console.log(formattedTime);


  const contestsList = contests?.map((q) => {
    // console.log(q)
    let contestName = q?.name.split(' ').slice(0, 4).join(' ');
  

    if (q.phase == 'BEFORE') {
      if (q.name.split(' ').length > 4) {
        contestName += '...'
      }
      console.log({...q, name: contestName})
      return {...q, name: contestName}
    }
      // return q.phase == 'BEFORE';
  });

  console.log(contestsList)
  return (
    <div className="flex flex-wrap gap-10 px-10 justify-center">
      {contestsList?.map((contest, index) => {
        if (contest) return (
          <div
            key={index}
            className="w-72 mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-orange-100 dark:border-gray-700"
          >
            <div className="p-5">
              <div className="mb-2 text-2xl font-bold tracking-tight h-20 text-gray-900 ">
                {contest.name}
              </div>

              <div className="mb-3 font-normal text-gray-700">
                Start Time: {formatTime(contest.startTimeSeconds)}
              </div>
              <div className="mb-3 font-normal text-gray-700">
                Duration: {formatTime(contest.durationSeconds)}
              </div>
              <div className="flex items-center mt-8 justify-between">
                {/* <Link href={contest.url} target="_blank">
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="inline-block bg-red-300 rounded-full border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 "
                    data-te-ripple-init
                  >
                    View
                  </button>
                </div>
              </Link> */}
                {/* <div className="flex justify-end">
                {array1?.includes(contest.name) ? (
                  <button
                    type="button"
                    className="inline-block bg-red-400 rounded-full border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 "
                    data-te-ripple-init
                  >
                    Reminder Set
                  </button>
                ) : (
                  <button
                    onClick={() => handleReminder(contest.name)}
                    type="button"
                    className="inline-block bg-red-300 rounded-full border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 "
                    data-te-ripple-init
                  >
                    Get Reminder
                  </button>
                )}
              </div> */}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Contest;
