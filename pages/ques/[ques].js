import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps() {
  const res = await fetch("https://questions-ih30.onrender.com/");
  const ques1 = await res.json();

  return {
    props: {
      ques1,
    },
    revalidate: 30,
  };
}

const Question = ({ ques1 }) => {
  const router = useRouter();
  const { ques } = router.query;
  //   console.log(ques1);
  console.log(ques);

  ques1 = ques1?.filter((q) => q.Problem.trim() == ques);
  console.log(ques1);

  return (
    <>
      {ques1?.map((q) => (
        <div
          key={q.id}
          className="flex mt-20 items-center p-10 w-full h-full bg-white"
        >
          <div className="border-t border-b py-10 grid grid-cols-2 gap-8">
            <div className="flex flex-col h-full justify-start py-5">
              <div className="flex flex-col w-full h-full object-cover justify-items-start border rounded-lg overflow-hidden">
                <iframe
                  className="h-full"
                  src={q.Link}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-4">
                <div className="capitalize text-2xl font-extrabold text-black">
                  {q.Problem}
                </div>
                <div className="text-3xl">{q.Topic}</div>
                <div className="">Difficulty : {q.Difficulty}</div>
                <div className="text-lg text-gray-500	">{q.Description}</div>
                <div className="flex items-center gap-4 my-6 cursor-pointer ">
                  <Link href={q.URL} target="_blank">
                    <button
                      type="button"
                      className="inline-block bg-red-300 rounded-full px-6 pb-[6px] pt-2 text-sm font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100  focus:ring-0 active:border-primary-accent-200 "
                      data-te-ripple-init
                    >
                      Go to Question
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Question;
