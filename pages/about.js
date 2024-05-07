import React from "react";

const About = () => {
  return (
    <div className="flex flex-wrap justify-around px-10 py-10 ">
      <div className="container">
        <div className="text-2xl font-semibold">About CP Expert</div>
        <div className="text-xl pt-5">
          CP Expert is a website aimed at helping programmers improve their
          problem-solving skills by providing a list of curated problems, links
          to popular online judges and code editors, and a calendar of upcoming
          contests.
        </div>
        <div className="text-xl pt-5">
          The website allows users to keep track of the problems they have
          solved and provides statistics on their performance. It also allows
          users to compete with their friends by comparing their performance and
          solved problems.
        </div>
        <div className="text-xl pt-5">
          CP Expert is built using Next.js, Firebase, and several external APIs.
          It is maintained by a team of dedicated developers who are passionate
          about helping programmers improve their skills.
        </div>
      </div>
    </div>
  );
};

export default About;
