import React from "react";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";

import DITData from "../../backend/scraper/drop_in.json";
import PTData from "../../backend/scraper/peer_tutoring.json";
import SIData from "../../backend/scraper/si.json";
import ClubsData from "../../backend/scraper/tartanconnect.json";
import CareerData from "../../backend/scraper/handshake.json";

import {
	DIT_type,
	PT_type,
	SI_type,
	Clubs_type,
	Career_type,
	Merged_Data_type,
} from "../../src/types";

// https://www.fusejs.io/

interface searchProps {
	value: string;
	sub_page: "academics" | "career" | "clubs";
	// filters are the values you select from the drop down
	academics_filter?: string[];
	clubs_filter?: string[];
	career_filter?: string[];
}


const bogus_value = {
  "resource_type": "SI",
  "course_id": "03-231",
  "course_name": "Honors Biochemistry",
  "professor": "Lee",
  "instructor": "Emily & Stephen",
  "events": [
    {
      "weekday": 7,
      "date": null,
      "start_time": "04:00PM",
      "end_time": "05:00PM",
      "location": "POS 282"
    }
  ]
}

const useSearch = (
	value: string,
	sub_page: string,
	academics_filter?: string[],
	clubs_filter?: string[],
	career_filter?: string[]
) => {
	const [data, setData] = useState<SI_type>(bogus_value);

	const fuse = new Fuse(SIData, {
		keys: ["course_id", "course_name"],
	});

	console.log(fuse.search(value));
  // setData(fuse.search(value))

	return [data];
};

export default useSearch;
