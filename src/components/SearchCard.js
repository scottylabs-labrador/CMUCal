import React from "react";

function SearchCard({ eventName, orgName, date, time, location }) {
  return (
    <div class="bg-white w-full my-3.5  px-6 py-4 rounded-lg flex items-center align-stretch">
      <div className="flex-1">
        <p class="text-xl">{eventName}</p>
        <p class="text-base">By {orgName}</p>
        {/* Time information */}
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            class="h-4 w-4 text-gray-600 mr-2"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.00272 0.0708398C5.71447 0.0966 5.06907 0.232358 4.73776 0.337005C4.55045 0.39616 4.18845 0.545833 3.93334 0.669603C2.23863 1.49193 1.04086 3.04332 0.643751 4.93048C0.560548 5.32588 0.548916 5.46402 0.547418 6.07585C0.545491 6.86435 0.593836 7.21272 0.799917 7.89468C1.09434 8.86904 1.71144 9.86159 2.44518 10.5409C2.6468 10.7275 3.31724 11.2493 3.35549 11.2493C3.36516 11.2493 3.47615 11.3119 3.60217 11.3885C4.0731 11.6746 4.79188 11.9363 5.4903 12.0759C5.82864 12.1435 6.01075 12.157 6.59142 12.157C7.36148 12.157 7.77853 12.0961 8.44508 11.8865C8.90687 11.7413 9.71114 11.3382 10.1236 11.0452C10.5579 10.7367 11.2166 10.078 11.5251 9.64373C11.9702 9.01714 12.3774 8.08778 12.5288 7.35297C12.7465 6.29634 12.6698 5.13028 12.3156 4.11144C12.1866 3.74048 11.9268 3.18479 11.7972 3.00282C11.7598 2.95027 11.7292 2.89618 11.7292 2.88266C11.7292 2.86913 11.6128 2.70316 11.4705 2.51377C10.4504 1.15601 9.02483 0.318808 7.36169 0.100811C6.98364 0.0512525 6.3731 0.0378012 6.00272 0.0708398ZM7.34249 1.309C9.36138 1.63675 10.9257 3.13523 11.363 5.16036C11.4516 5.57053 11.4516 6.65252 11.363 7.06269C11.0379 8.56816 10.0602 9.82448 8.69583 10.4899C7.99046 10.8338 7.47297 10.946 6.59142 10.946C5.88469 10.946 5.61828 10.9081 5.073 10.7301C3.77928 10.3078 2.67777 9.30186 2.13252 8.04482C1.7053 7.0598 1.618 5.92143 1.88987 4.8806C2.37114 3.03793 3.9139 1.63222 5.80648 1.31182C6.17069 1.25017 6.97097 1.24867 7.34249 1.309ZM6.28619 2.18538C6.1525 2.23955 5.99101 2.46047 5.96679 2.62241C5.95419 2.70665 5.94913 3.53016 5.95551 4.45246C5.96707 6.11145 5.96804 6.13129 6.04889 6.3099C6.11454 6.455 6.3772 6.73648 7.38677 7.74344C8.78007 9.13313 8.74749 9.10916 9.07217 8.98517C9.32592 8.88827 9.44666 8.65686 9.39346 8.36946C9.37173 8.25208 9.21981 8.08514 8.23172 7.09269C7.60652 6.46475 7.07801 5.90576 7.05728 5.85053C7.0328 5.78538 7.01957 5.18248 7.01957 4.13431V2.51852L6.93857 2.39728C6.8016 2.19227 6.50618 2.09629 6.28619 2.18538Z"
              fill="#6A6565"
            />
          </svg>
          <p className="orgName">
            {date}, {time}
          </p>
        </div>
        {/* Location information */}
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="15"
            viewBox="0 0 11 15"
            fill="none"
            class="h-4 w-4 text-gray-600 mr-2"
          >
            <path
              d="M5.27788 0.634353L5.28189 0.684192L5.84291 14.1556L5.87089 14.197C5.87089 14.197 5.87089 14.197 5.8709 14.197C5.87262 14.1958 5.87432 14.1947 5.87602 14.1936C5.90554 14.1737 5.93164 14.1561 5.96861 14.1123C6.00558 14.0684 6.05399 13.9978 6.13429 13.8688C6.29078 13.6175 6.57412 13.1352 7.13949 12.1727L7.19041 12.086C7.63432 11.3303 8.14593 10.4602 8.32734 10.1524C8.81199 9.32993 9.47358 8.16085 9.73544 7.66398C10.3483 6.50127 10.4863 5.35892 10.1643 4.11102C9.8654 2.95319 9.06636 1.91439 7.97821 1.266L7.95261 1.30896L7.97821 1.266C7.42557 0.936745 6.71014 0.713353 5.99897 0.64696L5.99432 0.696742L5.99897 0.64696C5.63297 0.612807 5.56223 0.61147 5.27788 0.634353ZM7.64942 2.2824L7.64943 2.2824C9.07584 3.22895 9.6654 5.02018 9.08114 6.63261C9.01025 6.82827 8.82725 7.19322 8.49744 7.78816C8.1683 8.38188 7.69467 9.20163 7.04451 10.3051C6.70924 10.8742 6.3501 11.4849 6.24644 11.6623C6.02468 12.0417 5.85905 12.3221 5.74605 12.5094C5.68952 12.6031 5.64636 12.6731 5.61601 12.7205C5.61043 12.7292 5.60533 12.7371 5.60069 12.7441C5.58007 12.7149 5.55242 12.6732 5.51932 12.6214C5.44792 12.5097 5.35252 12.3531 5.25044 12.1788L5.20729 12.2041L5.25044 12.1788L4.12314 10.2544C3.70771 9.5453 3.30986 8.86599 3.23905 8.74475L3.23905 8.74474C2.99871 8.33343 2.75003 7.89032 2.5494 7.51963C2.34808 7.14764 2.19691 6.85176 2.14991 6.73302L2.10342 6.75142L2.14991 6.73302C1.8978 6.09617 1.82465 5.34003 1.95317 4.70893C2.04802 4.24329 2.10181 4.08166 2.28116 3.7204C2.80881 2.65761 3.78559 1.92204 4.94988 1.71053C5.24505 1.65691 5.82165 1.6507 6.16167 1.698C6.68696 1.77109 7.15593 1.95487 7.64942 2.2824ZM3.40044 4.63546L3.40043 4.63547C3.36426 4.77435 3.34694 4.9843 3.34694 5.19087C3.34694 5.39744 3.36426 5.60738 3.40043 5.74627L3.40044 5.74628C3.53239 6.25274 3.91055 6.78162 4.35194 7.07762C5.20221 7.64782 6.39996 7.54747 7.1434 6.84378C8.07154 5.96527 8.09932 4.51396 7.20434 3.61179C6.9173 3.32244 6.60522 3.12708 6.25429 3.01871C6.14441 2.98477 5.95121 2.95749 5.76277 2.94247C5.57456 2.92747 5.38221 2.92398 5.27423 2.94074C4.38206 3.07923 3.62824 3.76105 3.40044 4.63546ZM6.14394 6.29273L6.14393 6.29274L5.07606 6.30599C5.07606 6.30599 5.07606 6.30599 5.07605 6.30599C4.81944 6.17998 4.61015 5.96656 4.48526 5.70294C4.43607 5.5991 4.4116 5.53995 4.39846 5.47185C4.38509 5.40261 4.383 5.32191 4.38386 5.17419C4.38467 5.03137 4.38811 4.94927 4.40119 4.88104C4.414 4.81426 4.43647 4.75877 4.47968 4.66994L4.47968 4.66993C4.65685 4.3056 5.01637 4.03315 5.40132 3.96957L5.39317 3.92024L5.40132 3.96957C5.58237 3.93966 5.75574 3.95472 5.97489 4.02169C6.38527 4.14708 6.68211 4.46769 6.79659 4.91451C6.93179 5.44233 6.65749 6.02672 6.14394 6.29273Z"
              fill="#6A6565"
              stroke="#6A6565"
              stroke-width="0.1"
            />
          </svg>{" "}
          <p>{location}</p>
        </div>
      </div>
      <div className="flex-shrink-0">
      <button className="rounded-full border border-teal bg-transparent px-4 py-2 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
          >
            <path
              d="M4.69888 10V0H6.39585V10H4.69888ZM0.547363 5.84848V4.15152H10.5474V5.84848H0.547363Z"
              fill="#1F4C4C"
            />
          </svg>
          Add
        </button>
      </div>
    </div>
  );
}

export default SearchCard;
