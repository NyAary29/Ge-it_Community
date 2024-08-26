import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO, startOfWeek, addDays } from 'date-fns';
import { fr } from "date-fns/locale";
import '../../assets/css/DisplaySchedule.css'
import MySchedule from "./Schedule";


const WeekSelectionAlternate = () => {
    const [startDate, setStartDate] = useState("");
    const [refresh] = useState(false);
    const [mondays, setMondays] = useState([]);

    const fetchMondays = async () => {
        try {
            const response = await axios.get("http://localhost:8800/events/mondays");
            console.log("Modayss", response.data);

            const mondaysList = response.map((dateStr) => parseISO(dateStr.date));
            mondaysList.sort((a, b) => a - b); // Trier les dates par ordre croissant
            setMondays(mondaysList);
        } catch (error) {
            console.error("Erreur lors de la récupération des lundis :", error);
        }
    };

    useEffect(() => {
        fetchMondays();
    }, []);

    const generateAvailableMondays = () => {
        const today = new Date();
        const startOfNextWeek = startOfWeek(today); // Get the start of the next week

        // Generate all Mondays for the next 3 months
        const allMondays = [];
        let currentMonday = startOfNextWeek;
        for (let i = 0; i < 12; i++) { // 12 weeks = 3 months
            if (currentMonday.getDay() !== 1) {
                currentMonday = addDays(currentMonday, 1);
            }
            allMondays.push(currentMonday);
            currentMonday = addDays(currentMonday, 7); // Move to the next Monday
        }

        // Filter out the Mondays that are in the database
        const availableMondays = allMondays.filter(monday => {
            const formattedMonday = format(monday, 'yyyy-MM-dd');
            return !mondays.some(dbMonday => format(dbMonday, 'yyyy-MM-dd') === formattedMonday);
        });

        return availableMondays;
    };

    const handleChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Create New Weekly Schedule for the week of the :
                    <select value={startDate} onChange={handleChange} required>
                        <option value="">           </option>
                        {generateAvailableMondays().map(monday => (
                            <option key={monday} value={format(monday, 'yyyy-MM-dd')}>
                                {format(monday, 'PPPP', { locale: fr })}
                            </option>
                        ))}
                    </select>
                </label>
            </form>
            {startDate && <MySchedule key={refresh} startDate={startDate} />}
        </div>
    );
}


export default WeekSelectionAlternate;
