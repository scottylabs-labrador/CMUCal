import React from 'react'

const Introduction: React.FC = () => {
  return (
    <div className='px-20 pt-16 pb-10'>
      <h1 className="text-4xl pb-5 font-semibold text-teal">Welcome to CMUCal!</h1>
      <p className='pb-12'>Below you will find a quick guide to help you get started with CMU Calendar.</p>
      <hr></hr>
    </div>
  )
}

const ScrollBar: React.FC = () => {
  return (
    // Add condition when active, bold later 
    <div className='px-20 flex flex-col gap-4'>
      <p>How to use CMUCal</p>
      <p>How to upload events</p>
    </div>
  )
}

// Takes in a title, and a list of things
const SubSection : React.FC = () => {
  return(
    <div>
      <li></li>
    </div>
  )
}
const Content: React.FC = () => {
  return (
    <div className='pr-8'>
      <h2 className='text-xl pb-5 font-semibold text-teal'>How to use CMUCal</h2>
      <ol className="list-decimal pl-5 pb-20">
        <li className="text-2xl py-2">Get Started</li>
          <ul className='list-disc pl-5'>
            <li className='mt-2'>Open CMUCal</li>
            <li className='mt-2'>Click <strong>Log in with Google</strong></li>
            <li className='mt-2'>This will sync your Google Calendar with CMUCal, allowing you to export events directly.</li>
          </ul>
          <p className='mt-10'>After logging into CMUCal, you will be taken to the Home page.</p>
          <ul className='list-disc pl-5 gap-2'>
            <li className='mt-2'>The left panel features search to help you find specific events.</li>
            <li className='mt-2'>The right calendar view displays your events, allowing you to easily see your schedule at a glance.</li>
          </ul>

        <li className="text-2xl pt-8 pb-2">Search for Events</li>
          <ul className='list-disc pl-5'>
            <li className='mt-2'>Navigate to the appropriate tab: <strong>Academic, Career</strong> or <strong>Organizations</strong></li>
            <li className='mt-2'>Use the Search bar to look up specific events</li>
            <li className='mt-2'>Apply filters based on categories (e.g. lectures, office hours), and time frames to narrow down the search.</li>
          </ul>

        <li className="text-2xl pt-8 pb-2">Add Events</li>
          <ul className='list-disc pl-5'>
            <li className='mt-2'>In the Search results, click <strong>Add</strong> next to the events you want to include in your calendar.</li>
            <li className='mt-2'>Added events will appear on the right calendar view.</li>
            <li className='mt-2'>Check for any warnings about overlapping events or potential conflicts with your Google Calendar events.</li>
          </ul>
        <p className='mt-10'>Tip: Toggle the visibility of your Google Calendar events with Show my GCal events/Hide my GCal events to customize your calendar view ccording to your needs</p>

        <li className="text-2xl pt-8 pb-2">Export to Google Calendar</li>
          <ul className='list-disc pl-5'>
            <li className='mt-2'>Once you have added and adjusted your desired events, click <strong>Export</strong> (below the calendar view) to sync these events with your Google Calendar</li>
          </ul>
      </ol>  

      <h2 className='text-xl pb-5 font-semibold text-teal'>How to upload Events</h2>
      <ol className="list-decimal pl-5 pb-20">
        <li className="text-2xl pt-8 pb-2">Navigate to the Upload Section</li>
          <ul className='list-disc pl-5'>
            <li className='mt-2'>Open CMUCal.</li>
            <li className='mt-2'>On the upper right, click Upload.</li>
          </ul>
        <li className="text-2xl pt-8 pb-2">Enter Event Details</li>
          <ul className='list-disc pl-5'>
            <li className='mt-2'>Choose an event type: <strong>Academics</strong> or <strong>Career</strong>.</li>
            <li className='mt-2'>Choose an upload method.</li>
            <li className='mt-2'>Click Upload.</li>
            <li className='mt-2'>Review the information, click <strong>Confirm</strong>.</li>
          </ul>

        <p className='mt-10'><strong>Note:</strong> Events uploaded from the website will be marked with a green check. Events uploaded by professors or TAs will be marked with a yellow check. In all other cases, events will not be verified with a check on CMUCal.</p>

      </ol>
    </div>
  )
}




const SupportUserGuide: React.FC = () => {
  return (
    <div>
      <Introduction/>
      <div className='flex flex-row'>
          <ScrollBar/>
          <Content/>
      </div>
    </div>
  )
}


export {SupportUserGuide};
