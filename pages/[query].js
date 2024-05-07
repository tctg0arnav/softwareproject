import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import _ from "underscore";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps() {
  const res = await fetch("https://dsa-v3sn.onrender.com");
  const ques = await res.json();

  return {
    props: {
      ques,
    },
    revalidate: 15,
  };
}

const Post = ({ ques }) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [array1, setarray] = useState(["fy"]);
  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef)
        .then((doc) => doc.data())
        .then(function (result) {
          return result.solvedQuestion;
        })
        .then((array) => setarray(array));
    }
  }, [auth.currentUser]);

  const removeQuestion = async (questionId) => {
    console.log("infunc");
    const currentUser = auth.currentUser;

    // Check if user is logged in
    if (!currentUser) {
      alert("User must be logged in to add solved question");
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
    const oldarray = data.solvedQuestion;
    console.log("oldarray" + oldarray);
    const newarray = _.difference(oldarray, [questionId]);
    console.log(newarray);
    await updateDoc(docRef, {
      solvedQuestion: newarray,
    });

    setarray(newarray);
  };

  const addSolvedQuestion = async (questionId) => {
    const currentUser = auth.currentUser;

    // Check if user is logged in
    if (!currentUser) {
      alert("User must be logged in to add solved question");
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
    const oldarray = data.solvedQuestion;
    console.log("oldarray" + oldarray);
    const newarray = _.union(oldarray, [questionId]);
    console.log(newarray);
    await updateDoc(docRef, {
      solvedQuestion: newarray,
    });

    setarray(_.union(array1, [questionId]));
  };

  let quess = [];

  const { query } = router.query;
  quess = ques?.filter((q) => {
    return q.Topic == query;
  });

  return (
    <div className="mx-12">
      <div className="-mx-4 sm:-mx-8 px-8 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="">
                <th className="px-32 ml-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Problem Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Topic
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Difficulty Level
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {quess?.map((question) => (
                <tr key={question.id}>
                  <td className=" px-10 py-5 border-b border-gray-200 bg-white text-sm">
                    <Link href={`ques/${question.Problem}`}>
                      <div className="flex items-center">
                        <div className="ml-5">
                          <div className="text-gray-900 whitespace-no-wrap">
                            {question.Problem}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap">
                      {question.Topic}
                    </div>
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap ml-6">
                      {question.Difficulty}
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {array1.includes(question.id) ? (
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>

                        <span className="relative ">
                          <button onClick={() => removeQuestion(question.id)}>
                            Done
                          </button>
                        </span>
                      </span>
                    ) : (
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                        ></span>

                        <span className="relative ">
                          <button
                            onClick={() => addSolvedQuestion(question.id)}
                          >
                            Not Done
                          </button>
                        </span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Post;
