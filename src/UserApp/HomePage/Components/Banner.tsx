export default function Banner() {
  return (
    <div className="max-sm:w-full flex flex-row w-full">
      <div className="flex flex-col w-full">
        <div className="w-full">
          <img
            className="w-full"
            src="https://tailieu.vn/banners/836_1658975426.jpg"
          />
        </div>
        <div className="flex flex-row justify-between my-5">
          <div className="w-[30%] border shadow p-2 cursor-pointer hover:bg-slate-400">
            <img
              className="w-full h-full"
              src="https://tailieu.vn/static/b2013az/templates/version1/default/images/btlceo.png"
            />
          </div>
          <div className="w-[30%] border shadow p-2 cursor-pointer hover:bg-slate-400">
            <img
              className="w-full h-full"
              src="https://tailieu.vn/static/b2013az/templates/version1/default/images/btlceo.png"
            />
          </div>
          <div className="w-[30%] border shadow p-2 cursor-pointer hover:bg-slate-400">
            <img
              className="w-full h-full"
              src="https://tailieu.vn/static/b2013az/templates/version1/default/images/btlceo.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
