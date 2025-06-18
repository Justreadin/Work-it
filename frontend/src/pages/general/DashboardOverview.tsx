// components/dashboard/DashboardOverview.tsx
import star from "../../assets/Images/star.png"
import fire from "../../assets/Images/fire.png"
import job from "../../assets/Images/icon1.png"
import talent from "../../assets/Images/icon2.png"
import BecomeAclientButton from "../../ui/BecomeAclientButton";
import YourPost from "./YourPost";

export default function DashboardOverview() {
   // Simulating days left – in real case this would come from props or API
  const daysLeft = 5; // change this to test different scenarios
  const paymentText = "5d 23hr 53 mins";
  const isUrgent = daysLeft < 2;
  return (
    <section className="mt-[12%] space-y-6 rounded-2xl bg-gray-50 p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Your Dashboard</h2>
          <p className="text-sm text-gray-600">Williams Shakespeare</p>
        </div>
         <BecomeAclientButton key="post" actionName="Post a New Role " link="#" className="nonebg rounded-3xl border-2 border-transparent bg-dark_purple px-8 py-2.5 text-base font-bold text-white hover:border-dark_purple hover:bg-white_gray hover:text-dark_purple" />
      </div>

      <div className="flex flex-col items-start gap-4 rounded-xl bg-white p-3">
        <div className="flex w-full items-start justify-between gap-2 text-yellow-500">
          <div className="w-16">
            <img src={star} className="w-full" alt="" />
          </div>
          <p className="flex items-center text-xs text-gray-400">You are doing well!
            <img src={fire} className="w-5" alt="" />
          </p>
        </div>
        <p className="text-sm font-medium text-[#6337FA]">Effectively Participating</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-white md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 text-gray-800 shadow">
  <div className="flex items-center justify-between">
    <div>
      <p className="pb-2 text-sm text-gray-500">Next payment period</p>
      <p className={`text-xl font-bold ${isUrgent ? "text-red-600" : "text-dark_purple"}`}>
        {paymentText}
      </p>
    </div>
    {isUrgent && (
      <BecomeAclientButton
        key="pay"
        actionName="Go to payment"
        link="#"
        className="nonebg rounded-3xl border-2 border-transparent bg-dark_purple px-8 py-2.5 text-base font-bold text-white hover:border-dark_purple hover:bg-white_gray hover:text-dark_purple"
      />
    )}
  </div>
</div>
        <div className="rounded-lg bg-white p-4 text-gray-800 shadow">
          <p className="pb-2 text-sm text-gray-500">Total Payment</p>
          <p className="text-xl font-bold text-dark_purple">₦129,101</p>
        </div>
        <div className="rounded-lg bg-dark_purple p-4">
          <p className="flex justify-between pb-2 text-sm">How many Jobs ongoing
            <img src={job} className="h-6 w-6" alt="" />
          </p>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="rounded-lg bg-yellow-400 p-4 text-gray-900">
          <p className="flex justify-between pb-2 text-sm">How many Talents
            <img src={talent} className="h-6 w-6" alt="" />
          </p>
          <p className="text-2xl font-bold text-dark_purple">13</p>
        </div>
      </div>
        <YourPost/>
    </section>
  );
}
