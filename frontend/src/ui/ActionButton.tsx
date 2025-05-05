type Props={
    type: 'submit' | 'reset' | 'button' | undefined
    name: string
}
const ActionButton = ({name, type}: Props) => {
  return (
    <button type={type} className="py-2.5 px-4 bg-dark_purple rounded-3xl text-white w-full md:w-[50%] mt-4">
      {name}
    </button>
  );
};

export default ActionButton