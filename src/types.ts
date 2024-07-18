/*
"resource_type": "DIT" —> drop_in.json
"resource_type": "PT" —> peer_tutoring.json
"resource_type": "SI" —> si.json
"resource_type": "Club/School" —> tartanconnect.json
"resource_type": "Career" —> handshake.json
*/

export const categoryListAcademics = [
    "Office Hours",
    "Supplemental Instructions",
    "Drop-in Tutoring",
    "Peer Tutoring"
  ];

export const categoryShorthandAcademics = [
    "OH",
    "SI",
    "DIT",
    "PT"
]
  
export const categoryListClubs = [ //called Event Types on TartanConnect
    "Academic", "Admissions", "Alumni", "Career Recruiting",
    "Civic Engagement", "Diversity, Equity, Inclusion & Belonging",
    "Entertainment", "General Body Meeting", "Exhibit/Show", 
    "Member Recruitment", "Performance", "Professional", "Religious/Spiritual",
    "Sports / Recreation", "Speaker/Lecture", "Wellness", "Training & Development"
]
  
export const categoryListCareer = [
    "Career Fair",
    "Networking",
    "Hiring",
    "Employer Info",
    "Guidance",
    "Academic",
    "Conference",
    "General"
]



type TimeFormat = "AM" | "PM";

type Month = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
type Day = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | `${10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31}`;
type Year = `${number}${number}${number}${number}`;

type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type ResourceType = "OH" | "DIT"| "PT" | "SI" | "Club/School";
// for Clubs only
type Resource_Source = "TartanConnect" | string;





export type event_instance_type = {
    weekday: number,
    date: null | string, //`${Month}-${Day}-${Year}`
    start_time: string, //`${number}:${number}${TimeFormat}`
    end_time: string,
    location: string
}

// DIT, SI, PT share same types so far
export type DIT_type = {
    resource_type: string,
    course_id: string,
	course_name: string,
	professor: null | string,
	instructor: string,
	events: event_instance_type[]
}

export type PT_type = {
    resource_type: string,
    course_id: string,
    course_name: string,
    professor: null | string,
    instructor: string,
    events: event_instance_type[]
}

export type SI_type = {
    resource_type: string,
    course_id: string,
    course_name: string,
    professor: null | string,
    instructor: string,
    events: event_instance_type[]
}

// clubs and career have same types
export type Clubs_type = {
    resource_type: string,
	resource_source: string,
	event_name: string,
	event_host: string,
	events: event_instance_type[],
	categories: string[]
}

export type Career_type = {
    resource_type: string,
	resource_source: string,
	event_name: string,
	event_host: string,
	events: event_instance_type[],
	categories: string[]
}   

export type Merged_Data_type = DIT_type & PT_type & SI_type & Clubs_type & Career_type;