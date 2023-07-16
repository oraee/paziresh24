import React, { useMemo, useState } from "react";
import { LikeIcon, SaveIcon, ShareIcon, ViewIcon } from "../icons";
import { abbreviateNumber } from "../../utils/abbreviateNumber";
import { Avatar } from "../Avavtar/index";
import { TrustIcon } from "../icons/trust";

const DoctorHead = ({ data }) => {
  const [isSaved, setIsSaved] = useState(data.isBookmarked);

  const shareDoctor = () => {
    if (navigator.share) {
      navigator.share({
        title: data.name,
      });
    } else {
      alert("Your browser doesn't support share");
    }
  };

  const toggleSave = () => {
    setIsSaved((p) => !p);
  };

  const isTrusted = useMemo(
    () =>
      data.satisfaction > 90 &&
      data.commentsCount >= 100 &&
      data.waitingTime === 1,
    [data.satisfaction, data.commentsCount, data.waitingTime]
  );

  return (
    <article className="p-4 bg-white rounded-lg flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <button onClick={toggleSave}>
            <div className="flex gap-1 items-center text-sm">
              <SaveIcon fill={isSaved && "currentColor"} />
              Save
            </div>
          </button>
          <button onClick={shareDoctor}>
            <div className="flex gap-1 items-center text-sm">
              <ShareIcon />
              Share
            </div>
          </button>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <ViewIcon />
          {abbreviateNumber(data.viewCount)}
        </div>
      </div>

      <section className="bg-slate-100 p-4 rounded-lg flex gap-4 items-center">
        <Avatar src={data.profileUrl} />

        <div>
          <h3 className="flex gap-2 items-center text-lg font-bold">
            {data.name} {data.family} {isTrusted && <TrustIcon />}
          </h3>

          <p className="text-slate-500">{data.expertise}</p>
        </div>
      </section>

      <footer className="flex justify-center items-center gap-1 text-sm">
        <div className="rounded-full bg-green-600 text-slate-100 px-2 py-1 flex gap-1 items-center font-bold">
          <LikeIcon />
          {data.satisfaction}%
        </div>

        <p>satisfaction ({data.commentsCount} comments)</p>
      </footer>
    </article>
  );
};

export default DoctorHead;
