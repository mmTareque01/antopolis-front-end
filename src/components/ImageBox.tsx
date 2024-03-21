
const ImageBox = ({ src, alt, caption }:any) => {
  return (
    <div className="flex flex-col items-center border border-gray-300 rounded-md p-4 m-2">
      <img src={src} alt={alt} className="w-[100px] h-auto mb-4" />
      <div className="text-center">{caption}</div>
    </div>
  );
};

export default ImageBox;
