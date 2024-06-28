const AcademicsData = {
	OH: [
		{
			resource_type: "OH",
			course_id: "15-122",
			course_name: "Principles of Imperative Computation",
			eventName: "Office Hours",
			instructor: "15-122 Course Staff",
			events: [
				{
					weekday: 1,
					startDate: "06/17",
					endDate: "06/17",
					startTime: "03:00PM",
					endTime: "05:00PM",
					location: "POS 146"
				},
				{
					weekday: 1,
					startDate: "06/17",
					endDate: "06/17",
					startTime: "07:00PM",
					endTime: "08:30PM",
					location: "POS 146"
				},
			]
			
		}
	],
	DIT: [
		{
			resource_type: "DIT",
			course_id: "03-121",
			course_name: "Modern Biology I",
			professor: null,
			instructor: "Clara D.",
			events: [
				{
					weekday: 1,
					date: null,
					start_time: "08:00PM",
					end_time: "10:00PM",
					location: "Posner 280",
				},
			],
		},
		{
			resource_type: "DIT",
			course_id: "06-100",
			course_name: "Introduction to Chemical Engineering",
			professor: null,
			instructor: "Shreya M.",
			events: [
				{
					weekday: 7,
					date: null,
					start_time: "08:00PM",
					end_time: "10:00PM",
					location: "Posner 282",
				},
			],
		},
	],
	PT: [
		{
			resource_type: "PT",
			course_id: "03-121",
			course_name: "Modern Biology I",
			professor: null,
			instructor: "Vittoria Tonin",
			events: [
				{
					weekday: 5,
					date: "10-27-2023",
					start_time: "08:00PM",
					end_time: "09:00PM",
					location: "WCOnline",
				},
				{
					weekday: 5,
					date: "10-27-2023",
					start_time: "09:00PM",
					end_time: "10:00PM",
					location: "WCOnline",
				},
			],
		},
		{
			resource_type: "PT",
			course_id: "03-121",
			course_name: "Modern Biology I",
			professor: null,
			instructor: "Clara Dou",
			events: [
				{
					weekday: 2,
					date: "10-31-2023",
					start_time: "06:00PM",
					end_time: "07:00PM",
					location: "WCOnline",
				},
				{
					weekday: 2,
					date: "10-31-2023",
					start_time: "07:00PM",
					end_time: "08:00PM",
					location: "WCOnline",
				},
				{
					weekday: 2,
					date: "10-31-2023",
					start_time: "08:00PM",
					end_time: "09:00PM",
					location: "WCOnline",
				},
				{
					weekday: 2,
					date: "10-31-2023",
					start_time: "09:00PM",
					end_time: "10:00PM",
					location: "WCOnline",
				},
				{
					weekday: 3,
					date: "11-01-2023",
					start_time: "02:00PM",
					end_time: "03:00PM",
					location: "WCOnline",
				},
				{
					weekday: 3,
					date: "11-01-2023",
					start_time: "03:00PM",
					end_time: "04:00PM",
					location: "WCOnline",
				},
				{
					weekday: 3,
					date: "11-01-2023",
					start_time: "04:00PM",
					end_time: "05:00PM",
					location: "WCOnline",
				},
				{
					weekday: 3,
					date: "11-01-2023",
					start_time: "07:00PM",
					end_time: "08:00PM",
					location: "WCOnline",
				},
			],
		},
	],
	SI: [
		{
			resource_type: "SI",
			course_id: "03-121",
			course_name: "Modern Biology",
			professor: "Rule",
			instructor: "Claire & Emily",
			events: [
				{
					weekday: 7,
					date: null,
					start_time: "01:00PM",
					end_time: "02:00PM",
					location: "POS 282",
				},
				{
					weekday: 4,
					date: null,
					start_time: "05:30PM",
					end_time: "06:30PM",
					location: "POS 282",
				},
			],
		},
		{
			resource_type: "SI",
			course_id: "15-122",
			course_name: "Principles of Imperative Computation",
			professor: "Cervesato & Kaynar",
			instructor: "Kat & Raunak",
			events: [
				{
					weekday: 2,
					date: null,
					start_time: "06:00PM",
					end_time: "07:00PM",
					location: "POS A62",
				},
			],
		},
	],
};

const ClubsData = [
	{
		categories: ["Student Government Recognized Organizations", "technology"],
		organizationName: "ScottyLabs",
		events: [
			{
				weekday: 6,
				eventName: "Committee Work Session",
				startDate: "06/22",
				endDate: "06/22",
				startTime: "03:00PM",
				endTime: "05:00PM",
				location: "WEH 5415"
			},
		]
	},
	{
		categories: ["Student Government Recognized Organizations", "technology", "engineering"],
		organizationName: "Biomedical Engineering Society",
		events: [
			{
				weekday: 3,
				eventName: "Committee Work Session",
				startDate: "06/26",
				endDate: "06/26",
				startTime: "12:00PM",
				endTime: "02:00PM",
				location: "DH A302"
			},
		]
	}
]

const CareerData = [
	{
		organizationName: ["CPDC", "Society of Women Engineers", "College of Engineering"],
		categories: ["Career Fair", "STEM", "technology"],
		events: [
			{
				weekday: 2,
				eventName: "STEM Career Fair 2024",
				startDate: "09/10/24",
				endDate: "09/10/24",
				startTime: "12:00PM",
				endTime: "07:00PM",
				location: "CUC Connan Room"
			},
			{
				weekday: 3,
				eventName: "STEM Career Fair 2024",
				startDate: "09/11/24",
				endDate: "09/11/24",
				startTime: "12:00PM",
				endTime: "07:00PM",
				location: "CUC Connan Room"
			},
			{
				weekday: 4,
				eventName: "STEM Career Fair 2024",
				startDate: "09/12/24",
				endDate: "09/12/24",
				startTime: "12:00PM",
				endTime: "07:00PM",
				location: "CUC Connan Room"
			}
		]
	}
]

export {AcademicsData, ClubsData, CareerData}
