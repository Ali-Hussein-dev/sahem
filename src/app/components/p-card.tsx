//======================================
const PCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded bg-gradient-to-tr from-green-600/70 via-black/70 to-red-700/70 p-[2px]">
      <div className="rounded bg-white px-4 pb-3 pt-5">{children}</div>
    </div>
  );
};
export default PCard;
