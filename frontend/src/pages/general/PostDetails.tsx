import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PiShuffleAngularFill } from 'react-icons/pi';
import { FiEdit3 } from 'react-icons/fi';
import { GoClock } from 'react-icons/go';
import { CiLocationOn } from 'react-icons/ci';
import AlertBanner from '../../home/AlertBanner';

interface Post {
  id: string;
  title: string;
  amount: string;
  posted: string;
  description: string;
  contractTasks: string[];
  tags: string[];
  duration: string;
  location: string;
  applications: number;
  deadline: string;
  workersNeeded: string;
}

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // TODO: Replace with real API call
    setPost({
      id: '1',
      title: 'LinkedIn Assistant for just replying messages',
      amount: '₦ 8000',
      posted: 'posted 19mins ago',
      description:
        "If you love building connections and keeping conversations flowing, read on. We’re a growing team that values authentic engagement, and we need someone to help manage our LinkedIn inbox. You’ll be the go-to person for replying to messages, keeping our conversations professional yet personable, and ensuring no opportunity slips through the crack.\n\nWe’re a growing team that values authentic engagement, and we need someone to help manage our LinkedIn inbox. You’ll be the go-to person for replying to messages, keeping our conversations professional yet personable, and ensuring no opportunity slips through the crack.",
      contractTasks: [
        'Calling', 'Replying emails', 'Checking emails', 'Posting online',
        'Excerpt design', 'Commenting under post', 'Checking notifications', 'Booking Appointments', 'Content writing', 'Reminder',
        'Joining my calls', 'Taking Minutes', 'Forwarding inboxes', 'Proof Reading'
      ],
      tags: ['LinkedIn', 'Communication', 'Assistant', 'Lagos'],
      duration: '3 months',
      location: 'Lagos',
      applications: 21,
      deadline: '12hr : 09mins : 45sec',
      workersNeeded: '08',
    });
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="mx-auto p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
        <button className="flex items-center gap-2 rounded-full border bg-dark_purple px-6 py-2 text-sm text-white hover:bg-purple-100">Edit <FiEdit3/></button>
      </div>
      <p className="mt-1 flex justify-end text-sm text-gray-500">posted {post.posted}</p>
    <div className='mt-2 border-b-2 border-t-2 border-[#22222233] pb-4'>
      <h2 className="mt-4 text-xl font-bold text-customPurple">{post.amount}</h2>

      <h3 className="mt-6 font-semibold text-gray-800">JOB DESCRIPTION</h3>
      <p className="mt-1 whitespace-pre-line text-gray-700">{post.description}</p>
    </div>
    
      <h3 className="mt-6 font-semibold text-gray-800">CONTRACT</h3>
      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
        {post.contractTasks.map((task, i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="accent-gray-300" />
            <span className="text-sm text-gray-700">{task}</span>
          </div>
        ))}
      </div>

    <div className="flex items-center justify-between">
      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        {post.tags.map((tag, i) => (
          <span key={i} className="rounded-full bg-[#22222233] px-3 py-2">{tag}</span>
        ))}
        </div>
        <span className="flex items-center gap-4"><GoClock className='text-[#222222]' /> {post.duration}</span>
        <span className="flex items-center gap-4"><CiLocationOn /> {post.location}</span>
      
</div>
    <div className="flex items-center justify-between">
      <p className="mt-4 text-sm font-semibold text-customPurple">Number of workers needed: <span className="pl-6 text-customPurple">{post.workersNeeded}</span></p>
      <span className="text-right font-semibold">Application deadline<br /><span className="text-customPurple">{post.deadline}</span></span>
    </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
        <h3 className="font-semibold text-customPurple">TALENT APPLICATIONS</h3>
        <span className="rounded-full bg-customPurple px-6 text-xl font-semibold text-white">{post.applications}</span>
        </div>
        <div className="mt-6">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-customPurple p-6 font-bold text-white">
            SHUFFLE APPLICATIONS <PiShuffleAngularFill className="text-xl" />
          </button>
        </div>
      </div>

        <div className="mt-4">
            <AlertBanner/>
        </div>

      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row">
        <button className="w-full rounded-full border border-blue-500 px-8 py-2 text-blue-500">FREEZE</button>
        <button className="w-full rounded-full bg-red-600 px-8 py-2 text-white">END POST</button>
      </div>
    </div>
  );
}
