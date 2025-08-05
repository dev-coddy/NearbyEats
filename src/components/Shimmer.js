// Shimmer.js
const Shimmer = () => {
  return (
    <div className="w-[1200px] mx-auto flex flex-wrap gap-[10px] mt-48">
      {Array(12)
        .fill("")
        .map((_, index) => (
          <div
            className="w-[280px] h-[270px] rounded-[16px] bg-[#f6f7f8] relative inline-block overflow-hidden animate-shimmer bg-[length:800px_104px] bg-no-repeat bg-gradient-to-r from-[#f6f7f8] via-[#edeef1] to-[#f6f7f8]"
            key={index}
          ></div>
        ))}
    </div>
  );
};

export default Shimmer;
