// components/shuffle/ShufflePage.tsx
 import dummyProfile from "../../assets/Images/clientImg.png"; // replace with actual image paths

export default function ShufflePage() {
  const candidates = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    name: "James Johnson",
    description: "I am a this and this is what i can help you with... simple, in less than 100 characters",
    image: dummyProfile,
  }));

  return (
    <div className="p-4">
      <div className="mb-4 rounded-md bg-purple-100 p-4 text-sm text-gray-600">
        <p>
          <span className="font-bold text-purple-800">X</span> we provided these best candidates based on the information you provided. Among these talents, choose the amount you requested for… If you are not satisfied with our pick, you can always reshuffle.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold">Number of workers requested: <span className="text-customPurple">08</span></p>
        <p className="font-semibold">Picks Remaining: <span className="text-customPurple">08</span></p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {candidates.map((cand, i) => (
          <label key={i} className="relative cursor-pointer rounded-lg border p-3">
            <input type="checkbox" className="absolute left-2 top-2" />
            <img src={cand.image} alt={cand.name} className="mx-auto h-20 w-20 rounded-full object-cover" />
            <p className="mt-2 text-center font-bold">{cand.name}</p>
            <p className="text-center text-sm text-gray-600">{cand.description}</p>
          </label>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button className="w-full rounded-full border-2 border-purple-400 py-2 font-semibold text-purple-600">
          RESHUFFLE
        </button>
        <button className="w-full rounded-full bg-purple-700 py-2 font-semibold text-white">
          CONTINUE
        </button>
      </div>
    </div>
  );
}
