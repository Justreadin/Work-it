// components/dashboard/YourPost.tsx

import { FaEllipsis } from "react-icons/fa6";
import BecomeAclientButton from "../../ui/BecomeAclientButton";
import { Link } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";

type Post = {
  id: string;
  title: string;
  posted: string;
  applications: number;
  deadline: string;
};

const posts: Post[] = [
  {
    id: "1",
    title: "LinkedIn Assistant",
    posted: "19mins ago",
    applications: 21,
    deadline: "12hr : 09mins : 45sec",
  },
  {
    id: "2",
    title: "LinkedIn Assistant",
    posted: "19mins ago",
    applications: 21,
    deadline: "12hr : 09mins : 45sec",
  },
];

export default function YourPost({ showPostButton = false}) {
  return (
    <div className="mt-8 space-y-10">
      {/* Your Post Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Post</h2>
          <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-semibold text-dark_purple">
            see all posting
          </a>
          {showPostButton && (
            <BecomeAclientButton
              key="post"
              actionName="Post a New Role"
              link="/dashboard/roles/new"
              className="nonebg rounded-3xl border-2 border-transparent bg-dark_purple px-8 py-2.5 text-base font-bold text-white hover:border-dark_purple hover:bg-white_gray hover:text-dark_purple"
            />
          )}
          </div>
        </div>

        {posts.map((post) => (
          <Link to={`/dashboard/roles/${post.id}`} key={post.id}>
          <div className="mb-4 border-b pb-4">
            <div className="flex items-start justify-between">
              {/* Left: Job Title + Posted time */}
              <div>
                <p className="font-medium text-gray-900">{post.title}</p>
                <p className="text-sm text-gray-500">posted {post.posted}</p>
              </div>

              {/* Center: Applications and Deadline */}
              <div className="flex items-center space-x-12">
                <div className="text-center">
                  <p className="pb-4 text-sm text-gray-500">Application</p>
                  <p className="font-bold text-customPurple">{post.applications}</p>
                </div>
                
              </div>

              {/* Right: Ellipsis */}
              <div className="flex cursor-pointer flex-col items-end text-xl text-gray-400">
                <button className="text-right">
                    <FaEllipsis/>
                </button>
                <div className="text-center">
                  <p className="pb-4 text-sm text-gray-500">Application deadline</p>
                  <p className="text-sm font-bold text-customPurple">{post.deadline}</p>
                </div>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
      
      {/* Your Draft Section */}
      <div className="border-b">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Draft</h2>
          <a href="#" className="text-sm font-semibold text-dark_purple">
            see all posting
          </a>
        </div>

        <div className="flex items-center justify-between text-gray-900">
          <p className="font-medium">LinkedIn Assistant</p>
          <span className="text-xl text-gray-500"> <FiEdit3/> </span>
        </div>
      </div>
    </div>
  );
}