import React from "react";
import { SecondNav, MyCalendar, Search, Footer } from "../components";
import Calendar from "../components/calendar/Calendar";

// Take userID --> Put into link 
// const EmbeddedCalendar: React.FC = () => {
//   return (
//     <>
//       <iframe
//         src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FHo_Chi_Minh&bgcolor=%23ffffff&src=YW5obGVAYW5kcmV3LmNtdS5lZHU&src=MGI3ZGZjODNiZTNhYzRlYjlhNjUzZDQyNzAzNjhiMDM5NjAxZDJiMDUxZDE4Nzc2ZmJiZTBiZWEzZDJhMjNlOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y211LnNjb3R0eWxhYnNAZ21haWwuY29t&color=%23039BE5&color=%237986CB&color=%237CB342"
//         style={{
//           border: 'solid 1px #777',
//           width: '800px', // Adjust width as needed
//           height: '700px', // Adjust height as needed
//         }}
//         scrolling="no"
//       ></iframe>
//     </>
//   );
// };

const Academics: React.FC = () => {
  return (
    <div>
      <div className="relative">
        <div className="justify-between z-0">
          <SecondNav />
        </div>
        <div className="flex justify-between z-10 mt-2">
          <div className="w-2/5">
            <Search page={"academics"}/>
          </div>

          <div className="Calendar">
            {/* <MyCalendar /> */}
            <Calendar />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export { Academics };
