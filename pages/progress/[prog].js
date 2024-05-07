import React, { use } from "react";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { useState, useEffect } from "react";

export const getServerSideProps = async (context) => {
  let easy = 0,
    hard = 0,
    medium = 0,
    array = 0,
    ss = 0,
    ll = 0,
    BackTracking = 0,
    dp = 0,
    graph = 0,
    heap = 0,
    greedy = 0,
    t = 0,
    m = 0,
    Stacks_Queues = 0,
    BinarySearchTrees = 0,
    BinaryTrees = 0,
    BitManipulation = 0,
    s = 0;

  const res = await fetch("https://questions-ih30.onrender.com/");
  const ques = await res.json();
  console.log("done");
  console.log(context.query.prog);
  const docRef = doc(db, "users", context.query.prog);
  const doc1 = await getDoc(docRef);
  const data = await doc1.data();
  const solvedarray = await data.solvedQuestion;
  ques.map((q) => {
    if (solvedarray?.includes(q.id)) {
      if (true) {
        if (q.Difficulty == "Easy") {
          easy = easy + 1;
        }
        if (q.Difficulty == "Medium") {
          medium = medium + 1;
        }
        if (q.Difficulty == "Hard") {
          hard = hard + 1;
        }
      }
      if (true) {
        if (q.Topic == "Array") {
          array = array + 1;
        }

        if (q.Topic == "Stacks & Queues") {
          Stacks_Queues = Stacks_Queues + 1;
        }
        if (q.Topic == "BackTracking") {
          BackTracking = BackTracking + 1;
        }
        if (q.Topic == "Binary Trees") {
          BinaryTrees = BinaryTrees + 1;
        }
        if (q.Topic == "Bit Manipulation") {
          BitManipulation = BitManipulation + 1;
        }
        if (q.Topic == "Binary Search Trees") {
          BinarySearchTrees = BinarySearchTrees + 1;
        }
        if (q.Topic == "Dynamic Programming") {
          dp = dp + 1;
        }
        if (q.Topic == "Graph") {
          graph = graph + 1;
        }
        if (q.Topic == "Greedy") {
          greedy = greedy + 1;
        }
        if (q.Topic == "Heap") {
          heap = heap + 1;
        }
        if (q.Topic == "Searching & Sorting") {
          ss = ss + 1;
        }
        if (q.Topic == "String") {
          s = s + 1;
        }
        if (q.Topic == "Trie") {
          t = t + 1;
        }
        if (q.Topic == "LinkedList") {
          ll = ll + 1;
        }

        if (q.Topic == "Matrix") {
          m = m + 1;
        }
      }
    }
  });

  return {
    props: {
      easy1: easy,
      medium1: medium,
      hard1: hard,
      ss1: ss,
      ll1: ll,
      t1: t,
      m1: m,
      s1: s,
      heap1: heap,
      BackTracking1: BackTracking,
      BinarySearchTrees1: BinarySearchTrees,
      BinaryTrees1: BinaryTrees,
      BitManipulation1: BitManipulation,
      graph1: graph,
      dp1: dp,
      heap1: heap,
      array1: array,
      Stacks_Queues1: Stacks_Queues,
      greedy1: greedy,
    },
  };
};

const Progress = ({
  easy1,
  medium1,
  hard1,
  ss1,
  t1,
  m1,
  s1,
  heap1,
  graph1,
  BackTracking1,
  BinarySearchTrees1,
  BinaryTrees1,
  BitManipulation1,
  dp1,
  greedy1,
  ll1,
  array1,
  Stacks_Queues1,
}) => {
  const auth = getAuth(app);

  const [donearray, setDonearray] = useState([]);
  const [easy, setEasy] = useState(Number(0));
  const [medium, setMedium] = useState(Number(0));
  const [hard, setHard] = useState(Number(0));

  return (
    <div>
      {auth.currentUser ? (
        <>
          <div className="container my-10  mx-5">
            <div className="flex flex-col gap-10">
              <div className="text-3xl px-0">On the Basis Of Difficulty</div>
              <div className="mb-32 text-gray-800 text-center">
                <div className="grid gap-x-6 lg:gap-x-12 md:grid-cols-3">
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {easy1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Easy</h5>
                    <div className="text-gray-500  text-xl">Total : 150 </div>
                  </div>

                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {medium1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Medium</h5>
                    <div className="text-gray-500 text-xl">Total : 200 </div>
                  </div>

                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {hard1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Hard</h5>
                    <div className="text-gray-500  text-xl">Total : 100 </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 justify-evenly">
              <div className="text-3xl px-0">On the Basis Of Topic</div>
              <div className="mb-32 text-gray-800 text-center ">
                <div className="grid gap-x-6 lg:gap-x-12 md:grid-cols-3">
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {array1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Array</h5>
                    <div className="text-gray-500  text-xl">Total : 36 </div>
                  </div>

                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {BackTracking1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">BackTracking</h5>
                    <div className="text-gray-500 text-xl">Total : 19 </div>
                  </div>

                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {Stacks_Queues1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">
                      Stacks & Queues
                    </h5>
                    <div className="text-gray-500  text-xl">Total : 41 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {BinaryTrees1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Binary Trees</h5>
                    <div className="text-gray-500  text-xl">Total : 35 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {BitManipulation1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">
                      Bit Manipulation
                    </h5>
                    <div className="text-gray-500  text-xl">Total : 10 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {BinarySearchTrees1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">
                      Binary Search Trees
                    </h5>
                    <div className="text-gray-500  text-xl">Total : 22 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {dp1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">
                      Dynamic Programming
                    </h5>
                    <div className="text-gray-500  text-xl">Total : 60 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {graph1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Graph</h5>
                    <div className="text-gray-500  text-xl">Total : 44 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {greedy1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Greedy</h5>
                    <div className="text-gray-500  text-xl">Total : 35 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {heap1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Heap</h5>
                    <div className="text-gray-500  text-xl">Total : 18 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {ll1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Linked List</h5>
                    <div className="text-gray-500  text-xl">Total : 34</div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {m1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Matrix</h5>
                    <div className="text-gray-500  text-xl">Total : 10 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {ss1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">
                      Searching & Sorting
                    </h5>
                    <div className="text-gray-500  text-xl">Total : 36 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {s1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">String</h5>
                    <div className="text-gray-500  text-xl">Total : 42 </div>
                  </div>
                  <div className="mb-12 md:mb-0 py-7 px-7">
                    <h2 className="text-3xl font-bold display-5 text-red-300 mb-4">
                      {t1}
                    </h2>
                    <h5 className="text-2xl font-medium mb-4">Trie</h5>
                    <div className="text-gray-500  text-xl">Total : 6 </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Progress;
