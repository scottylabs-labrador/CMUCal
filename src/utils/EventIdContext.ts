import React, { createContext, useState } from "react";

interface EventIdContextProps {
    eventId: number;
    setEventId: React.Dispatch<React.SetStateAction<number>>;
}

export const CreateEventIdContext = () => {
    const [eventIdCount, setEventIdCount] = useState(0);
    const eventIdContext = createContext<EventIdContextProps>({eventId:eventIdCount, setEventId:setEventIdCount});
    return eventIdContext;
}

